## 🌱 Overview

**Vikraya** (Sanskrit for "sale") is a revolutionary blockchain-powered agricultural auction platform that bridges traditional farming with modern decentralized technology. Our platform addresses critical challenges in the agricultural supply chain by providing farmers direct access to buyers, eliminating intermediaries, and ensuring transparent, secure transactions.

### 🎯 Problem Statement

Traditional agricultural markets often disadvantage farmers through:
- **Middleman Dependencies**: Farmers rely on intermediaries who take significant margins
- **Price Transparency Issues**: Lack of real-time market information and price discovery
- **Payment Security**: Delayed or unreliable payments from buyers
- **Geographic Limitations**: Limited access to broader markets
- **Trust Deficits**: Lack of transparent, verifiable transaction records

### 💡 Our Solution

Vikraya leverages blockchain technology and modern web frameworks to create:
- **Direct Market Access**: Farmers can list crops directly to a global buyer network
- **Transparent Bidding**: Real-time, verifiable auction processes using Ethereum smart contracts
- **Secure Payments**: Blockchain-based escrow ensures guaranteed payments
- **Global Reach**: Web-based platform accessible from anywhere
- **Immutable Records**: All transactions recorded on blockchain for complete transparency

## ✨ Features

### 🔐 Authentication & User Management
- **Multi-Modal Authentication**: Secure sign-in/sign-up with email/password and Google OAuth
- **Protected Routes**: Middleware-based route protection for sensitive operations
- **Session Management**: HTTP-only cookie-based secure sessions with Firebase tokens
- **OTP Verification**: Email-based OTP for critical auction operations (pause, cancel, close)

### 🏛️ Auction Management
- **Create Auctions**: Farmers can list crops with images, descriptions, and minimum bids
- **Real-time Bidding**: Live auction system with automatic highest bid tracking
- **Auction Controls**: Pause, cancel, or close auctions with proper authorization
- **Status Tracking**: Real-time auction status updates (active, paused, closed, cancelled)

### 💰 Blockchain Integration
- **Ethereum Smart Contracts**: Deployed on Sepolia testnet for secure transactions
- **MetaMask Integration**: Direct wallet connection for bidding and payments
- **Transparent Bidding**: All bids recorded on blockchain for complete transparency
- **Automated Settlements**: Smart contract handles fund transfers upon auction completion

### 🎨 User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Real-time Updates**: Live auction data and bid information
- **Image Management**: Multi-image upload for crop listings
- **Intuitive Navigation**: Clean, modern interface built with Tailwind CSS and shadcn/ui
- **Toast Notifications**: Real-time feedback for all user actions

### 🔒 Security Features
- **Route Protection**: Middleware-based authentication for sensitive pages
- **Token Verification**: Server-side Firebase token validation
- **OTP Security**: Email verification for critical operations
- **Smart Contract Security**: Audited contract functions with proper access controls

## 🛠️ Tech Stack

### Frontend Technologies
- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Fonts**: Poppins from Google Fonts
- **Icons**: Lucide React icons
- **Animations**: Framer Motion for smooth transitions

### Backend & APIs
- **API Routes**: Next.js API routes for server-side logic
- **Authentication**: Firebase Auth with custom middleware
- **Database**: Firebase Firestore for auction and user data
- **Email Service**: Nodemailer for OTP delivery
- **Admin SDK**: Firebase Admin for server-side operations

### Blockchain & Web3
- **Blockchain Network**: Ethereum Sepolia Testnet
- **Smart Contract**: Solidity-based auction contract
- **Web3 Library**: ethers.js v6 for blockchain interactions
- **RPC Provider**: Infura WebSocket provider for real-time data
- **Wallet Integration**: MetaMask for user wallet connections

### Development Tools
- **Language**: TypeScript for type safety
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm with lockfile for reproducible builds
- **Build System**: Next.js built-in Webpack configuration

## 🏗️ System Architecture

