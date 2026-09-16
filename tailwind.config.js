/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './en/*.html', './js/*.js'],
  theme: { extend: {
    fontFamily: {
      sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
      // 英語ページ用。日本語グリフを持たない Noto Sans を読むことで、
      // Google Fonts から返る CSS が 89KB から数KBに減る。
      // ラテン文字の字形は Noto Sans JP と共通なので見た目は変わらない。
      en: ['"Noto Sans"', 'system-ui', 'sans-serif'],
    },
    colors: { ink: '#1f1f1f', mute: '#6b6b6b', line: '#e5e5e5' },
  } },
};
