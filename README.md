# Rahal

**Rahal** is a smart, all-in-one ride-sharing web app built for anyone who needs flexible and affordable intercity travel. With one account, users can instantly switch between being a driver or a passenger — no separate signups, no hassle.

Plan your next trip in seconds: post a ride, book a seat, join local communities, and stay connected. Rahal makes traveling not only cheaper but smarter, safer, and more social.

Admins get powerful tools to manage users, verify drivers, and keep the platform running smooth and secure.

Whether you're heading home for the weekend or offering an empty seat, Rahal turns every ride into an opportunity.

## 🚀 Project Motivation

Many university students struggle with limited transportation options between cities. **Rahal** solves this by allowing ride-sharing within a safe, verified platform, helping reduce costs and increase flexibility. It primarily serves:

- 🎓 Students
- 👩‍💼 Professionals
- 🚗 Individuals looking to reduce commute expenses

## 👥 Users

- **Users (Drivers & Passengers)**: Each user account supports posting rides (as a driver) and booking rides (as a passenger). Users can approve ride requests, chat, rate others,and view ride history.
- **Admins**: Manage users, complaints, and approve driver applications.

## 📲 Functionality Overview

### For Regular Users (Drivers & Passengers):

- 🌍 **Join Communities** to connect with users from your university or area.
- 🚘 **Offer a Ride** (Driver mode) — Post trip details, approve passengers, and get feedback.
- 🧍‍♀️ **Find a Ride** (Passenger mode) — Search available rides using filters and book a seat.
- ⭐ **Rate Drivers/Passengers** — Give feedback after a completed trip.
- 📱 **Contact Others** — Initiate WhatsApp or Call communication through profile cards.
- 🧾 **View History** — See completed and in-progress rides with full trip details.

### For Admins:

- ✅ **Approve Driver Requests** — Review user documents and verify their eligibility to drive.
- 🛠 **Manage Communities** — Add/edit/delete university or regional communities.
- 📂 **Handle Complaints** — View and resolve issues submitted by users.
- 🔐 **Manage User Accounts** — View profiles and suspend accounts if needed.

## ⚙️ Setup and Installation

To run this project on your local machine, follow these detailed steps:

### 📥 1. Prerequisites

Make sure you have the following tools installed:

- [Visual Studio Code](https://code.visualstudio.com/) – code editor
- [Node.js (LTS Version)](https://nodejs.org/) – includes npm
- [Git](https://git-scm.com/) – to clone the repository

---

### 🧪 2. Setup Steps

#### Step 1: Clone the Project

```bash
git clone https://github.com/SaraEAlshayeb/rahal.git
cd rahal
```

#### Step 2: Open in VS Code

```bash
code .
```

> If `code .` doesn’t work, follow this guide to enable it: [VS Code CLI Setup](https://code.visualstudio.com/docs/setup/windows#_launching-from-the-command-line)

---

### 📦 3. Install Dependencies

```bash
npm install
npm install react-router-dom
npm install react-icons
npm install react-bootstrap bootstrap
npm install @fortawesome/fontawesome-free
```

---

### 🚀 4. Run the Application

```bash
npm start
```

Then open your browser and go to:

```
http://localhost:3000
```

---

### 📚 Helpful Resources

- [React Documentation](https://react.dev/)
- [Node.js Guides](https://nodejs.dev/learn)
- [GitHub Getting Started](https://docs.github.com/en/get-started)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

## 🧭 Usage Instructions

### 🧑‍💻 Logging In

- To log in as an **admin**, use:  
  **Email**: `admin@hotmail.com`

- To log in as a **verified driver**, use:  
  **Email**: `sara@hotmail.com`

- To log in as a **normal user**, enter any email address.

### 👣 Navigation Tips

- The homepage lets users:  
  🔹 Join a Community  
  🔹 Become a Driver & Offer a Ride (Submit driver request & Post Ride)  
  🔹 Find a Ride (Book Ride)

- Verified drivers can access both ride posting and booking functionalities.
- Admins access a dedicated dashboard to handle all management tasks.

## 🎨 Figma Design

[View UI Wireframes](https://www.figma.com/design/k3QKIAhjpatlG2pk0rtMuc/Responsive-Landing-Page-Design-%7C-Website-Home-Page-Design-%7C-Agency-Website-UI-Design--Community-?node-id=0-1&t=6JTZBZtIEEP0GNNm-1)

---

## 🛠️ Back-End Setup & API Documentation

### 📁 How to Set Up and Run the Back-End

Follow these steps to set up and run the back-end server locally:

#### 1. Navigate to the back-end directory

```bash
cd backend
```
#### 2. Install Dependencies

```bash
npm install
```

#### 3. Run the Server

```bash
node index.js
```
---

## 📡 API Documentation

This section provides example requests and responses for key back-end API endpoints used in Rahal.

---

### 🔐 POST `/api/auth/login`

Authenticates a user or admin and returns a JWT token.

- **Method:** POST  
- **URL:** `http://localhost:5000/api/auth/login`

#### 📤 Request Body:
```json
{
  "email": "reema@example.com",
  "password": "1234"
}
```
#### 📤 Response Body:
- **Success Response:**
![image](https://github.com/user-attachments/assets/4cb4471b-15d9-497c-8410-467d41af6145)

- **Error Response:**

![image](https://github.com/user-attachments/assets/52014e84-ff3f-4686-9369-f9edb0c66724)

### 👤 GET `/api/users/:email`
Fetches a user profile by email.

- **Method:** GET  
- **URL:** `http://localhost:5000/api/users/reema@example.com`
- 
## 👩‍💻 Authors

- Reema Alghamdi
- Farah Almutairi
- Sara Alshayeb
- Lamyaa Alyousef
- Sara Alshallali
