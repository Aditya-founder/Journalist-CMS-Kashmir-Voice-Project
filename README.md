🌐 Portfolio + Blog Web Application
A full-stack Portfolio + Blog platform designed for professional and personal branding — complete with an admin dashboard to easily manage content, format posts, and keep everything organized. Built to be efficient, cost-effective, and always online, even on free hosting.

✨ Features
✅ Portfolio Section: Showcase your skills, projects, and experience

📝 Blog System: Create, edit, and manage blog posts with formatting options (Markdown, headings, links, images, etc.)

🔐 Admin Panel: Secure login with full dashboard to manage all content

📊 Dashboard: Real-time stats and quick access to post creation/editing

💡 Auto Keep-Alive Function: Prevents Render backend from sleeping

⚡️ Fast & Optimized: Built using modern tools like React + Vite for frontend and Express + Node.js for backend

🌍 Deployed on Render: Free-tier hosting optimized to stay online at minimal cost

🛠 Tech Stack
Layer	Tech Stack
Frontend	React + Vite
Backend	Node.js + Express
Database	MongoDB (NoSQL)
Hosting	Render (Frontend + Backend)

💸 Cost-Cutting Strategy
Render’s free tier sleeps your app after inactivity to save cost, causing 2-minute delays on cold starts.
To solve this:

🔁 A background ping function runs every 30 seconds from the backend, keeping the app active and live 24/7 without requiring constant user visits — effectively avoiding downtime while staying within the free Render limits.

🚀 Getting Started (Local Setup)
# Clone the repository
git clone https://github.com/your-username/portfolio-blog-client.git
cd portfolio-blog-client

# Install frontend dependencies
cd client
npm install
npm run dev

# Set up backend
cd ../server
npm install
npm run dev


Make sure you add your .env variables for MongoDB URI and other configs in the server/ folder.

🔒 Admin Access
To log in to the dashboard, you need to use the predefined admin credentials. These can be managed securely via environment variables.

