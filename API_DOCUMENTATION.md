# Campy Backend API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Endpoints

### 1. Sign Up
**POST** `/auth/sign-up`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Sign In
**POST** `/auth/sign-in`

Login to an existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User signed in successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Sign Out
**POST** `/auth/sign-out`

Logout from account (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User signed out successfully"
}
```

---

## User Endpoints

### 1. Get All Users
**GET** `/users`

Retrieve all users.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "kudos": 0,
      "coursesEnrolled": [
        {
          "courseId": {...},
          "enrolledAt": "2026-01-20T10:30:00.000Z"
        }
      ],
      "createdAt": "2026-01-20T10:30:00.000Z",
      "updatedAt": "2026-01-20T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get User by ID
**GET** `/users/:id`

Retrieve a specific user by ID.

**Parameters:**
- `id` (string) - User ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "kudos": 0,
    "coursesEnrolled": []
  }
}
```

---

### 3. Get User's Courses
**GET** `/users/:id/courses`

Retrieve all courses enrolled by a user.

**Parameters:**
- `id` (string) - User ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User courses retrieved successfully",
  "data": [
    {
      "courseId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "React Basics"
      },
      "enrolledAt": "2026-01-20T10:30:00.000Z",
      "completedAt": null
    }
  ]
}
```

---

### 4. Create User
**POST** `/users`

Create a new user (admin only).

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

---

### 5. Update User
**PUT** `/users/:id`

Update user details (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.new@example.com",
  "kudos": 50
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john.new@example.com",
    "kudos": 50
  }
}
```

---

### 6. Delete User
**DELETE** `/users/:id`

Delete a user (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Course Endpoints

### 1. Get All Courses
**GET** `/courses`

Retrieve all active courses.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "courseId": "REACT101",
      "title": "React Basics",
      "description": "Learn React from scratch",
      "duration": 20,
      "price": 49.99,
      "instructor": {
        "_id": "507f1f77bcf86cd799439001",
        "name": "John Instructor",
        "email": "instructor@example.com"
      },
      "lessons": ["507f1f77bcf86cd799439020", "507f1f77bcf86cd799439021"],
      "category": "Web Development",
      "level": "Beginner",
      "enrollments": 15,
      "isActive": true,
      "createdAt": "2026-01-20T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Course by ID
**GET** `/courses/:id`

Retrieve a specific course.

**Parameters:**
- `id` (string) - Course ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "courseId": "REACT101",
    "title": "React Basics",
    "description": "Learn React from scratch",
    "duration": 20,
    "price": 49.99,
    "lessons": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "title": "Introduction to React",
        "content": "React basics...",
        "order": 1
      }
    ]
  }
}
```

---

### 3. Get User's Courses
**GET** `/courses/user/:userId`

Get all courses enrolled by a specific user.

**Parameters:**
- `userId` (string) - User ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User courses retrieved successfully",
  "data": [
    {
      "courseId": {...},
      "enrolledAt": "2026-01-20T10:30:00.000Z",
      "completedAt": null
    }
  ]
}
```

---

### 4. Create Course
**POST** `/courses`

Create a new course (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "courseId": "REACT101",
  "title": "React Basics",
  "description": "Learn React from scratch with practical examples",
  "duration": 20,
  "instructor": "507f1f77bcf86cd799439001",
  "price": 49.99,
  "category": "Web Development",
  "level": "Beginner",
  "thumbnail": "https://example.com/image.jpg"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "courseId": "REACT101",
    "title": "React Basics"
  }
}
```

---

### 5. Update Course
**PUT** `/courses/:id`

Update course details (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced React",
  "price": 79.99
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {...}
}
```

---

### 6. Delete Course
**DELETE** `/courses/:id`

Delete a course (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

---

### 7. Enroll in Course
**POST** `/courses/:courseId/enroll`

Enroll a user in a course (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully enrolled in course",
  "data": {
    "enrollment": {
      "courseId": "507f1f77bcf86cd799439012",
      "enrolledAt": "2026-01-20T10:30:00.000Z"
    }
  }
}
```

---

### 8. Unenroll from Course
**POST** `/courses/:courseId/unenroll`

Remove user from a course (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Successfully unenrolled from course"
}
```

---

### 9. Cancel Course
**PUT** `/courses/:id/cancel`

Mark a course as inactive (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course cancelled successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "isActive": false
  }
}
```

---

## Lesson Endpoints

### 1. Get All Lessons
**GET** `/lessons`

Retrieve all lessons.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Lessons retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "lessonId": "REACT101-L1",
      "courseId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "React Basics"
      },
      "title": "Introduction to React",
      "content": "React is a JavaScript library for...",
      "duration": 45,
      "videoUrl": "https://example.com/video.mp4",
      "order": 1,
      "isPublished": true
    }
  ]
}
```

