<img width="1887" height="1039" alt="image" src="https://github.com/user-attachments/assets/a9519a59-6d00-44b8-a347-4faad7b01d28" />
<img width="1809" height="920" alt="image" src="https://github.com/user-attachments/assets/98b276c0-8af8-4f5d-bbe1-3457ecbfc651" />
# SafeLink-CS

A cybersecurity-inspired visitor intelligence platform that tracks visitor activity, analyzes browsing patterns, calculates threat scores, and provides DSDA-based analytics through an interactive dashboard.

## Features

- Real-time Visitor Tracking
- Browser Detection
- Operating System Detection
- Device Detection
- Visitor Logging with SQLite
- Threat Score Calculation
- Suspicious Visitor Detection
- Browser Analytics
- Device Analytics
- Country Analytics
- Peak Activity Analysis
- Risk Prediction
- CSV Report Export
- Interactive Dashboard

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Flask
- Flask-CORS

### Database
- SQLite

## Data Science & Data Analytics

- Visitor Behavior Analysis
- Browser Usage Analytics
- Device Distribution Analysis
- Country-wise Analytics
- Peak Activity Detection
- Threat Classification
- Threat Score Prediction
- Data Export & Reporting

## Future Enhancements

- Live Geolocation Map
- Device Fingerprinting
- Real-time Updates
- Admin Authentication
- Advanced Threat Scoring
- Interactive Charts
- Cloud Deployment

## Project Structure

```text
SafeLink/
├── frontend/
├── templates/
├── app.py
├── visitors.db
├── requirements.txt
└── README.md
```

## Sample Use Case

When a visitor accesses the tracking page, the system collects IP address, browser, operating system, device type, and timestamp. The data is stored in SQLite and visualized through a DSDA dashboard that performs analytics, threat assessment, and report generation.
