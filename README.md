# Calendar Application for Communication Tracking

## Overview

This is a **React-based Calendar Application** developed to track communications with companies, ensuring timely follow-ups and better engagement management. The application allows users to visualize, manage, and perform communication tasks while providing insightful reports on communication effectiveness.

### Modules

- **Admin Module**: Allows administrators to set up companies and communication methods.
- **User Module**: Provides users a dashboard and calendar to manage and view communications.
- **Reporting and Analytics Module** (Optional): Offers actionable insights on communication performance and trends.

## Features

### Admin Module

- **Company Management**: Admins can add, edit, and delete companies. Each company has:
  - Name
  - Location
  - LinkedIn Profile
  - Emails
  - Phone Numbers
  - Comments
  - Communication Periodicity

- **Communication Method Management**: Admins can configure communication methods, including:
  - Name (e.g., LinkedIn Post, Email)
  - Description
  - Sequence
  - Mandatory Flag

### User Module

- **Dashboard**:
  - Lists companies with their latest communications and next scheduled communication.
  - Color-coded highlights:
    - Red: Overdue communication
    - Yellow: Communication due today
  - Users can disable/override highlights.

- **Interactive Features**:
  - Hover to view comments on past communications.
  - Select a company or multiple companies to log a communication, with the option to add type, date, and notes.

- **Notifications**:
  - Displays overdue and due communications.
  - Badge on notification icon indicates overdue or due communications.

- **Calendar View**:
  - Visualizes past and upcoming communications.
  - Allows users to manage and track communication schedules.



## Setup and Deployment Instructions

### Prerequisites

Ensure you have **Node.js** and **npm** installed:
- [Download Node.js](https://nodejs.org/)

### Steps to Run the Project Locally

1. **Clone the Repository**:
   
   git clone https://github.com/your-username/calendar-app.git


### Application Functionality
Admin Module
Admins configure companies and communication methods.
Admins set up communication intervals and mandatory sequences.
User Module
Users interact with the dashboard and calendar to manage communications.
Users can log new communications and see past ones with tooltips.


### Known Limitations
Data Persistence: Currently, there is no backend or database, meaning data will be lost on refresh. A backend integration is needed for permanent data storage.
Browser Compatibility: The app is optimized for modern browsers; older browsers may have limited support.
Limited Reporting: Reporting features are optional and may require additional configuration or enhancements for advanced reporting capabilities.
