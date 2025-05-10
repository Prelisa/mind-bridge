# MindBridge API Documentation

This document provides detailed information about the API endpoints available in the MindBridge application.

## Base URL

```
http://localhost:8080
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

The JWT token is obtained upon login or account creation.

## API Endpoints

### Authentication

#### Create Account

Creates a new user account.

- **URL**: `/createAccount`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "description": "Content creator and tech enthusiast"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": true,
      "result": {
        "newUserObject": {
          "name": "John Doe",
          "email": "john@example.com",
          "password": "securepassword",
          "description": "Content creator and tech enthusiast",
          "joinedData": 1714499200000
        },
        "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "status": false,
      "message": "Error message"
    }
    ```

#### Login

Authenticates a user and returns a JWT token.

- **URL**: `/login`
- **Method**: `POST`
- **Auth required**: No
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": true,
      "result": {
        "user": {
          "name": "John Doe",
          "email": "john@example.com",
          "description": "Content creator and tech enthusiast",
          "country": null,
          "iat": 1714499200000,
          "exp": 1714502800000
        },
        "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "status": false,
      "message": "User not found."
    }
    ```

### Posts

#### Create Post

Creates a new blog post.

- **URL**: `/createPost`
- **Method**: `POST`
- **Auth required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "title": "My First Post",
    "thumbnailUrl": "https://example.com/image.jpg",
    "subTitle": "An introduction to my blog",
    "body": "<p>This is the content of my post...</p>",
    "keywords": "blog,intro,technology",
    "authorEmail": "john@example.com",
    "authorName": "John Doe"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": true,
      "result": {
        "newPostObject": {
          "title": "My First Post",
          "thumbnailUrl": "https://example.com/image.jpg",
          "subTitle": "An introduction to my blog",
          "body": "<p>This is the content of my post...</p>",
          "keywords": ["blog", "intro", "technology"],
          "authorEmail": "john@example.com",
          "authorName": "John Doe",
          "createdTime": 1714499200000
        }
      }
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "status": false,
      "message": "Authentication failed!"
    }
    ```

#### Get All Posts for User

Retrieves all posts for a specific user.

- **URL**: `/getAllPosts/:authorEmail`
- **Method**: `GET`
- **Auth required**: No
- **URL Parameters**: `authorEmail=[string]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": true,
      "result": [
        {
          "_id": "60d21b4967d0d8992e610c85",
          "title": "My First Post",
          "thumbnailUrl": "https://example.com/image.jpg",
          "subTitle": "An introduction to my blog",
          "body": "<p>This is the content of my post...</p>",
          "keywords": ["blog", "intro", "technology"],
          "authorEmail": "john@example.com",
          "authorName": "John Doe",
          "createdTime": 1714499200000
        },
        {
          "_id": "60d21b4967d0d8992e610c86",
          "title": "My Second Post",
          "thumbnailUrl": "https://example.com/image2.jpg",
          "subTitle": "More insights",
          "body": "<p>This is the content of my second post...</p>",
          "keywords": ["insights", "technology"],
          "authorEmail": "john@example.com",
          "authorName": "John Doe",
          "createdTime": 1714585600000
        }
      ]
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "status": false,
      "message": "Error message"
    }
    ```

#### Get Single Post

Retrieves a specific post by ID.

- **URL**: `/getPost/:postId`
- **Method**: `GET`
- **Auth required**: No
- **URL Parameters**: `postId=[string]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": true,
      "result": {
        "_id": "60d21b4967d0d8992e610c85",
        "title": "My First Post",
        "thumbnailUrl": "https://example.com/image.jpg",
        "subTitle": "An introduction to my blog",
        "body": "<p>This is the content of my post...</p>",
        "keywords": ["blog", "intro", "technology"],
        "authorEmail": "john@example.com",
        "authorName": "John Doe",
        "createdTime": 1714499200000
      }
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "status": false,
      "message": "Error message"
    }
    ```

#### Update Post

Updates an existing post.

- **URL**: `/updatePost`
- **Method**: `PUT`
- **Auth required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Request Body**:
  ```json
  {
    "id": "60d21b4967d0d8992e610c85",
    "title": "Updated Post Title",
    "thumbnailUrl": "https://example.com/updated-image.jpg",
    "subTitle": "Updated subtitle",
    "body": "<p>Updated content...</p>",
    "keywords": "updated,blog,technology",
    "authorEmail": "john@example.com",
    "authorName": "John Doe"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": true,
      "result": {
        "updatePostObject": {
          "id": "60d21b4967d0d8992e610c85",
          "title": "Updated Post Title",
          "thumbnailUrl": "https://example.com/updated-image.jpg",
          "subTitle": "Updated subtitle",
          "body": "<p>Updated content...</p>",
          "keywords": ["updated", "blog", "technology"],
          "authorEmail": "john@example.com",
          "authorName": "John Doe",
          "createdTime": 1714499200000
        }
      }
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "status": false,
      "message": "Authentication failed!"
    }
    ```

#### Delete Post

Deletes a post.

- **URL**: `/deletePost/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **Headers**:
  ```
  Authorization: Bearer <jwt_token>
  authoremail: john@example.com
  authorname: John Doe
  ```
- **URL Parameters**: `id=[string]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "status": true,
      "result": true
    }
    ```
- **Error Response**:
  - **Code**: 500
  - **Content**:
    ```json
    {
      "status": false,
      "message": "Authentication failed!"
    }
    ```

## Testing with Postman

1. Import the Postman collection file: `MindBridge_API_Collection.json`
2. Set up environment variables:
   - `base_url`: `http://localhost:8080`
   - `jwt_token`: (This will be automatically set after login)

3. Test Flow:
   - Create Account
   - Login
   - Create Post
   - Get All Posts
   - Get Single Post
   - Update Post
   - Delete Post

## Notes

- The JWT token has a 1-hour expiration time.
- Authentication failures may occur if:
  - The JWT token has expired
  - The user in the token doesn't match the author information
  - The token is invalid or missing
- Keywords should be comma-separated in the request and will be stored as an array in the database.