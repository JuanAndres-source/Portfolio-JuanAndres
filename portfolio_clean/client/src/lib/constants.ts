// Personal Information
export const PERSONAL_INFO = {
  fullName: "Juan Andrés Aliaga Fuentes",
  role: "Software Developer",
  specialization: "Web, Mobile & Databases",
  location: "Almería, Spain",
  email: "juanandres234t@gmail.com",
  phone: "+34 639 058 109",
  github: "https://github.com/JuanAndres-source",
  linkedin: "https://www.linkedin.com/in/juan-andres-af/",
  cvUrl: "https://drive.google.com/file/d/1uRpJ5ahfBe9W_AMGx20s-Zghw3ZxXrge/view?usp=sharing",
  summary: "4th-year Computer Engineering student passionate about software development, equipped with solid technical foundations. Looking for a first professional opportunity to join a team, add value, and continue growing in the tech sector.",
};

// Education
export const EDUCATION = [
  {
    id: 1,
    institution: "University of Almería",
    location: "Almería, Spain",
    degree: "Computer Engineering",
    specialization: "Double major: Information Systems & Information Technologies",
    startDate: "09/2022",
    endDate: "06/2026",
    description: "Pursuing a degree in Computer Engineering with a focus on Information Systems and Information Technologies.",
  },
  {
    id: 2,
    institution: "École D'Ingénieurs Technologies Et Du Numérique (ISEN)",
    location: "Toulon, France",
    degree: "Computer Engineering (Exchange)",
    specialization: "Master 1 — Software Engineering & BigData",
    startDate: "02/2025",
    endDate: "06/2025",
    description: "Spring Semester exchange program focusing on Software Engineering and BigData technologies.",
  },
];

// Work Experience & Projects
export const PROJECTS = [
  {
    id: 1,
    title: "ISEN Smart Companion",
    image: "/isen-app.png",
    role: "Native Mobile Application Developer",
    type: "Mobile",
    startDate: "03/2025",
    endDate: "04/2025",
    description: "Solo development of an Android app using Kotlin and Jetpack Compose with MVVM architecture. Integrated AI services and REST APIs with async network optimization using Coroutines to reduce redundant requests.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Android Studio", "REST APIs", "Coroutines"],
    github: "https://github.com/JuanAndres-source/ISEN-Android-Native-Mobile-Development",
    featured: true,
    highlights: [
      "Solo development of complete Android application",
      "MVVM architecture implementation",
      "AI services integration",
      "Async network optimization with Coroutines",
      "Reduced redundant API requests",
    ],
  },
  {
    id: 2,
    title: "Universe Dragon Ball SPA",
    image: "/dragonball-app.png",
    role: "Lead Developer",
    type: "Web",
    startDate: "04/2025",
    endDate: "05/2025",
    description: "Managed a development team to build a Single Page Application with Dragon Ball theme. Integrated external Dragon Ball API via async services with modular Angular/TypeScript architecture.",
    technologies: ["Angular", "TypeScript", "HTML5", "CSS3", "REST APIs"],
    github: "https://github.com/JuanAndres-source/DragonBall",
    featured: true,
    highlights: [
      "Team leadership and coordination",
      "Modular architecture design",
      "External API integration",
      "Async service implementation",
      "GitHub collaboration workflow",
    ],
  },
  {
    id: 3,
    title: "Spotify Clone",
    role: "Backend & Database Developer",
    type: "Backend",
    startDate: "03/2023",
    endDate: "05/2023",
    description: "Designed relational database structure (ER Model) using MySQL Workbench and Microsoft Access. Developed and optimized complex SQL queries for data retrieval and integrity.",
    technologies: ["MySQL", "SQL", "PHP", "Microsoft Access", "Database Design"],
    featured: false,
    highlights: [
      "ER Model design and implementation",
      "Complex SQL query optimization",
      "Data integrity management",
      "Database normalization",
      "Performance optimization",
    ],
  },
];

