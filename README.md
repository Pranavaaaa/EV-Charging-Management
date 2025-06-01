# EVConnect: EV Charging Station Management System

## 🔋 Project Overview
A full-stack web application for managing EV charging stations. The system allows users to register, manage their charging stations, and view station locations on an interactive map. Built with Vue.js frontend and Node.js/Express backend, featuring real-time updates and secure authentication.

## ⚡ Key Features
- **User Authentication & Authorization**
  - Secure registration and login system
  - JWT-based authentication
  - Password encryption with bcrypt
  - Token blacklisting for secure logout

- **Charging Station Management**
  - CRUD operations for charging stations
  - Interactive map view with station markers
  - Real-time status updates
  - Detailed station information display

- **Advanced Filtering & Search**
  - Filter by station status
  - Filter by connector type
  - Power output range filtering
  - Location-based search

- **Responsive Design**
  - Mobile-first approach
  - Consistent styling across devices
  - Intuitive user interface
  - Smooth animations and transitions

## 🎯 Focus Areas
- **Security**
  - JWT authentication
  - Input validation
  - Password hashing
  - Protected routes

- **User Experience**
  - Interactive map interface
  - Real-time feedback
  - Form validation
  - Loading states
  - Error handling

- **Code Quality**
  - Modular architecture
  - Component reusability
  - Clean code practices
  - Consistent styling

## 🛠️ Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- Vue Router
- Leaflet.js (for maps)
- Fetch API
- CSS3 with custom styling

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- express-validator

## 📁 Folder Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── composables/
│   │   ├── router/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── views/
│   │   ├── App.vue
│   │   └── main.js
│   │
|   ├── index.html
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── db/
│   └── index.js
│
├── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Project Setup
1. Install all project dependencies:
```bash
npm run installModules
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Create .env file:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the server:
```bash
npm start
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Create .env file:
```env
VITE_API_BASE_URL=http://localhost:4000
```

4. Start development server:
```bash
npm run dev
```

## 📱 Application Features

### User Management
- User registration with email verification
- Secure login/logout
- Password recovery (planned)
- User profile management (planned)

### Station Management
- Add new charging stations
- Edit existing stations
- Delete stations
- View station details
- Interactive map view
- Status updates
- Filter and search functionality

## 🔄 API Documentation

### Postman Collection
You can access and test all API endpoints using our Postman collection:
[View Postman Collection](https://warped-crescent-587708.postman.co/workspace/My-Workspace~167b84d8-a9cf-4bb4-8ef7-7b2699f64f36/collection/37813113-41a0eeba-6610-4120-beda-f7e80d9d2706?action=share&creator=37813113)

### Authentication Routes
```http
POST /users/register - Register new user
POST /users/login - User login
GET /users/logout - User logout
```

### Station Routes
```http
GET /ev/stations - Get all stations
POST /ev/stations - Create new station
PUT /ev/stations/:id - Update station
DELETE /ev/stations/:id - Delete station
```

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements
- User profile management
- Station booking system
- Payment integration
- Real-time station availability
- Mobile app development
- Advanced analytics dashboard
- Multi-language support

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Authors
- Your Name - Initial work

## 🙏 Acknowledgments
- Vue.js team for the excellent framework
- OpenStreetMap for map data
- All contributors who helped with the project
