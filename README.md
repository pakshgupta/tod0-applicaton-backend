# TODO Application Backend

This project is a **Task Management API** built with **Node.js**, **Express**, and **MongoDB**. It allows users to create and manage tasks, assign categories, and perform various CRUD operations.

## Project Structure

```plaintext
todo-application-backend/
│
├── node_modules/                     # Node.js packages
├── src/
│   ├── controllers/
│   │   ├── category.controller.js    # Controller for managing categories
│   │   ├── task.controller.js        # Controller for managing tasks
│   │   └── user.controller.js        # Controller for user authentication
│   ├── middlewares/
│   │   └── validateJWT.js            # Middleware for JWT validation
│   ├── models/
│   │   ├── category.model.js         # Mongoose schema for categories
│   │   ├── task.model.js             # Mongoose schema for tasks
│   │   └── user.model.js             # Mongoose schema for users
│   ├── routes/
│   │   ├── category.route.js         # Routes for category-related operations
│   │   ├── task.route.js             # Routes for task-related operations
│   │   └── user.route.js             # Routes for user-related operations
│   └── utils/
│       ├── ApiError.js               # Utility for API error handling
│       ├── ApiResponse.js            # Utility for formatting API responses
│       ├── asyncHandler.js           # Utility for handling async errors
│       └── generateToken.js          # Utility for generating JWT tokens
│
├── .env                              # Environment variables (not included in repository)
├── index.js                          # Entry point of the application
├── app.js                            # Express app setup and configuration
├── package.json                      # Project metadata and dependencies
└── package-lock.json                 # Lockfile for exact dependency versions                    
```


## Technologies Used

- **Node.js**: The runtime environment for executing JavaScript code on the server.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing user data and tasks.
- **JWT (jsonwebtoken)**: Used for secure authentication.
- **Bcrypt**: A library to hash user passwords.
- **Cookie-parser**: For parsing cookies sent with requests.
- **CORS**: To enable cross-origin requests.
- **Dotenv**: To load environment variables from a `.env` file.
- **Nodemon**: A utility that monitors for file changes and automatically restarts the server.

### Package Dependencies (from `package.json`)

```json
{
  "bcrypt": "^5.1.1",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.6.2",
  "nodemon": "^3.1.4"
}
```
## Features

- **User Authentication**: Sign Up, Sign In, Sign Out
- **Task Management**: Create, Update, Delete, Sort, and Filter Tasks
- **Category Management**: Create and assign categories to tasks

## Setup and Installation
#### Prerequisites
Make sure you have Node.js and MongoDB installed on your machine.

1. Clone the repository:
```bash
git clone <repository-url>

```
2. Navigate to the project directory:
```bash
cd todo-application-backend
```

3. Install Dependencies
```bash
npm install
```
4. Set up environment variables:
Create a .env file in the root directory and add the following:
```bash
PORT=4000
MONGODB_URi=<your-mongo-uri>
SECRET=<your-jwt-secret>
```
5. Run the application in development mode:
```bash
npm run dev
```
6. To start the application in production mode:
```bash
npm start
```
## API Endpoints

### User Routes

- `POST /api/v1/user/signup`: Sign up a new user.
- `POST /api/v1/user/signin`: Sign in a user.
- `POST /api/v1/user/signout`: Sign out a user.

### Task Routes

- `POST /api/v1/task/create`: Create a new task.
- `GET /api/v1/task/all-task`: Retrieve all tasks.
- `PUT /api/v1/task/:id`: Update an existing task.
- `PUT /api/v1/task/status/:id`: Update status of task.
- `DELETE /api/v1/task/:id`: Delete an existing task.
- `GET /api/v1/task/search-task?search={term}`: Search for tasks based on keywords.
- `GET /api/v1/task/category`: Filter tasks by category.
- `GET /api/v1/task/single-task/:id`: Get Single Task.
- `GET /api/v1/task/sort-task?{dueDate&priority}`: Sort tasks by due date and priority.

### Category Routes

- `POST /api/v1/category/create`: Create a new category.

## Project Workflow

### User Authentication

- **Sign Up**: Registers a new user and creates an account.
- **Sign In**: Authenticates a user and returns a JWT token for future API requests.
- **Sign Out**: Terminates the session by clearing the token.

### Task Management

- **Create Task**: Adds a new task with a title, description, and optionally a due date, priority or category.
- **View Tasks**: Lists single and all tasks  created by the authenticated user.
- **Search and Filter Tasks**: Allows users to search tasks by keywords and filter them by categories.
- **Update Task**: Modifies task details such as title, description, due date, priority or category.
- **Delete Task**: Deletes a task permanently from the system.
- **Task Sorting**: Sort tasks by due date and priority to prioritize the work.

### Category Management

- **Create Category**: Adds new categories which can later be assigned to tasks.
