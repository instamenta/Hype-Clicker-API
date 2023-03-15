# Hype-Clicker-API

Welcome to the documentation for the Hype Clicker API! This API is a backend REST CRUD API built using Node.js, Express, MongoDB, and Firebase. It provides endpoints for user authentication, NFT management, and more.

Authentication Setup
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

Using the API
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

## Dependencies
The API relies on several dependencies, including:

* bcrypt
* cors
* express
* express-session
* express-validator
* jsonwebtoken
* mongoose
* morgan
* mongodb-store
* passport
* passport-local

## Contributing
If you would like to contribute to the project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bugfix.
3. Implement your changes and make sure the tests pass.
4. Submit a pull request.
