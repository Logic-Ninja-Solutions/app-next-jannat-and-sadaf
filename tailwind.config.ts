import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                'slide-in': 'slide-in 0.3s ease-in-out',
                'slide-out': 'slide-out 0.3s ease-in-out',
            },
            keyframes: {
                'slide-in': {
                    from: {
                        transform: 'translateX(100%)',
                    },
                    to: {
                        transform: 'translateX(0%)',
                    },
                },
                'slide-out': {
                    from: {
                        transform: 'translateX(0%)',
                    },
                    to: {
                        transform: 'translateX(100%)',
                    },
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            layout: {
                radius: {
                    small: '0',
                    medium: '0',
                    large: '0',
                },
            },
            themes: {
                light: {
                    colors: {
                        primary: '#FFFFFF',
                        content1: '#EBEEF0',
                        secondary: {
                            DEFAULT: '#000000',
                            foreground: '#FFFFFF',
                        },
                    },
                },
                dark: {
                    colors: {
                        primary: '#000000',
                        content1: '#000000',
                        secondary: {
                            DEFAULT: '#FFFFFF',
                            foreground: '#000000',
                        },
                    },
                },
            },
        }),
    ],
}
