module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      // diğer yollar...
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }