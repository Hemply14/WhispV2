Whisp - A Dyslexia Companion App Frontend
Whisp is an intuitive and inclusive web application specifically designed to support children with dyslexia. It blends cognitive development tools with social-emotional learning features on a secure, accessible platform, empowering young learners to express themselves and build confidence.  This repository contains the complete frontend for the application, built with React.



Live Demo Link: https://whisp-v2.vercel.app/login

## Key Features
This frontend prototype implements many of the core features outlined in the project's mission, focusing on accessibility and user interaction.


Dyslexia-Friendly UI: The entire interface uses the OpenDyslexic font to reduce visual stress and improve readability. 



Secure Visual Pattern Login: A secure, CAPTCHA-free login system where users create and enter a visual pattern to access their account.  The login state persists across page reloads using 


localStorage.


Interactive Dashboard: A personalized feed segregated into "My World" (private entries) and "Our World" (mock community entries). 


Journal Creation Center: Users can create journal entries using text or the browser's built-in Speech-to-Text functionality. 



Daily Mood Tracker: An emotionally intelligent feature allowing children to log their mood for the day using expressive icons. 

Assistive Technology:


Text-to-Speech (TTS): Read journal entries aloud with the click of a button. 


Double-Tap Interaction (Demo): An accessibility demo in the settings where a user taps once to hear the action and twice to confirm. 


Interactive Settings Panel: Users can dynamically change the global font size, text spacing, and toggle a "Focus Mode" to disable animations. 


Mock Guardian Dashboard: A prototype dashboard for guardians to monitor activity, view SOS flags from distressing journals, and manage a mock journal approval queue. 



## Tech Stack
Frontend: React

Routing: React Router

Styling: Plain CSS3 with Flexbox and Grid for responsiveness

Icons: React Icons

Deployment: Vercel

## Getting Started
To run this project locally on your machine, follow these steps:

Clone the repository:

Bash

git clone https://github.com/Hemply14/WhispV2.git
Navigate to the project directory:

Bash

cd WhispV2
Install dependencies:

Bash

npm install
Run the development server:

Bash

npm start
The application will open in your browser at http://localhost:3000.
