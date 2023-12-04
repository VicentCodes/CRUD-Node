# Point of Sale System - Node.js, Express, EJS, MongoDB

This project is a basic CRUD (Create, Read, Update, Delete) application simulating a point of sale system for a store. It includes a simple user authentication system with login and registration features.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com)

## Installation

1. Clone the repository:

```bash
https://github.com/VicentCodes/CRUD-Node.git
cd CRUD-Node
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add the following:

```
USER_PASS=your-mongodb-username:your-mongodb-password
DATABASE=your-mongodb-database-name
PORT=3000
```

Replace `your-mongodb-username`, `your-mongodb-password`, and `your-mongodb-database-name` with your MongoDB credentials.

## Usage

1. Start the MongoDB server or create user access to DB.

2. Run the application:

```bash
npm start
```

3. Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Features

- **Login and Registration:** Users can log in and register for an account.

- **CRUD Operations:** Perform Create, Read, Update, and Delete operations on product data.

- **Session Management:** Uses Express sessions for user authentication.

## Project Structure

- `app.js`: Main entry point of the application.
- `src/routers/index.js`: Contains routes for login, registration, CRUD operations, and session management.
- `src/models/datos.js`: MongoDB schema for product data.
- `src/models/Users.js`: MongoDB schema for user data.
- `src/views`: EJS templates for rendering views.
- `src/public`: Static files (CSS, JS, etc.) for the front end.
- `src/middlewares`: Middleware functions for request handling.
  - `checkSessionActive.js`: Middleware file to check if a user session is active to redirect to /.
  - `createSessionCheck`: Funtion containing session-related to protect routes.

## Routes


- `/`: Main route, displays product data.
- `/login`: Displays the login form.
- `/vice`: Processes the login form.
- `/register`: Registers a new user.
- `/add`: Adds a new product.
- `/del/:id`: Deletes a product.
- `/update/:id`: Updates a product.
- `/logout`: Logs out the user.

## Contributing

Feel free to contribute by opening issues or creating pull requests.

## License

This project is licensed under the [MIT License](LICENSE).