# Ecommerce-Follow-Along Project Overview

## Project Description
Ecommerce-Follow-Along is a comprehensive project designed to guide developers through the process of building an e-commerce application from scratch. This project will cover various aspects of web development, including front-end design, back-end integration, and database management, providing a hands-on learning experience.

## Milestone 1: Project Overview

In this session, we focused on the foundational elements of the Ecommerce-Follow-Along project. Key topics covered included:

### 1. **Project Setup**
   - We initialized the GitHub repository and set up the basic structure for our application.

### 2. **Technology Stack**
   - An overview of the technologies that will be utilized throughout the project:
     - **Node.js**: JavaScript runtime for the back-end.
     - **Express.js**: Web framework for building the back-end API.
     - **MongoDB**: NoSQL database to store application data.
     - **React (MUI)**: Front-end framework using React with Material-UI for UI components.

### 3. **Version Control**
   - Introduction to **Git** and **GitHub** for version control.
   - Emphasized best practices for committing code and managing branches.

### 4. **Development Environment**
   - Configuration of local development environments to ensure consistency across team members.

---

## Milestone 2: Front-End Development - Login Page

In this milestone, we focused on building the front-end login page using React and Tailwind CSS. Key activities included:

### 1. **Login Page Creation**
   - We designed and implemented a user login page.
   - Integrated **React** for front-end logic and **Tailwind CSS** for styling.

### 2. **Understanding Tailwind CSS**
   - Learned about the utility-first approach of **Tailwind CSS** and how it differs from traditional CSS.
   - Practiced using Tailwind's utility classes to style elements efficiently.

### 3. **Connecting to App**
   - Linked the login page to the main `App.jsx` file by creating a `LoginPage.jsx` component in the `pages` folder.

---

## Milestone 3: Back-End Setup - Node.js & MongoDB

In this milestone, we focused on setting up the back-end of the application. Key activities included:

### 1. **Folder Structure & Organization**
   - Organized the back-end code into dedicated folders for models, controllers, routes, and middleware to ensure scalability.

### 2. **Node.js Server Setup**
   - Initialized a **Node.js** server and created a `server.js` file to handle API requests.

### 3. **MongoDB Integration**
   - Connected the application to **MongoDB**, setting up the database for storing data related to products, users, and orders.

### 4. **Error Handling**
   - Implemented basic **error handling** to ensure the application responds appropriately to failed requests and server errors.

---

# Milestone 4: Creating User Model and Controller

In this milestone, we accomplished the following tasks:

## User Model
- Created a **User Model** using MongoDB Schemas to define the structure of user data.
- Designed a blueprint for storing user information, including:
  - `name`
  - `email`
  - `password`

## User Controller
- Created a **User Controller** to handle user-related data, such as:
  - Adding a new user.
  - Retrieving user information.
- Implemented the controller to manage user requests and responses effectively.

## Multer Support
- Enabled **file uploads** using **Multer**, allowing users to upload files like profile pictures.
- Configured Multer to:
  - Store user images in the backend.
  - Keep track of the uploaded files.

## README Update
- Updated the **README** file in the root of the repository to summarize the progress made in this milestone.
- Added a new section titled **"Milestone 4: Creating User Model and Controller"** to document the achievements.

---

## Milestone 5: Creating the Signup Page
In this milestone, we created the frontend UI for users to register by filling out their details. We also ensured that user inputs (like email and password) are properly validated before they're submitted.

### Key Achievements
* Created a simple yet effective sign-up form that is clean and user-friendly.
* Implemented form validation to ensure users input valid data.

### Code Changes
* Implemented HTML and CSS for the Sign-Up Page.
* Added form validation to ensure users input valid data.

### Future Work
* Connect the frontend with the backend.
* Implement user session management.

---

## Milestone 6: Encrypting Passwords and Storing User Data Securely

### Achievements:
In this milestone, I completed the following tasks:
- Implemented password encryption using `bcrypt` to hash user passwords during signup.
- Stored the hashed password in the database instead of plain text.
- Saved all user data (e.g., name, email, etc.) in the database while ensuring that the password remains encrypted.

### Code Changes:
- Updated the backend API to use `bcrypt` for password hashing.
- Modified the database schema to store hashed passwords.
- Implemented data validation and sanitization to ensure secure data storage

---

# Login Functionality Progress for Milestone 7

In this milestone, we implemented a backend endpoint for user login, focusing on validating user credentials and verifying the encrypted password stored in the database.

## Key Features

* Validating user credentials during login
* Comparing encrypted passwords using bcrypt
* Protecting user data by storing hashed passwords

## Technologies Used

* Backend endpoint for user login
* Bcrypt for password hashing
* Database for storing user records

---


# Milestone 8: Frontend Card Component and Homepage Design

## Learning Goals
* Create a card component
* Display cards on products page

## Steps
1. Create card component with props (name, image, price)
2. Design homepage layout with grid or flexbox



