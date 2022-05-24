const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      // 径向渐变属性
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      // 缓动属性
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
    // 思源黑体
    fontFamily: {
      noto: ['PingFangSC-Medium', 'PingFang SC', 'Noto Sans SC', 'sans-serif', 'system-ui'],
    },
  },
  daisyui: {
    themes: ['corporate'],
  },
  plugins: [
    require('daisyui'),
    // 定义标题样式
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.bold') },
        h2: { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.bold') },
        h3: { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.bold') },
        h4: { fontWeight: theme('fontWeight.bold') },
      });
    }),
  ],
};
