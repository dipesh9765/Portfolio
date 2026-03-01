import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center text-primary"
                >
                    Skills
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(skills).map(([category, items], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-gray-200 border-b-2 border-primary pb-2 inline-block">
                                {category}
                            </h3>
                            <ul className="space-y-2">
                                {items.map((skill) => (
                                    <li key={skill} className="flex items-center text-gray-600 dark:text-gray-400">
                                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
