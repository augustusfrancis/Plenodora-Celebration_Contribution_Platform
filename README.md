# Plenodora-Celebration-Contribution-Platform
Plenodora – Meaning "A gift that fulfills dreams" is a celebration gifting platform that lets hosts share their dreams and goals, while guests contribute money through UPI instead of giving unwanted physical gifts.

## Current Project Folder Structure
Plenodora-Celebration-Contribution-Platform/
├── .env.example
├── .gitignore
├── README.md
│
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── api/ (5 files)
│       ├── components/ (4 files + common/)
│       ├── context/ (AuthContext.jsx)
│       ├── hooks/ (useAuth.js)
│       ├── pages/
│       │   ├── public/ (3 pages)
│       │   └── host/ (6 pages)
│       ├── routes/ (2 files)
│       ├── styles/ (global.css)
│       └── utils/ (2 files)
│
└── server/
    ├── package.json
    ├── .env (with your credentials)
    └── src/
        ├── app.js
        ├── server.js
        ├── config/ (env.js, db.js)
        ├── db/
        │   ├── migrate.js
        │   ├── migrations/ (001_init.sql)
        │   └── queries/ (4 files - empty)
        ├── routes/ (6 files - empty)
        ├── controllers/ (5 files - empty)
        ├── services/ (4 files - empty)
        ├── middleware/ (4 files - empty)
        └── utils/ (2 files - empty)

## In Progress ...