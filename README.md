# Progress Exercise and Rehab Log App - Backend

This repository contains the backend API for the Progress Exercise and Rehab Log App, a platform for tracking and logging rehabilitation exercises.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [License](#license)

## Features

- User authentication and session management
- CRUD operations for posts (Create, Read, Update, Delete)
- Secure MongoDB storage
- Error handling and validations

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for authentication
- CORS for cross-origin handling

## Getting Started

### Prerequisites

- Node.js
- MongoDB URI

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/isaiahasanchez/react-progress-app-backend.git
2. Navigate to the project directory
   ```
   cd your-repo-name
4. Install Dependencies:
   ```
   npm install
   ```
5. Create a .env file in the root directory and set up your environment variables:
   ```
   MONGO_URI=your_mongodb_uri
   SESSION_KEY=your_session_key
   ```
7. Start the server
   ```
   npm start
   ```

## Endpoints
- /posts: Fetch all posts
- /posts/:id: Interact with a specific post (get, update, delete)
- /login: Authenticate a user
- /register: Register a new user
- /logout: Log out an authenticated user

## License
This project is licensed under the MIT License.
