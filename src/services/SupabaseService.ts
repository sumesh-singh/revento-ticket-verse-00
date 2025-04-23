import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { PaymentDetails } from '@/types';

// User related operations
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'user',
        org_name: userData.orgName
      }])
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Profile not found');

    return { success: true, data };
  } catch (error: any) {
    console.error('Error getting user profile:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId: string, userData: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        org_name: userData.orgName,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message };
  }
};

// Event related operations
export const createEvent = async (eventData: any) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        date: eventData.date,
        time: eventData.time,
        category: eventData.category,
        price: eventData.price,
        organizer: eventData.organizer,
        organizer_id: eventData.organizerId,
        image: eventData.image
      }])
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, eventId: data.id };
  } catch (error: any) {
    console.error('Error creating event:', error);
    return { success: false, error: error.message };
  }
};

export const getEvent = async (eventId: string) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        ticket_tiers (*)
      `)
      .eq('id', eventId)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Event not found');

    return { success: true, data };
  } catch (error: any) {
    console.error('Error getting event:', error);
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (eventId: string, eventData: any) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        date: eventData.date,
        time: eventData.time,
        category: eventData.category,
        price: eventData.price,
        organizer: eventData.organizer,
        organizer_id: eventData.organizerId,
        image: eventData.image,
        updated_at: new Date().toISOString()
      })
      .eq('id', eventId)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error updating event:', error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return { success: false, error: error.message };
  }
};

export const getEventsByOrganizer = async (organizerId: string) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('organizer_id', organizerId);

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    console.error('Error getting organizer events:', error);
    return { success: false, error: error.message };
  }
};

// Registration related operations
export const registerForEvent = async (registrationData: any) => {
  try {
    const { data: registration, error: regError } = await supabase
      .from('registrations')
      .insert([{
        user_id: registrationData.userId,
        event_id: registrationData.eventId,
        ticket_type: registrationData.ticketType,
        personal: registrationData.personal,
        team_members: registrationData.teamMembers,
        status: 'pending'
      }])
      .select()
      .single();

    if (regError) throw regError;

    const { data: transaction, error: transError } = await supabase
      .from('transactions')
      .insert([{
        user_id: registrationData.userId,
        event_id: registrationData.eventId,
        amount: registrationData.amount,
        currency: registrationData.currency,
        payment_method: registrationData.paymentMethod,
        status: 'pending'
      }])
      .select()
      .single();

    if (transError) throw transError;

    return {
      success: true,
      registrationId: registration.id,
      transactionId: transaction.id
    };
  } catch (error: any) {
    console.error('Error registering for event:', error);
    return { success: false, error: error.message };
  }
};

export const getUserRegistrations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    return { success: true, data: data || [] };
  } catch (error: any) {
    console.error('Error getting user registrations:', error);
    return { success: false, error: error.message };
  }
};

export const getEventRegistrations = async (eventId: string) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('event_id', eventId);

    if (error) throw error;
    
    return { success: true, data: data || [] };
  } catch (error: any) {
    console.error('Error getting event registrations:', error);
    return { success: false, error: error.message };
  }
};

// Transaction related operations
export const updateTransactionStatus = async (transactionId: string, status: string, paymentDetails?: any) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .update({
        status,
        payment_details: paymentDetails,
        updated_at: new Date().toISOString()
      })
      .eq('id', transactionId)
      .select()
      .single();

    if (error) throw error;

    if (status === 'completed') {
      // Update the registration status
      await supabase
        .from('registrations')
        .update({ status: 'confirmed' })
        .eq('transaction_id', transactionId);
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error updating transaction status:', error);
    return { success: false, error: error.message };
  }
};

// Ticket related operations
export const createTicket = async (ticketData: any) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        user_id: ticketData.userId,
        event_id: ticketData.eventId,
        registration_id: ticketData.registrationId,
        event_name: ticketData.eventName,
        date: ticketData.date,
        time: ticketData.time,
        location: ticketData.location,
        ticket_type: ticketData.ticketType,
        ticket_number: `T-${Math.floor(Math.random() * 1000000)}`,
        status: 'upcoming',
        image: ticketData.image,
        payment_method: ticketData.paymentMethod,
        tx_hash: ticketData.txHash,
        blockchain: ticketData.blockchain,
        purchase_date: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, ticketId: data.id };
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    return { success: false, error: error.message };
  }
};

export const getUserTickets = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    
    return { success: true, data: data || [] };
  } catch (error: any) {
    console.error('Error getting user tickets:', error);
    return { success: false, error: error.message };
  }
};
