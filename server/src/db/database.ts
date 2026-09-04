import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER || "nexaryn",
  password: process.env.DB_PASSWORD || "31750321@admin",
  database: process.env.DB_NAME || "portofolio",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  dateStrings: true,
  namedPlaceholders: true,
});

function formatSql(sql: string): string {
  return sql
    .replace(/\$([a-zA-Z0-9_]+)/g, ":$1")
    .replace(/datetime\('now'\)/gi, "NOW()");
}

function formatParams(params?: any): any {
  if (!params) return {};
  if (Array.isArray(params)) return params;
  if (typeof params === "object") {
    const formatted: Record<string, any> = {};
    for (const key of Object.keys(params)) {
      const cleanKey = key.startsWith("$") || key.startsWith(":") ? key.slice(1) : key;
      formatted[cleanKey] = params[key] === undefined ? null : params[key];
    }
    return formatted;
  }
  return params;
}

export async function query<T = any>(sql: string, params?: any): Promise<T[]> {
  const [rows] = await pool.query(formatSql(sql), formatParams(params));
  return rows as T[];
}

export async function queryOne<T = any>(sql: string, params?: any): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

export async function execute(sql: string, params?: any): Promise<mysql.ResultSetHeader> {
  const [result] = await pool.execute(formatSql(sql), formatParams(params));
  return result as mysql.ResultSetHeader;
}

