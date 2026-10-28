// Page content: every number, project, role and link shown on the site. No logic here.
// Layer keys used throughout: 'fe' frontend, 'be' backend, 'ai' AI.

/** Display name for each layer key. */
export const LAYER_NAMES = { fe: 'Frontend', be: 'Backend', ai: 'AI' };

/** Contact and profile links. */
export const links = {
    email: 'dipeshmarathe9765@gmail.com',
    github: 'https://github.com/dipesh9765',
    linkedin: 'https://www.linkedin.com/in/dipesh9765',
    leetcode: 'https://leetcode.com/u/dipesh9765',
    resume: `${import.meta.env.BASE_URL}assets/files/Dipesh_Resume.pdf`,
};

/** Headline results shown in the strip under the hero. */
export const metrics = [
    { value: '68%', label: 'productivity gain from the LLM assistant' },
    { value: '87%', label: 'satisfaction gain after adding RAG' },
    { value: '95%', label: 'faster record creation with the parsing engine' },
    { value: '73%', label: 'team workflow efficiency from role-based dashboards' },
    { value: '10M+', label: 'records searched, latency down 70%' },
];

/** Stations of an AI request, shown in the "How I build" section. */
export const pipelineNodes = [
    { layer: 'fe', name: 'Client', detail: 'React and Sencha ExtJS interface' },
    { layer: 'be', name: 'AI Governor', detail: 'Express 5, Redis, PostgreSQL' },
    { layer: 'ai', name: 'Retrieval and LLM', detail: 'RAG over user data, OpenAI and Azure OpenAI' },
    { layer: 'be', name: 'MCP server', detail: 'Business rules and product APIs' },
];

/** Request trace lines. node: index into pipelineNodes; packet: hero-canvas hop fired at this step. */
export const pipelineSteps = [
    { node: 0, layer: 'fe', tag: 'CLIENT', text: 'Prompt captured in the React / ExtJS client, validated, and sent to the API.', packet: [0, 1] },
    { node: 1, layer: 'be', tag: 'GOVERNOR', text: 'AI Governor checks the rate limit, queues the request, reserves the token budget and writes an audit entry.', packet: [0, 1] },
    { node: 2, layer: 'ai', tag: 'RAG', text: 'Relevant records are retrieved from the user’s own data before the model is called.', packet: [1, 2] },
    { node: 2, layer: 'ai', tag: 'LLM', text: 'Request routed to OpenAI or Azure OpenAI. The reply is held to a strict JSON schema.', packet: [1, 2] },
    { node: 3, layer: 'be', tag: 'MCP', text: 'The MCP server applies the product’s business rules and calls its APIs on the model’s behalf.', packet: [2, 1] },
    { node: 0, layer: 'fe', tag: 'CLIENT', text: 'Structured record returned and shown to the user for review.', packet: [1, 0] },
];

