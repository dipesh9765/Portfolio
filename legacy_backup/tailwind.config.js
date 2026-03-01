/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",
        "./assets/**/*.js",
        "./assets/**/*.css"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    500: '#49bf9d',
                    600: '#3a9b7a',
                    700: '#2d7a5f',
                },
                gray: {
                    50: '#f8f9fa',
                    100: '#e9ecef',
                    600: '#666666',
                    700: '#333333',
                }
            },
            fontFamily: {
                'sans': ['system-ui', '-apple-system', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out',
            },
            keyframes: {
                fadeInUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(30px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
} 