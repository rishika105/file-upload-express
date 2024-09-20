# File Upload with Cloudinary(Express)

## About
This is a mini backend project that demonstrates how to upload files, such as photos and videos, to Cloudinary. The project is built using Node.js, Express.js, and MongoDB, with Cloudinary as the cloud storage provider.

## Features
- File upload functionality (photos and videos)
- Integration with Cloudinary for file storage
- RESTful API for handling file uploads
- MongoDB for managing uploaded file metadata

## Technologies Used
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web framework for building the backend
- **MongoDB** - NoSQL database for storing metadata of uploaded files
- **Cloudinary** - Cloud storage service for handling file uploads

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/rishika105/file-upload-express.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add your MongoDB URI and Cloudinary credentials:
    ```env
    MONGODB_URL=your-mongodb-uri
    CLOUD_NAME=your-cloudinary-cloud-name
    API_KEY=your-cloudinary-api-key
    API_SECRET=your-cloudinary-api-secret
    PORT= 4000
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Endpoints

- **POST /localFileUpload** - Upload a file to Cloudinary and store its metadata in MongoDB.
- **POST /imageUpload** - Upload a image to Cloudinary and store its metadata in MongoDB.
- **POST /videoUpload** - Upload a video to Cloudinary and store its metadata in MongoDB.
- **POST /imageSizeReducer** - Reduce a image size already stored in cloudinary.
