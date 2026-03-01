import project1 from '../assets/images/thumbs/project1.png';
import project2 from '../assets/images/thumbs/project2.png';
import project3 from '../assets/images/thumbs/project3.png';
import project4 from '../assets/images/thumbs/project4.png';
import project5 from '../assets/images/thumbs/project5.png';
import project6 from '../assets/images/thumbs/project6.png';

export const skills = {
    "Languages": ["Java", "JavaScript", "Python", "C/C++", "SQL"],
    "Frameworks": ["Sencha ExtJS", "React", "Spring Boot", "RESTful API", "Tailwind"],
    "Databases & Tools": ["MySQL", "Git", "Postman", "Jupyter", "VS Code"],
    "Core Concepts": ["DSA", "OOP", "Distributed Systems", "Concurrency", "Performance Tuning", "Design Patterns", "Agile (SCRUM)", "Debugging", "System Design", "Automation"]
};

export const projects = [
    {
        title: "Use Case Flow Editor",
        description: "Leading end-to-end development of a comprehensive flow editor that enables users to author structured flows and auto-generate activity diagrams and test cases, enhancing development traceability and QA automation.",
        tags: ["JavaScript", "React", "Node.js", "System Design"],
        image: project1,
        status: "Current Project"
    },
    {
        title: "AI Assistant Integration & RAG",
        description: "Engineered and integrated OpenAI and Azure LLM APIs into an AI assistant. Implemented RAG (Retrieval-Augmented Generation) to answer complex queries using user data, guiding users and analyzing record quality.",
        tags: ["OpenAI API", "Azure OpenAI", "RAG", "LLM"],
        image: project2,
        impact: "Impact: 68% productivity increase, 87% satisfaction increase"
    },
    {
        title: "Role-based Dashboard",
        description: "Designed and deployed a dynamic, role-based dashboard using Gridstack, improving specific team workflow efficiency.",
        tags: ["Gridstack", "JavaScript", "MySQL", "Spring Boot"],
        image: project3,
        impact: "Impact: 73% workflow efficiency improvement"
    },
    {
        title: "Content-Parsing Engine",
        description: "Designed and implemented a paste enhancement engine that reduced record creation time significantly through content parsing and transformation for a customer-centric product.",
        tags: ["JavaScript", "Parsing", "Automation"],
        image: project4,
        impact: "Impact: 95% time reduction in record creation"
    },
    {
        title: "Big Data Searching System",
        description: "Engineered a distributed keyword search engine using inverted indexing and concurrent processing, designed to handle queries across 10M+ records.",
        tags: ["Python", "MySQL", "JavaScript", "Distributed Systems", "Inverted Indexing"],
        image: project5,
        impact: "Impact: 70% reduction in search latency",
        link: "https://github.com/dipesh9765/SIH-Big-Data-Searching"
    },
    {
        title: "Mobile Dashboard App",
        description: "Leading development of a new mobile application for remote dashboard access and test execution modules, increasing product accessibility.",
        tags: ["Mobile Development", "RESTful API", "Real-time Access"],
        image: project6,
        status: "Current Project"
    }
];

export const experience = [
    {
        role: "Associate Software Developer",
        company: "NOVATECH SOFTWARE",
        period: "January 2024 - Present",
        tech: "JavaScript, Java, Sencha ExtJS, React, Node.js, MySQL, Agile (SCRUM)",
        details: [
            {
                period: "May 2024 - Present",
                items: [
                    "Engineered and integrated multiple LLM APIs (OpenAI, Azure) into an AI assistant, improving user productivity by 68%",
                    "Implemented Retrieval-Augmented Generation (RAG) enhancing AI's ability to answer complex queries, increasing user satisfaction by 87%",
                    "Built an AI assistant to guide users, auto-generate records from prompts, and analyze record quality using LLMs",
                    "Designed and deployed a dynamic, role-based dashboard using Gridstack, improving specific team workflow efficiency by 73%",
                    "Spearheaded end-to-end development of a Use Case Flow Editor to author structured flows and auto-generate activity diagrams",
                    "Integrated AI-driven logic into Flow Editor to auto-generate structured test cases, enhancing traceability and QA automation",
                    "Leading a new mobile app for remote dashboard access and test execution modules",
                    "Led migration of legacy desktop tools to a highly scalable web application using Spring Boot and Ext JS",
                    "Developed custom Sencha ExtJS UI components (e.g., syntax highlighters) for efficient complex data entry"
                ]
            },
            {
                period: "January 2024 - April 2024 (Internship)",
                items: [
                    "Designed and implemented a content-parsing engine that reduced record creation time by 95%",
                    "Ensured application stability by diagnosing and resolving critical cross-browser rendering bugs",
                    "Researched and Developed 3 minor projects that were later integrated into the product"
                ]
            }
        ]
    }
];

export const achievements = [
    "Finalist, Smart India Hackathon 2022 — Top 1% of 50,000+ teams.",
    "Bright Beginner Award 2025 — Recognized for standout contribution within first 6 months.",
    "Talent Hunt 2024 Winner — Ranked 1st among 10,000+ participants (L&T EduTech).",
    "DSA/CP Advisor, Google Developer Student Club — Mentored 100+ students.",
    "Solved 1000+ problems on Leetcode, GFG & CodeChef. CodeChef Rating: 1630.",
    "Co-convenor of Prajwalan 2k22, the college technical fest."
];
