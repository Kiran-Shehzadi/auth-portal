# Full-Stack Login & User Registration Application

**KeenCodic:** A responsive full-stack web application that implements a modern login and user registration interface with frontend validation, REST API integration, password hashing, and persistent cloud database storage.

The application is built using **React.js, Tailwind CSS, Node.js, Express.js, and MongoDB Atlas**, demonstrating the complete flow of user data from the frontend interface through the backend API to the database.

---

## Project Overview

This project demonstrates the integration of a modern React frontend with a Node.js/Express backend and a MongoDB Atlas database.

The application provides:

* A responsive login interface
* A comprehensive user registration form
* Client-side form validation
* Frontend and backend communication through REST APIs
* Server-side request processing
* Secure password hashing
* Persistent storage of registered user information
* Client-side navigation between application pages

The application follows a layered architecture in which the frontend, backend, and database have clearly separated responsibilities.

---

## Application Architecture

```text
┌──────────────────────────────┐
│            User              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       React.js Frontend      │
│                              │
│  • Login Interface           │
│  • Registration Interface    │
│  • Form State Management     │
│  • Client-side Validation    │
│  • Routing                   │
└──────────────┬───────────────┘
               │
               │ HTTP / REST API
               ▼
┌──────────────────────────────┐
│    Node.js + Express.js      │
│          Backend             │
│                              │
│  • API Routes                │
│  • Request Processing        │
│  • Server-side Validation    │
│  • Password Hashing          │
│  • Database Communication    │
└──────────────┬───────────────┘
               │
               │ Database Operations
               ▼
┌──────────────────────────────┐
│       MongoDB Atlas          │
│                              │
│  • User Collection           │
│  • User Documents            │
│  • Persistent Data Storage   │
└──────────────────────────────┘
```

---

## Technology Stack

### Frontend

**React.js**

Used to build the application's component-based user interface and manage interactive form functionality.

**Tailwind CSS**

Used to create the responsive visual design, including layouts, spacing, typography, borders, colors, shadows, and responsive behavior.

**React Router**

Used for client-side navigation between the Login and Registration pages.

**JavaScript (ES6+)**

Used for frontend application logic, event handling, state management, validation, and API communication.

### Backend

**Node.js**

Provides the runtime environment for executing JavaScript on the server.

**Express.js**

Provides the backend framework used to create the server, API routes, middleware configuration, and request handling.

**bcryptjs**

Used to hash user passwords before they are stored in the database.

**CORS**

Configured to allow communication between the separately running frontend and backend applications.

**dotenv**

Used to manage environment-based configuration without hard-coding sensitive connection information into the application source code.

### Database

**MongoDB Atlas**

A cloud-hosted MongoDB database used for persistent storage of registered user information.

---

## Core Features

### Login Interface

The application includes a dedicated login interface designed for user authentication.

The interface provides:

* User credential fields
* Input validation
* Responsive layout
* Navigation to the registration page

### User Registration

The registration interface collects the following user information:

* First Name
* Last Name
* Gender
* Date of Birth
* Email
* Password
* Confirm Password

The registration form is designed to validate user input before sending the information to the backend.

### Form Validation

Client-side validation is implemented to ensure that user input satisfies the required conditions before a request is submitted.

Validation includes checks such as:

* Required fields
* Valid input formats
* Password requirements
* Password and confirmation matching

This provides immediate feedback and improves the overall user experience.

### Password Security

User passwords are processed using `bcryptjs` before being stored.

Instead of storing a password in plain text, the application generates a password hash and stores the hashed value.

```text
Plain Password
      ↓
   bcryptjs
      ↓
Password Hash
      ↓
MongoDB Atlas
```

This prevents plain-text passwords from being stored directly in the database.

---

## Frontend Architecture

The frontend follows a component-based React structure.

