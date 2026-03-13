# Campus Guardian AI

Campus Guardian AI is a Smart Student Well-being & Campus Intelligence Platform using the MERN Stack.

## Features
- Role-based Dashboards (Student, Counselor, Admin)
- AI Risk Prediction Engine (Dropout, Burnout, Stress, Suicide risk)
- Real-time Alert System (Socket.io)
- Smart Campus Resource Management (occupancy, energy usage tracking)
- Integrated AI Wellness Chatbot
- Secure Authentication with JWT & Role-Based Access Control

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI (Atlas or Local)

### 1. Backend Setup

1. Navigate to `backend` directory.
   ```bash
   cd backend
   ```
2. Install Dependencies.
   ```bash
   npm install
   ```
3. Update environment variables. Create or edit the `.env` file in the `backend/` directory with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=supersecret123
   ```
4. Start the server.
   ```bash
   npm start
   # or
   node server.js
   ```

### 2. Frontend Setup

1. Navigate to `frontend` directory.
   ```bash
   cd frontend
   ```
2. Install Dependencies.
   ```bash
   npm install
   ```
3. Start the Vite React app.
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173`. 
    *(Note: Ensure the backend is running at http://localhost:5000 so the frontend can reach the API).*

### Default Roles during registration
- You can register as `Admin`, `Counselor`, or `Student` by selecting the option in the registration dropdown.
- Once registered, you will be automatically routed to the respective dashboard.

## Deployment Notes

- **Frontend (Vercel)**: Simply connect your repository to Vercel and set building directory to `frontend`. Vite will handle the static build automatically.
- **Backend (Render / Railway)**: Set the root directory to `backend`. Make sure all environment variables (`MONGO_URI`, `PORT`, `JWT_SECRET`) are correctly defined in your hosting provider's dashboard.
- **Database (MongoDB Atlas)**: Set up Network Access to allow IPs (e.g. `0.0.0.0/0` for Render) or utilize VPC peering.

## Module Implementations Completed
1. Authentication (JWT / bcrypt / Roles)
2. Student Well-being DB models
3. AI Risk Prediction Logic (in `backend/ai/predictionEngine.js`)
4. Early Intervention Alerts (+ Socket.io real-time)
5. AI Wellness Chatbot
6. Smart Campus Resource Models & Dashboard Panel
7. Admin Dashboard containing Recharts visuals.
8. Student & Counselor Dashboards integrated with Backend APIs.
