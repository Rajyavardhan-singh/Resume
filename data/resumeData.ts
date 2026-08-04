export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface SailingExperience {
  vessel: string;
  capacity: string;
  reeferCapacity: string;
  engineSpec: string;
  type: string;
  rank: string;
  period: string;
  description?: string;
  highlights: string[];
  docUrl?: string;
  appraisalUrl?: string;
}

export interface OnShoreExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  skillsUsed: string[];
  docUrl?: string;
}

export interface Internship {
  company: string;
  period: string;
  role?: string;
  description: string;
  docUrl?: string;
}

export interface Education {
  institution: string;
  program: string;
  period: string;
  details?: string;
  badge?: string;
  docUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; description?: string; level?: string }[];
}

export const personalInfo: PersonalInfo = {
  name: "RAJYAVARDHAN SINGH RATHORE",
  title: "ELECTRICAL CADET(TEO) & Software Professional",
  subtitle: "TEO",
  email: "rajyavardhansr@gmail.com",
  phone: "+91 6265174151",
  location: "India / Overseas Sailing",
  summary: "Professionalism with experience across both field and desk roles — combining experience of marine electrical systems on ocean-going container vessels with modern Technology and software development.",
};

export const sailingExperience: SailingExperience[] = [
  {
    vessel: "MSC ROME",
    capacity: "15,574 TEU",
    reeferCapacity: "1,800 Sockets",
    engineSpec: "DUAL FUEL HYUNDAI-B&W 8 G95 ME-C10.5-GI-EcoEGR SCR",
    type: "Container Ship",
    rank: "TEO (Electrical Cadet)",
    period: "09/Mar/2025 - 12/Dec/2025",
    highlights: [
      "1800 Reefer Capacity",
      "DUAL FUEL (LNG/LSMGO/LFO)",
      "HYUNDAI-B&W 8 G95 ME-C10.5-GI-EcoEGR SCR",
    ],
    docUrl: "https://drive.google.com/file/d/1xTCxtZmr-tiGnOl1pETR7T4NuKCQVqky/view?usp=sharing",
    appraisalUrl: "https://drive.google.com/file/d/13rAKUgK2nZRpn8O3vRONzIACUXzuI2nq/view?usp=sharing"
  }
];

export const onShoreExperience: OnShoreExperience[] = [
  {
    company: "FreeLance",
    role: "IT Consultant & Software Developer",
    period: "2023 – 2024",
    description: "Architected and delivered custom high-performance software solutions for diverse local & international clients.",
    skillsUsed: ["Full Stack Development", "React / Next.js", "ES6+", "RESTful APIs", "UI/UX Design"]
  },
  {
    company: "Edureka!",
    role: "Associate Technical Consultant (IT)",
    period: "01-Aug-2022 – 27-Feb-2023",
    description: "Served as Technical Consultant & Developer supporting enterprise IT learning systems and developing software features.",
    skillsUsed: ["Full Stack Development", "Java", "JavaScript (ES6)", "Computer Networking", "Technical Consulting"],
    docUrl: "https://drive.google.com/file/d/1ZqBY6y8SP_h441uY1_ZsEG0vkrYASobm/view?usp=sharing"
  }
];

export const internships: Internship[] = [
  {
    company: "Tenco Systems & Switchgears Pvt. Ltd.",
    period: "July 2021",
    role: "Electrical Engineering Intern",
    description: "Gained hands-on experience in electrical switchgear assembly, testing, industrial panel wiring, and control circuits.",
    docUrl: "https://drive.google.com/file/d/1-a9I2xzbXn_ArdYguaL8x3YYgcb12QsY/view?usp=sharing"
  }
];

export const educationList: Education[] = [
  {
    institution: "TOLANI MARITIME INSTITUTE",
    program: "ETO PRE SEA Training",
    period: "Aug – Dec 2024",
    details: "Batch Ref: TMI/ETO/24-2/26 | Comprehensive pre-sea training for Electro-Technical Officers as per STCW standards.",
    badge: "Pre-Sea ETO",
    docUrl: "https://drive.google.com/file/d/104EC5a8ptcrMPfqZudUK3n1mdbolbVqd/view?usp=drive_link"
  },
  {
    institution: "GOVT. ENGINEERING COLLEGE (UJJAIN) M.P.",
    program: "B.Tech in Electrical Engineering",
    period: "Graduated July 2022",
    details: "Specialized in High Voltage Electrical Systems, Power Electronics, Electrical Machines & Control Engineering.",
    badge: "B.Tech Degree",
    docUrl: "https://drive.google.com/file/d/1xJyi8n99Rj62SMwUM2shlcvNbzegyDfZ/view?usp=sharing"
  }
];

export const marineElectricalSkills: string[] = [
  "COC | ETO ",
  "Proficient in Reefer Systems ",
  "Experience with DUAL FUEL ME & AEs",
  "Fuel Gas Supply System",
  "HV (High Voltage) Electrical Systems",
  "Modern Alarm & Monitoring Protocol Systems",
  "EGR & SCR Environmental Systems"
];

export const itSkills: string[] = [
  "Computer Networking & Protocols",
  "JavaScript (ES6+) & Java",
  "Full Stack Software Development",
  "REST APIs & Web Architecture",
  "Responsive UI/UX Design",
  "Git & Modern Deployment Pipelines"
];

export const activeLearningSkills: string[] = [
  // "Spanish (Español) — Currently Learning 🇲🇽🇪🇸",
  "Advanced Automation & PLC Logic",
  "Cloud Architecture & Microservices",
  "Maritime Cyber Security Protocols",
  "Embedded Systems & IoT Integration"
];
