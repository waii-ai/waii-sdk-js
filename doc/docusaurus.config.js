const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

(module.exports = {
    title: 'Waii Javascript SDK',
    tagline: 'World most accurate text-2-sql API',
    url: 'https://doc.waii.ai',
    baseUrl: '/js/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'waii',
    projectName: 'waii-sdk-js',
    
    presets: [
	[
	    '@docusaurus/preset-classic',
	    ({
		docs: {
		    sidebarPath: require.resolve('./sidebars.js'),
		    editUrl: 'https://github.com/waii-ai/waii-sdk-js/tree/main/docs/docs-waii-sdk-js',
		},
		theme: {
		    customCss: require.resolve('./src/css/custom.css'),
		},
	    }),
	],
    ],
    
    themeConfig:
    ({
	navbar: {
            title: 'Waii Javascript SDK',
            logo: {
		alt: 'Waii Logo',
		src: 'img/logo.png',
            },
	    items: [
					{
						type: 'dropdown',
						label: 'Select Documentation',
						position: 'right',
						items: [
							{
								label: 'TypeScript/JavaScript SDK',
								to: 'https://doc.waii.ai/js/',
							},
							{
								label: 'Python SDK',
								to: 'https://doc.waii.ai/python/',
							},
							{
								label: 'CLI',
								to: 'https://doc.waii.ai/cli/',
							},
							{
								label: 'Deployment & Architecture',
								to: 'https://doc.waii.ai/deployment/',
							}
						],
					},
	    ],
	},
	footer: {
            style: 'dark',
            links: [
		{
		    title: 'Company',
		    items: [
			{
			    label: 'Website',
			    href: 'https://waii.ai/',
			},
			{
			    label: 'LinkedIn',
			    href: 'https://www.linkedin.com/company/96891121/',
			}
		    ],
		},
		{
		    title: 'Community',
		    items: [
			{
			    label: 'Slack',
			    href: 'https://join.slack.com/t/waiicommunity/shared_invite/zt-1xib44mr5-LBa7ub9t_vGvo66QtbUUpg',
			}
		    ],
		},
		{
		    title: 'More',
		    items: [
			{
			    label: 'GitHub',
			    href: 'https://github.com/waii-ai/waii-sdk-js',
			},
		    ],
		},
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Waii, Inc.`,
	},
	prism: {
            theme: lightCodeTheme,
            darkTheme: darkCodeTheme,
	},
    }),
});
