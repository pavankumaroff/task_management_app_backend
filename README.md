# Express Task Management API Setup Guide

This guide provides instructions for setting up and running the Express.js task management API.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: v16+)
- [npm](https://www.npmjs.com/)

## Getting Started

### 1. Clone the Repository

```sh
git clone <https://github.com/pavankumaroff/task_management_app_backend.git>
cd <task_management_app_backend>
```

### 2. Install Dependencies

Run the following command to install the required packages:

```sh
npm install
```

### 3. Create a `.env` File

In the root directory of the project, create a `.env` file and add the following content:

```
db=mongodb://127.0.0.1:27017/task_management
privateKey=eje6322d
```

- Replace `mongodb://127.0.0.1:27017/task_management` with your actual MongoDB connection string if different.
- Replace `eje6322d` with a secure private key for authentication if needed.

### 4. Start the Server

Run the following command to start the Express server:

```sh
npm start
```

By default, the server will run on:

```
http://localhost:9000
```

### 5. API Endpoints

Here are some example API endpoints:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `POST /users` - Create a new user
- `POST /auth` - Sign in user
- `POST /users/me` - Get current user

### 6. Connecting to MongoDB

Ensure that MongoDB is running locally or update the `db` variable in `.env` with a remote MongoDB URL.

For local MongoDB, you can start it using:

```sh
mongod
```

### 7. Testing the API

You can use [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test API requests.

Example `cURL` request:

```sh
curl -X GET http://localhost:3000/tasks
```

### 8. Troubleshooting

- If the server does not start, check the `.env` file and ensure MongoDB is running.
- Restart the server after making changes to `.env` variables.
- Run `npm install` if dependencies are missing.

## License

This project is licensed under the [MIT License](LICENSE).
