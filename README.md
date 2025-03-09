# FileUploader

## Overview

FileUploader is a web application that allows users to upload and download files. The application uses Cloudflare R2 for cloud storage, a PostgreSQL database for storing file metadata, and TypeORM as the ORM. The frontend is built with React and TypeScript, and the backend is built with Express and TypeScript.

## Features

- Upload files to Cloudflare R2
- Download files from Cloudflare R2
- List all uploaded files
- Simple and clean user interface

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects

### Backend

- **Express**: A minimal and flexible Node.js web application framework
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files
- **Cloudflare R2**: A cloud storage service for storing files
- **PostgreSQL**: A powerful, open-source object-relational database system
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5)


## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Backend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/FileUploader.git
    cd FileUploader/server
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the `server` directory and add your environment variables:
    ```env
    R2_ACCESS_KEY_ID=your_access_key_id
    R2_SECRET_ACCESS_KEY=your_secret_access_key
    R2_BUCKET_NAME=your_bucket_name
    R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
    PORT=3001
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    ```

4. **Start the backend server**:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. **Navigate to the `client` directory**:
    ```sh
    cd ../client
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Start the frontend development server**:
    ```sh
    npm run dev
    ```

4. **Open the application** in your browser:
    Navigate to `http://localhost:3000` to see the application in action.

## Usage

1. **Upload a file**:
    - Use the file input to select a file.
    - Click the "Upload" button.
    - Verify that the status message shows "File uploaded successfully" if the upload is successful.

2. **Download a file**:
    - After uploading a file, it should appear in the list of uploaded files.
    - Click the "Download" button next to the file name.
    - Verify that the file is downloaded to your computer.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

