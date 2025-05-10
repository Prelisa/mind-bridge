# MindBridge

MindBridge is a content publishing platform that allows users to create and share articles, blog posts and ideas. The platform features user authentication, post creation with rich text editing, and content management.

## Tech Stack

### Frontend
- React.js (v19.1.0)
- React Router DOM (v7.5.1)
- React Bootstrap
- Quill rich text editor
- CSS for styling

### Backend
- Node.js
- Express.js (v5.1.0)
- MongoDB/Mongoose (v8.14.2)
- JWT for authentication

### Database
- MongoDB Atlas

## Project Structure

```bash
/
├── frontend/                # React frontend application
│   ├── public/              # Public assets
│   ├── src/                 # Source files
│   │   ├── apis/            # API integration
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   └── utils/           # Utility functions
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Node.js backend server
│   ├── src/                 # Source files
│   │   ├── controllers/     # Request handlers
│   │   ├── database/        # Database connection
│   │   └── schema/          # Mongoose schemas
│   ├── index.js             # Main server file
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation

```
## Features

- User authentication (signup/login)
- Create and edit posts with rich text formatting
- View posts by author
- View individual post details
- Delete posts
- Responsive design for mobile and desktop

## How to Run the Project

### Backend Setup

1. Navigate to the backend directory:
bash
cd backend


2. Install dependencies:
bash
npm install


3. Start the backend server:
bash
npm run dev


The server will start on port 8080 (http://localhost:8080)

### Frontend Setup

1. Navigate to the frontend directory:
bash
cd frontend


2. Install dependencies:
bash
npm install


3. Start the frontend development server:
bash
npm start


The frontend application will start on port 3000 (http://localhost:3000)

## MongoDB Setup

The application uses MongoDB Atlas. The connection string is already configured in the backend code with the following URI:


mongodb+srv://prelisadahalbiz:YNRs2fRa2QH2bW76@mind-bridge.ksdpzu3.mongodb.net/mind-bridge


Note: In a production environment, the MongoDB URI should be stored in an environment variable rather than directly in the code.

## API Endpoints

### Authentication
- POST /createAccount - Create a new user account
- POST /login - Log in an existing user

### Posts
- POST /createPost - Create a new post
- GET /getAllPosts/:authorEmail - Get all posts for a specific user
- GET /getPost/:postId - Get a specific post by ID
- PUT /updatePost - Update an existing post
- DELETE /deletePost/:id - Delete a post

## Sample Test User

You can create your own user with the signup form or use:


Email: test@mindbridge.com
Password: password123


## Project Screenshots

![Login Screen](https://example.com/screenshots/login.png)
![Signup Screen](https://example.com/screenshots/signup.png)
![Dashboard](https://example.com/screenshots/dashboard.png)
![Post Editor](https://example.com/screenshots/editor.png)

## Database Collections

### Users Collection
Stores user information and login credentials.
- Fields: name, email, password, description, country, joinedData

### Posts Collection
Stores blog posts and their content.
- Fields: title, thumbnailUrl, subTitle, body, keywords, authorEmail, authorName, createdTime

## Security Features

- JWT token authentication
- Password protection
- Session management
- Protected routes

## Future Improvements

1. Add image upload functionality for post thumbnails
2. Implement comment system for posts
3. Add social sharing features
4. Create a better search functionality
5. Implement categories and tags for better content organization
6. Add user profile customization
7. Implement analytics for post views and engagement

## Contributors

- Prelisa Dahal
- Snehal Mule