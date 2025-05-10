# MindBridge Database Documentation

## Database Overview

MindBridge uses MongoDB as its database. The application connects to MongoDB Atlas, a cloud-based MongoDB service. The database contains two main collections: `users` and `posts`.

## Connection Details

The MongoDB connection string is defined in the `backend/index.js` file:

```javascript
const MONGO_URI = "mongodb+srv://prelisadahalbiz:YNRs2fRa2QH2bW76@mind-bridge.ksdpzu3.mongodb.net/mind-bridge";
```

The connection is established using Mongoose in the `backend/src/database/mongodb.js` file:

```javascript
import { connect } from "mongoose";

export async function connectMongoDB(uri) {
  try {
    console.log("Connecting to MongoDB cluster...");
    await connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    throw new Error(error);
  }
}
```

## Schema Definitions

### User Schema

The User schema is defined in `backend/src/schema/user.js`:

```javascript
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String },
    country: { type: String },
    joinedData: { type: Number, required: true }, // timestamp in milliseconds
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
```

#### Fields:
- **name**: User's full name (required)
- **email**: User's email address (required, unique)
- **password**: User's password (required, stored as plain text in the current implementation)
- **description**: User's profile description (optional)
- **country**: User's country (optional)
- **joinedData**: Timestamp when the user joined (required)
- **createdAt**: Automatic timestamp of record creation
- **updatedAt**: Automatic timestamp of record update

### Post Schema

The Post schema is defined in `backend/src/schema/post.js`:

```javascript
import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    subTitle: { type: String, required: true },
    body: { type: String, required: true },
    keywords: { type: [String], default: [] },
    authorEmail: { type: String, required: true },
    authorName: { type: String, required: true },
    createdTime: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const PostModel = mongoose.model("posts", PostSchema);
export default PostModel;
```

#### Fields:
- **title**: Post title (required)
- **thumbnailUrl**: URL to the post thumbnail image (required)
- **subTitle**: Post subtitle or brief description (required)
- **body**: Main content of the post, stored as HTML (required)
- **keywords**: Array of keywords/tags for the post (default empty array)
- **authorEmail**: Email of the post author (required)
- **authorName**: Name of the post author (required)
- **createdTime**: Timestamp when the post was created (required)
- **createdAt**: Automatic timestamp of record creation
- **updatedAt**: Automatic timestamp of record update

## Database Operations

The application performs various operations on these collections through mongoose models:

### User Operations
- **Create User**: Insert a new user document
- **Find User**: Find a user by email and password for authentication

### Post Operations
- **Create Post**: Insert a new post document
- **Get All Posts**: Retrieve all posts for a specific user
- **Get Single Post**: Retrieve a specific post by ID
- **Update Post**: Update an existing post
- **Delete Post**: Remove a post from the database

## Sample Documents

### Sample User Document
```json
{
  "_id": "60d21b4967d0d8992e610c85",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "description": "Content creator and tech enthusiast",
  "country": null,
  "joinedData": 1714499200000,
  "createdAt": "2025-05-01T12:00:00.000Z",
  "updatedAt": "2025-05-01T12:00:00.000Z"
}
```

### Sample Post Document
```json
{
  "_id": "60d21b4967d0d8992e610c85",
  "title": "My First Post",
  "thumbnailUrl": "https://example.com/image.jpg",
  "subTitle": "An introduction to my blog",
  "body": "<p>This is the content of my post...</p>",
  "keywords": ["blog", "intro", "technology"],
  "authorEmail": "john@example.com",
  "authorName": "John Doe",
  "createdTime": 1714499200000,
  "createdAt": "2025-05-01T12:00:00.000Z",
  "updatedAt": "2025-05-01T12:00:00.000Z"
}
```

## Database Seed Script

To set up the database with initial data, you can use the following MongoDB shell commands:

```javascript
// Connect to your MongoDB Atlas instance
// Replace the connection string with your actual connection string
// mongo "mongodb+srv://prelisadahalbiz:YNRs2fRa2QH2bW76@mind-bridge.ksdpzu3.mongodb.net/mind-bridge"

// Create a test user
db.users.insertOne({
  name: "Test User",
  email: "test@mindbridge.com",
  password: "password123",
  description: "This is a test user account for MindBridge",
  country: "USA",
  joinedData: new Date().getTime(),
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create some sample posts
db.posts.insertMany([
  {
    title: "Welcome to MindBridge",
    thumbnailUrl: "https://example.com/welcome.jpg",
    subTitle: "A brief introduction to our platform",
    body: "<p>Welcome to MindBridge! This platform allows you to share your thoughts and ideas with the world.</p>",
    keywords: ["welcome", "introduction", "mindbridge"],
    authorEmail: "test@mindbridge.com",
    authorName: "Test User",
    createdTime: new Date().getTime(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "How to Create Great Content",
    thumbnailUrl: "https://example.com/content.jpg",
    subTitle: "Tips for creating engaging blog posts",
    body: "<p>Creating great content starts with understanding your audience. Here are some tips...</p>",
    keywords: ["content", "writing", "tips"],
    authorEmail: "test@mindbridge.com",
    authorName: "Test User",
    createdTime: new Date().getTime(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
```

## Security Considerations

1. **Password Storage**: Currently, passwords are stored as plain text in the database. In a production environment, passwords should be hashed using a strong algorithm like bcrypt.

2. **Connection String**: The MongoDB connection string, including credentials, is hardcoded in the backend code. For better security, this should be moved to an environment variable.

3. **JWT Secret**: The JWT secret ("prelisaSecretCode") is hardcoded in the authentication controllers. This should also be moved to an environment variable.

4. **Input Validation**: Implement additional validation on database inputs to prevent injection attacks.

## Database Backup and Restore

To backup your MongoDB database:

```bash
mongodump --uri="mongodb+srv://prelisadahalbiz:YNRs2fRa2QH2bW76@mind-bridge.ksdpzu3.mongodb.net/mind-bridge" --out=./backup
```

To restore your MongoDB database:

```bash
mongorestore --uri="mongodb+srv://prelisadahalbiz:YNRs2fRa2QH2bW76@mind-bridge.ksdpzu3.mongodb.net/mind-bridge" ./backup
```

## Indexes

For better performance, consider adding the following indexes to your collections:

```javascript
// Index for user email lookups
db.users.createIndex({ email: 1 }, { unique: true });

// Index for fetching posts by author
db.posts.createIndex({ authorEmail: 1 });

// Index for post creation time (for sorting)
db.posts.createIndex({ createdTime: -1 });
```

These indexes will improve the performance of the most common queries in the application.