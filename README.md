📦 Medical Equipment Loan System

This project is a web-based application designed to manage the lending and returning of medical equipment. It provides a simple and efficient interface for users to browse available equipment, borrow items, and track their personal loans.

🚀 Features
🔐 User authentication (Register & Login with JWT + session)
📋 View available equipment and quantities
➕ Add quantity to existing equipment
📥 Borrow equipment (with availability validation)
📤 Return borrowed equipment
📊 View personal loan history
🧾 Server-side rendering using EJS templates
🏗️ Architecture

The application follows a layered architecture:

1. Client (Web Layer)
Built with Express + EJS
Handles routing, sessions, and UI rendering
Communicates with the backend API using Axios
2. Backend API
Built with Node.js + Express
Implements business logic (loans, authentication, validation)
Uses JWT for secure endpoints
3. Database
MongoDB with Mongoose models:
Equipment – stores equipment details and quantities
Loan – tracks borrowing activity per user
🔄 Main Flow
User logs in and receives a JWT token
Token is stored in session
User browses equipment via /equipments
When borrowing:
Client sends request to API with JWT
API validates availability
Loan is created and quantity is updated
User can view loans and return equipment
🛠️ Technologies Used
Node.js
Express.js
MongoDB + Mongoose
EJS (Embedded JavaScript Templates)
Axios
JWT Authentication
Express Session
📁 Project Structure (Simplified)
/routes        → Web routes (views & client logic)
/models        → Mongoose schemas
/controllers   → API logic
/views         → EJS templates
/middlewares   → Authentication & error handling
💡 Notes
The project separates UI logic from business logic using an API layer.
Server-side rendering is used instead of a frontend framework like React.
Designed as a practical full-stack exercise focusing on clean architecture and real-world workflows.
