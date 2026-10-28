// Everything the AI twin is allowed to say. Each entry is a first-person statement
// written from real résumé facts; the twin never says anything that is not in here.

/**
 * One fact the twin can answer from.
 * @typedef {object} TwinDoc
 * @property {string} id - Stable identifier.
 * @property {string} title - Short name shown as a source chip.
 * @property {'ai'|'ui'|'be'|'side'|'found'|'about'} group - Area of work; sets the chip colour.
 * @property {string} tags - Space-separated search keywords.
 * @property {string} say - The first-person answer text.
 */

/** @type {TwinDoc[]} */
export const twinDocs = [
    { id: 'about', title: 'Who I am', group: 'about', tags: 'who are you dipesh introduce introduction summary background current job role position novatech nagpur yourself hello hi',
        say: "I'm Dipesh Marathe, a Gen AI and full-stack developer at Novatech Software in Nagpur. Since January 2024 I've been building production AI features: multi-provider LLM integrations, a RAG pipeline, a custom MCP server, and the AI Governor that controls every model call." },
    { id: 'governor', title: 'AI Governor Server', group: 'ai', tags: 'governor gateway rate limit limiting queue queuing token budget budgeting audit logging redis postgres postgresql express proxy cost control llm calls proud hardest',
        say: "I built the AI Governor Server in Express 5 with Redis and PostgreSQL. Every LLM call in our product passes through it: it rate-limits, queues requests, enforces token budgets and writes an audit log. I also wrote Jest tests for its usage-tracking and cost-calculation module, so the limits are actually enforced. This chat runs on a small version of the same idea." },
    { id: 'rag', title: 'AI assistant with RAG', group: 'ai', tags: 'rag retrieval augmented generation assistant openai azure multi provider llm integration productivity satisfaction user data records quality proud',
        say: "I integrated OpenAI and Azure OpenAI into our production assistant, which raised user productivity by 68%. Then I added a RAG pipeline over each user's own data, and satisfaction went up by 87%. The assistant guides users, generates records from prompts and scores record quality." },
    { id: 'mcp', title: 'Custom MCP server', group: 'ai', tags: 'mcp model context protocol server agent agents agentic workflow workflows tools tool calling secure api business rules requirements management',
        say: "I built a custom MCP server for our requirements-management product. It encodes the product's configuration and business rules, so LLMs can call its APIs securely, and I orchestrate agentic workflows on top of it." },
    { id: 'schema', title: 'Strict JSON-schema prompting', group: 'ai', tags: 'json schema structured output outputs prompt prompting pipeline engineering reliable multi step',
        say: 'I design prompt pipelines that force strict JSON-schema outputs. That keeps multi-step AI tasks reliable and machine-readable instead of hoping the model formats things right.' },
    { id: 'aigov', title: 'AI governance for free tier', group: 'ai', tags: 'governance free tier usage control audit policy limits users',
        say: "I designed the AI governance for our product's free-tier AI features, so we can control and audit how users consume AI capabilities." },
    { id: 'uceditor', title: 'Use Case Flow Editor', group: 'ui', tags: 'use case flow editor uml activity diagram diagrams test cases qa traceability authoring end to end frontend proud',
        say: 'I built the Use Case Flow Editor end to end. Users author structured flows, the editor auto-generates UML activity diagrams, and AI synthesises test cases from each flow, so QA can trace every requirement to a test.' },
    { id: 'dashboard', title: 'Role-based dashboard', group: 'ui', tags: 'dashboard gridstack widgets role based configurable workflow efficiency frontend',
        say: 'I shipped a role-based dashboard on Gridstack with configurable widgets. It improved team workflow efficiency by 73%.' },
    { id: 'extjs', title: 'Custom ExtJS components', group: 'ui', tags: 'extjs sencha components syntax highlighter widgets data entry frontend ui',
        say: 'I build custom Sencha ExtJS components, like syntax highlighters and rich data-entry widgets, for complex data-pipeline UIs.' },
    { id: 'mobile', title: 'Mobile dashboard app', group: 'ui', tags: 'mobile app remote dashboard test execution leading lead',
        say: "I'm leading a new mobile app for remote dashboard access and distributed test execution." },
    { id: 'migration', title: 'Legacy to web migration', group: 'be', tags: 'migration legacy monolith desktop node web stack scalable backend decouple architecture secure coding banking finance',
        say: 'I led the migration of legacy monolithic desktop tools to a scalable Node.js web stack, decoupling the frontend from backend logic. I apply secure-coding practice throughout, including for banking and financial-services customers.' },
    { id: 'search', title: 'Big Data search engine', group: 'be', tags: 'big data search engine distributed inverted index indexing concurrency concurrent latency python mysql hackathon sih 10 million records',
        say: 'For Smart India Hackathon I built a distributed keyword search engine with inverted indexing and concurrent processing. It searches 10M+ records with 70% lower latency.' },
    { id: 'parsing', title: 'Content-parsing engine', group: 'ui', tags: 'internship intern parsing paste content record creation time cross browser bugs',
        say: 'In my internship, January to April 2024, I built a content-parsing engine that cut record creation time by 95%. I also fixed critical cross-browser bugs and prototyped three features that later shipped.' },
    { id: 'kitepulse', title: 'KitePulse-AI', group: 'side', tags: 'kitepulse trading market agent autonomous alerts zerodha kite telegram side project mcp retries timeouts',
        say: 'KitePulse-AI is my side project: an autonomous market-monitoring agent with conditional alerts, rate limiting, timeouts and retries. It exposes trading state to the LLM through MCP.' },
    { id: 'calorie', title: 'AI Calorie Tracker', group: 'side', tags: 'calorie nutrition tracker agent pgvector typescript human in the loop approval side project',
        say: 'I built an AI calorie and nutrition tracker: an agent that logs food from unstructured input under strict JSON schemas, recalls past history with pgvector, and asks for my approval before it changes anything.' },
    { id: 'cp', title: 'Competitive programming', group: 'found', tags: 'competitive programming dsa algorithms leetcode codechef gfg geeksforgeeks problems rating contests',
        say: "I've solved 1,000+ problems across LeetCode, GeeksforGeeks and CodeChef, where my rating is 1630. DSA is the foundation I lean on for every system I design." },
    { id: 'mentor', title: 'Mentoring and teaching', group: 'found', tags: 'mentor mentoring teaching gdsc google developer student club advisor students fest prajwalan convenor leadership',
        say: 'I was the DSA and competitive-programming advisor at Google Developer Student Club, where I mentored 100+ students. I also co-convened Prajwalan 2k22, our college technical fest.' },
    { id: 'awards', title: 'Awards', group: 'found', tags: 'awards recognition achievement achievements bright beginner talent hunt winner smart india hackathon finalist',
        say: "I won the Bright Beginner Award in 2025 for my first six months at Novatech, ranked 1st of 10,000+ in L&T EduTech's Talent Hunt 2024, and was a Smart India Hackathon 2022 finalist, top 1% of 50,000+ teams." },
    { id: 'education', title: 'Education', group: 'found', tags: 'education college degree btech b tech computer science government engineering amravati cgpa graduation',
        say: 'I did my B.Tech in Computer Science at Government College of Engineering, Amravati, from 2020 to 2024, with a CGPA of 8.96.' },
    { id: 'skills', title: 'Skills and stack', group: 'about', tags: 'skills stack languages tech technologies tools know node typescript python java javascript react postgres redis mysql',
        say: 'Day to day I work in Node.js (Express 5), TypeScript, JavaScript, Python and Java, with React and Sencha ExtJS on the frontend and PostgreSQL, pgvector, Redis and MySQL underneath. On the AI side: OpenAI, Azure OpenAI, RAG, MCP and agentic workflows.' },
    { id: 'quality', title: 'Testing and code quality', group: 'be', tags: 'testing jest unit tests quality code review peer review collaborate product managers designers secure validation',
        say: 'I write Jest unit tests, take part in peer code reviews, and work with product managers and designers on requirements and solution strategy.' },
    { id: 'contact', title: 'Contact', group: 'about', tags: 'contact hire hiring email reach resume cv linkedin github available open roles job interview',
        say: "I'm open to Gen AI, agentic and backend roles. The fastest way to reach me is dipeshmarathe9765@gmail.com; I'm also on GitHub and LinkedIn as dipesh9765." },
    { id: 'site', title: 'How this assistant works', group: 'about', tags: 'how does this work site assistant twin bot you real model architecture fallback local proxy',
        say: "I'm a retrieval agent over Dipesh's real résumé facts, and I answer in his voice. When a live model is configured, I call it through a small proxy with its own rate limit and token budget, like his Governor. Otherwise I answer from retrieval in your browser, so I only say things that are on record." },
];

/** Starter questions shown as tap-to-ask chips in the chat. */
export const twinSuggestions = [
    'What are you proudest of?',
    'How does the AI Governor work?',
    'Tell me about the RAG assistant',
    'What did you build with MCP?',
    'How strong is your DSA?',
];
