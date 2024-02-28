# NodeJS-TypeScript-ExpressJS-CRUD-MySql-JWT

This project is a Node.js application built with TypeScript and Express.js. It implements CRUD operations using MySQL as the database and includes JSON Web Token (JWT) for authentication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Features

- User authentication with JWT
- CRUD operations for managing contacts
- Secure communication with MySQL database

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm (Node Package Manager) installed
- MySQL database server installed
- TypeScript installed globally (`npm install -g typescript`)

## Getting Started

1. **Clone the repository**

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   ```bash
   Create a MySQL database and update the connection details in .env file.
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

The application will be accessible at http://localhost:8000.

## Project Structure

The project follows a specific structure to organize code. Key directories include:

- src: Contains TypeScript source code.
- dist: Output directory for compiled TypeScript code.
- postman collection with documentation
