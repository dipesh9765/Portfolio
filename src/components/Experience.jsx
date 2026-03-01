import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center text-primary"
                >
                    Experience
                </motion.h2>

                <div className="max-w-4xl mx-auto space-y-12">
                    {experience.map((job, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 border-l-4 border-primary"
                        >
                            <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full border-4 border-white dark:border-gray-900"></div>

                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{job.role}</h3>
                            <h4 className="text-xl text-primary mb-2">{job.company}</h4>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4">{job.period}</p>

                            {job.tech && (
                                <p className="italic text-gray-600 dark:text-gray-300 mb-4">
                                    <span className="font-semibold">Tech Stack:</span> {job.tech}
                                </p>
                            )}

                            {job.description && (
                                <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
                            )}

                            {job.details && (
                                <div className="space-y-6 mt-4">
                                    {job.details.map((detail, idx) => (
                                        <div key={idx}>
                                            <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{detail.period}</h5>
                                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                                {detail.items.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
