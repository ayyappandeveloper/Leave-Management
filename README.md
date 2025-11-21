📘 Leave Management System – React Project

    A simple role-based leave management system built using React, with sessionStorage authentication, dynamic navbar, and role-specific access.

🔵 Login Page

  Use the following demo credentials:

    Staff Login

    Email: staff@gmail.com

Password: 12345

Student Login

Email: student@gmail.com

Password: 12345

✔ Features

Stores userType and userEmail in sessionStorage

Redirects user to Leave Form after successful login

Basic validation included

🔵 Navbar (Role Based)
Student View

Apply Leave option visible

Staff View

Approve Leave

Reject Leave

View All Leave Applications

Logout

Clears sessionStorage

Redirects to login page

🔵 LeaveForm

Displays leave apply form

Validates inputs

Stores leave applications in state

Shows / hides table depending on user actions

Student sees only their own applications

Staff sees all applications

🔵 Table Component
✔ For Students

Shows only the leaves submitted by the logged-in student

✔ For Staff

Shows all leave applications

Staff can:

Approve

Reject

View detailed popup for long text (reason, comments, etc.)

✔ Popups

Displays long text clearly

Closes when clicking outside