// Skills by Category
export const SKILLS_BY_CATEGORY = {
  Frontend: {
    Expert: ["Angular", "TypeScript", "HTML5", "CSS3"],
    Intermediate: [],
    Familiar: [],
  },
  "Backend & DB": {
    Expert: ["MySQL", "SQL"],
    Intermediate: ["PHP"],
    Familiar: ["Microsoft Access"],
  },
  Mobile: {
    Expert: ["Kotlin"],
    Intermediate: ["Jetpack Compose"],
    Familiar: [],
  },
  "Cloud & DevOps": {
    Expert: ["Git"],
    Intermediate: [],
    Familiar: ["Google Cloud", "Microsoft Azure", "AWS"],
  },
  "Software Engineering": {
    Expert: [],
    Intermediate: ["Java", "C#", "Bash"],
    Familiar: ["UML"],
  },
};

// Flat skills list for display
export const ALL_SKILLS = [
  // Frontend
  { name: "Angular", category: "Frontend", level: "Expert" },
  { name: "TypeScript", category: "Frontend", level: "Expert" },
  { name: "HTML5", category: "Frontend", level: "Expert" },
  { name: "CSS3", category: "Frontend", level: "Expert" },
  
  // Backend & DB
  { name: "MySQL", category: "Backend & DB", level: "Expert" },
  { name: "SQL", category: "Backend & DB", level: "Expert" },
  { name: "PHP", category: "Backend & DB", level: "Intermediate" },
  { name: "Microsoft Access", category: "Backend & DB", level: "Familiar" },
  
  // Mobile
  { name: "Kotlin", category: "Mobile", level: "Expert" },
  { name: "Jetpack Compose", category: "Mobile", level: "Intermediate" },
  { name: "Android Studio", category: "Mobile", level: "Expert" },
  
  // Cloud & DevOps
  { name: "Git", category: "Cloud & DevOps", level: "Expert" },
  { name: "Google Cloud", category: "Cloud & DevOps", level: "Familiar" },
  { name: "Microsoft Azure", category: "Cloud & DevOps", level: "Familiar" },
  { name: "AWS", category: "Cloud & DevOps", level: "Familiar" },
  
  // Software Engineering
  { name: "Java", category: "Software Engineering", level: "Intermediate" },
  { name: "C#", category: "Software Engineering", level: "Intermediate" },
  { name: "Bash", category: "Software Engineering", level: "Intermediate" },
  { name: "UML", category: "Software Engineering", level: "Familiar" },
];

// Languages
export const LANGUAGES = [
  {
    code: "es",
    name: "Spanish",
    flag: "https://flagcdn.com/w80/es.png",
    level: "Native",
    proficiency: 5,
  },
  {
    code: "en",
    name: "English",
    flag: "https://flagcdn.com/w80/gb.png",

    level: "Advanced C1 Cambridge",
    proficiency: 5,
    certification: "C1 English Certificate — University of Cambridge",
  },
  {
    code: "fr",
    name: "French",
    flag: "https://flagcdn.com/w80/fr.png",
    level: "Intermediate",
    proficiency: 3,
  },
];

// Certifications
export const CERTIFICATIONS = [
  {
    id: 1,
    name: "C1 English Certificate",
    issuer: "University of Cambridge",
    date: "2024",
    description: "Advanced English proficiency certification",
  },
];

// Fun Facts
export const FUN_FACTS = [
  "I speak 3 languages: Spanish, English (C1 Cambridge), and French",
  "Studied in France at ISEN Toulon during Spring 2025",
  "C1 Cambridge certified in English",
];

// AI Chat Suggestions
export const CHAT_SUGGESTIONS = [
  "What technologies does Juan Andrés know?",
  "Tell me about his running achievements",
  "What's his chess rating?",
  "Tell me about his mobile project",
  "Is he open to job opportunities?",
  "Where did he study?",
];

// Navigation Items
export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Languages", href: "#languages" },
  { label: "Contact", href: "#contact" },
];

// Social Links
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/JuanAndres-source",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/juan-andres-af/",
    icon: "linkedin",
  },
];

// Running & Chess Data for AI
export const INTERESTS_DATA = {
  running: {
    halfMarathonPB: "1:29:38",
    fiveKPB: "19:18",
    stravaProfile: "https://www.strava.com/athletes/18121100",
    description: "Passionate about running and consistently improving my times through dedicated training.",
  },
  chess: {
    bulletElo: 1815,
    rapidElo: 1785,
    chessComProfile: "https://www.chess.com/member/thewhitebishopgm/stats/rapid?days=0",
    description: "Active chess player enjoying both competitive play and tactical puzzle solving.",
  },
};
