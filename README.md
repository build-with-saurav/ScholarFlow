# ScholarFlow

ScholarFlow is a full-stack research paper submission and review portal.  
The idea behind this project is simple: participants should be able to submit their research papers online, and admins/reviewers should be able to review those papers, accept or reject them, and give feedback.

## Why I Built This Project

In many academic events or conferences, paper submission and review are usually handled manually through emails or forms. This can become confusing because participants may not know their paper status, and admins may find it difficult to track all submissions.

ScholarFlow solves this by providing one simple platform where:

- Participants can create an account
- Participants can submit research papers
- Admins can review papers
- Admins can accept or reject papers
- Participants can track their paper status

## Final Features

### User Authentication
- Signup
- Signin
- Forgot password basic flow
- Passwords are stored securely using hashing

### Role-Based Access
The role is decided automatically using email:

- Email ending with `@scholar.com` becomes **Admin**
- Any other email becomes **Participant**

Example:

```text
admin@scholar.com  → Admin
student@gmail.com  → Participant
Participant Features
Submit research paper
Upload PDF file
Add title, abstract, keywords, and domain
View submitted papers
Track status: pending, accepted, or rejected
View admin feedback
Admin Features
View all submitted papers
Download/view PDF
Accept paper
Reject paper
Add feedback
View paper status
Database

MySQL is used to store:

User details
Login details
Paper details
Uploaded file path
Paper review status
Admin feedback
Tech Stack Used
Frontend
React
Vite
CSS
Backend
Node.js
Express.js
Database
MySQL
Other Packages
bcrypt.js for password hashing
JWT for authentication
Multer for PDF upload
CORS for frontend-backend connection
Why These Technologies Were Chosen

React was chosen because it makes it easy to build a dynamic and interactive user interface.

Node.js and Express.js were chosen because they are simple and fast for creating backend APIs.

MySQL was chosen because the project needs structured data like users, roles, papers, and review status.

Multer was used because the project requires PDF upload.

JWT was used so that logged-in users can securely access their dashboard.

bcrypt.js was used so passwords are not stored directly in the database.

Project Structure
ScholarFlow/
├── frontend/      React frontend
├── backend/       Node.js and Express backend
├── database/      SQL database backup
└── README.md
How the Project Works
Step 1: User Signup

A user creates an account.
If the email ends with @scholar.com, the system automatically saves the user as admin.
Otherwise, the user is saved as participant.

Step 2: User Signin

The user logs in using email and password.
After login, the system checks the role.

Admin goes to Admin Dashboard
Participant goes to Participant Dashboard
Step 3: Participant Submits Paper

The participant fills paper details and uploads a PDF file.

The submitted paper is saved in the database with default status:

pending
Step 4: Admin Reviews Paper

Admin can view all submitted papers.
Admin can download the PDF, check details, and then accept or reject the paper.

Step 5: Participant Tracks Status

Participant can see whether the paper is:

pending
accepted
rejected

They can also see admin feedback.

Database Tables

Main tables used:

users
papers
password_reset_tokens
How to Run the Project
1. Clone the Repository
git clone <your-repository-link>
cd ScholarFlow
2. Setup Backend
cd backend
npm install
node server.js

Backend runs on:

http://localhost:5000
3. Setup Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
4. Setup Database

Create MySQL database:

CREATE DATABASE scholarflow;

Import SQL file:

mysql -u root -p scholarflow < database/scholarflow.sql
Final Status

This project is a working MVP of a research paper submission and review system.

Completed:

Frontend UI
Backend APIs
MySQL database
Signup/signin
Role-based dashboard
Paper upload
Admin review
Accept/reject system
Feedback system
Future Improvements

These features can be added later:

Email notification after accept/reject
Admin can manage only 5 participants
Search and filter papers
Profile update page
Better reset password through email
Deployment on Vercel/Render
Author

Saurav Kumar Singh
