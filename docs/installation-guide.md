# MindBridge - Installation Guide

This guide provides step-by-step instructions for setting up and running the MindBridge application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v16.x or newer)
2. **npm** (v8.x or newer)
3. **Git** (for cloning the repository)
4. **MongoDB Atlas account** (optional - a connection string is already provided)

## Getting the Code

### Option 1: Download the ZIP File

1. Download the ZIP file containing the project
2. Extract the ZIP file to your desired location
3. Open a terminal and navigate to the extracted directory

### Option 2: Clone from Git Repository

1. Open a terminal
2. Run the following command:
```bash
git clone https://github.com/yourusername/mind-bridge.git
cd mind-bridge
```

## Setting Up the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install the dependencies:
```bash
npm install
```

3. The MongoDB connection is already configured in the code. If you want to use your own MongoDB instance, modify the `MONGO_URI` in `backend/index.js`.

4. Start the backend server:
```bash
npm run dev
```

5. You should see the following output:
```
Server starting at 8080
Connecting to MongoDB cluster...
Successfully connected to MongoDB!
```

## Setting Up the Frontend

1. Open a new terminal window and navigate to the frontend directory:
```bash 
cd frontend
```

2. Install the dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

4. The React application should automatically open in your default web browser at http://localhost:3000

## Verifying the Installation

1. The backend server should be running on port 8080
2. The frontend application should be running on port 3000
3. Navigate to http://localhost:3000 in your web browser
4. You should see the login page of the MindBridge application

## Creating a Test Account

1. Click on "Click here" next to "Looking to create an account?"
2. Fill in the registration form with:
   - First Name: Test
   - Last Name: User
   - Email: test@mindbridge.com
   - Password: password123
3. Click "Continue"
4. Add a description about yourself
5. Click "Create account"
6. You should be redirected to the dashboard

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**: 
   - Check your internet connection
   - Verify that the MongoDB URI is correct
   - Ensure MongoDB Atlas whitelist includes your IP address

2. **Port Already in Use**:
   - If port 8080 is already in use, modify the port in `backend/index.js`
   - Remember to update the `BASE_URL` in `frontend/src/apis/api.js` if you change the port

### Frontend Issues

1. **Module Not Found Errors**:
   - Delete the `node_modules` folder and `package-lock.json`
   - Run `npm install` again

2. **API Connection Issues**:
   - Ensure the backend server is running
   - Check that the `BASE_URL` in `frontend/src/apis/api.js` matches your backend server address

## Next Steps

After successfully installing and running the application, you can:

1. Create new posts from the dashboard
2. Edit and delete existing posts
3. Explore the features of the rich text editor
4. Test the authentication system by logging out and logging back in