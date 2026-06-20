# ScholarFlow

ScholarFlow is a full-stack research paper submission and review portal built to simplify the academic paper submission and review process.

It allows participants to submit research papers online and lets admins review, accept, or reject them with proper feedback.

---

## Project Overview

Traditional conference paper submission is often handled through email, spreadsheets, or forms, making the process messy and difficult to track.

ScholarFlow solves this problem by creating one central platform where:

* Participants can register and submit papers
* Admins can review submissions
* Papers can be accepted or rejected
* Feedback can be shared directly

---

## Features

### Authentication System

* User Signup
* User Signin
* Password hashing using bcrypt
* JWT authentication

### Role-Based System

Users are assigned roles automatically:

| Email Type      | Role        |
| --------------- | ----------- |
| `@scholar.com`  | Admin       |
| Any other email | Participant |

Example:

[admin@scholar.com](mailto:admin@scholar.com) → Admin
[student@gmail.com](mailto:student@gmail.com) → Participant

---

## Participant Features

* Create account
* Login
* Submit research papers
* Upload PDF files
* Add title, abstract, keywords, and domain
* View submitted papers
* Track submission status
* View admin feedback

---

## Admin Features

* View all submitted papers
* Review paper details
* Accept papers
* Reject papers
* Add feedback
* Manage submissions

---

## Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Additional Libraries

* bcrypt.js
* jsonwebtoken
* multer
* cors

---

## Project Structure

```text
ScholarFlow/
│── frontend/
│── backend/
│── database/
│── README.md
```

---

## How It Works

### Step 1: Signup

Users create an account.

If email ends with `@scholar.com`, they become admin.

Otherwise, participant.

---

### Step 2: Login

After login:

* Admin → Admin Dashboard
* Participant → Participant Dashboard

---

### Step 3: Paper Submission

Participant submits:

* Title
* Abstract
* Domain
* Keywords
* PDF

Status is automatically set:

pending

---

### Step 4: Review Process

Admin can:

* Review papers
* Accept or reject
* Add feedback

---

### Step 5: Status Tracking

Participant can track:

* Pending
* Accepted
* Rejected

and read admin feedback.

---

## Database Tables

Main tables:

* users
* papers
* password_reset_tokens

---

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/SauravB210489CS/ScholarFlow.git
cd ScholarFlow
```

---

### Backend Setup

```bash
cd backend
npm install
node server.js
```

Runs on:

http://localhost:5000

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on:

http://localhost:5173

---

### Database Setup

Create database:

```sql
CREATE DATABASE scholarflow;
```

Import:

```bash
mysql -u root -p scholarflow < database/scholarflow.sql
```

---

## Future Improvements

* Email notifications
* Search and filter papers
* Reviewer assignment system
* Profile update
* Better analytics dashboard
* Deployment support

---

## Author

**Saurav Kumar Singh**
