# FAQ Backend API

## Description

This is a backend API for managing Frequently Asked Questions (FAQs). It allows users to add, edit, delete, and retrieve FAQs, along with translations using an external translation service. The project uses Node.js, Express, MongoDB (via Mongoose), and Redis for caching.

---

## Installation

### Prerequisites

- Node.js installed on your machine
- MongoDB database instance (local or cloud-based, e.g., MongoDB Atlas)
- Redis instance for caching translations
- `.env` file configured with `MONGOOSE_URI` and `PORT`

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```sh
   MONGOOSE_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Start the Redis server (ensure Redis is installed):
   ```sh
   redis-server
   ```
5. Run the application:
   ```sh
   npm start
   ```

---

## API Usage

### **1. Get All FAQs**

- **Endpoint:** `GET /faq`
- **Response:**
  ```json
  {
    "faqs": [
      {
        "_id": "123",
        "question": "What is Node.js?",
        "answer": "Node.js is a JavaScript runtime."
      }
    ]
  }
  ```

### **2. Get Translated FAQs**

- **Endpoint:** `GET /faq/:lang`
- **Example:** `GET /faq/es` (fetches FAQs translated to Spanish)
- **Response:**
  ```json
  {
    "faqs": [
      {
        "id": "123",
        "question": "¿Qué es Node.js?",
        "answer": "Node.js es un entorno de ejecución de JavaScript."
      }
    ]
  }
  ```

### **3. Add a New FAQ**

- **Endpoint:** `POST /add`
- **Request Body:**
  ```json
  {
    "question": "What is Express.js?",
    "answer": "Express.js is a web framework for Node.js."
  }
  ```
- **Response:**
  ```json
  {
    "msg": "added successfully",
    "result": { ... }
  }
  ```

### **4. Update an Existing FAQ**

- **Endpoint:** `PUT /:id/edit`
- **Request Body:**
  ```json
  {
    "question": "Updated question?",
    "answer": "Updated answer."
  }
  ```
- **Response:**
  ```json
  {
    "updatedFaq": { ... }
  }
  ```

### **5. Delete an FAQ**

- **Endpoint:** `DELETE /:id/delete`
- **Response:**
  ```json
  {
    "msg": "Faq deleted Successfully"
  }
  ```

---

## Project Structure

```
├── model
│   ├── faqdb.js         # Mongoose Schema for FAQ
├── routes
│   ├── admin.js         # Admin routes
│   ├── user.js          # User routes
├── .env                 # Environment variables
├── server.js            # Main server file
└── package.json         # Project metadata and dependencies
```






