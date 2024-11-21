/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#28194b",
                /*  primary: "#7D49F8", */
                red: {
                    400: "#f87171",
                    500: "#f43f5e",
                    600: "#e11d48",
                },
                green: {
                    400: "#86efac",
                    500: "#22c55e",
                    600: "#16a34a",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
