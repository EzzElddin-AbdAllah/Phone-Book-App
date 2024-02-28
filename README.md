# Phone Book App

Phone Book App is a full-stack application that allows users to manage their contacts efficiently.

## Features

- **User Authentication:** Users can register and log in to the app to access their contacts.
- **CRUD Operations:** Users can create, read, update, and delete their contacts.
- **Validation:** Input fields are validated on the client and server to ensure data integrity.
- **Responsive Design:** The app is designed to work seamlessly on desktop and mobile devices.
- **Secure:** User authentication is handled using JWT tokens.
- **API Documentation:** Comprehensive documentation for the backend API is provided.

## Installation

### Client

1. Navigate to the `client` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

### Server

1. Navigate to the `server` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile TypeScript files.
4. Run `npm start` to start the server.

### Database

1. Ensure that the mysql database is running and phone_book_app db is present
2. Change the `MYSQL_USER` and `MYSQL_PASSWORD` in `.env`.

## Usage

1. Register or log in to access your contacts.
2. Use the navigation to create, view, edit, or delete contacts.
3. Fill in the required fields and submit the form to perform actions.

## Technologies Used

- **Client:**
  - TypeScript
  - Next.js
  - React
  - Tailwind CSS
  - Axios
  - React Query
  - Zod
  - Zustand
  - React Hook Form
- **Server:**
  - TypeScript
  - Node.js
  - Express.js
  - Sequelize
  - JWT
- **Database:**
  - MySQL

## API Documentation

For detailed API documentation, refer to the Postman collection provided in the `postman collection with documentation` directory.
