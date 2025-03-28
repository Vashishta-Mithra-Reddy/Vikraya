## 🌱 Overview

Vikraya (meaning "sale" in Sanskrit) is a Next.js application that allows farmers to list their crops for auction and buyers to place bids. The platform uses Firebase for authentication and data storage, while integrating Ethereum blockchain for secure and transparent auction transactions.

## ✨ Features

- **User Authentication**: Secure sign-in/sign-up with email/password and Google authentication
- **Auction Management**: Create, view, pause, cancel, and close auctions
- **Bidding System**: Place bids on active auctions using ETH
- **OTP Verification**: Secure important actions with email OTP verification
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Real-time Updates**: Get the latest auction data and bid information

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Blockchain**: Ethereum (Sepolia testnet)
- **Smart Contracts**: Solidity (deployed on Sepolia)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Email**: Nodemailer for OTP delivery

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask wallet extension
- Sepolia testnet ETH for transactions

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vashishta-mithra-reddy/vikraya.git
   cd vikraya
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:

   ```
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # Firebase Admin
   FIREBASE_ADMIN_KEY=your_admin_key_json

   # Email (for OTP)
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_app_password

   # Infura (for Ethereum)
   INFURA_KEY=your_infura_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 App Structure

- `/app` - Next.js app router pages
- `/components` - Reusable React components
- `/context` - React context providers
- `/utils` - Utility functions
- `/public` - Static assets

## 🔒 Authentication Flow

The app uses Firebase Authentication with a custom middleware to protect routes. When a user signs in, a Firebase token is stored as an HTTP-only cookie for secure sessions.

## 🌐 Smart Contract Integration

The application interacts with a deployed Ethereum smart contract for auction operations. The contract address is:

```
0x8C44598b53C5CafC5fa437Ee360aA6BF6C70F3ee
```

Key contract functions:

- `placeBid`: Place a bid on an auction
- `pauseAuction`: Temporarily pause an auction
- `cancelAuction`: Cancel an auction
- `closeAuction`: Close an auction and transfer funds

## 🧪 Future Improvements

- Implement a rating system for buyers and sellers
- Add support for more cryptocurrencies and a payment gateway which converts real time currency to ETH and vice versa
- Implement real-time notifications

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Ethereum](https://ethereum.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
