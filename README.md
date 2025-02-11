
![e-commerce_page-0001](https://github.com/user-attachments/assets/7ac7c2dd-eef4-4d71-ad2f-e4705cef5dcf)

# **E-Commerce Website (MERN Stack)**  

This project is a **full-stack e-commerce platform** built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). The platform focuses on **scalability, security, and a seamless shopping experience** for users.  

---

## **Key Features**  

### **Backend (Server-Side)**  
- **Express.js**:  
  - Used as the backend framework for managing API routes and server logic.  
- **MongoDB & Mongoose**:  
  - NoSQL database used to store **users, products, orders, and transactions**.  
  - Mongoose simplifies database operations with schema-based modeling.  
- **Authentication & Security**:  
  - `bcrypt` for password hashing.  
  - `jsonwebtoken (JWT)` for secure authentication and session management.  
  - `cookie-parser` to handle authentication cookies.  
- **Environment Management**:  
  - `dotenv` for storing **API keys and database credentials** securely.  
- **File & Image Uploads**:  
  - `Cloudinary` for hosting and managing product images efficiently.  
---

### **Frontend (Client-Side)**  
- **React & Vite**:  
  - React for building interactive UI components.  
  - Vite for optimized builds and fast development.  
- **State Management**:  
  - Zustand for handling global state, such as **cart management** and **user authentication**.  
- **Styling & UI Components**:  
  - **Tailwind CSS** for responsive and modern styling.  
  - **DaisyUI** for pre-styled UI components.  
  - **Lucide-React** and **React Icons** for consistent and aesthetic icons.  
  - **Framer Motion** for smooth animations and transitions.  
  - **React Hot Toast** for notifications and alerts.  
- **Routing & Navigation**:  
  - **React Router DOM** for seamless navigation between pages.  

---

## **Pages & Functionality**  

1. **Signup & Login Pages**  
   - Secure user authentication using JWT.  
   - Password hashing with bcrypt.  

2. **Home Page**  
   - Displays product categories.  
   - Showcases featured and trending items.  

3. **Product Page**  
   - Displays detailed product descriptions, images, and pricing.  
   - Users can add items to their cart.  

4. **Cart Page**  
   - Lists all selected items with **quantity, price, and total cost**.  
   - Displays recommended products based on cart items.  
   - Allows users to apply discount coupons before checkout.  

5. **Checkout**  
   - Calculates total price, discounts, and applicable taxes.  

6. **Order Summary & Success Page**  
   - Displays purchase confirmation details.  
   - Uses **React Confetti** to celebrate successful purchases.  

7. **Analytics Page**  
   - Provides insights into sales trends and customer behavior.  
   - Uses **Recharts** to display data in various chart formats.  

---

## **Technologies Used**  

- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=flat) **React**  
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat) **Vite**  
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) **MongoDB**  
- ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) **Express.js**  
- ![Node.js](https://img.shields.io/badge/-Node.js-43853D?logo=node.js&logoColor=white&style=flat) **Node.js**  
- ![Zustand](https://img.shields.io/badge/-Zustand-FF9F00?logo=zustand&logoColor=black&style=flat) **Zustand**  
- ![TailwindCSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat) **Tailwind CSS**  
- ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-FF4154?logo=framer&logoColor=white&style=flat) **Framer Motion**  
- ![React Router](https://img.shields.io/badge/-React%20Router-DCDCDC?logo=reactrouter&logoColor=black&style=flat) **React Router DOM**  
- ![Recharts](https://img.shields.io/badge/-Recharts-3182CE?logo=recharts&logoColor=white&style=flat) **Recharts**  
- ![Stripe](https://img.shields.io/badge/-Stripe-008CDD?logo=stripe&logoColor=white&style=flat) **Stripe API**  
- ![Cloudinary](https://img.shields.io/badge/-Cloudinary-F2B94A?logo=cloudinary&logoColor=black&style=flat) **Cloudinary**  

---

## **Conclusion**  

This **E-Commerce Website** is a **scalable, secure, and user-friendly** platform designed to provide a smooth online shopping experience. By integrating **React, Zustand, Tailwind CSS, Stripe API, and MongoDB**, this project delivers **dynamic, real-time functionalities** for users while maintaining high performance and security.
