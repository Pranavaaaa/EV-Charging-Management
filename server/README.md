# Backend API Documentation

A RESTful API for user authentication and management built with Node.js, Express, and MongoDB.

## 🚀 Features

- User registration and authentication
- JWT based authentication
- Password hashing
- Token blacklisting for logout
- Input validation
- Error handling

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt
- express-validator

## 🔧 Installation & Setup

1. Clone the repository
```bash
git clone <repository-url>
cd server
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```env
PORT = 4000
DB_CONNECT = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
```

4. Start the server
```bash
npm start
```

## 📚 API Endpoints

### Authentication

#### Register User
```http
POST /users/register
```

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User Created Successfully",
  "token": "string",
  "user": {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

#### Login User
```http
POST /users/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "email": "string",
    "_id": "string"
  }
}
```

#### Get User Profile
```http
GET /users/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "_id": "string"
}
```

#### Logout User
```http
POST /users/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logged Out"
}
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

## ⚠️ Error Responses

**400 Bad Request**
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**401 Unauthorized**
```json
{
  "message": "Unauthorized"
}
```

**409 Conflict**
```json
{
  "message": "User already exists"
}
```

## 📝 Input Validation

- Email must be valid
- Password must be at least 6 characters long
- First name must be at least 2 characters long

## 🛡️ Security Features

- Password hashing using bcrypt
- JWT token expiration
- Token blacklisting for logout
- CORS enabled
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