---

### 2. Get Lessons by Course
**GET** `/lessons/course/:courseId`

Get all lessons for a specific course.

**Parameters:**
- `courseId` (string) - Course ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course lessons retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "lessonId": "REACT101-L1",
      "title": "Introduction to React",
      "order": 1
    }
  ]
}
```

---

### 3. Get Lesson by ID
**GET** `/lessons/:id`

Retrieve a specific lesson.

**Parameters:**
- `id` (string) - Lesson ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Lesson retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "lessonId": "REACT101-L1",
    "title": "Introduction to React",
    "content": "React is a JavaScript library...",
    "duration": 45,
    "videoUrl": "https://example.com/video.mp4"
  }
}
```

---

### 4. Create Lesson
**POST** `/lessons`

Create a new lesson (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "lessonId": "REACT101-L1",
  "courseId": "507f1f77bcf86cd799439012",
  "title": "Introduction to React",
  "content": "React is a JavaScript library for building user interfaces...",
  "duration": 45,
  "videoUrl": "https://example.com/video.mp4",
  "order": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Lesson created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "lessonId": "REACT101-L1",
    "title": "Introduction to React"
  }
}
```

---

### 5. Update Lesson
**PUT** `/lessons/:id`

Update lesson details (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Advanced React Concepts",
  "duration": 60
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Lesson updated successfully",
  "data": {...}
}
```

---

### 6. Delete Lesson
**DELETE** `/lessons/:id`

Delete a lesson (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Lesson deleted successfully"
}
```

---

## Progress Endpoints

### 1. Get Course Progress
**GET** `/progress/:userId/:courseId`

Get user's progress for a specific course.

**Parameters:**
- `userId` (string) - User ID
- `courseId` (string) - Course ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Progress retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "userId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439012",
    "completedLessons": [
      {
        "lessonId": "507f1f77bcf86cd799439020",
        "completedAt": "2026-01-20T11:00:00.000Z"
      }
    ],
    "overallProgress": 50,
    "isCompleted": false,
    "completedAt": null
  }
}
```

---

### 2. Get All User Progress
**GET** `/progress/user/:userId`

Get all courses progress for a user.

**Parameters:**
- `userId` (string) - User ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "All progress retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "userId": "507f1f77bcf86cd799439011",
      "courseId": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "React Basics"
      },
      "overallProgress": 50,
      "isCompleted": false
    }
  ]
}
```

---

### 3. Complete Lesson
**POST** `/progress/complete-lesson`

Mark a lesson as completed.

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "lessonId": "507f1f77bcf86cd799439020"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Lesson marked as completed",
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "completedLessons": [...],
    "overallProgress": 100,
    "isCompleted": true,
    "completedAt": "2026-01-20T12:00:00.000Z"
  }
}
```

---

### 4. Reset Progress
**POST** `/progress/reset`

Reset user's progress for a course.

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Progress reset successfully",
  "data": {
    "overallProgress": 0,
    "isCompleted": false,
    "completedLessons": []
  }
}
```

---

### 5. Get Course Statistics
**GET** `/progress/course/:courseId/stats`

Get completion statistics for a course.

**Parameters:**
- `courseId` (string) - Course ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course statistics retrieved successfully",
  "data": {
    "totalEnrolled": 25,
    "completed": 5,
    "inProgress": 15,
    "notStarted": 5,
    "averageProgress": 42
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided. Please login."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

The API enforces rate limiting to prevent abuse:
- **Limit**: 100 requests per 15 minutes per IP
- **Header**: `X-RateLimit-Remaining` shows remaining requests

---

## Security Notes

1. Always use HTTPS in production
2. Keep JWT tokens secure
3. Never expose sensitive data in responses
4. Validate all input data on the client side
5. Use strong passwords
6. Tokens expire after 7 days

---

## Quick Start Examples

### 1. Sign Up and Get Token
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Get All Courses
```bash
curl -X GET http://localhost:3000/api/v1/courses
```

### 3. Enroll in Course (with token)
```bash
curl -X POST http://localhost:3000/api/v1/courses/507f1f77bcf86cd799439012/enroll \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011"
  }'
```

### 4. Complete a Lesson
```bash
curl -X POST http://localhost:3000/api/v1/progress/complete-lesson \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439012",
    "lessonId": "507f1f77bcf86cd799439020"
  }'
```

---

## Support

For issues or questions, contact the development team.

Last Updated: January 20, 2026