export async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log("🐬 Connected to MariaDB (database: " + (process.env.DB_NAME || "portofolio") + ")");
    connection.release();
  } catch (err) {
    console.error("❌ Failed to connect to MariaDB:", err);
    throw err;
  }

  // 1. Admin Users table
  await execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id VARCHAR(50) PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 2. Profile Settings table
  await execute(`
    CREATE TABLE IF NOT EXISTS profile_settings (
      id VARCHAR(50) PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      tagline VARCHAR(255) DEFAULT '',
      bio TEXT,
      avatar_url VARCHAR(500) DEFAULT '',
      resume_url VARCHAR(500) DEFAULT '',
      resume_filename VARCHAR(255) DEFAULT 'CV_Fahmi_Ibrahim.pdf',
      email VARCHAR(255) DEFAULT '',
      github_url VARCHAR(500) DEFAULT '',
      linkedin_url VARCHAR(500) DEFAULT '',
      youtube_url VARCHAR(500) DEFAULT '',
      instagram_url VARCHAR(500) DEFAULT '',
      location VARCHAR(255) DEFAULT 'Jakarta, Indonesia',
      available_for_work TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 3. Work Experiences table
  await execute(`
    CREATE TABLE IF NOT EXISTS work_experiences (
      id VARCHAR(50) PRIMARY KEY,
      company_name VARCHAR(255) NOT NULL,
      company_url VARCHAR(500) DEFAULT '',
      company_logo VARCHAR(500) DEFAULT '',
      role_title VARCHAR(255) NOT NULL,
      employment_type VARCHAR(100) DEFAULT 'Internship',
      location VARCHAR(255) DEFAULT '',
      start_date VARCHAR(100) NOT NULL,
      end_date VARCHAR(100) DEFAULT 'Present',
      is_current TINYINT(1) DEFAULT 0,
      order_index INT DEFAULT 0,
      description_points JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 4. University Achievements table
  await execute(`
    CREATE TABLE IF NOT EXISTS university_achievements (
      id VARCHAR(50) PRIMARY KEY,
      institution_name VARCHAR(255) NOT NULL,
      institution_logo VARCHAR(500) DEFAULT '',
      degree VARCHAR(255) NOT NULL,
      period VARCHAR(100) NOT NULL,
      order_index INT DEFAULT 0,
      organizational_involvement JSON,
      research_experience JSON,
      key_projects JSON,
      skills_gained JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 5. Tech Categories table
  await execute(`
    CREATE TABLE IF NOT EXISTS tech_categories (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      order_index INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 6. Tech Skills table
  await execute(`
    CREATE TABLE IF NOT EXISTS tech_skills (
      id VARCHAR(50) PRIMARY KEY,
      category_id VARCHAR(50) NOT NULL,
      name VARCHAR(100) NOT NULL,
      icon_url VARCHAR(500) DEFAULT '',
      order_index INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_category (category_id)
    )
  `);

  // 7. Credentials & Certifications table
  await execute(`
    CREATE TABLE IF NOT EXISTS credentials (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      issuer VARCHAR(255) NOT NULL,
      issue_date VARCHAR(100) DEFAULT '',
      expiry_date VARCHAR(100) DEFAULT 'No Expired',
      credential_url VARCHAR(500) DEFAULT '',
      file_url VARCHAR(500) DEFAULT '',
      logo_url VARCHAR(500) DEFAULT '',
      order_index INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // 8. Contact Messages table
  await execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) DEFAULT '',
      message TEXT NOT NULL,
      is_read TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await seedDefaultData();
}

async function seedDefaultData() {
  // 1. Seed Admin User
  const admin = await queryOne<{ id: string }>("SELECT id FROM admin_users WHERE username = 'fahmi'");
  if (!admin) {
    console.log("👤 Seeding default admin user...");
    const hash = await Bun.password.hash("admin123");
    await execute(
      "INSERT INTO admin_users (id, username, email, password_hash, name) VALUES (:id, :username, :email, :password_hash, :name)",
      {
        id: "admin-fahmi-1",
        username: "fahmi",
        email: "fahmiibrahimdevs@gmail.com",
        password_hash: hash,
        name: "Fahmi Ibrahim",
      }
    );
  }

  // 2. Seed Profile
  const profile = await queryOne<{ id: string }>("SELECT id FROM profile_settings WHERE id = 'profile_main'");
  if (!profile) {
    console.log("📝 Seeding initial profile settings...");
    await execute(
      `INSERT INTO profile_settings (
        id, full_name, tagline, bio, avatar_url, resume_url, resume_filename, email,
        github_url, linkedin_url, youtube_url, instagram_url, location, available_for_work
      ) VALUES (
        :id, :full_name, :tagline, :bio, :avatar_url, :resume_url, :resume_filename, :email,
        :github_url, :linkedin_url, :youtube_url, :instagram_url, :location, :available_for_work
      )`,
      {
        id: "profile_main",
        full_name: "Fahmi Ibrahim",
        tagline: "Software Engineer & IoT Hardware Developer",
        bio: "Software Engineer with experience in developing applications integrated with IoT hardware. Adept in application design, server-side development, and technical problem-solving. Committed to continuous learning and innovation, with a passion for tackling new challenges in the tech industry.",
        avatar_url: "https://fahmiibrahim.my.id/icons/my-photo2.png",
        resume_url: "https://fahmiibrahim.my.id/images/CV_Fahmi_Ibrahim.pdf",
        resume_filename: "CV_Fahmi_Ibrahim.pdf",
        email: "fahmiibrahimdevs@gmail.com",
        github_url: "https://github.com/fhmiibrhimdev/",
        linkedin_url: "https://www.linkedin.com/in/fahmiibrahimdev/",
        youtube_url: "https://www.youtube.com/@midracode",
        instagram_url: "https://instagram.com/fahmiibrahimdev_",
        location: "Jakarta, Indonesia",
        available_for_work: 1,
      }
    );
  }

  // 3. Seed Work Experiences
  const expCount = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM work_experiences");
  if (!expCount || expCount.count === 0) {
    console.log("💼 Seeding initial work experiences...");
    const intekBullets = JSON.stringify([
      "Contributed to IoT research by designing and assembling electronic circuits, integrating sensors, and programming microcontrollers (Arduino, ESP8266, ESP32).",
      "Managed server infrastructure, performed domain and DNS administration, and conducted routine maintenance to ensure application availability.",
      "Developed web-based applications and optimized database performance for better scalability and efficiency.",
      "Diagnosed and resolved hardware, software, and network issues to maintain smooth system operations.",
      "Utilized version control systems (e.g., Git) and maintained comprehensive technical documentation throughout the development lifecycle.",
    ]);

    await execute(
      `INSERT INTO work_experiences (
        id, company_name, company_url, company_logo, role_title, employment_type,
        location, start_date, end_date, is_current, order_index, description_points
      ) VALUES (
        :id, :company_name, :company_url, :company_logo, :role_title, :employment_type,
        :location, :start_date, :end_date, :is_current, :order_index, :description_points
      )`,
      {
        id: "exp-intek",
        company_name: "PT. Solusi Intek Indonesia",
        company_url: "https://intek.co.id/id/",
        company_logo: "https://fahmiibrahim.my.id/icons/Intek.png",
        role_title: "Intern - Mechatronics Research & Development",
        employment_type: "Internship",
        location: "Jakarta, Indonesia",
        start_date: "3 June 2022",
        end_date: "10 February 2024",
        is_current: 0,
        order_index: 1,
        description_points: intekBullets,
      }
    );
  }

  // 4. Seed University Achievements
  const univCount = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM university_achievements");
  if (!univCount || univCount.count === 0) {
    console.log("🎓 Seeding initial university achievements...");
    const orgs = JSON.stringify([
      {
        name: "KSM Psychorobotic",
        role: "Active Member",
        link: "https://www.instagram.com/psychorobotic_pnj/",
        description: "Active member in robotics and mechatronics student organization.",
      },
    ]);

    const research = JSON.stringify([
      {
        title: "Smart Solar Cell Project (Lecturer-led Research, 2025)",
        supervisor: "Dr. Devi Handaya",
        supervisor_link: "https://www.instagram.com/d.handaya/",
        description: "Contributed to a research project focusing on the development of a smart solar panel monitoring system, involving temperature sensors, real-time data acquisition, and IoT-based analysis for performance optimization.",
      },
    ]);

    const keyProjects = JSON.stringify([
      {
        category: "Paid Projects",
        items: [
          {
            title: "Static panoramic 360 websites with Panolens.js (AEON Mall, Kasablanka Hall, JCC)",
            url: "http://aeonmall.midragondev.my.id/",
            description: "Developed interactive panoramic tours using WebGL & Panolens.js.",
          },
          {
            title: "Dynamic CMS websites for Metalfest and Creativa",
            url: "http://metalfest.micebgpnj.my.id/",
            description: "Built responsive event and community portals with custom CMS.",
          },
        ],
      },
      {
        category: "Campus Projects",
        items: [
          {
            title: "RFID-based Web Attendance System",
            url: "https://fahmiibrahim.my.id/project/web-iot-absensi-rfid",
            description: "Integrated RFID card reader with real-time web attendance logger.",
          },
          {
            title: "Film Project Management System Web App",
            url: "https://fahmiibrahim.my.id/project/web-short-film",
            description: "Collaborative project planner and asset manager for short film production.",
          },
          {
            title: "5V Power Supply with custom 3D enclosure",
            url: "",
            description: "Designed schematic, etched PCB, and assembled hardware housing.",
          },
          {
            title: "Digital Scoreboard System with button controller",
            url: "",
            description: "Engineered microcontroller-driven scoreboard display.",
          },
        ],
      },
    ]);

    const skillsGained = JSON.stringify([
      {
        title: "Electronics fundamentals",
        items: ["Basic Logic Gates", "Component Selection", "PCB Design", "Circuit Troubleshooting"],
      },
      {
        title: "Embedded Systems & IoT",
        items: ["Circuit Design", "Microcontroller Integration (ESP32/Arduino)", "Hardware-Software Interfacing", "MQTT"],
      },
      {
        title: "Web Development",
        items: ["Fullstack Architecture", "REST API Development", "Database Optimization", "Deployment & Infrastructure"],
      },
    ]);

    await execute(
      `INSERT INTO university_achievements (
        id, institution_name, institution_logo, degree, period, order_index,
        organizational_involvement, research_experience, key_projects, skills_gained
      ) VALUES (
        :id, :institution_name, :institution_logo, :degree, :period, :order_index,
        :organizational_involvement, :research_experience, :key_projects, :skills_gained
      )`,
      {
        id: "univ-pnj",
        institution_name: "Politeknik Negeri Jakarta",
        institution_logo: "https://fahmiibrahim.my.id/icons/PNJ.png",
        degree: "Associate’s Degree – Industrial Electronics Engineering",
        period: "Aug 2024 – Present",
        order_index: 1,
        organizational_involvement: orgs,
        research_experience: research,
        key_projects: keyProjects,
        skills_gained: skillsGained,
      }
    );
  }

  // 5. Seed Tech Categories and Skills
  const catCount = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM tech_categories");
  if (!catCount || catCount.count === 0) {
    console.log("⚡ Seeding initial tech categories and skills...");
    const categories = [
      { id: "cat-languages", name: "Languages", order_index: 1 },
      { id: "cat-frameworks", name: "Frameworks & Libraries", order_index: 2 },
      { id: "cat-databases", name: "Databases", order_index: 3 },
      { id: "cat-iot", name: "Microcontrollers & IoT", order_index: 4 },
      { id: "cat-tools", name: "Tools & Others", order_index: 5 },
    ];

    for (const c of categories) {
      await execute(
        "INSERT INTO tech_categories (id, name, order_index) VALUES (:id, :name, :order_index) ON DUPLICATE KEY UPDATE name=VALUES(name)",
        c
      );
    }

    const skills = [
      // Languages
      { id: "sk-html", category_id: "cat-languages", name: "HTML5", icon_url: "https://fahmiibrahim.my.id/icons/HTML5.png", order_index: 1 },
      { id: "sk-css", category_id: "cat-languages", name: "CSS3", icon_url: "https://fahmiibrahim.my.id/icons/CSS3.png", order_index: 2 },
      { id: "sk-js", category_id: "cat-languages", name: "JavaScript", icon_url: "https://fahmiibrahim.my.id/icons/JavaScript.png", order_index: 3 },
      { id: "sk-ts", category_id: "cat-languages", name: "TypeScript", icon_url: "https://fahmiibrahim.my.id/icons/JavaScript.png", order_index: 4 },
      { id: "sk-php", category_id: "cat-languages", name: "PHP", icon_url: "https://fahmiibrahim.my.id/icons/php.svg", order_index: 5 },
      { id: "sk-py", category_id: "cat-languages", name: "Python", icon_url: "https://fahmiibrahim.my.id/icons/Python.png", order_index: 6 },
      { id: "sk-dart", category_id: "cat-languages", name: "Dart", icon_url: "https://fahmiibrahim.my.id/icons/Dart.png", order_index: 7 },
      { id: "sk-cpp", category_id: "cat-languages", name: "C++ Arduino", icon_url: "https://fahmiibrahim.my.id/icons/Cplusplus.png", order_index: 8 },

      // Frameworks & Libraries
      { id: "sk-react", category_id: "cat-frameworks", name: "React", icon_url: "https://fahmiibrahim.my.id/icons/ReactJS.png", order_index: 1 },
      { id: "sk-tailwind", category_id: "cat-frameworks", name: "Tailwind CSS", icon_url: "https://fahmiibrahim.my.id/icons/TailwindCSS.png", order_index: 2 },
      { id: "sk-hono", category_id: "cat-frameworks", name: "Hono.js / Node.js", icon_url: "https://fahmiibrahim.my.id/icons/NodeJS.svg", order_index: 3 },
      { id: "sk-laravel", category_id: "cat-frameworks", name: "Laravel", icon_url: "https://fahmiibrahim.my.id/icons/Laravel.png", order_index: 4 },
      { id: "sk-flutter", category_id: "cat-frameworks", name: "Flutter", icon_url: "https://fahmiibrahim.my.id/icons/Flutter.png", order_index: 5 },

      // Databases
      { id: "sk-mysql", category_id: "cat-databases", name: "MySQL", icon_url: "https://fahmiibrahim.my.id/icons/MySQL.png", order_index: 1 },
      { id: "sk-mariadb", category_id: "cat-databases", name: "MariaDB", icon_url: "https://fahmiibrahim.my.id/icons/MariaDB.png", order_index: 2 },

      // Microcontrollers & IoT
      { id: "sk-arduino", category_id: "cat-iot", name: "Arduino", icon_url: "https://fahmiibrahim.my.id/icons/Arduino.png", order_index: 1 },
      { id: "sk-esp8266", category_id: "cat-iot", name: "ESP8266", icon_url: "https://fahmiibrahim.my.id/icons/ESP8266.png", order_index: 2 },
      { id: "sk-esp32", category_id: "cat-iot", name: "ESP32", icon_url: "https://fahmiibrahim.my.id/icons/ESP32.png", order_index: 3 },
      { id: "sk-mqtt", category_id: "cat-iot", name: "MQTT", icon_url: "https://fahmiibrahim.my.id/icons/MQTT.png", order_index: 4 },
      { id: "sk-easyeda", category_id: "cat-iot", name: "EasyEDA / PCB", icon_url: "https://fahmiibrahim.my.id/icons/EasyEDA.jpg", order_index: 5 },

      // Tools
      { id: "sk-git", category_id: "cat-tools", name: "GitHub / Git", icon_url: "https://fahmiibrahim.my.id/icons/Github.png", order_index: 1 },
      { id: "sk-postman", category_id: "cat-tools", name: "Postman", icon_url: "https://fahmiibrahim.my.id/icons/Postman.svg", order_index: 2 },
    ];

    for (const s of skills) {
      await execute(
        "INSERT INTO tech_skills (id, category_id, name, icon_url, order_index) VALUES (:id, :category_id, :name, :icon_url, :order_index) ON DUPLICATE KEY UPDATE name=VALUES(name)",
        s
      );
    }
  }

  // 6. Seed Credentials & Certifications
  const credCount = await queryOne<{ count: number }>("SELECT COUNT(*) as count FROM credentials");
  if (!credCount || credCount.count === 0) {
    console.log("📜 Seeding initial credentials & certificates...");
    const certs = [
      {
        id: "cred-udemy-nodejs",
        title: "NodeJS Course PZN",
        issuer: "Udemy",
        issue_date: "August 2023",
        expiry_date: "No Expired",
        credential_url: "https://fahmiibrahim.my.id/images/NodeJS_Course_Udemy.jpg",
        file_url: "https://fahmiibrahim.my.id/images/NodeJS_Course_Udemy.jpg",
        logo_url: "https://fahmiibrahim.my.id/icons/Udemy.jpg",
        order_index: 1,
      },
      {
        id: "cred-intek-rnd",
        title: "RnD Mechatronics - Intern Certificate",
        issuer: "PT. Solusi Intek Indonesia",
        issue_date: "May 2023",
        expiry_date: "No Expired",
        credential_url: "https://fahmiibrahim.my.id/images/Sertifikat_PT_Solusi_Intek.pdf",
        file_url: "https://fahmiibrahim.my.id/images/Sertifikat_PT_Solusi_Intek.pdf",
        logo_url: "https://fahmiibrahim.my.id/icons/Intek.png",
        order_index: 2,
      },
      {
        id: "cred-smkn5",
        title: "SMKN 5 JAKARTA Graduation Certificate",
        issuer: "SMKN 5 Jakarta",
        issue_date: "May 2023",
        expiry_date: "May 2023 - May 2026",
        credential_url: "https://fahmiibrahim.my.id/images/Sertifikat_SMKN5JKT.pdf",
        file_url: "https://fahmiibrahim.my.id/images/Sertifikat_SMKN5JKT.pdf",
        logo_url: "https://fahmiibrahim.my.id/icons/SMKN5.png",
        order_index: 3,
      },
      {
        id: "cred-itechnocup",
        title: "Finalis Lomba IoT iTechnoCup",
        issuer: "iTechnoCup 2025 PNJ",
        issue_date: "2025",
        expiry_date: "No Expired",
        credential_url: "https://fahmiibrahim.my.id/images/Sertifikat_Finalis_IoT_Fahmi_Ibrahim.png",
        file_url: "https://fahmiibrahim.my.id/images/Sertifikat_Finalis_IoT_Fahmi_Ibrahim.png",
        logo_url: "https://fahmiibrahim.my.id/icons/logo-itechnocup.png",
        order_index: 4,
      },
      {
        id: "cred-k3",
        title: "K3 SAFETY IMPLEMENTATION",
        issuer: "Expert Club Indonesia",
        issue_date: "2023",
        expiry_date: "No Expired",
        credential_url: "https://fahmiibrahim.my.id/images/Sertifikat_K3_Fahmi_Ibrahim.jpg",
        file_url: "https://fahmiibrahim.my.id/images/Sertifikat_K3_Fahmi_Ibrahim.jpg",
        logo_url: "https://fahmiibrahim.my.id/icons/logo-eci.jpg",
        order_index: 5,
      },
    ];

    for (const cr of certs) {
      await execute(
        `INSERT INTO credentials (
          id, title, issuer, issue_date, expiry_date, credential_url, file_url, logo_url, order_index
        ) VALUES (
          :id, :title, :issuer, :issue_date, :expiry_date, :credential_url, :file_url, :logo_url, :order_index
        ) ON DUPLICATE KEY UPDATE title=VALUES(title)`,
        cr
      );
    }
  }
}