/** Project cards. layers: which layer keys the project covers; href: optional public repository. */
export const work = [
    { title: 'MCP server for the product', layers: ['ai', 'be'], status: 'Production', tags: 'MCP · Node.js · Agents',
        description: 'A custom Model Context Protocol server that encodes the product’s configuration and business rules, so LLMs reach its APIs securely. Agentic workflows run on top.',
        result: 'Agentic', resultLabel: 'workflows on a secure tool layer' },
    { title: 'AI Governor Server', layers: ['ai', 'be'], status: 'Production', tags: 'Express 5 · Redis · PostgreSQL · Jest',
        description: 'The gateway every LLM call passes through: rate limiting, request queuing, token budgeting and audit logging, with Jest tests on the cost and usage module.',
        result: '4 controls', resultLabel: 'limit, queue, budget, audit' },
    { title: 'AI assistant with RAG', layers: ['ai', 'fe'], status: 'Production', tags: 'OpenAI · Azure · RAG · JSON schema',
        description: 'A multi-provider assistant (OpenAI, Azure OpenAI) that guides users, generates records from prompts and scores record quality, grounded in each user’s own data.',
        result: '+87%', resultLabel: 'user satisfaction, +68% productivity' },
    { title: 'Use Case Flow Editor', layers: ['fe', 'ai'], status: 'Production', tags: 'JavaScript · React · Node.js',
        description: 'Authoring tool built end to end: structured flows, auto-generated UML activity diagrams and AI-synthesised test cases for QA traceability.',
        result: 'Flow to test', resultLabel: 'diagrams and cases generated' },
    { title: 'Role-based dashboard', layers: ['fe', 'be'], status: 'Production', tags: 'Gridstack · JavaScript · MySQL',
        description: 'Configurable widget dashboards that adapt to each role, drag and drop on Gridstack, backed by REST services.',
        result: '+73%', resultLabel: 'team workflow efficiency' },
    { title: 'Mobile dashboard app', layers: ['fe'], status: 'In progress', tags: 'Mobile · REST · Real-time',
        description: 'Leading a new mobile app for remote dashboard access and distributed test execution.',
        result: 'Lead', resultLabel: 'building from zero' },
    { title: 'KitePulse-AI', layers: ['ai', 'be'], status: 'Side project', tags: 'Node.js · Express 5 · Kite API · MCP',
        description: 'An autonomous market-monitoring agent with conditional alerts, rate limiting, timeouts and retries. Trading state is exposed to the LLM through MCP.',
        result: 'Agent', resultLabel: 'always-on, retries built in' },
    { title: 'AI Calorie Tracker', layers: ['ai', 'be'], status: 'Side project', tags: 'TypeScript · Express 5 · pgvector',
        description: 'An agent that logs nutrition from unstructured input under strict JSON schemas, recalls past history with pgvector, and asks for approval before changing state.',
        result: 'Human in loop', resultLabel: 'approval before any change' },
    { title: 'Big Data search engine', layers: ['be'], status: 'Open source', tags: 'Python · MySQL · Concurrency',
        description: 'Distributed keyword search with inverted indexing and concurrent processing. Built for Smart India Hackathon 2022.',
        result: '−70%', resultLabel: 'latency across 10M+ records', href: 'https://github.com/dipesh9765/SIH-Big-Data-Searching' },
];

/** Roles at Novatech; each item is [layer key, achievement]. */
export const roles = [
    { title: 'Associate Software Developer', period: 'May 2024 to present', items: [
        ['ai', 'Built a custom MCP server for the requirements-management product and orchestrated agentic workflows on top of it.'],
        ['ai', 'Engineered the AI Governor Server: rate limiting, queuing, token budgeting and audit logging for every LLM call.'],
        ['ai', 'Integrated OpenAI and Azure OpenAI into a production assistant (+68% productivity) and added RAG over user data (+87% satisfaction).'],
        ['ai', 'Designed prompt pipelines with strict JSON-schema outputs for reliable multi-step tasks.'],
        ['fe', 'Shipped a role-based Gridstack dashboard (+73% workflow efficiency) and custom ExtJS components such as syntax highlighters.'],
        ['fe', 'Built the Use Case Flow Editor with UML diagram generation and AI-written test cases; now leading the mobile app.'],
        ['be', 'Led the migration of legacy desktop tools to a scalable Node.js web stack, applying secure coding for banking and finance customers.'],
    ] },
    { title: 'Software Developer Intern', period: 'Jan to Apr 2024', items: [
        ['fe', 'Built a content-parsing engine that cut record creation time by 95%.'],
        ['fe', 'Fixed critical cross-browser bugs and prototyped three features that shipped to production.'],
    ] },
];

/** Skills grouped by layer. */
export const toolbox = [
    { layer: 'fe', name: 'Frontend', items: 'React · Sencha ExtJS · Tailwind CSS · Gridstack · HTML and CSS' },
    { layer: 'be', name: 'Backend', items: 'Node.js · Express 5 · Java · Python · TypeScript · REST · PostgreSQL · MySQL · Redis · Jest' },
    { layer: 'ai', name: 'AI', items: 'OpenAI · Azure OpenAI · RAG · pgvector · MCP · Agentic workflows · JSON-schema prompting · AI governance' },
];

/** Awards and achievements, newest first. */
export const awards = [
    { when: '2025', title: 'Bright Beginner Award', note: 'Standout contribution within the first six months at Novatech.' },
    { when: '2024', title: 'Talent Hunt winner', note: 'Ranked 1st among 10,000+ participants (L&T EduTech).' },
    { when: '2022', title: 'Smart India Hackathon finalist', note: 'Top 1% of 50,000+ teams.' },
    { when: 'Ongoing', title: '1,000+ problems solved', note: 'LeetCode, GeeksforGeeks and CodeChef. CodeChef rating 1630.' },
    { when: 'GDSC', title: 'DSA and competitive programming advisor', note: 'Mentored 100+ students at Google Developer Student Club.' },
];
