# Ecommerce-Follow-Along Project Overview

## Project Description
Ecommerce-Follow-Along is a comprehensive project designed to guide developers through the process of building an e-commerce application from scratch. This project will cover various aspects of web development, including front-end design, back-end integration, and database management, providing a hands-on learning experience.

## Project Milestone 1
### User Authentication:
- Register and log in users.

### Product Management:
- Add, update, and retrieve product data.

### Order Handling:
- Manage customer orders.

## Project Milestone 2
### Setting up the Frontend and Backend Development Environment
- Created 2 main folders for frontend and backend.

### Frontend Setup:
- Created a React app:
  ```bash
  npm create vite@latest Frontend
  ```
- Installed Node dependencies:
  ```bash
  npm i
  ```
- Added Tailwind CSS for styling:
  ```bash
  npm install -D tailwindcss
  npx tailwindcss init
  ```
- Added the following into `index.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Created a Login page.

### Backend Setup:
- Initialized Backend Project:
  ```bash
  npm init -y
  ```
- Added necessary dependencies:
  ```bash
  npm i express
  npm i mongoose
  npm i cors
  npm i nodemon
  ```
- Created Backend Structure:
  - Set up directories inside the `src` folder:
    ```bash
    mkdir Config controllers Middlewares Routes
    ```
  - Created a main file:
    ```bash
    touch index.js
    ```

## Project Milestone 3
### Connecting Backend and Database
- Created a MongoDB Account and a new database cluster.
- Set up the `.env` file for environment variables like database URL, port, etc.
- Created a new file called `database.js` to connect the backend to the database.
- Created a new file called `app.js` to send responses to the client.
- Implemented basic error handling in `errorhandler.js`.

## Project Milestone 4
### Creating the User Model
- Created a `models` folder and added a `User.model.js` file.
- Defined the User Schema in `User.js`.

### Adding Middlewares
- Installed multer for file handling:
  ```bash
  npm install multer
  ```
- Created a `middlewares` folder and added a `multer.js` file.
- Configured Multer in `middlewares/multer.js`.

### Creating the User Controller
- Created a `controllers` folder and added a `userController.js` file.
- Wrote functions to handle user operations like creating, reading, and updating user data.

### Setting Up User Routes
- Created a `routes` folder and added a `userRoute.js` file.
- Defined routes to handle user-related requests.

## Project Milestone 5
### Creating the Sign-up Page
- Created a new `Signup.js` file in the `src` folder.
- Added a form with fields for:
  - Name
  - Email
  - Password
  - File Upload
- Set up `useState` to manage form data and handled form submission.

### Adding Form Validation
- Created a `validation.js` file in the `src` folder.
- Added functions to validate fields (e.g., checking if fields are empty or if the email format is correct).
- Used the validation functions in the `Signup.js` file to show error messages for invalid data.

### Setting Up Routing
- Updated `src/index.js` to use `BrowserRouter`:
  ```jsx
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ```
- Added `/signup` and `/login` routes in `App.js`:
  ```jsx
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  ```

## Project Milestone 6
### JWT Authentication and Email Verification
- Installing `jsonwebtoken`:
  ```bash
  npm install jsonwebtoken
  ```

### Adding JWT Authentication
- Generating a JWT Token.
- Protecting Routes with JWT.
- Adding Email Verification in `userController.js`:
  - Generating a Verification Token.
  - Verifying the Email Token.
  - Sending Verification Email After Signup.

## Project Milestone 7
### Created Two Routes: Signup and Login
For **Signup**:
- Extracting User Data from the Request Body:
  ```javascript
  const { name, email, password } = req.body;
  ```
- Checking if the User Already Exists in the Database:
  - If Yes: Return a message indicating the user is already present and suggest direct login.
  - If No: 
    - Hash the password using libraries like bcrypt.js or argon2.js.
    - Create a new user and store their name, email, and hashed password in the database.

For **Login**:
- Extracting User Data from the Request Body:
  ```javascript
  const { email, password } = req.body;
  ```
- Validating User Credentials:
  - If User Exists and Password Matches: Generate a token and send it back as cookies.
  - If Not: Return a message prompting the user to sign up first.

## Project Milestone 8
### Frontend Updates:
- **Card Component**: 
  - Added a reusable Card component for displaying product details.
- **Responsive Homepage Layout**: 
  - Implemented a responsive layout using flexbox.
  - Mapped dummy product data to the Card component in `Home.jsx` for dynamic rendering.

## Project Milestone 9
### Product Management:
- **Product Form**:
  - Created a form with the following fields:
    - Product Title
    - Description
    - Stock
    - Price
    - Discounted Price
    - Category
    - Rating
  - Enabled form submission for product data entry.

## Project Milestone 10
### Product Schema and Endpoints
- Defined a schema for products including necessary fields such as name, description, price, and image URLs.

### Creating Endpoint to Write Data into the Database
- Implement an API route to handle requests for adding new product data into the database.
  ```javascript
  app.post("/add-product", (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    // Logic to store the product in the database
  });
  ```

### Integrating Cloudinary and Multer
- **Cloudinary**: 
  - Use Cloudinary to store product images and retrieve their URLs.
- **Multer**: 
  - Use Multer for handling file uploads in the API.
  - Configure Multer middleware to upload images before saving product data.

## Project Milestone 11
### Product Schema and Endpoints
- Define a schema for products, including necessary fields such as title, description, rating, discountedPrice, originalPrice, quantity, category, and images.

### Creating Endpoint to Display All Products
- Created a new API endpoint to retrieve and display all the products from the database.
  ```javascript
  // product.router.js
  router.get("/get-products", async (req, res) => {
    try {
      const products = await ProductModel.find({});
      res.status(200).send({
        success: true,
        message: "Products retrieved successfully",
        data: products,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error retrieving products",
        error: error.message,
      });
    }
  });
  ```

### Integrating the New Route
- Added the `/get-products` route in `product.router.js` to handle the retrieval of all product data. This route queries the database and returns a list of products.
  ```javascript
  const express = require("express");
  const router = express.Router();
  const ProductModel = require("./models/ProductModel");

  // Endpoint to fetch all products
  router.get("/get-products", async (req, res) => {
    // Logic to fetch products
  });

  module.exports = router;
  ```

### Integration with Server
- Ensure the `product.router.js` file is properly imported and used in the main server file:
  ```javascript
  const productRoutes = require("./routes/product.router");
  app.use("/api/products", productRoutes);
  ```

## Project Milestone 12
### Implement Product Routes
- **Create Product Router**: 
  - Define routes for handling product-related requests (e.g., fetching product list, product details).
- **Integrate Product Routes**: 
  - Import the `productRoutes` in your main server file.
  - Use the `productRoutes` with the `/api/products` endpoint.
- **Test Product Routes**: 
  - Ensure that the product routes are working correctly by making requests to the endpoints.
  - Verify that the responses are as expected.
- **Update Documentation**: 
  - Document the new product routes in the README file.
  - Include examples of how to use the endpoints.
- **Deploy and Verify**: 
  - Deploy the updated application to your development/staging environment.
  - Verify that the product routes are functioning correctly in the deployed environment.

## Project Milestone 13
### Implemented Update Option for Existing Data
- Created an endpoint for updating existing data.
- Defined Route for updating existing data.
- Implemented update logic in the controller.
- Tested the update endpoint by making requests to verify functionality.
- Implemented Frontend to update existing data:
  - Created a form to update existing data.
  - Integrated the form with the update endpoint.
  - Tested the update functionality to ensure it works as expected.

## Project Milestone 14
### Implemented Delete Option for Existing Data
- Created an endpoint for deleting existing data.
- Defined Route for deleting existing data.
- Implemented delete logic in the controller.
- Tested the delete endpoint by making requests to verify functionality.
- Updated the frontend logic to include a delete option.

## Project Milestone 15
### Implemented Navbar for the Application
- Created a navbar for the application.
- Implemented responsive design for the application.
- Ensured the application works well on different screen sizes and devices.

## Project Milestone 16
### Implemented Single Product Page
- Created a single product page to display a single product.
- Implemented the logic to fetch a single product from the database.
- Added quantity to cart functionality.
  - Implemented the logic to add quantity to cart functionality.
  - Implemented the logic to update the quantity in the cart.

## Project Milestone 17
### Implemented Cart Schema to Store Products
- Created a cart schema to store products in the database.
- Implemented the logic to store products in the cart schema.
- Implemented the logic to fetch products from the cart schema.
- Implemented the logic to update products in the cart schema.
- Implemented an endpoint to store, receive, and store product details in the cart.
- Implemented the logic to receive product details from the frontend.
- Implemented the logic to store product details in the cart schema.
- Implemented the logic to send a response back to the frontend.

## Project Milestone 18
### Implemented a Backend Endpoint for Cart Page
- Implemented an endpoint to fetch products from the cart schema.
- Implemented the logic to receive the cart ID from the frontend.
- Implemented the logic to fetch products from the cart schema.
- Created an endpoint to get products inside the cart for a user:
  - Implemented the logic to receive the user ID from the frontend.
  - Implemented the logic to fetch products from the cart schema for the user.

## Project Milestone 19
### Implemented Cart UI
- Implemented the cart UI using React and Tailwind CSS.
- Implemented the logic to fetch products from the cart schema.

## Project Milestone 20
### Implemented Profile Page
- Implemented the profile page using React and Tailwind CSS.
- Implemented the logic to fetch user details from the user schema.
- Implemented the logic to update user details in the user schema.

## Project Milestone 21
### Implemented Address Page
- Implemented the address page using React and Tailwind CSS.
- Implemented the logic to fetch user addresses from the user schema.
- Implemented the logic to add a new address in the user schema.
```

You can now copy and paste this markdown content into any markdown editor or file!
