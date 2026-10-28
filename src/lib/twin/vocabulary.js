// Language rules for twin retrieval: words to ignore, synonyms to expand, and intent patterns
// that route common questions straight to the right fact.

/** Words too common to help find a fact. */
export const STOP_WORDS = new Set((
    'a an the is are was were be been to of and or in on for with about what whats how why who whom did does do done ' +
    'you your yours he his him me my i tell show give can could would should please this that it its at as by from any some much many most ' +
    'more have has had there their them they we our us know want like build built work worked made make'
).split(' '));

/** Extra search words for each word a visitor might type (space-separated). */
export const SYNONYMS = {
    llm: 'ai openai azure model', llms: 'ai openai azure model', genai: 'ai llm', gpt: 'openai llm', ai: 'llm assistant',
    governance: 'governor audit limit', limits: 'limit governor', rate: 'governor limit', budget: 'governor token', tokens: 'token governor', cost: 'governor budget',
    retrieval: 'rag', vector: 'pgvector rag', embeddings: 'rag pgvector', mcp: 'protocol agent tool', agent: 'agentic mcp', agents: 'agentic mcp', agentic: 'agent mcp',
    frontend: 'react extjs ui dashboard editor', ui: 'frontend', ux: 'frontend', backend: 'node express api migration', api: 'backend', react: 'frontend',
    dsa: 'competitive algorithms', cp: 'competitive', leetcode: 'competitive', codechef: 'competitive',
    hire: 'contact', email: 'contact', resume: 'contact', cv: 'contact', salary: 'contact', available: 'contact',
    test: 'jest testing', tests: 'jest testing', qa: 'test editor', editor: 'flow uml', uml: 'editor flow', diagram: 'uml flow',
    trading: 'kitepulse market', stocks: 'kitepulse market', college: 'education', degree: 'education', cgpa: 'education', university: 'education',
    award: 'awards', prize: 'awards', mentor: 'mentoring', teach: 'mentoring', teaching: 'mentoring',
    stack: 'skills', experience: 'novatech role about', job: 'about role', proud: 'governor rag editor', proudest: 'proud governor',
    best: 'proud', favourite: 'proud', favorite: 'proud', study: 'education', studied: 'education', graduate: 'education',
    twin: 'site assistant', real: 'site', scale: 'search governor', performance: 'search latency', database: 'postgres redis mysql',
    side: 'side project', projects: 'project',
};

/** [pattern, fact id] pairs: a question matching the pattern is answered from that fact first. */
export const INTENTS = [
    [/\b(this|the) (assistant|site|page|bot|chat)\b|\bare you (real|an? ai|a bot|human)\b|\bhow do you work\b/i, 'site'],
    [/\bproud(est)?\b|\bbest work\b|\bfavou?rite project\b/i, 'governor'],
];
