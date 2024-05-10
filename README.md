# Event Management System

Welcome to the Event Management System! This project allows users to create, manage, and join events seamlessly.

## Features

- **Event Creation and Management**: Users can create and manage their events, including setting details such as date, time, location, and descriptions.
  
- **Event Joining**: Users can browse and join events of interest. Paid events seamlessly redirect to a payment page integrated with Strapi for secure transactions.
  
- **Ticket Generation**: Upon successful payment for a paid event, users receive a digital ticket confirming their participation.
  
- **Responsive Design**: The web application is fully responsive, providing an optimal viewing experience across devices of all sizes.

- **Search Functionality**: Users can search for events using keywords or filters, facilitating quick and efficient browsing.

## Technologies Used

- **MongoDB**: Database for storing event information and user data.
  
- **Express.js**: Backend framework for handling server-side logic and routing.
  
- **React.js**: Frontend library for building user interfaces.
  
- **Node.js**: JavaScript runtime environment for running server-side code.
  
- **Strapi**: Integrated for payment processing and ticket generation.

## Deployment

The backend is deployed to [Render](https://render.com/), providing reliability and scalability. The frontend is deployed to [Vercel](https://vercel.com/), ensuring fast and efficient access for users.

## Getting Started

### Add .env file :

MONGO_STRING=
PORT=
SECRET_KEY=

To get started with the Event Management System, follow these steps:

1. Clone the repository:
`git clone https://github.com/suvaranjan/Event-Management.git`

2. Navigate to the project directory:
`cd Event-Management`

3. Install dependencies:
`npm install`

4. Start the development server:
`npm start`