### Application Structure
```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                     │
├─────────────────────────────────────────────────────────────┤
│  • React Components (UI/UX)                               │
│  • Authentication Context                                  │
│  • API Route Handlers                                     │
│  • Middleware (Route Protection)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Services                       │
├─────────────────────────────────────────────────────────────┤
│  • Authentication (JWT Tokens)                            │
│  • Firestore Database (Auction Data)                      │
│  • Admin SDK (Server-side Operations)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Ethereum Blockchain                        │
├─────────────────────────────────────────────────────────────┤
│  • Smart Contracts (Auction Logic)                        │
│  • Sepolia Testnet                                        │
│  • Infura RPC Provider                                    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **User Authentication**: Firebase handles login/registration with JWT tokens
2. **Route Protection**: Middleware validates tokens before accessing protected routes
3. **Auction Creation**: Data stored in Firestore, smart contract interaction via ethers.js
4. **Bidding Process**: Real-time updates through Firestore, blockchain transactions via MetaMask
5. **OTP Security**: Nodemailer sends verification codes for sensitive operations

### Key Components
- **AuthContext**: Global authentication state management
- **Middleware**: Route protection and token verification
- **API Routes**: Server-side logic for authentication and OTP
- **Smart Contract**: Deployed auction contract for transparent bidding
- **Firebase Integration**: Real-time database and authentication services

## 🚀 Getting Started

### Prerequisites

#### Software Requirements
- **Node.js**: Version 18.0 or higher ([Download](https://nodejs.org/))
- **Package Manager**: npm (comes with Node.js) or yarn
- **Git**: For repository cloning ([Download](https://git-scm.com/))

#### Blockchain Requirements
- **MetaMask**: Browser extension wallet ([Install](https://metamask.io/))
- **Sepolia ETH**: Testnet ETH for transactions ([Get from faucet](https://sepoliafaucet.com/))
- **Infura Account**: For Ethereum RPC access ([Sign up](https://infura.io/))

#### Service Accounts Needed
- **Firebase Project**: For authentication and database ([Console](https://console.firebase.google.com/))
- **Gmail Account**: For OTP email delivery (with App Password enabled)

#### MetaMask Network Setup
Add Sepolia Testnet to MetaMask:
- **Network Name**: Sepolia test network
- **RPC URL**: `https://sepolia.infura.io/v3/YOUR_INFURA_KEY`
- **Chain ID**: 11155111
- **Currency Symbol**: SepoliaETH
- **Block Explorer**: https://sepolia.etherscan.io

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vashishta-Mithra-Reddy/Vikraya.git
   cd Vikraya
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**:
   Create a `.env.local` file in the root directory:
   ```bash
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Firebase Admin SDK (for server-side operations)
   FIREBASE_ADMIN_KEY='{"type":"service_account","project_id":"your_project",...}'

   # Email Configuration (Gmail with App Password)
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_16_character_app_password

   # Ethereum Configuration
   INFURA_KEY=your_infura_project_key
   ```

4. **Firebase Setup**:
   - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password and Google providers
   - Create a Firestore database
   - Generate and download the service account key for Admin SDK

5. **Gmail App Password Setup**:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: Account Settings → Security → App passwords
   - Use the 16-character password in EMAIL_PASS

6. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Verification Steps
After setup, verify your installation:
1. ✅ Homepage loads without errors
2. ✅ Sign up/Sign in functionality works
3. ✅ MetaMask connection prompts appear for auction operations
4. ✅ OTP emails are received for protected operations

## 📱 Application Structure

