
# Real-time Chat 💬

**Real-time Chat** is a web-based messaging application built using Web Sockets to enable real-time communication between users.

## 🚀 Features

- 💬 Real-time messaging
- 🧑‍🤝‍🧑 User authentication and sessions
- 🔐 Secure messaging
- 📱 Responsive design for mobile and desktop
- 🌙 Dark and light mode support

## 🛠️ Technologies Used

- **Frontend:** React, Mantine
- **Backend:** Node.js, Express
- **Web Socket Protocol:** Socket.IO
- **Database:** MongoDB
- **Media Management:** Cloudinary
- **Authentication:** JSON Web Tokens (JWT)

## 🔧 Installation

Follow these steps to set up the project locally:

1. Clone the repository:

```bash
git clone https://github.com/kadirmetin/realtime-chat.git    
cd realtime-chat
```

2. Install dependencies for both server and client:

```bash
cd server
npm install
cd ../client
npm install
```

3. Create a `.env` file in the `server` directory and configure the following:

```makefile
PORT=3000
MONGODB_URI="your-mongodb-uri"
JWT_SECRET="your-jwt-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
NODE_ENV="DEVELOPMENT"
ORIGIN_URL="http://localhost:5173"
```

4. Create a `.env` file in the `client` directory and configure the following:

```makefile
VITE_API_URL="http://localhost:3000/api"
VITE_SOCKET_URL="http://localhost:3000"
```

5. Start the development servers:

```bash
cd server
npm start
cd ../client
npm start
```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```bash
realtime-chat/
├── server/        # Backend code
│   ├── src/
|   │   ├── controllers/  # Controllers
|   │   ├── models/       # Models
│   |   ├── routes/       # API routes
│   |   └── app.ts        # Server setup
├── client/        # Frontend code
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── main.tsx        # Main app
└── README.md       # Documentation
```

## 🗒️ Future Improvements

- Adding group chat functionality
- Typing indicators
- Message read receipts
- End-to-end encryption for secure communication

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/kadirmetin/realtime-chat/issues) or open a pull request.

##  📜 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/kadirmetin/realtime-chat/blob/main/LICENSE) file for details.
