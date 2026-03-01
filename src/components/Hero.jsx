import React from 'react';
import { motion } from 'framer-motion';
import avatar from '../assets/images/avatar.jpg';

const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center pt-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <img
                    src={avatar}
                    alt="Dipesh Marathe"
                    className="w-40 h-40 rounded-full border-4 border-primary shadow-lg object-cover mx-auto"
                />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-4"
            >
                I am <span className="text-primary">Dipesh Marathe</span>
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl px-4"
            >
                A passionate Associate Software Developer with expertise in Full-Stack Development and AI Integration.
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex space-x-4"
            >
                <a
                    href="#portfolio"
                    className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                    View Projects
                </a>
                <a
                    href="#contact"
                    className="px-8 py-3 border-2 border-primary text-primary dark:text-white rounded-full font-semibold hover:bg-primary hover:text-white transition-all transform hover:scale-105"
                >
                    Contact Me
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;
