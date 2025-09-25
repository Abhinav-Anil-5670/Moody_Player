# Moody Player

A full-stack MERN application that detects a user's emotions using **Face API.js** and plays mood-matched songs from a database.  

## Features
- Real-time face detection and emotion analysis with [Face API.js](https://github.com/justadudewhohacks/face-api.js).
- Matches emotions (happy, sad, angry, surprised, etc.) to curated songs.
- Fetches tracks from a database based on current mood.
- Simple, responsive UI for playback and mood feedback.

## Tech Stack
- **Frontend:** React, Face API.js  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Other:** REST API, Axios  

## How It Works
1. User allows camera access.  
2. Face API.js runs emotion detection in the browser.  
3. Detected emotion is sent to the backend.  
4. Backend queries MongoDB for songs tagged with that emotion.  
5. Matching songs are returned and played in the client.  


## Installation
Clone the repo and install dependencies:

```bash
git clone https://github.com/Abhinav-Anil-5670/Moody_Player
```

## Backend Setup

```bash
cd backend
npm install
# create a .env file with:
# MONGO_URI=your_mongo_connection_string
# Image kit public key, Private Key and URL

node server.js
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev

```



