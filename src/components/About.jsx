import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-8 text-center text-primary">About Me</h2>
                    <div className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                        <p>
                            I am a dedicated Associate Software Developer at NOVATECH SOFTWARE with a strong background in full-stack development, AI integration, and robust system design. I hold a B. Tech in Computer Science from Government College of Engineering, Amravati, with a CGPA of 8.96. Currently, I'm engineering AI assistants using LLM APIs (OpenAI, Azure), implementing RAG, and leading end-to-end development of innovative applications.
                        </p>
                        <p>
                            My passion lies in solving complex problems through innovative scalable technology solutions, with experience in distributed searching systems, machine learning integrations, and dynamic web applications.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
