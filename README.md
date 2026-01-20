# Campy Backend - Courses App API

A production-ready backend for a comprehensive courses application built with Node.js, Express, and MongoDB.

## Features

- ✅ **User Management** - Sign up, login, profile management
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Course Management** - Create, update, delete courses
- ✅ **Lesson Management** - Organize lessons within courses
- ✅ **Enrollment System** - Users can enroll/unenroll from courses
- ✅ **Progress Tracking** - Track lesson completion and course progress
- ✅ **Input Validation** - Comprehensive request validation
- ✅ **Error Handling** - Centralized error management
- ✅ **Security** - Helmet, CORS, rate limiting
- ✅ **Logging** - Morgan HTTP request logger
- ✅ **API Documentation** - Swagger/OpenAPI + Markdown docs

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, bcryptjs, express-rate-limit
- **Validation**: express-validator
- **Logging**: Morgan
- **Development**: Nodemon

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd campy-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create `.env.development.local` and `.env.production.local` files:

```env
PORT=3000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/campy
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=*
```

4. **Start the server**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Project Structure

```
campy-backend/
├── app.js                 # Express app setup
├── config/
│   └── env.js            # Environment variables
├── database/
│   └── mongodb.js        # MongoDB connection
├── models/
│   ├── user.model.js     # User schema
│   ├── course.model.js   # Course schema
│   ├── lesson.model.js   # Lesson schema
│   └── progress.model.js # Progress schema
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── course.controller.js
│   ├── lesson.controller.js
│   └── progress.controller.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── course.routes.js
│   ├── lesson.routes.js
│   └── progress.routes.js
├── middleware/
│   └── auth.middleware.js
├── utils/
│   ├── responseHandler.js
│   ├── errorHandler.js
│   └── validators.js
├── package.json
├── API_DOCUMENTATION.md   # Detailed API docs
└── swagger.json           # OpenAPI specification
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/sign-up` - Register new user
- `POST /api/v1/auth/sign-in` - Login user
- `POST /api/v1/auth/sign-out` - Logout user

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `GET /api/v1/users/:id/courses` - Get user's courses
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Courses
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get course by ID
- `GET /api/v1/courses/user/:userId` - Get user's courses
- `POST /api/v1/courses` - Create course (auth required)
- `PUT /api/v1/courses/:id` - Update course (auth required)
- `DELETE /api/v1/courses/:id` - Delete course (auth required)
- `POST /api/v1/courses/:courseId/enroll` - Enroll in course (auth required)
- `POST /api/v1/courses/:courseId/unenroll` - Unenroll from course (auth required)
- `PUT /api/v1/courses/:id/cancel` - Cancel course (auth required)

### Lessons
- `GET /api/v1/lessons` - Get all lessons
- `GET /api/v1/lessons/course/:courseId` - Get lessons by course
- `GET /api/v1/lessons/:id` - Get lesson by ID
- `POST /api/v1/lessons` - Create lesson (auth required)
- `PUT /api/v1/lessons/:id` - Update lesson (auth required)
- `DELETE /api/v1/lessons/:id` - Delete lesson (auth required)

### Progress
- `GET /api/v1/progress/:userId/:courseId` - Get course progress
- `GET /api/v1/progress/user/:userId` - Get all user progress
- `POST /api/v1/progress/complete-lesson` - Mark lesson as completed
- `POST /api/v1/progress/reset` - Reset course progress

For detailed endpoint documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Getting a Token
1. Sign up or login to get a token
2. Include the token in request headers:
```
Authorization: Bearer <your_token>
```

### Token Expiry
Tokens expire after 7 days. Users need to re-login to get a new token.

## Security Features

- **Password Hashing** - Passwords are hashed using bcryptjs
- **CORS** - Cross-Origin Resource Sharing configured
- **Helmet** - Secure HTTP headers
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - All inputs validated using express-validator
- **JWT** - Secure token-based authentication
- **Error Handling** - No sensitive information exposed in errors

## Database Models

### User
- name, email, password, kudos
- coursesEnrolled (array of enrollments with progress)
- timestamps

### Course
- courseId, title, description, duration
- instructor (reference to User)
- lessons (array of Lesson references)
- price, category, level, thumbnail
- enrollments count, isActive
- timestamps

### Lesson
- lessonId, courseId (reference to Course)
- title, content, duration, videoUrl
- order, isPublished
- timestamps

### Progress
- userId, courseId (references)
- completedLessons (array with timestamps)
- overallProgress (0-100), isCompleted
- timestamps

## Rate Limiting

The API enforces rate limiting to prevent abuse:
- **Limit**: 100 requests per 15 minutes per IP address
- **Applied to**: All `/api/` routes

## Error Handling

The API returns standard error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Testing Endpoints

### Using cURL

**Sign Up:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get All Courses:**
```bash
curl -X GET http://localhost:3000/api/v1/courses
```

**Create Course (with auth):**
```bash
curl -X POST http://localhost:3000/api/v1/courses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "courseId": "REACT101",
    "title": "React Basics",
    "description": "Learn React from scratch",
    "duration": 20,
    "instructor": "INSTRUCTOR_ID",
    "price": 49.99
  }'
```

### Using Postman
1. Import the `swagger.json` file into Postman
2. Set your base URL to `http://localhost:3000/api/v1`
3. Test endpoints with provided examples

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development, production |
| `DB_URI` | MongoDB connection | mongodb://localhost:27017/campy |
| `JWT_SECRET` | JWT secret key | your_secret_key |
| `CORS_ORIGIN` | CORS allowed origin | * or specific domain |

## Development

### Start Development Server
```bash
npm run dev
```
The server will auto-reload on file changes.

### Lint Code
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

## Deployment

### Heroku Deployment
```bash
heroku create campy-backend
heroku config:set DB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check DB_URI in environment variables
- Verify network access if using MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### JWT Token Issues
- Ensure JWT_SECRET is set correctly
- Check token expiration (7 days)
- Verify token format in Authorization header

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@campy.com or create an issue in the repository.

## API Documentation

Full API documentation is available in:
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Detailed endpoint docs
- `swagger.json` - OpenAPI specification for Swagger UI

---

**Last Updated**: January 20, 2026
**Version**: 1.0.0
