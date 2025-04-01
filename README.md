# Perfume Shop Project

A full-stack web application for a perfume shop with a React frontend and Node.js/Express backend.

## Project Structure

- `client`: React frontend
- `server`: Express backend

## Setup Instructions

### Backend (Server)

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure MongoDB:
   - Option 1: Install MongoDB locally from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Option 2: Create a free MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
     - Create a new cluster
     - Create a database user
     - Get your connection string
     - Update the MONGO_URI in the .env file

4. Run the backend development server:
   ```
   npm run dev
   ```

5. Seed the database with sample data:
   ```
   npm run data:import
   ```

### Frontend (Client)

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the frontend development server:
   ```
   npm start
   ```

## Default Users

After running the data import script, you can log in with these accounts:

- Admin User:
  - Email: admin@example.com
  - Password: 123456

- Regular User:
  - Email: john@example.com
  - Password: 123456

## API Endpoints

### Perfumes
- GET /api/perfumes - Get all perfumes
- GET /api/perfumes/:id - Get single perfume
- POST /api/perfumes - Create a perfume (Admin only)
- PUT /api/perfumes/:id - Update a perfume (Admin only)
- DELETE /api/perfumes/:id - Delete a perfume (Admin only)
- GET /api/perfumes/top - Get top rated perfumes
- POST /api/perfumes/:id/reviews - Create a review for a perfume

### Users
- POST /api/users - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile (Protected)
- PUT /api/users/profile - Update user profile (Protected)
- GET /api/users - Get all users (Admin only)
- DELETE /api/users/:id - Delete a user (Admin only)
- GET /api/users/:id - Get a user by ID (Admin only)
- PUT /api/users/:id - Update a user (Admin only) 