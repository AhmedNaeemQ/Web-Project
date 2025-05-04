# Project Proposal

## Course: Web Programming 8B

### Submitted By:
- Ahmad Naeem (21L-1820)
- Shaheer Ahmad (21L-5193)

## Title: Restaurant Website Development Using MERN Stack

### 1. Introduction
In today’s digital age, an online presence is essential for restaurants to attract customers and streamline operations. This project aims to develop a fully functional restaurant website that enables users to browse the menu, make reservations, place orders, and provide feedback. Additionally, an admin panel will be implemented to help restaurant staff efficiently manage reservations, food items, and user interactions.

The website will be built using the MERN stack (MongoDB for database management, Express.js and Node.js for the backend, and React for the frontend) to ensure a dynamic and efficient architecture. Tailwind CSS will be used to create a modern, responsive, and visually appealing design.

### 2. Objectives
The primary objectives of this project are:
- To develop a user-friendly restaurant website where customers can explore food options, reserve tables, and place orders.
- To implement an admin panel for restaurant staff to efficiently manage reservations, menu items, and user activities.
- To ensure a responsive and visually appealing design using Tailwind CSS.
- To incorporate secure authentication mechanisms for both users and administrators.

### 3. Features & Functionalities

#### 3.1 User Features
1. **Home Page**: A visually appealing landing page featuring restaurant highlights and signature dishes.
2. **About Page**: A section providing information about the restaurant, its mission, and its team.
3. **Menu Browsing**: Categorized food items with descriptions and images for easy navigation.
4. **Reservations**: Users can book a table by selecting the date, time, and number of guests.
5. **Online Ordering**: Customers can add food items to a cart and place orders for takeout or dine-in.
6. **User Authentication**: A secure login and registration system.
7. **Order Status Tracking**: Users can check the real-time status of their orders.
8. **Feedback System**: Users can submit ratings and reviews about their dining experience.
9. **Contact & Support**: A contact form for customer inquiries and assistance.

#### 3.2 Admin Features
1. **Dashboard**: A control panel displaying orders, reservations, and user activity.
2. **Manage Reservations**: Ability to approve, decline, or modify table bookings.
3. **Order Management**: View and process customer orders efficiently.
4. **Menu Management**: Add, edit, or remove food items from the restaurant’s menu.
5. **User Management**: Monitor customer activity and manage user profiles.
6. **Feedback Handling**: View customer reviews and respond to feedback when necessary.

### 4. Technologies Used
The project will be developed using the following technologies:
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

### 5. Conclusion
This project aims to create a fully functional and interactive restaurant website that enhances the user experience and simplifies restaurant operations. Built with the MERN stack, the website will provide an efficient and well-structured system, while Tailwind CSS ensures a modern and responsive design. Key features such as menu browsing, reservations, and order management will offer a seamless and convenient experience for both customers and restaurant staff.


### Setup and Usage

This section outlines the steps to set up and run the MERN (MongoDB, Express.js, React, Node.js) project locally. The repository contains two main folders: **Front-end** and **Back-end**. The **Front-end** folder includes two React applications: **Admin** and **User**.

#### **Prerequisites**
Ensure the following are installed:
- **Node.js** (v14 or higher): [Download](https://nodejs.org/)
- **MongoDB**: Local MongoDB instance or MongoDB Atlas account ([Setup Guide](https://www.mongodb.com/docs/atlas/getting-started/))
- **Git**: To clone the repository ([Download](https://git-scm.com/))
- A code editor like **VS Code** (recommended)

#### **Project Structure**
```
Web-Project/
├── Back-end/
│   └── (Express.js API and MongoDB connection)
├── Front-end/
│   ├── Admin/
│   │   └── (React app for admin interface)
│   ├── User/
│   │   └── (React app for user interface)
└── README.md
```

#### **Setup Instructions**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AhmedNaeemQ/Web-Project.git
   cd Web-Project
   ```

2. **Set Up the Back-end**
   - Navigate to the **Back-end** folder:
     ```bash
     cd Back-end
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the **Back-end** folder with:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=1000
     ```
     Replace `your_mongodb_connection_string` with your MongoDB URI (e.g., `mongodb://localhost:27017/yourdb` for local or a MongoDB Atlas URI).
   - Start the back-end server:
     ```bash
     npm start
     ```
     The server runs on `http://localhost:1000`.

3. **Set Up the Front-end (Admin App)**
   - Navigate to the **Admin** folder:
     ```bash
     cd ../Front-end/Admin
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the **Admin** folder with:
     ```
     VITE_BACKEND_URL=http://localhost:1000/api/admin
     VITE_API_URL=http://localhost:1000
     ```
   - Start the Admin app:
     ```bash
     npm start
     ```
     The Admin app runs on `http://localhost:5173`.

4. **Set Up the Front-end (User App)**
   - Navigate to the **User** folder:
     ```bash
     cd ../User
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the **User** folder with:
     ```
     VITE_BACKEND_URL=http://localhost:1000/api/admin
     VITE_API_URL=http://localhost:1000
     ```
   - Start the User app:
     ```bash
     npm start
     ```
     The User app runs on `http://localhost:3000` (or another port if `3000` is occupied).

5. **Verify the Setup**
   - Ensure the back-end server is running (`http://localhost:1000`).
   - Open `http://localhost:5173` for the **Admin** app.
   - Open `http://localhost:3000` for the **User** app.
   - Test API connectivity via app interactions (e.g., login, data fetching).

#### **Usage**
- **Admin App**: Manage administrative tasks (e.g., user management, content moderation). Ensure admin credentials are configured in the back-end.
- **User App**: End-user interface for application features (e.g., browsing content, user profiles).
- **Back-end API**: Handles API requests from both apps, connecting to MongoDB for data operations.

#### **Troubleshooting**
- **MongoDB Issues**: Verify `MONGO_URI` in the back-end `.env`. Ensure MongoDB is running or your Atlas cluster is accessible.
- **Port Conflicts**: If ports (`3000`, `5173`) are in use, React/Express will suggest alternatives, or update the `.env` file.
- **API Errors**: Check back-end logs for errors and confirm `VITE_BACKEND_URL` matches the back-end URL.

#### **Notes**
- Start the back-end server before the front-end apps.
- Ensure all `.env` files are correctly configured.
- For production, secure the API with authentication (e.g., Firebase or JWT) and deploy to a cloud platform.

For more details, visit: [https://github.com/AhmedNaeemQ/Web-Project](https://github.com/AhmedNaeemQ/Web-Project)
