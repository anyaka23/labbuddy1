<h1>🧪 LAB BUDDY</h1>


LabBuddy is a modern, web-based platform designed to help students interactively explore and perform laboratory experiments. It provides intuitive UI for experiment selection, real-time guidance, and backend-powered insights — making practical learning easier, clearer, and more reliable.

🔧 Technology Stack

Frontend

React — UI foundation for components and interactive screens

TypeScript — type-safe coding for better reliability

Vite — fast frontend bundler & dev server

Tailwind CSS — utility-first styling

shadcn-ui — component library built on top of Tailwind

(Based on the repository’s files and config.)

Backend

Streamlit App — deployed at https://bf4byueekxkcpqse2wdeia.streamlit.app/

Designed to handle experiment logic, calculations, insights, or additional content your frontend may request

The backend acts as an API-type service for experiments, explanations, or backend-driven content. You can link to it directly or integrate REST/WebSockets as needed.

📂 Repository Structure
labbuddy1/
├── public/                 # Static assets
├── src/                    # Frontend source
│   ├── components/         # UI components
│   ├── pages/              # Page views
│   ├── styles/             # Tailwind & UI configs
│   └── App.tsx             # Entry point
├── supabase/               # Backend config (if using)
├── .env                    # Environment variables
├── package.json            # Dependencies & scripts
├── tailwind.config.ts      # Styling config
├── tsconfig.json           # TypeScript config
└── README.md               # This file

🚀 Quick Start

Make sure you have Node.js (v16+) and npm/yarn installed.

Clone the repo

git clone https://github.com/anyaka23/labbuddy1.git
cd labbuddy1


Install dependencies

npm install


Create .env

Add any necessary variables (API URLs, keys for Supabase if used, etc.)

Run in Dev Mode

npm run dev


Open in Browser

http://localhost:5173

🧠 How It Works

Experiment Selection

Users pick an experiment to view from the UI.

Guidance Screen

Frontend displays procedure, steps, visuals, and explanations.

Backend Insights (Optional)

Connect to the Streamlit backend for live calculations, tips, or model outputs.

Example backend URL: https://bf4byueekxkcpqse2wdeia.streamlit.app/

🗺 User Flows
⭐ Student

Browses available experiments

Reads theory + step-by-step procedure

Gets real-time backend insights

🧑‍🏫 Educator

Validates content

Suggests backend logic for deeper guidance

📌 Environment & Deployment
Environment Variables

Create a .env with:

VITE_API_BASE_URL="https://bf4byueekxkcpqse2wdeia.streamlit.app/"


You can also configure Supabase keys, authentication tokens, or backend endpoints here.

Deployment

Frontend can be deployed via:

Vercel

Netlify

Static hosting

Backend (Streamlit) is already deployed; update or extend via Streamlit Cloud if you have access.

🛠 Future Enhancements

✔ Experiment walkthrough timer
✔ Backend-generated adaptive tips
✔ Save and export lab notes
✔ User login & personalised dashboard
✔ AI-assisted lab guidance models

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a feature branch

Commit changes with clear messages

Open a Pull Request
