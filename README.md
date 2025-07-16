# Todo App

!-- Add a screenshot if available -->

A modern Todo application built with a Node.js/Express backend and React frontend, featuring state management with Zustand and styled with Shadcn UI components.

## Features

- ✅ Create, read, update, and delete todos
- 📱 Responsive design
- 🚀 Instant UI updates
- 🔄 Real-time synchronization
- 🎨 Beautiful UI with Shadcn components
- 🏗️ Robust state management with Zustand

## Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **UI Library**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (or MongoDB Atlas connection string)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure frontend environment**
   Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```

3. **Open the application**
   Visit `http://localhost:5173` in your browser

## Project Structure

```
todo-app/
├── backend/               # Backend server code
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── app.ts             # Express app configuration
│   └── server.ts          # Server entry point
│
├── frontend/              # Frontend React app
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # App entry point
│   └── vite.config.ts     # Vite configuration
│
├── .gitignore
└── README.md
```

## Available Scripts

### Backend
- `npm run dev`: Start development server with nodemon


### Frontend
- `npm run dev`: Start Vite development server



## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

