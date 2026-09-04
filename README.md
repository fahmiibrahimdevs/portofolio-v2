# Fahmi Ibrahim — Professional Portfolio & Content Management System

A high-performance, modern fullstack developer portfolio and administrative content management system built with **Bun**, **Hono**, **React 18**, **Tailwind CSS v4**, and **MariaDB**.

[![Bun](https://img.shields.io/badge/Runtime-Bun%20v1.2+-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)
[![Hono](https://img.shields.io/badge/Backend-Hono%20v4-E36002?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev)
[![React](https://img.shields.io/badge/Frontend-React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![MariaDB](https://img.shields.io/badge/Database-MariaDB%2011-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

---

## 🌟 Key Highlights & Features

### 🎨 User Interface & Experience
- **Seamless Dual-Theme System**: Crafted Dark Mode and Light Mode palettes with crisp contrast, muted pastel badge accents, and zero eye-straining neon colors.
- **Activity Timelines**: Interactive timeline rails for **Work Experience** and **University Achievements & Education** with expand/collapse deliverables, project breakdowns, and supervisor links.
- **Projects & Articles Showcase**: Filterable showcase with search, pagination, category tabs, and deep markdown reader with syntax highlighting (`highlight.js`).
- **Certificates & Credentials**: Interactive preview modal for PDF and image credentials, verified badges, and expiry indicators.
- **Responsive Mobile First Layout**: Polished layout across desktop, tablet, and mobile with natural stacking and touch targets.

### 🛡️ Security & Performance
- **Sliding-Window IP Rate Limiter**: Built-in backend rate limiter for contact form submissions (5 requests / 15 mins) and admin login attempts (10 attempts / 15 mins) to prevent spam bots and brute-force attacks.
- **JWT Admin Authentication**: Token-based authentication with password hashing via `Bun.password` (Argon2id/Bcrypt).
- **Parameterized SQL Queries**: 100% parameterized SQL database operations preventing SQL injection.

### 🛠️ Administrative CMS Dashboard
- **Comprehensive CRUD Management**: Manage Profile Bio, Work Experiences, University Achievements, Tech Stack categories, Credentials, Projects, and Articles.
- **Rich Text WYSIWYG Editor**: Built-in markdown and rich content editor with live preview, code blocks, lists, and formatting.
- **File & Media Manager**: Integrated file upload handler storing assets in `/uploads` with instant logo/document previews.
- **Contact Inquiries Inbox**: Real-time unread counter, status toggling, and message viewer.

---

## 📁 Repository Structure

```text
portofolio/
├── client/                     # Frontend React + Vite SPA
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── api/client.ts       # Type-safe API client & fetch wrappers
│   │   ├── components/         # Modular UI components
│   │   │   ├── admin/          # Admin Dashboard & CRUD tabs
│   │   │   ├── articles/       # Article cards & reader modals
│   │   │   ├── common/         # Modals, WYSIWYG editor, Pagination, ThemeToggle
│   │   │   ├── home/           # Home sections (Hero, Timelines, Tech, Creds)
│   │   │   ├── layout/         # Universal Navbar and Footer
│   │   │   └── projects/       # Project cards & detail modals
│   │   ├── pages/              # SPA Pages (Home, Projects, Articles, Contact, Details)
│   │   ├── index.css           # Tailwind v4 theme, badges & typography system
│   │   └── main.tsx            # React application entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                     # Backend Hono REST API
│   ├── src/
│   │   ├── db/
│   │   │   ├── database.ts     # MariaDB connection pool & query helpers
│   │   │   └── seed_dump.sql   # Complete database schema & initial seed data
│   │   ├── middlewares/
│   │   │   ├── auth.ts         # JWT authentication middleware
│   │   │   └── rateLimiter.ts  # IP sliding-window rate limiter
│   │   ├── routes/             # Modular REST API endpoints
│   │   │   ├── articles.ts
│   │   │   ├── auth.ts
│   │   │   ├── contacts.ts
│   │   │   ├── credentials.ts
│   │   │   ├── experiences.ts
│   │   │   ├── profile.ts
│   │   │   ├── projects.ts
│   │   │   ├── technology.ts
│   │   │   ├── university.ts
│   │   │   └── upload.ts
│   │   └── index.ts            # Hono application server entry point
│   ├── uploads/                # Stored media, logos, certificates, CV PDFs
│   └── package.json
├── .env.example                # Environment variables template
├── .gitignore
├── package.json                # Monorepo root scripts
├── setup.sh                    # Automated dependency setup script
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- [Bun](https://bun.sh/) (v1.1 or higher)
- [MariaDB](https://mariadb.org/) or [MySQL](https://www.mysql.com/) (v10.5+ / v8.0+)

### 2. Clone Repository
```bash
git clone https://github.com/fahmiibrahimdevs/portofolio-v2.git
cd portofolio-v2
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Adjust your database credentials and secret key in `.env`:
```env
PORT=3002
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portofolio

JWT_SECRET=your_super_secret_jwt_key
```

### 4. Import Initial Database
Create the database in MariaDB and import the initial schema & seed data:
```bash
# Create database
mariadb -u root -p -e "CREATE DATABASE IF NOT EXISTS portofolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import seed schema and records
mariadb -u root -p portofolio < server/src/db/seed_dump.sql
```

### 5. Install Dependencies
Run the setup script or install with Bun:
```bash
chmod +x setup.sh
./setup.sh
```
Or manually:
```bash
cd server && bun install && cd ../client && bun install && cd ..
```

### 6. Start Development Servers
```bash
# Run both frontend and backend concurrently
bun run dev
```
- **Public Website**: [http://localhost:5173](http://localhost:5173) (Vite Dev Server)
- **Backend REST API**: [http://localhost:3002/api](http://localhost:3002/api)

---

## 🌐 Production VPS Deployment Guide

### 1. Build Client Assets
On your VPS server, build the production client SPA:
```bash
cd /path/to/portofolio/client
bun run build
```

### 2. Configure Systemd Service
Create a persistent systemd service file at `/etc/systemd/system/portofolio.service`:

```ini
[Unit]
Description=Fahmi Ibrahim Portfolio Application (Bun + Hono + MariaDB)
After=network.target mariadb.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/portofolio/server
ExecStart=/root/.bun/bin/bun run src/index.ts
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=PORT=3002
Environment=DB_HOST=127.0.0.1
Environment=DB_PORT=3306
Environment=DB_USER=nexaryn
Environment=DB_PASSWORD=your_secure_password
Environment=DB_NAME=portofolio
Environment=JWT_SECRET=your_secure_production_jwt_secret

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable portofolio.service
sudo systemctl start portofolio.service
sudo systemctl status portofolio.service
```

### 3. Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/portofolio`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Client body size for file uploads (PDFs, Images)
    client_max_body_size 25M;

    # Backend API and Static Assets
    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the configuration and secure with SSL:
```bash
sudo ln -s /etc/nginx/sites-available/portofolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🗄️ Database Tables Overview

| Table Name | Description |
|:---|:---|
| `profile` | Personal details, headline bio, location, availability status, social links, resume URL |
| `work_experiences` | Job roles, company logos, employment type, start/end dates, key responsibility points |
| `university_achievements` | Institution details, degrees, organizations, research experiences, projects, skills gained |
| `tech_categories` & `tech_items` | Categorized technology skills with icons, proficiencies, and experience duration |
| `credentials` | Professional certificates, courses, issuer logos, verification links, and PDF files |
| `projects` & `project_categories` | Projects catalog with thumbnails, live demos, GitHub repositories, and tech tags |
| `articles` & `article_categories` | Blog articles with rich markdown content, reading time, view counter, and tags |
| `contact_messages` | Inbound inquiries with IP rate limit logs, sender details, subject, and read status |
| `admin_users` | Administrator accounts with hashed passwords for CMS dashboard access |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Developed with ❤️ by [Fahmi Ibrahim](https://github.com/fahmiibrahimdevs)**
