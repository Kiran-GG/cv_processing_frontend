CV Processing Portal - Frontend (React.js) - Instructions

Note: The frontend and backend have been deployed on AWS.
Frontend URL: [https://main.d6thtuvq60hvo.amplifyapp.com](https://main.d6thtuvq60hvo.amplifyapp.com/)
UserID: recruiter
Password: recruit123

Project Setup Instructions:

1. Prerequisites:
- Node.js and npm should be installed on your system.

2. Clone the Repository:
- git clone <your-repo-url>
- cd cv_portal_frontend

3. Install Dependencies:
- Run: npm install

4. Environment Variables:
- Create a .env file in the root directory of the frontend project.
- Add the following:
  REACT_APP_BACKEND_URL=https://your-backend-url/api

5. Run the Application Locally:
- Run: npm start
- The app will run on http://localhost:3000

6. Build for Production:
- Run: npm run build
- This will generate the production-ready static files in the 'build' directory.

7. Folder Structure:
- src/
  - components/    # Reusable components (e.g., LoginForm, ResumeTable)
  - pages/         # Main pages (e.g., LoginPage, DashboardPage)
  - services/      # API services to connect with backend
  - App.js         # Main component and routes
  - index.js       # Entry point

8. Authentication and Routing:
- JWT-based authentication is used.
- After login, JWT token is stored in localStorage.
- Protected routes check for token before allowing access.

9. Features Implemented:
- Login Page with validation
- Resume upload and listing for recruiters
- Admin-only access to certain features
- View and Download Resume from AWS S3
- Error handling and token expiration handling

10. Deployment:
- Deployed on AWS Amplify
- Amplify builds automatically on each push to main branch
- Make sure to connect your repo to Amplify and configure environment variables

