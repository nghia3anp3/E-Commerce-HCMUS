# TechAssist Mall (E-Commerce AI Embedded Website)

## Project Overview

TechAssist Mall is an advanced e-commerce platform specializing in electronic products such as laptops and phones. Our website integrates cutting-edge AI technologies to enhance the user experience with three primary AI applications: Image Search, Semantic Search, and Sentiment Auto-Reply Comment.

## Team Members

- **21120293 - Le Nguyen Trong Nghia**
- **21120255 - Nguyen Dang Nhat Huy**
- **21120291 - Nguyen Duc Nam**
- **21120046 - Le Phan Minh Dat**
- **21120463 - Le Huu Hung**

## Features

### AI Applications

1. **Image Search**: Allows users to upload an image and find similar products in the store.
2. **Semantic Search**: Enables users to search for products using natural language, improving search accuracy and relevance.
3. **Sentiment Auto-Reply Comment**: Automatically analyzes and replies to customer comments based on sentiment analysis, enhancing customer engagement.

## Technologies Used

### Frontend

- **ReactJS**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.

### Backend

- **Python**: Utilized for AI model development and integration.
- **ExpressJS**: A web application framework for Node.js.
- **NodeJS**: A JavaScript runtime built on Chrome's V8 JavaScript engine.

### Database

- **FAISS**: A library for efficient similarity search and clustering of dense vectors.
- **MongoDB**: A NoSQL database for storing product information, user data, and other relevant information.

## Architecture

The project follows the MVC (Model-View-Controller) architecture:

- **Model**: Manages the data, logic, and rules of the application.
- **View**: Represents the UI components and layouts.
- **Controller**: Handles the user input and interactions, updating the model and view accordingly.

## Getting Started

### Prerequisites

- Node.js
- Python
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    https://github.com/nghia3anp3/E-Commerce-HCMUS.git
    ```
2. Navigate to the project directory (open 2 terminal):
    ```sh
    cd E-Commerce-HCMUS
    ```
3. Install frontend dependencies:
    ```sh
    cd frontend
    npm install
    ```
4. Install backend dependencies:
    ```sh
    cd ../backend
    npm install
    pip install -r requirements.txt
    ```

### Running the Application

1. Start the MongoDB server.
2. Start the backend server:
    ```sh
    cd backend
    node server.js
    ```
3. Start the frontend development server:
    ```sh
    cd ../frontend
    npm start
    ```

## Usage

- Navigate to the homepage to browse and search for products.
- Use the image search feature by uploading a picture of the desired product.
- Utilize the semantic search bar for natural language queries.
- Interact with product comments to see AI-powered automatic replies.
