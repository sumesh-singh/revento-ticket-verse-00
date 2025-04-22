
# Database Schema Documentation

## Collections

### Users
- **Collection**: `users`
- **Document ID**: Firebase Auth User ID
- **Fields**:
  - `username`: string (unique)
  - `name`: string
  - `email`: string
  - `role`: 'user' | 'organizer' | 'admin'
  - `rewardPoints`: number
  - `avatarUrl`: string (optional)
  - `phone`: string (optional)
  - `bio`: string (optional)
  - `preferences`: object (optional)
    - `notifications`: boolean
    - `emailUpdates`: boolean
    - `theme`: string
  - `orgName`: string (for organizers)
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

### Events
- **Collection**: `events`
- **Document ID**: Auto-generated
- **Fields**:
  - `title`: string
  - `description`: string
  - `location`: string
  - `date`: string
  - `time`: string
  - `category`: string
  - `price`: string
  - `attendees`: number
  - `organizer`: string (name)
  - `organizerId`: string (user ID)
  - `image`: string
  - `ticketTiers`: array
    - `id`: string
    - `name`: string
    - `price`: number
    - `currency`: string
    - `description`: string
    - `benefits`: array of strings
    - `available`: boolean
    - `maxPerTransaction`: number
  - `placeId`: string (Google Maps Place ID, optional)
  - `coordinates`: object (optional)
    - `lat`: number
    - `lng`: number
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

### Registrations
- **Collection**: `registrations`
- **Document ID**: Auto-generated
- **Fields**:
  - `userId`: string
  - `eventId`: string
  - `ticketType`: string
  - `personal`: object
    - `name`: string
    - `email`: string
    - `phone`: string
    - `dietaryRestrictions`: string (optional)
  - `teamMembers`: array of strings
  - `transactionId`: string
  - `status`: 'pending' | 'confirmed' | 'cancelled'
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

### Transactions
- **Collection**: `transactions`
- **Document ID**: Auto-generated
- **Fields**:
  - `userId`: string
  - `eventId`: string
  - `amount`: number
  - `currency`: string
  - `paymentMethod`: 'crypto' | 'stellar' | 'fiat'
  - `status`: 'pending' | 'completed' | 'failed' | 'refunded'
  - `paymentDetails`: object (optional)
    - `txHash`: string
    - `provider`: string
    - `paymentDate`: timestamp
    - `settlementDate`: timestamp
  - `createdAt`: timestamp
  - `updatedAt`: timestamp

### Tickets
- **Collection**: `tickets`
- **Document ID**: Auto-generated
- **Fields**:
  - `userId`: string
  - `eventId`: string
  - `registrationId`: string
  - `eventName`: string
  - `date`: string
  - `time`: string
  - `location`: string
  - `ticketType`: string
  - `ticketNumber`: string
  - `status`: 'upcoming' | 'attended' | 'cancelled'
  - `image`: string
  - `paymentMethod`: 'crypto' | 'stellar' | 'fiat'
  - `txHash`: string (optional)
  - `ipfsCid`: string (optional)
  - `blockchain`: string (optional)
  - `tokenId`: string (optional)
  - `purchaseDate`: string
  - `createdAt`: timestamp

## Relationships

1. **User to Event** (One-to-Many):
   - A user (organizer) can create multiple events
   - An event belongs to one organizer

2. **User to Registration** (One-to-Many):
   - A user can have multiple registrations
   - A registration belongs to one user

3. **Event to Registration** (One-to-Many):
   - An event can have multiple registrations
   - A registration belongs to one event

4. **Registration to Transaction** (One-to-One):
   - A registration has one transaction
   - A transaction belongs to one registration

5. **Registration to Ticket** (One-to-One):
   - A registration can lead to one ticket (when payment is confirmed)
   - A ticket is associated with one registration

## ACID Properties Implementation

1. **Atomicity**: 
   - Firestore transactions are used for critical operations like payment processing
   - Related operations (e.g., updating transaction status and registration status) are handled together

2. **Consistency**: 
   - Data validation is performed before writing to the database
   - Business rules are enforced (e.g., checking if ticket tier is available)

3. **Isolation**: 
   - Firestore handles concurrent operations automatically
   - Timestamps are used to track document creation and updates

4. **Durability**: 
   - Firestore ensures data is persisted to disk
   - Error handling and recovery mechanisms are implemented

## Security Rules

Firestore security rules should be implemented to:
- Allow users to read their own data
- Allow organizers to manage their own events
- Restrict access to sensitive information
- Prevent unauthorized modifications
