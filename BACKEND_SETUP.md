# Crypto App - Full Stack Integration

A complete full-stack cryptocurrency platform with JWT authentication, MongoDB database, and React frontend.

## Features

### Authentication System (JWT-Based)
- **Register**: Create a new user account with name, email, and password
- **Login**: Authenticate users and receive JWT token
- **Protected Routes**: Secure pages that require authentication
- **Token Storage**: JWT tokens stored securely in localStorage

### User Profile
- **Dashboard**: Protected user profile page displaying user information
- **Logout**: Secure logout with token removal

### Cryptocurrency Management
- **All Cryptos**: View all available cryptocurrencies
- **Top Gainers**: View cryptocurrencies with highest 24h percentage gain
- **New Listings**: View recently added cryptocurrencies
- **Add Crypto**: Add new cryptocurrencies (requires authentication)

## Project Structure

```
.
├── frontend/          # React Vite application
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── lib/            # API utilities
│   │   └── hooks/          # Custom React hooks
│   └── package.json
│
└── backend/           # Node.js Express API
    ├── models/        # MongoDB schemas
    ├── routes/        # API routes
    ├── controllers/   # Request handlers
    ├── middleware/    # Auth & other middleware
    ├── server.js      # Express server
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or pnpm
- MongoDB (local or cloud)

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
# Edit .env and set:
# - MONGODB_URI: your MongoDB connection string
# - JWT_SECRET: your JWT secret key

# Start the backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd .. # Go back to project root

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/profile` - Get user profile (protected)

### Cryptocurrencies
- `GET /api/crypto` - Get all cryptocurrencies
- `GET /api/crypto/gainers` - Get top 10 gainers
- `GET /api/crypto/new` - Get new listings
- `POST /api/crypto` - Add new cryptocurrency

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Cryptocurrency Model
```javascript
{
  name: String (required),
  symbol: String (required, uppercase, unique),
  price: Number (required),
  image: String (optional),
  change24h: Number (required),
  isNew: Boolean (default: false),
  createdAt: Date
}
```

## Key Features Implemented

### Frontend
✅ Sign up with name, email, password
✅ Sign in with email and password
✅ Protected profile page
✅ Crypto list display
✅ Top gainers page
✅ New listings page
✅ Add crypto form
✅ JWT token management
✅ Error handling
✅ Loading states

### Backend
✅ JWT authentication
✅ Password hashing with bcryptjs
✅ MongoDB integration
✅ RESTful API design
✅ Input validation
✅ Error handling
✅ CORS configuration

## Testing the Application

### Register a New Account
1. Navigate to `/signup`
2. Fill in name, email, and password
3. Submit the form
4. You'll be redirected to home on success

### Login
1. Navigate to `/signin`
2. Enter your email and password
3. Submit the form
4. You'll be redirected to home on success

### View Profile
1. After logging in, navigate to `/profile`
2. View your account information

### Browse Cryptocurrencies
1. Visit `/crypto` to see all cryptocurrencies
2. Visit `/crypto/gainers` for top gainers
3. Visit `/crypto/new` for new listings

### Add New Cryptocurrency
1. Login first
2. Navigate to `/crypto/add`
3. Fill in the form and submit
4. New crypto will be added to the database

## Important Notes

### Environment Variables
- **Backend .env file must include:**
  ```
  MONGODB_URI=mongodb://localhost:27017/crypto-app
  JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
  JWT_EXPIRE=7d
  PORT=5000
  NODE_ENV=development
  ```

### CORS
The backend is configured to accept requests from:
- `http://localhost:5173` (frontend)
- `http://localhost:3000` (alternative)

Update these in `backend/server.js` if needed.

### Deployment Recommendations
- Use environment variables for sensitive data
- Change JWT_SECRET in production
- Use a hosted MongoDB service (MongoDB Atlas)
- Add rate limiting
- Implement refresh tokens
- Add email verification
- Use HTTPS in production

## Troubleshooting

### Backend connection issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify port 5000 is available

### Frontend API errors
- Verify backend is running on port 5000
- Check browser console for error details
- Ensure JWT token is being sent in requests

### Token expiration
- Tokens expire after 7 days (configurable)
- User needs to login again after expiration

## Future Enhancements
- Email verification for new accounts
- Refresh token mechanism
- Password reset functionality
- User profile updates
- Multi-currency support
- Real-time crypto price updates
- Trading functionality
- Transaction history
- Portfolio tracking
