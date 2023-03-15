# Hype-Clicker-API

Welcome to the documentation for the Hype Clicker API! This API is a backend REST CRUD API built using Node.js, Express, MongoDB, and Render. It provides endpoints for user authentication, NFT management, and more.

## Introduction

The Hype Clicker API is a backend REST CRUD API built using Node.js, Express, and MongoDB for cloud hosting on Firebase. The API allows for the creation and management of users and NFTs, with user authentication using JWT, Passport, and Bcrypt. The project features a modular architecture with controllers, middlewares, models, routes, services, and utils directories. Additionally, the app is containerized using Docker and Docker Compose. This project is suitable for developers who want to build a scalable and secure backend API for their web or mobile application.

## Authentication Setup
1. Begin by cloning the repository onto your local machine by running the command **`git clone https://github.com/instamenta/Hype-Clicker-API.git`** in your terminal.

2. Navigate to the project directory using **`cd Hype-Clicker-API`**.

3. Install the required dependencies by running the command **`npm install`**.

4. Create a new Firebase project by visiting the Firebase console, and clicking the "Add Project" button. Follow the prompts to set up your new project.

5. From the Firebase console, go to the "Authentication" tab and enable the "Email/Password" sign-in method.

6. Create a new file in the root directory of the project called **`.env`**. In this file, add the following environment variables:
```
SESSION_SECRET=secret
JWT_SECRET=secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_FIREBASE_PRIVATE_KEY\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=your_client_email
MONGO_URL=mongodb://mongo:27017/myapp
```
Replace the values of `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, and `MONGO_URL` with your own values.

7. Run the app and MongoDB using Docker Compose by running the command docker-compose up. This will start the app and MongoDB containers.

8. Once the containers are running, navigate to http://localhost:5000 in your web browser to confirm that the app is running.

## Using the API
1. The API consists of three main routes for user authentication, NFT-related actions, and user-related actions.

2. To authenticate a user, send a POST request to /api/auth/login with an email and password in the request body. The server will respond with a JWT token if the credentials are correct.

3. To create a new user, send a POST request to /api/users/register with a username, email, and password in the request body.

4. To get all NFTs, send a GET request to /api/nfts.

5. To get a specific NFT, send a GET request to /api/nfts/:id with the ID of the NFT in the URL.

6. To create a new NFT, send a POST request to /api/nfts with the details of the NFT in the request body.

7. To update an existing NFT, send a PUT request to /api/nfts/:id with the ID of the NFT in the URL and the updated details in the request body.

8. To delete an existing NFT, send a DELETE request to /api/nfts/:id with the ID of the NFT in the URL.

9. To get all users, send a GET request to /api/users.

10. To get a specific user, send a GET request to /api/users/:id with the ID of the user in the URL.

11. To update an existing user, send a PUT request to /api/users/:id with the ID of the user in the URL and the updated details in the request body.

12. To delete an existing user, send a DELETE request to /api/users/:id with the ID of the user in the URL.

## Additional Notes
The app uses Bcrypt to hash user passwords before storing them in the database.

The `auth.middleware.js` middleware is used to protect routes that require authentication.

The `error.middleware.js` middleware is used to handle errors and send appropriate responses to the client.

The `jwt.utils.js`utility module contains functions for generating and verifying JWT tokens.

The validation.utils.js utility module contains functions for validating input data before processing it.

The Firebase SDK is used to connect to Firebase and use Firebase services, such as Firestore for storing data.

### To run the app locally, you will need to follow these steps:

1. Clone the repository from GitHub: git clone `https://github.com/instamenta/Hype-Clicker-API.git`

2. Install Node.js and npm on your machine if you haven't already.

3. Install the necessary dependencies by running `npm install` in the root directory of the project.

4. Create a Firebase project and enable Firestore.

5. Create a .env file in the root directory of the project and add the necessary environment variables as shown in the .env.example file.

6. Start the app by running npm start in the root directory of the project.

7. Use a tool like Postman to test the app's endpoints.

### To deploy the app to Firebase, you will need to follow these steps:

1. Create a Firebase project and enable Firestore.

2. Add the necessary environment variables to your Firebase project as shown in the `.env.example` file.

3. Install the Firebase CLI on your machine if you haven't already.

4. Run `firebase login` to authenticate with your Firebase account.

5. Run `firebase init` in the root directory of the project to initialize a Firebase project.

6. Follow the prompts to select the Firebase project you created earlier and set up Firebase hosting.

7. Run `firebase deploy` to deploy the app to Firebase hosting.

8. Use a tool like Postman to test the app's endpoints.

Note that you may need to modify the app's source code to suit your specific needs, such as changing the data models or adding new functionality. You should also review the app's security practices and ensure that they are suitable for your use case.

## Architecture
The project follows the MVC (Model-View-Controller) architecture, where:

