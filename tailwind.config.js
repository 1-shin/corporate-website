/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './en/*.html'],
  theme: { extend: {
    fontFamily: { sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'] },
    colors: { ink: '#1f1f1f', mute: '#6b6b6b', line: '#e5e5e5' },
  } },
};
