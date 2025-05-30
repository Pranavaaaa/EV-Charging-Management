# EV Charging Station API

A RESTful API for managing EV charging stations built with Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication and authorization
- CRUD operations for charging stations
- Filtering stations by status and connector type
- User-specific station management
- JWT based authentication
- Input validation

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
PORT=4001
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
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
Content-Type: application/json

{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Logout
```http
GET /users/logout
Authorization: Bearer <token>
```

### Charging Stations

#### Create Station
```http
POST /ev/stations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "latitude": number,
  "longitude": number,
  "powerOutput": number,
  "connectorType": "Type 1" | "Type 2" | "CCS" | "CHAdeMO" | "Other",
  "status": "Active" | "Inactive"
}
```

#### Get User's Stations
```http
GET /ev/stations
Authorization: Bearer <token>
```

Query Parameters:
- `status`: Filter by status ("Active" or "Inactive")
- `connectorType`: Filter by connector type

#### Update Station
```http
PUT /ev/stations/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "status": "Active" | "Inactive",
  // other updatable fields
}
```

#### Delete Station
```http
DELETE /ev/stations/:id
Authorization: Bearer <token>
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
      "msg": "Invalid input",
      "param": "field_name",
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

**403 Forbidden**
```json
{
  "success": false,
  "message": "Not authorized to update this station"
}
```

## 📝 Input Validation

### Charging Station Validation
- Name: Required
- Latitude: Required, must be a valid float
- Longitude: Required, must be a valid float
- Power Output: Required, must be a valid float
- Connector Type: Must be one of: ["Type 1", "Type 2", "CCS", "CHAdeMO", "Other"]

## 📦 Directory Structure
```
server/
├── controllers/
│   ├── user.controller.js
│   └── evController.js
├── models/
│   ├── user.model.js
│   ├── chargingStationSchema.js
│   └── blackListedTokens.js
├── routes/
│   ├── user.routes.js
│   └── EvRoutes.js
├── middlewares/
│   └── auth.middleware.js
├── services/
│   └── evService.js
├── db/
│   └── db.js
├── .env
└── index.js
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
