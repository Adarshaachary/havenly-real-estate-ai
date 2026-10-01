# 🏡 Havenly – Real Estate Website with AI Chatbot

Havenly is a modern real-estate web application that helps users discover, search, save, and book properties through a simple and interactive interface.

The project also includes an **AI-powered real-estate chatbot** that understands natural-language property requirements and helps users find suitable properties.

---

## ✨ Features

### 🏠 Property Discovery

* Browse available properties.
* View property details.
* Search and filter properties.
* View property location on a map.
* See property images, price, facilities, and nearby places.

### 🤖 AI Real Estate Assistant

* Natural-language property search.
* Understands requirements such as:

  * Location
  * Budget
  * Property type
  * Bedrooms
  * Bathrooms
  * Parking
  * Amenities
* Returns matching properties from the database.
* Displays property results directly inside the chatbot.

### ❤️ Favorites

* Save properties to favorites.
* View saved properties.
* Remove properties from favorites.

### 📅 Property Visits

* Book a visit for a property.
* View booked visits.
* Cancel a booking.

### 🏡 List a Property

* Property owners can submit property information.
* Add property details such as:

  * Property name
  * Description
  * City
  * Address
  * Price
  * Bedrooms
  * Bathrooms
  * Parking
  * Property image

### 👤 User System

* User registration.
* User login.
* User-specific favorites and bookings.

### 🗺️ Property Maps

* Property coordinates are stored with property data.
* Map locations are displayed using OpenStreetMap.

### 📱 Responsive Design

* Desktop-friendly interface.
* Mobile-responsive layout.
* Clean and modern real-estate design.

---

## 🤖 AI Chatbot

The Havenly chatbot is designed specifically for real-estate discovery.

Instead of using only traditional filters, users can type requests naturally.

### Example

```text
Show me a 3 BHK house in Bengaluru under ₹2 crore
```

The chatbot processes the request and searches the property database for matching properties.

Another example:

```text
I want a property near the beach in Mangaluru
```

The system can identify the location and property requirements and return matching properties.

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* CSS
* React Router
* Lucide React

### Backend

* Node.js
* Express.js
* JavaScript
* Prisma ORM

### Database

* MongoDB
* MongoDB Atlas

### AI

* Google Gemini API

### Maps

* OpenStreetMap

### Development Tools

* VS Code
* Git
* GitHub
* npm

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────┐
                    │     User         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React + Vite     │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                  REST API Requests
                             │
                             ▼
                    ┌──────────────────┐
                    │ Node + Express   │
                    │     Backend      │
                    └────────┬─────────┘
                             │
               ┌─────────────┴─────────────┐
               │                           │
               ▼                           ▼
       ┌────────────────┐        ┌────────────────┐
       │ MongoDB Atlas   │        │  Gemini API    │
       │   Database      │        │ AI Chatbot     │
       └────────────────┘        └────────────────┘
```

---

## 📂 Project Structure

```text
havenly-real-estate-ai/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── prisma/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 How the Application Works

### Property Search

```text
User
  ↓
Search / Filter
  ↓
Frontend
  ↓
Express API
  ↓
Prisma
  ↓
MongoDB Atlas
  ↓
Property Results
  ↓
Frontend
```

### AI Property Search

```text
User's Natural Language Request
              ↓
        AI Chatbot
              ↓
      Gemini API Processing
              ↓
     Property Requirements
              ↓
       Filter Engine
              ↓
        MongoDB Atlas
              ↓
      Matching Properties
              ↓
        Chatbot Results
```

---

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Adarshaachary/havenly-real-estate-ai.git
```

```bash
cd havenly-real-estate-ai
```

---

### 2. Install frontend dependencies

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

---

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

Start the backend:

```bash
npm run dev
```

The frontend and backend will run on their respective local development ports.

---

## 🔐 Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
DATABASE_URL="your-mongodb-connection-string"
GEMINI_API_KEY="your-gemini-api-key"
```

Never upload your actual `.env` file or API keys to GitHub.

The project uses `.gitignore` to prevent sensitive environment files from being committed.

---

## 📸 Screenshots

Add screenshots of the application here.

Example:

```text
Home Page
Property Listing
Property Details
AI Chatbot
Favorites
Bookings
```

---

## 🌐 Live Demo

Live demo:

**Coming soon**

Once the project is deployed, add the Vercel URL here.

Example:

```text
https://your-havenly-demo.vercel.app
```

---

## 📌 Future Improvements

* User authentication improvements
* Secure owner-based property management
* Property image upload
* Advanced property filtering
* Improved AI recommendations
* Online property booking
* Payment integration
* Email notifications
* Property-owner dashboard
* Production deployment
* Better location and distance-based search

---

## 🎯 Project Objective

The main objective of Havenly is to combine a traditional real-estate property platform with an AI-powered conversational search experience.

Instead of forcing users to search only through multiple filters, Havenly allows users to describe what they are looking for naturally and receive relevant property suggestions.

---

## 👨‍💻 Developer

**Adarsha Achary**

Information Science & Engineering Student

GitHub:
https://github.com/Adarshaachary

---

## 📄 License

This project was developed for educational and portfolio purposes.
