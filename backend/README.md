# List of APIs

# Booking App

`Booking and organizing event`

### POST : Add events

- URL: `http://localhost:3001/V1/api/events`
- DESCRIPTION: Adding New Events

- Body

`{
    "name":"React.js Global Summit",
    "date":"06/03/2024",
    "capacity":100
}`

### GET Find Events

http://localhost:3001/V1/api/events
DESCRIPTION: Finding specific events

### POST Book Ticket

- URL: http://localhost:3001/V1/api/bookings
- DESCRIPTION: Booking ticket for specific event
- HEADER: Authorization Token

`{
    "user":"m.s.jadhav",
    "eventId":"65f7ddd6e45c60bace908186"
}`

### PATCH: Update Event

- URL: http://localhost:3001/V1/api/events
- DESCRIPTION: Updating Event information by its ID

Body

`
{
    "eventId": "65e055f7eca196e8e3824115",
    "name":"Node.js Global Event"
}`

### DELETE Delete Event

- URL: http://localhost:3001/V1/api/events/65e05677a22c2fc042de120c
- DESCRIPTION: Deleting Specific Event

### POST Add General User

- URL: http://localhost:3001/V1/api/iuser
- DESCRIPTION: Creating user to book events

Body
`
{
    "username":"manishajadhav2323@gmail.com",
    "password":"Hello@123",
    "role": "General"
}`

### POST Add Event Organiser User

- URL: http://localhost:3001/V1/api/iuser
- DESCRIPTION: Creating user to add new Events

Body
`{
    "username":"manishajadhav2323@gmail.com",
    "password":"Hello@123",
    "role": "Organizer"
}`

### PATCH Update User

- URL: http://localhost:3001/V1/api/iuser
- Updating user information

Body
`{
    "username":"manishajadhav2323@gmail.com",
    "password":"Hello@123",
    "role": "General"
}`

### DELETE Delete User

- URL: http://localhost:3001/V1/api/iuser/{userId}
- DESCRIPTION: Deleting specific user from application

### POST Login User

- URL: http://localhost:3001/V1/api/login
- DESCRIPTION: Login to dashboard

Body
`json
{
    "username":"manishajadhav2323@gmail.com",
    "password":"Hello@123"
}
`