### Directory Overview
```
vikraya/
├── 📁 app/                    # Next.js App Router
│   ├── 📄 layout.tsx          # Root layout with AuthProvider
│   ├── 📄 page.tsx            # Homepage with latest auctions
│   ├── 📄 loading.tsx         # Global loading component
│   ├── 📄 globals.css         # Global styles and Tailwind imports
│   ├── 📁 api/                # API route handlers
│   │   ├── 📁 auth/           # Authentication endpoints
│   │   ├── 📁 auctions/       # Auction-related endpoints
│   │   └── 📁 otp/            # OTP verification endpoints
│   ├── 📁 signin/             # Sign-in page
│   ├── 📁 signup/             # Registration page
│   ├── 📁 auctions/           # Public auction listings
│   │   └── 📁 [auction_id]/   # Individual auction details
│   ├── 📁 allauctions/        # Blockchain auction data
│   ├── 📁 create-auction/     # Protected: Create new auction
│   └── 📁 profile/            # Protected: User profile & management
├── 📁 components/             # Reusable React components
│   ├── 📄 AuctionCard.tsx     # Auction display component
│   ├── 📄 ImageUpload.tsx     # Image handling for auctions
│   ├── 📄 MakeBid.tsx         # Bidding interface component
│   ├── 📄 OtpHandler.tsx      # OTP verification modal
│   ├── 📄 ProtectedRoute.tsx  # Route protection wrapper
│   ├── 📁 shared/             # Shared layout components
│   │   ├── 📄 Header.tsx      # Navigation header
│   │   ├── 📄 Footer.tsx      # Site footer
│   │   └── 📄 NavItems.tsx    # Navigation menu items
│   └── 📁 ui/                 # shadcn/ui components
├── 📁 context/                # React Context providers
│   └── 📄 AuthContext.tsx     # Global authentication state
├── 📁 utils/                  # Utility functions
│   ├── 📄 firebase.ts         # Firebase client configuration
│   └── 📄 firebaseAdmin.ts    # Firebase Admin SDK
├── 📁 constants/              # Application constants
│   └── 📄 index.ts            # Contract ABI, addresses, nav links
├── 📁 types/                  # TypeScript type definitions
├── 📄 middleware.ts           # Route protection middleware
└── 📁 public/                 # Static assets
    └── 📁 logos/              # Brand assets and images
```

### Key Components Explained

#### Core Application Files
- **`layout.tsx`**: Root layout providing AuthProvider context to entire app
- **`middleware.ts`**: Protects sensitive routes by validating Firebase tokens
- **`AuthContext.tsx`**: Manages global authentication state using Firebase Auth

#### API Architecture
- **`/api/auth/`**: Handles token verification and session management
- **`/api/auctions/`**: Manages auction CRUD operations with Firestore
- **`/api/otp/`**: Email-based OTP generation and verification for security

#### Protected vs Public Routes
**Public Routes** (No authentication required):
- `/` - Homepage with latest auctions
- `/auctions` - Browse all public auctions
- `/signin` & `/signup` - Authentication pages

**Protected Routes** (Require authentication):
- `/create-auction` - Create new crop auctions
- `/profile` - User dashboard and auction management
- `/auctions/[id]` - Individual auction bidding (when bidding)

## 🔒 Authentication Flow

### Authentication Architecture
The application implements a multi-layered authentication system combining Firebase Auth with custom middleware for enhanced security.

#### Flow Diagram
```
User Request → Middleware Check → Firebase Token Validation → Route Access
     ↓              ↓                      ↓                    ↓
   Login Page ← Token Missing ←    Invalid Token    ←   Access Denied
     ↓              
 Firebase Auth → Token Cookie → Protected Route Access
```

### Authentication Process

1. **Initial Sign-in**:
   - User provides credentials (email/password or Google OAuth)
   - Firebase validates credentials and returns JWT token
   - Client receives token and stores as HTTP-only cookie

2. **Route Protection**:
   - Middleware (`middleware.ts`) intercepts requests to protected routes
   - Extracts Firebase token from cookies
   - Validates token via `/api/auth/verify-token` endpoint
   - Redirects to sign-in if invalid, otherwise grants access

3. **Session Management**:
   - Tokens stored as secure HTTP-only cookies
   - AuthContext manages client-side authentication state
   - Automatic token refresh handled by Firebase SDK

4. **OTP Security Layer**:
   - Critical operations (pause/cancel/close auctions) require email OTP
   - OTP generated server-side and sent via Nodemailer
   - Additional verification step prevents unauthorized actions

### Security Features
- **HTTP-only Cookies**: Prevents XSS token theft
- **Server-side Validation**: Tokens verified on server before route access
- **Automatic Redirects**: Seamless redirect to login with return path preservation
- **Session Persistence**: Maintains authentication across browser sessions

## 🌐 Smart Contract Integration

### Contract Details
The application interacts with a deployed Ethereum smart contract on Sepolia testnet for secure, transparent auction operations.

