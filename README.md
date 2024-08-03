# User Registration and Admin Dashboard Application

This is a simple user registration and admin dashboard application built with React for the frontend and Node.js with MongoDB for the backend. The application allows users to register by providing their name, email, and age. An admin dashboard is also available to view the list of registered users.

## Features

- User registration form with validation
- Prevent duplicate email registration
- Admin dashboard to view all registered users
- Responsive design using Tailwind CSS

## Prerequisites

- Node.js (v14 or above)
- MongoDB (local or Atlas)
- npm (v6 or above)

## Technologies Used

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB
- Deployment: Vercel (Frontend & Backend)

## Environment Variables

Create a `.env` file in the `backend` directory with the following content:

`MONGO_URI = your_mongo_connection_string`

## Error Handling

Both frontend and backend have basic error handling implemented to provide feedback to the user in case of validation failures or server errors.