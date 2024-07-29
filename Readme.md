# SpeedyDeliver Courier App

Welcome to the SpeedyDeliver Courier App! This application allows users to track shipments, manage deliveries, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Folder Structure](#folder-structure)

## Features

- User Authentication (Login/Register)
- Track Shipments
- Dashboard for Users
- Admin Dashboard for Managing Shipments

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ThushanthaSanju/Courier-App.git
   cd speedydeliver

   ```

2. Install the dependencies:
   npm install

3.To start the development server, run:
npm run dev
This will start the application on http://localhost:3000.

4.To start the frontend, run: use vite
npm run dev
This will start the application on http://localhost:5173.

speedydeliver/frontend
├── public/ # Public assets (index.html, images, etc.)
├── src/ # Source code for the application
│ ├── components/ # Reusable components (Header, Footer, etc.)
│ ├── pages/ # Page components (LoginPage, RegisterPage, Dashboard, etc.)
│ ├── styles/ # CSS and styling files
│ ├── App.tsx # Main App component
│ ├── index.tsx # Entry point of the application
│ └── ... # Other source files
├── .gitignore # Git ignore file
├── package.json # NPM package configuration
├── README.md # This README file
└── ... # Other configuration files

speedydeliver/backend
├── src/ # Source code for the backend
│ ├── controllers/ # Controllers for handling requests
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── services/ # Business logic and services
│ ├── utils/ # Utility functions
│ ├── app.js # Main application file
│ └── ... # Other source files
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # NPM package configuration
├── README.md # This README file
└── ... # Other configuration files
