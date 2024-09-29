# Login Page Project

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Middleware](#middleware)
- [License](#license)

## Overview
This project is a simple login page application that allows users to register, log in, and access a secret page. It utilizes JWT (JSON Web Tokens) for authentication and stores user information securely in a database.

## Features
- User registration with email and password
- User login functionality
- JWT-based authentication for secure access
- Secret page accessible only to logged-in users
- User logout functionality
- Error handling for login and registration processes

## Technologies Used
- Node.js
- Express.js
- MongoDB (via Mongoose)
- EJS (Embedded JavaScript) for templating
- bcrypt for password hashing
- jsonwebtoken for token generation
- dotenv for environment variable management
- body-parser for parsing incoming request bodies
- cookie-parser for handling cookies

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/loginpage.git
   Usage
Navigate to http://localhost:3000/register to create a new user account.
After registration, you will be redirected to the home page.
Use the login page at http://localhost:3000/login to access your account.
Once logged in, you can access the secret page at http://localhost:3000/secret.
Click on the logout link to log out from your session.
Routes
Method	Route	Description
GET	/register	Render the registration page
POST	/registeruser	Handle user registration
GET	/login	Render the login page
POST	/userlogin	Handle user login
GET	/secret	Render the secret page (protected route)
GET	/logout	Log the user out and redirect to the home page
GET	/more	Render additional content (optional)
Middleware
The auth middleware is used to protect routes that require authentication. It checks for a valid JWT in the cookies and verifies the user. If the token is invalid or expired, it redirects to the login page.