```text
src/
│
├── components/
│   ├── LoginForm.jsx
│   └── SignupForm.jsx
│
├── pages/
│   ├── Login.jsx
│   └── Signup.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

### Pages

The `pages` directory contains page-level components responsible for the application's main views.

* `Login.jsx` — Login page
* `Signup.jsx` — Registration page

### Components

The `components` directory contains reusable UI and form components.

* `LoginForm.jsx` — Login form interface and functionality
* `SignupForm.jsx` — Registration form, state management, validation, and API interaction

### App.jsx

`App.jsx` manages the application's route configuration and determines which page is rendered for each route.

---

## Backend Architecture

The backend separates server configuration from database connectivity.

```text
backend/
│
├── server.js
├── db.js
└── package.json
```

### server.js

The main backend entry point.

It is responsible for:

* Initializing Express
* Configuring middleware
* Enabling CORS
* Parsing JSON request bodies
* Defining API routes
* Processing registration requests
* Handling responses
* Starting the backend server

### db.js

Contains the database connection logic used to connect the backend application with MongoDB Atlas.

Separating database connectivity from the main server file keeps the backend organized and easier to maintain.

---

## Data Flow

The registration process follows a complete frontend-to-database flow.

```text
1. User enters registration information
              ↓
2. React manages form state
              ↓
3. Client-side validation is performed
              ↓
4. Frontend sends an HTTP POST request
              ↓
5. Express receives the request
              ↓
6. Backend processes the submitted data
              ↓
7. Password is hashed using bcryptjs
              ↓
8. Backend communicates with MongoDB Atlas
              ↓
9. User document is stored
              ↓
10. Backend returns a response
              ↓
11. Frontend handles the response
```

This demonstrates how a frontend application communicates with a backend service and how the backend interacts with a persistent database.

---

## REST API

The backend exposes REST-style API endpoints for communication with the frontend.

### Backend Health Check

```http
GET /api
```

Used to verify that the backend server is running and responding correctly.

### User Registration

```http
POST /api/signup
```

Receives registration information from the frontend, processes the submitted data, hashes the password, and stores the resulting user information in MongoDB Atlas.

---

## Database Structure

MongoDB stores user information as documents inside a collection.

Conceptually, the stored document contains user registration information such as:

```text
User
│
├── First Name
├── Last Name
├── Gender
├── Date of Birth
├── Email
└── Password Hash
```

MongoDB's document-based structure allows the application to store user records in a flexible JSON-like format.

---

## Security Considerations

The application incorporates basic security practices appropriate for a registration system:

* Passwords are hashed using `bcryptjs`
* Sensitive configuration is managed through environment variables
* Database credentials are not hard-coded into application source files
* `.env` is excluded from version control
* Frontend validation improves input quality
* Backend processing prevents the frontend from directly accessing the database

The database is accessed exclusively through the backend rather than directly from the React application.

---

## Project Structure

```text
Login-Registration-Application/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── db.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Key Development Concepts Demonstrated

This project demonstrates practical implementation of:

* Component-based architecture
* React state management
* Controlled form inputs
* Event handling
* Client-side validation
* Client-side routing
* REST API communication
* HTTP request/response lifecycle
* Express middleware
* JSON request handling
* Cross-origin resource sharing
* Backend request processing
* Password hashing
* Environment-based configuration
* MongoDB database connectivity
* Cloud database storage
* Frontend-backend integration

---

## Implementation Highlights

### Separation of Responsibilities

The application separates responsibilities across three layers:

```text
Frontend
→ User Interface & User Interaction

Backend
→ API & Application Logic

Database
→ Persistent Data Storage
```

This separation makes the application easier to understand, maintain, and extend.

### Reusable React Components

The interface is divided into reusable components instead of implementing the entire application as a single component.

### API-Based Communication

The frontend does not communicate directly with MongoDB. All database operations are performed through the backend API.

### Secure Password Storage

Passwords are hashed before database storage, providing a safer approach than storing plain-text credentials.

### Responsive Design

Tailwind CSS is used to create a responsive interface that adapts to different screen sizes.

---

## Current Scope

The current implementation focuses on the **user interface, registration workflow, frontend validation, backend API integration, password hashing, and MongoDB Atlas persistence**.

The Login interface is included as part of the application UI, while the implemented backend functionality currently centers on user registration and data storage.

---

## Author

**Kiran Shehzadi**

Full-Stack Web Development Project