* **Models** - are responsible for interacting with the database and handling data.
* **Views** - are not used in this project, as it is an API.
* **Controllers** - handle the requests and responses from the clients by communicating with the models.
* **Routes** - define the URLs and HTTP methods for the endpoints that the controllers will handle.

The project structure is as follows:

```
project
├── controllers/
│   ├── auth.controller.js    # Controller for authentication-related routes
│   ├── nft.controller.js     # Controller for NFT-related routes
│   └── user.controller.js    # Controller for user-related routes
├── middlewares/
│   ├── auth.middleware.js    # Middleware for authentication
│   └── error.middleware.js   # Middleware for error handling
├── models/
│   ├── nft.model.js          # Model for NFT documents
│   └── user.model.js         # Model for user documents
├── routes/
│   ├── auth.routes.js        # Routes for authentication
│   ├── nft.routes.js         # Routes for NFT-related actions
│   └── user.routes.js        # Routes for user-related actions
├── services/
│   └── auth.service.js       # Service for authentication
├── utils/
│   ├── jwt.utils.js          # Utility functions related to JWT
│   └── validation.utils.js   # Utility functions related to input validation
├── index.js                  # Main Express app setup and Firebase configuration
├── Dockerfile                # Dockerfile for containerizing the app
├── docker-compose.yml        # Docker Compose configuration for running the app and MongoDB
├── package.json
├── .env.example
├── store.js                  # configure the MongoDB Session Store
├── .env                      
├── README.md
└── .gitignore
```
## Authentication
Authentication is a key component of any web application, and it's no different for our Hype Clicker API. We've implemented authentication using JSON Web Tokens (JWT) and Passport, a popular authentication middleware for Node.js.

### JWT
JWT is a widely used standard for representing claims securely between two parties. It's a compact and self-contained way of transmitting information between parties as a JSON object. JWTs are used for authentication and authorization purposes and can contain a variety of claims, including the user's identity and metadata.

In our app, when a user logs in or signs up, they receive a JWT, which is then used for subsequent requests. The JWT contains information such as the user's ID and email, which can be used to verify the user's identity on the server.

### Passport
Passport is a middleware for Node.js that handles user authentication. It provides a flexible and modular way to implement authentication in your app. Passport has a vast number of authentication strategies available, including local authentication, social authentication, and more.

In our app, we're using Passport with the JWT strategy. The JWT strategy authenticates users based on the JWT present in the request's Authorization header. If the JWT is valid, Passport will add the user object to the request object, and the request will continue to the next middleware or route handler.

### Implementation
In our app, the authentication-related code is organized into three main components: the routes, controllers, and middleware.

### Routes
The authentication routes are defined in auth.routes.js. These routes handle user login, signup, and logout. The routes are protected by Passport middleware that requires a valid JWT to access.

### Controllers
The authentication controllers are defined in auth.controller.js. These controllers handle the logic for user authentication, including validating user input, creating new users, and generating and sending JWTs.

### Middleware
The authentication middleware is defined in auth.middleware.js. This middleware is responsible for authenticating the user by verifying the JWT present in the request header. If the JWT is valid, it will add the user object to the request object and continue to the next middleware or route handler. If the JWT is invalid, the middleware will return an error response.

### Usage
To use our authentication system, you can follow these steps:

1. Register a new user by sending a POST request to /auth/register with a JSON payload containing the user's email and password.

2. Log in with an existing user by sending a POST request to /auth/login with a JSON payload containing the user's email and password. This will return a JWT.

3. Include the JWT in subsequent requests to protected routes by including it in the Authorization header as a Bearer token.

4. To log out, send a POST request to /auth/logout. This will invalidate the user's JWT and log them out.

That's it! With these steps, you can start using our authentication system in your app.

## Requirements
* Node.js
* Express
* Express-Router
* Express-Validator
* Express-Session
* Morgan
* CORS
* Passport
* MongoDB
* Mongoose
* Firebase
* Docker
* Docker Compose
* Bcrypt

## Dependencies

* bcrypt: ^5.1.0
* connect-mongodb-session: ^3.1.1
* cors: ^2.8.5
* dotenv: ^16.0.3
* express: ^4.18.2
* express-router: ^0.0.1
* express-session: ^1.17.3
* express-validator: ^6.15.0
* firebase-admin: ^11.5.0
* jsonwebtoken: ^9.0.0
* mongodb: ^5.1.0
* mongoose: ^7.0.1
* morgan: ^1.10.0
* node: ^19.6.1
* nodemon: ^2.0.21
* passport: ^0.6.0
* passport-jwt: ^4.0.1
* passport-local: ^1.0.0


## Contributing
If you would like to contribute to the project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bugfix.
3. Implement your changes and make sure the tests pass.
4. Submit a pull request.

## To conclude
The Hype Clicker API is suitable for developers who want to build their own web or mobile application backend API. If you have any questions or feedback, please feel free to reach out through my GitHub repository. Thank you for using the Hype Clicker API!
