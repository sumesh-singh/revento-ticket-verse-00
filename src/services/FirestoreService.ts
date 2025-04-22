
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  addDoc,
  Timestamp,
  serverTimestamp,
  DocumentReference
} from 'firebase/firestore';
import { db } from '../config/firebase';

// User related operations
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error: any) {
    console.error('Error getting user profile:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId: string, userData: any) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...userData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message };
  }
};

// Event related operations
export const createEvent = async (eventData: any) => {
  try {
    const eventRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, eventId: eventRef.id };
  } catch (error: any) {
    console.error('Error creating event:', error);
    return { success: false, error: error.message };
  }
};

export const getEvent = async (eventId: string) => {
  try {
    const eventDoc = await getDoc(doc(db, 'events', eventId));
    if (eventDoc.exists()) {
      return { success: true, data: { id: eventDoc.id, ...eventDoc.data() } };
    } else {
      return { success: false, error: 'Event not found' };
    }
  } catch (error: any) {
    console.error('Error getting event:', error);
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (eventId: string, eventData: any) => {
  try {
    await updateDoc(doc(db, 'events', eventId), {
      ...eventData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error updating event:', error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    await deleteDoc(doc(db, 'events', eventId));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return { success: false, error: error.message };
  }
};

export const getEventsByOrganizer = async (organizerId: string) => {
  try {
    const eventsQuery = query(
      collection(db, 'events'),
      where('organizerId', '==', organizerId)
    );
    const eventDocs = await getDocs(eventsQuery);
    const events = eventDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: events };
  } catch (error: any) {
    console.error('Error getting organizer events:', error);
    return { success: false, error: error.message };
  }
};

// Registration related operations
export const registerForEvent = async (registrationData: any) => {
  try {
    // Create transaction document
    const transactionRef = await addDoc(collection(db, 'transactions'), {
      userId: registrationData.userId,
      eventId: registrationData.eventId,
      amount: registrationData.amount,
      currency: registrationData.currency,
      paymentMethod: registrationData.paymentMethod,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    
    // Create registration document with reference to transaction
    const registrationRef = await addDoc(collection(db, 'registrations'), {
      userId: registrationData.userId,
      eventId: registrationData.eventId,
      ticketType: registrationData.ticketType,
      personal: registrationData.personal,
      teamMembers: registrationData.teamMembers || [],
      transactionId: transactionRef.id,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return { 
      success: true, 
      registrationId: registrationRef.id,
      transactionId: transactionRef.id 
    };
  } catch (error: any) {
    console.error('Error registering for event:', error);
    return { success: false, error: error.message };
  }
};

export const getUserRegistrations = async (userId: string) => {
  try {
    const registrationsQuery = query(
      collection(db, 'registrations'),
      where('userId', '==', userId)
    );
    const registrationDocs = await getDocs(registrationsQuery);
    const registrations = registrationDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Fetch additional data for each registration
    const registrationsWithDetails = await Promise.all(
      registrations.map(async (registration: any) => {
        const eventData = await getEvent(registration.eventId);
        return {
          ...registration,
          event: eventData.success ? eventData.data : null,
        };
      })
    );
    
    return { success: true, data: registrationsWithDetails };
  } catch (error: any) {
    console.error('Error getting user registrations:', error);
    return { success: false, error: error.message };
  }
};

export const getEventRegistrations = async (eventId: string) => {
  try {
    const registrationsQuery = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId)
    );
    const registrationDocs = await getDocs(registrationsQuery);
    const registrations = registrationDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: registrations };
  } catch (error: any) {
    console.error('Error getting event registrations:', error);
    return { success: false, error: error.message };
  }
};

// Transaction related operations
export const updateTransactionStatus = async (transactionId: string, status: string, paymentDetails?: any) => {
  try {
    await updateDoc(doc(db, 'transactions', transactionId), {
      status,
      ...(paymentDetails && { paymentDetails }),
      updatedAt: serverTimestamp(),
    });
    
    // Update registration status
    const registrationsQuery = query(
      collection(db, 'registrations'),
      where('transactionId', '==', transactionId)
    );
    const registrationDocs = await getDocs(registrationsQuery);
    
    if (!registrationDocs.empty) {
      const registrationDoc = registrationDocs.docs[0];
      await updateDoc(doc(db, 'registrations', registrationDoc.id), {
        status: status === 'completed' ? 'confirmed' : status,
        updatedAt: serverTimestamp(),
      });
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating transaction status:', error);
    return { success: false, error: error.message };
  }
};

// Ticket related operations
export const createTicket = async (ticketData: any) => {
  try {
    const ticketRef = await addDoc(collection(db, 'tickets'), {
      ...ticketData,
      createdAt: serverTimestamp(),
    });
    return { success: true, ticketId: ticketRef.id };
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    return { success: false, error: error.message };
  }
};

export const getUserTickets = async (userId: string) => {
  try {
    const ticketsQuery = query(
      collection(db, 'tickets'),
      where('userId', '==', userId)
    );
    const ticketDocs = await getDocs(ticketsQuery);
    const tickets = ticketDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Fetch additional data for each ticket
    const ticketsWithDetails = await Promise.all(
      tickets.map(async (ticket: any) => {
        const eventData = await getEvent(ticket.eventId);
        return {
          ...ticket,
          event: eventData.success ? eventData.data : null,
        };
      })
    );
    
    return { success: true, data: ticketsWithDetails };
  } catch (error: any) {
    console.error('Error getting user tickets:', error);
    return { success: false, error: error.message };
  }
};
