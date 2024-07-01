### School Management Portal
Project Overview
The School Management Portal is a web application that enables the management of students, teachers, and administrative users in a school setting. The portal allows for CRUD (Create, Read, Update, Delete) operations on student and teacher data, provides search functionality, and includes authentication for administrators.

Architecture
The application follows a full-stack architecture with a React.js frontend, Java Spring Boot backend, and MongoDB as the database and the frontend interacts with the backend through RESTful APIs.

Components
Frontend: React.js, Axios, React Router, Bootstrap.
Backend: Spring Boot, Spring Data MongoDB, Maven.
Database: MongoDB (hosted on MongoDB Atlas)
IDE: Visiual Studio Code[F.E], Spring ToolSuite[Backend].
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### 'Spring Boot Application'
Main Class: SchoolManagementProjApplication
Controllers: PostController
Repositories: FetchRepository, SearchRepository, StudentUpdateRepo, TeacherRepository, TeacherSearch, AdminRepo
Models: FetchData, FetchTeachersData, Subject, FetchAdminData
Key Functionalities
Fetching all students and teachers
Searching students and teachers by text
Updating and deleting student and teacher records
Creating new student and teacher records
Fetching student and teacher details by ID
Admin login verification
API Endpoints
GET /Student: Fetch all students
GET /Teachers: Fetch all teachers
GET /Student/search/{text}: Search students
GET /Teachers/search/{text}: Search teachers
PUT /Student/{_id}: Update student details
DELETE /Student/{_id}: Delete student record
PUT /Teachers/{_id}: Update teacher details
DELETE /Teachers/{_id}: Delete teacher record
POST /Student: Create a new student
POST /Teachers: Create a new teacher
GET /Student/{studentId}: Get student by ID
GET /Teachers/{teacherId}: Get teacher by ID
GET /Admin: Fetch all admin users for login verification

### Frontend Details
React Application
Main Component: App.js
Components: Home, AdminLogin, AdminDashboard, StudentsSection, TeachersSection, InsertData
Routing: Implemented using React Router
HTTP Requests: Handled using Axios
Key Functionalities
Admin login and authentication
Viewing and managing students and teachers
Inserting new student and teacher data
Updating and deleting existing records



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
### Usage Instructions
Admin Login:

Navigate to the Admin Login page.
Enter the admin username and password to log in.
If credentials are valid, you will be redirected to the Admin Dashboard.
Managing Students:

From the Admin Dashboard, navigate to the Students Section.
View the list of students, search, update, or delete records.
Insert new student data using the Insert Data form.
Managing Teachers:

From the Admin Dashboard, navigate to the Teachers Section.
View the list of teachers, search, update, or delete records.
Insert new teacher data using the Insert Data form.
### Future Improvements
Implement authentication and authorization for different user roles (e.g., teachers, students).
Enhance the UI with additional features and improve responsiveness.
Add automated testing for both frontend and backend components.
Integrate more advanced search functionalities.
Implement real-time notifications and updates.


