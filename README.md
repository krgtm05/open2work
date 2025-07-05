# open2work

   -------------------------------------------
   [Role Selection] → [Signup] → [Login] → [Check profile?]
                                                ↓ Yes → Dashboard
                                                ↓ No  → Profile Setup
------------------------------------------

1. User fills **login form** (email + password) in your React frontend
2. Frontend sends login request to backend `/login` endpoint
3. Backend validates credentials, creates JWT, sends it back in response JSON
4. Frontend **receives JWT**, then stores it in `localStorage` (or wherever you want)
5. Frontend uses that stored JWT in **Authorization headers** for all future protected API calls
