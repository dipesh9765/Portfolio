import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaMobileAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }

        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center text-primary"
                >
                    Get In Touch
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                            If you would like to get in touch with me, please feel free to send a message. I am open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-primary">
                                    <FaHome size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Address</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Nagpur, Maharashtra<br />India</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-primary">
                                    <FaMobileAlt size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Phone</h3>
                                    <p className="text-gray-600 dark:text-gray-400">8766726443</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-primary">
                                    <FaEnvelope size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
                                    <a href="mailto:dipeshmarathe9765@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                        dipeshmarathe9765@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <a
                                href="/assets/files/Dipesh Resume.pdf"
                                download="Dipesh_Marathe_Resume.pdf"
                                className="inline-block px-8 py-3 bg-secondary text-white rounded-full hover:bg-primary transition-colors shadow-lg"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" name="access_key" value="b55d6052-7e73-411c-9d14-edf26a770188" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="Your Email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all transform hover:scale-105 ${status === 'success' ? 'bg-green-500' :
                                    status === 'error' ? 'bg-red-500' :
                                        'bg-primary hover:bg-opacity-90'
                                    }`}
                            >
                                {status === 'sending' ? 'Sending...' :
                                    status === 'success' ? 'Message Sent!' :
                                        status === 'error' ? 'Error! Try Again' :
                                            'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
