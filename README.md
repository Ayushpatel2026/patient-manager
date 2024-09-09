
# Patient Manager App

## Overview
The **Patient Manager App** is a web-based platform that simplifies the management of patient appointments and records for clinics. It also allows patients to easily book appointments with their clinic and receive a notification if anything about thier appointment changes. Patients can securely register, request, update, and cancel their appointments, while clinics can manage appointments, schedule them, and notify patients using SMS and email via Twilio. The app is built using **Next.js**, **Appwrite** for backend services such as databases and user authentication, **Tailwind CSS** and **Shadcn** for an elegant user interface, and **Twilio** for messaging services.

## Features

### User Authentication
- **Secure Login & Registration**: Patients can sign up and log in using a secure authentication system powered by Appwrite.

### Patient Features
- **Patient Registration Form**: New patients can register their details using a simple and intuitive form built using React Hook Forms.
- **Appointment Requests and Management**: Patients can request new appointments by selecting their preferred doctor, timeslot and reason for appointment They can also view, update, or cancel their pending or confirmed appointments.
- **Notification System**: Patients will receive SMS and email notifications when their appointments are scheduled or modified by the clinic admin.

### Clinic Admin Features
- **Admin Dashboard**: A special accesscode gives clinics access to an admin dashboard that displays all requested and pending appointments.
- **Schedule Appointments**: Admins can view appointment requests and confirm appointments by scheduling them.
- **Automatic Notifications**: Once an appointment is scheduled, both an SMS and an email are sent to the patient using Twilio.

## Technologies Used

### Frontend
- **Next.js**: For building the web app with server-side rendering and routing.
- **Tailwind CSS & Shadcn**: For styling and creating a clean, modern user interface.
- **Zod**: Used for type validation in all patient and registration forms

### Backend
- **Appwrite**: 
  - **Database**: Manages patients, doctors, and appointment information.
  - **Authentication**: Handles user login and registration

### Messaging & Notifications
- **Twilio API**: Sends SMS and email notifications to patients when their appointments are scheduled or modified (currently SMS notifications are only sent to verified phone numbers since I am using a trial Twilio account).

## Contributing
Feel free to submit issues and pull requests to improve the app.