**Contract Address**: [`0x8C44598b53C5CafC5fa437Ee360aA6BF6C70F3ee`](https://sepolia.etherscan.io/address/0x8C44598b53C5CafC5fa437Ee360aA6BF6C70F3ee)

### Core Contract Functions

#### Auction Management
```solidity
// Create a new auction
function createAuction(string _cropName, uint256 _minBid, uint256 _duration) public

// Pause an active auction (farmer only)
function pauseAuction(uint256 _id) public

// Cancel an auction (farmer only)  
function cancelAuction(uint256 _id) public

// Close auction and transfer funds (farmer only)
function closeAuction(uint256 _id) public
```

#### Bidding Operations
```solidity
// Place a bid on an auction
function placeBid(uint256 _id) public payable

// View auction details
function auctions(uint256) public view returns (
    uint256 id,
    address payable farmer,
    string cropName,
    uint256 minBid,
    uint256 highestBid,
    address highestBidder,
    uint256 endTime,
    bool closed,
    bool cancelled,
    bool paused
)

// Get total auction count
function auctionCounter() public view returns (uint256)
```

### Integration Architecture

#### Frontend → Blockchain Flow
1. **ethers.js Connection**: WebSocket provider via Infura for real-time data
2. **MetaMask Integration**: User wallet connection for transaction signing
3. **Contract Interaction**: Type-safe contract calls using generated ABI
4. **State Synchronization**: Blockchain state synced with Firestore database

#### Data Synchronization
```
Smart Contract (Source of Truth)
         ↓
   Infura WebSocket
         ↓
   Frontend Updates
         ↓
   Firestore Sync (for UI performance)
```

### Security Considerations
- **Farmer-only Operations**: Contract validates auction ownership for sensitive operations
- **Bid Validation**: Minimum bid requirements enforced at contract level
- **Automatic Escrow**: Funds held securely in contract until auction completion
- **Time-locked Auctions**: End times immutably set to prevent manipulation

### Gas Optimization
- **Batch Operations**: Multiple auction queries in single RPC call
- **Event Filtering**: Efficient event listening for real-time updates
- **Minimal State Changes**: Only essential data stored on-chain

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/setToken`
Sets Firebase authentication token as HTTP-only cookie.
```typescript
// Request Body
{
  "token": "firebase_jwt_token"
}

// Response
{
  "success": true
}
```

#### POST `/api/auth/verify-token`
Validates Firebase token for route protection.
```typescript
// Request Body
{
  "token": "firebase_jwt_token"
}

// Response (Success)
{
  "valid": true,
  "uid": "user_id"
}
```

### OTP Endpoints

#### POST `/api/otp/send`
Generates and sends OTP via email for secure operations.
```typescript
// Request Body
{
  "email": "user@example.com",
  "action": "close" | "pause" | "cancel"
}

// Response
{
  "success": true,
  "message": "OTP sent successfully"
}
```

#### POST `/api/otp/verify`
Verifies OTP code for operation authorization.
```typescript
// Request Body
{
  "email": "user@example.com",
  "otp": "123456"
}

// Response
{
  "valid": true
}
```

### Auction Data Endpoints

#### GET `/api/auctions`
Retrieves auction data from Firestore.
```typescript
// Response
{
  "auctions": [
    {
      "id": "auction_id",
      "cropName": "Wheat",
      "location": "Punjab, India",
      "quantity": "1000",
      "unit": "kg",
      "grade": "A",
      "currentBid": "500",
      "endDate": "2024-01-15T00:00:00.000Z",
      "images": ["url1", "url2"],
      "isCancelled": false,
      "isPaused": false,
      "isClosed": false
    }
  ]
}
```

### Error Handling
All API endpoints return consistent error format:
```typescript
// Error Response
{
  "error": true,
  "message": "Descriptive error message",
  "code": "ERROR_CODE"
}
```

## 🚀 Deployment Guide

### Prerequisites for Deployment
- Vercel/Netlify account for frontend hosting
- Firebase project with production configuration
- Infura account with production API keys
- Gmail account with App Passwords enabled
- Domain name (optional) for custom URLs

### Environment Setup for Production

1. **Production Environment Variables**:
   ```bash
   # Use production Firebase project credentials
   NEXT_PUBLIC_FIREBASE_API_KEY=prod_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prod-project.firebaseapp.com
   # ... other production Firebase configs
   
   # Production Infura endpoint
   INFURA_KEY=production_infura_key
   
   # Production email configuration
   EMAIL_USER=production_email@gmail.com
   EMAIL_PASS=production_app_password
   ```

### Deployment Options

#### Option 1: Vercel Deployment (Recommended)
1. **Connect Repository**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy from project root
   vercel --prod
   ```

2. **Configure Environment Variables**:
   - Access Vercel dashboard
   - Navigate to Project Settings → Environment Variables
   - Add all production environment variables
   - Redeploy to apply changes

3. **Custom Domain** (Optional):
   - Add custom domain in Vercel dashboard
   - Update DNS records as instructed
   - SSL certificates automatically managed

#### Option 2: Manual Deployment
1. **Build the Application**:
   ```bash
   npm run build
   npm start
   ```

2. **Server Requirements**:
   - Node.js 18+ runtime
   - Environment variables configured
   - HTTPS enabled (required for MetaMask)
   - Process manager (PM2 recommended)

### Production Checklist
- [ ] All environment variables configured
- [ ] Firebase security rules properly set
- [ ] HTTPS enabled for MetaMask compatibility  
- [ ] CORS configured for API endpoints
- [ ] Error monitoring configured
- [ ] Performance monitoring enabled

## 📖 Usage Guide

### For Farmers (Sellers)

#### Creating Your First Auction
1. **Sign Up/Sign In**:
   - Navigate to `/signup` or `/signin`
   - Use email/password or Google authentication
   - Verify your email if required

2. **Create Auction**:
   - Click "Create Auction" in navigation
   - Fill in crop details:
     - Crop name and variety
     - Quantity and unit (kg, tons, etc.)
     - Grade/Quality (A, B, C)
     - Location
     - Minimum bid amount
     - Auction duration
   - Upload high-quality crop images
   - Review and submit

3. **Manage Auctions**:
   - Access "My Profile" to view your auctions
   - Monitor bid activity in real-time
   - Use OTP verification for:
     - Pausing active auctions
     - Canceling auctions
     - Closing completed auctions

### For Buyers (Bidders)

#### Participating in Auctions
1. **Browse Auctions**:
   - View latest auctions on homepage
   - Click "Browse Auctions" for complete listings
   - Filter by crop type, location, or price range

2. **Place Bids**:
   - Connect MetaMask wallet
   - Ensure sufficient Sepolia ETH
   - Click "Place Bid" on desired auction
   - Confirm transaction in MetaMask
   - Wait for blockchain confirmation

3. **Track Your Bids**:
   - Monitor auction status and current highest bid
   - Receive real-time updates on bid changes
   - Automatic refund if outbid

### MetaMask Setup Guide

#### Adding Sepolia Network
1. Open MetaMask extension
2. Click network dropdown → "Add Network"
3. Select "Add a network manually"
4. Enter Sepolia details:
   - **Network name**: Sepolia test network
   - **New RPC URL**: `https://sepolia.infura.io/v3/YOUR_KEY`
   - **Chain ID**: 11155111
   - **Currency symbol**: SepoliaETH
   - **Block explorer**: https://sepolia.etherscan.io

#### Getting Test ETH
1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Enter your MetaMask wallet address
3. Request test ETH (may require social verification)
4. Wait for transaction confirmation

## 🧪 Future Improvements

### Platform Enhancements
- **Multi-Chain Support**: Integrate Polygon, BSC, and other EVM-compatible chains
- **Mobile Application**: Native iOS/Android apps with push notifications
- **Advanced Analytics**: Detailed auction analytics and market insights
- **AI Price Predictions**: Machine learning-based crop price forecasting

### User Experience
- **Real-time Notifications**: WebSocket-based live auction updates
- **Multi-language Support**: Internationalization for global reach
- **Advanced Search**: Elasticsearch-powered crop and auction search
- **Reputation System**: Buyer and seller rating and review system

### Financial Features
- **Fiat Integration**: Payment gateway for real-time currency conversion to ETH
- **Multi-cryptocurrency Support**: Accept Bitcoin, USDC, and other cryptocurrencies
- **Escrow Services**: Enhanced dispute resolution mechanisms
- **Insurance Integration**: Crop insurance and transaction protection

### Technical Improvements
- **Layer 2 Solutions**: Polygon/Arbitrum integration for lower gas fees
- **IPFS Storage**: Decentralized image storage for better permanence
- **Progressive Web App**: Offline capability and improved mobile experience
- **GraphQL API**: More efficient data querying and real-time subscriptions

## 👩‍💻 Development Guide

### Setting Up Development Environment

#### Code Quality Tools
```bash
# Install additional development dependencies
npm install --save-dev @types/node @typescript-eslint/eslint-plugin

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

#### Development Workflow
1. **Branch Strategy**:
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Make changes and commit
   git add .
   git commit -m "feat: add your feature description"
   
   # Push and create pull request
   git push origin feature/your-feature-name
   ```

2. **Hot Reloading**:
   ```bash
   # Start development server with hot reload
   npm run dev
   
   # Server runs on http://localhost:3000
   # Changes automatically refresh browser
   ```

#### Debugging Guide
1. **Frontend Debugging**:
   - Use React DevTools browser extension
   - Console.log statements in components
   - Network tab for API call inspection
   - MetaMask events in browser console

2. **Backend API Debugging**:
   - Check Next.js API route logs in terminal
   - Firebase Admin SDK errors in server logs
   - Email delivery logs from Nodemailer

### Contributing Guidelines

#### Pull Request Process
1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes with clear commit messages
4. Test your changes locally
5. Submit pull request with detailed description

#### Code Standards
- Use TypeScript for all new code
- Follow existing component structure patterns
- Add JSDoc comments for complex functions
- Maintain consistent indentation (2 spaces)
- Use meaningful variable and function names

#### Testing Requirements
- Test authentication flows manually
- Verify blockchain interactions on Sepolia
- Ensure responsive design on multiple devices
- Test email OTP delivery functionality

## 🔐 Security Considerations

### Authentication Security
- **Token Management**: JWT tokens stored as HTTP-only cookies prevent XSS attacks
- **Route Protection**: Middleware validates all requests to protected routes
- **Session Timeout**: Firebase handles automatic token expiration
- **OTP Verification**: Critical operations require additional email verification

### Blockchain Security
- **Smart Contract Auditing**: Contract functions validated for common vulnerabilities
- **Gas Limit Protection**: Reasonable gas limits prevent wallet drainage
- **Input Validation**: All user inputs sanitized before blockchain interactions
- **Private Key Management**: Never store private keys, users manage via MetaMask

### Data Protection
- **Environment Variables**: Sensitive data stored in environment variables only
- **Firebase Rules**: Database access restricted by authentication status
- **HTTPS Enforcement**: All production traffic uses HTTPS for data encryption
- **Input Sanitization**: User inputs validated and sanitized server-side

### Best Practices for Users
- **MetaMask Security**: Always verify transaction details before confirming
- **Phishing Protection**: Only access application via official domain
- **Private Key Safety**: Never share MetaMask seed phrase or private keys
- **Email Security**: Use strong passwords and enable 2FA on email accounts

## ✅ Testing

### Manual Testing Checklist

#### Authentication Flow
- [ ] Email/password signup and signin
- [ ] Google OAuth integration
- [ ] Protected route redirection
- [ ] Token expiration handling
- [ ] Logout functionality

#### Auction Operations
- [ ] Create new auction with image upload
- [ ] View auction details and images
- [ ] Place bids with MetaMask
- [ ] Real-time bid updates
- [ ] Auction pause/cancel/close with OTP

#### Responsive Design
- [ ] Mobile device compatibility (< 768px)
- [ ] Tablet compatibility (768px - 1024px)
- [ ] Desktop compatibility (> 1024px)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

#### Blockchain Integration
- [ ] MetaMask connection
- [ ] Sepolia network detection
- [ ] Transaction confirmation
- [ ] Gas estimation accuracy
- [ ] Error handling for failed transactions

### Performance Testing
- **Lighthouse Scores**: Target 90+ for Performance, Accessibility, Best Practices
- **Core Web Vitals**: Monitor LCP, FID, and CLS metrics
- **Bundle Size**: Keep JavaScript bundles under 250KB gzipped
- **API Response Times**: Target sub-200ms response times for API endpoints

### Load Testing Considerations
- Firebase Firestore has built-in scaling
- Next.js API routes can handle moderate concurrent users
- Smart contract calls limited by Ethereum block times
- Consider implementing rate limiting for production

## 🔧 Troubleshooting

### Common Setup Issues

#### Build Failures
```bash
# Error: Module not found
npm install
npm run build

# TypeScript errors
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### Environment Variable Issues
```bash
# Verify .env.local exists and has correct format
cat .env.local

# Check for missing variables
npm run dev
# Look for "undefined" values in console
```

#### Firebase Connection Issues
1. **Authentication Errors**:
   - Verify Firebase project configuration
   - Check if Authentication providers are enabled
   - Confirm API keys are correct in .env.local

2. **Firestore Permission Errors**:
   - Ensure Firestore database is created
   - Check security rules allow read/write for authenticated users
   - Verify service account key format in FIREBASE_ADMIN_KEY

#### MetaMask Integration Issues
1. **Network Connection**:
   ```javascript
   // Add this to browser console for debugging
   console.log(window.ethereum.networkVersion)
   // Should return "11155111" for Sepolia
   ```

2. **Transaction Failures**:
   - Check Sepolia testnet ETH balance
   - Verify contract address is correct
   - Ensure gas prices are reasonable
   - Check Sepolia network status

#### Email OTP Issues
1. **Gmail Configuration**:
   - Verify 2FA is enabled on Gmail account
   - Generate new App Password if OTP emails fail
   - Check spam folder for OTP emails
   - Test SMTP connection manually

2. **Error Debugging**:
   ```bash
   # Check server logs for email errors
   npm run dev
   # Look for Nodemailer error messages in terminal
   ```

### Getting Help
- **GitHub Issues**: Report bugs with detailed reproduction steps
- **Discord/Community**: Join our community for real-time help
- **Documentation**: Check Firebase and ethers.js documentation
- **Stack Overflow**: Search for Next.js and Web3 related issues

### Performance Issues
1. **Slow Page Loads**:
   - Check network tab for large bundle sizes
   - Optimize images using Next.js Image component
   - Implement code splitting for heavy components

2. **Blockchain Query Slowness**:
   - Use batch calls for multiple contract queries
   - Implement caching for frequently accessed data
   - Consider using WebSocket providers for real-time updates

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines:

1. **Fork the Repository**: Create your own fork to work on
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Commit Changes**: Use clear, descriptive commit messages
4. **Push to Branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**: Describe your changes and their impact

### Areas We Need Help
- 🌍 Internationalization and localization
- 📱 Mobile app development
- 🔒 Security auditing
- 📊 Analytics and reporting features
- 🎨 UI/UX improvements
- 📖 Documentation improvements

## 🙏 Acknowledgements

### Core Technologies
- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed components

### Backend Services
- **[Firebase](https://firebase.google.com/)** - Authentication and database services
- **[Ethereum](https://ethereum.org/)** - Decentralized blockchain platform
- **[Infura](https://infura.io/)** - Ethereum infrastructure provider
- **[Nodemailer](https://nodemailer.com/)** - Email sending library for Node.js

### Development Tools
- **[ethers.js](https://ethers.org/)** - Ethereum library for JavaScript
- **[MetaMask](https://metamask.io/)** - Cryptocurrency wallet browser extension
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[React Hot Toast](https://react-hot-toast.com/)** - Smoking hot React notifications

### Special Thanks
- **Agricultural Community**: For inspiring this project and providing domain expertise
- **Open Source Contributors**: To all the developers who maintain the libraries we depend on
- **Beta Testers**: Early users who provided valuable feedback and bug reports
- **Blockchain Community**: For building the decentralized infrastructure that makes this possible

### Inspiration
This project was inspired by the need to empower farmers with direct market access and transparent pricing mechanisms. We believe blockchain technology can democratize agricultural commerce and create more equitable trading opportunities.

---

<div align="center">

**Built with ❤️ for farmers worldwide**

[🌾 Live Demo](https://vikraya.vercel.app) | [📖 Documentation](https://github.com/Vashishta-Mithra-Reddy/Vikraya/wiki) | [🐛 Report Bug](https://github.com/Vashishta-Mithra-Reddy/Vikraya/issues) | [💡 Request Feature](https://github.com/Vashishta-Mithra-Reddy/Vikraya/issues)

</div>
