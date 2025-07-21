🔐 AuthApp – JWT Authentication with Cookies
A simple Node.js backend app that handles User Authentication and Authorization using:

JWT tokens

HttpOnly Cookies

Password hashing with Bcrypt

Retry logic for robust password hashing

🚀 Features
✅ User Signup with secure password hashing (3 retry attempts)

✅ User Login with JWT token creation

✅ Stores token in HttpOnly cookies

✅ Prevents storing plaintext passwords

✅ Clean error handling and role-based JWT payload

🛠️ Tech Stack
Node.js

Express.js

MongoDB + Mongoose

Bcrypt for hashing

jsonwebtoken for JWT

dotenv for environment variables

📂 Project Structure
/controllers
    auth.js        ← main auth logic (signup/login)
/models
    userModel.js   ← Mongoose schema for users
/routes
    authRoutes.js  ← Routes for signup/login

.env              ← Secrets (JWT key, DB URI)
.gitignore        ← Ignores node_modules and .env
server.js         ← Entry point
🔐 Environment Variables
Create a .env file:
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongo_connection_string
PORT=4000

📮 API Endpoints
POST /signup
Registers a new user.

Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}

POST /login
Logs in an existing user and returns a JWT token via cookie.

Body:

{
  "email": "john@example.com",
  "password": "123456"
}
🍪 Cookie Details
token is stored as a HttpOnly cookie

Expires in 3 days

JWT expires in 2 hours

🧪 Run Locally

git clone https://github.com/your-username/AuthApp.git
cd AuthApp
npm install
node server.js

🛡️ Security Notes

Passwords are hashed using bcrypt with retry logic.

JWT token is signed with a secret and includes email, id, and role.

Cookies are httpOnly to prevent client-side access.

✍️ Author
Devansh Dobhal