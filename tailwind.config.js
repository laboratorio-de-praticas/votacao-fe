/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                verdana: ['Verdana', 'sans-serif'], // Certifique-se de que Verdana está configurada
            },
        },
    },
    plugins: [],
};