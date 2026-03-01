import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 transition-colors duration-300">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center space-x-8 mb-8">
                    <a
                        href="https://leetcode.com/u/dipesh9765/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors transform hover:scale-110"
                    >
                        <FaCode size={24} />
                        <span className="sr-only">LeetCode</span>
                    </a>
                    <a
                        href="https://github.com/dipesh9765/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors transform hover:scale-110"
                    >
                        <FaGithub size={24} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/dipesh9765/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors transform hover:scale-110"
                    >
                        <FaLinkedin size={24} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                        href="mailto:dipeshmarathe9765@gmail.com"
                        className="text-gray-500 hover:text-primary transition-colors transform hover:scale-110"
                    >
                        <FaEnvelope size={24} />
                        <span className="sr-only">Email</span>
                    </a>
                </div>

                <p className="text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Dipesh Marathe. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
