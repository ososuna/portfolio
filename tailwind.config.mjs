/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {},
		screens: {
			'xss': '360px',
			'xs': '475px',
			...defaultTheme.screens,
		},
	},
	plugins: [],
}
