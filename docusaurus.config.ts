import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import Translate, {translate} from "@docusaurus/Translate";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'Java Chains',
    tagline: "",
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    // url: 'https://your-docusaurus-site.example.com',
    // url: 'https://java-chains.vulhub.org/',
    url: 'https://java-chains.github.io/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'java-chains', // Usually your GitHub org/user name.
    projectName: 'java-chains.github.io', // Usually your repo name.
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    sidebarCollapsible: false,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'Java Chains',
            logo: {
                alt: 'Java Chains Logo',
                src: 'img/favicon.ico',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Guide',
                },
                {
                    href: 'https://github.com/vulhub/java-chains',
                    position: 'right',
                    className: 'header-github-link',
                    'aria-label': 'GitHub',
                    label: 'GitHub',
                },
                {
                    type: 'localeDropdown',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Guide',
                            to: '/docs/guide',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        // {
                        //     label: 'Stack Overflow',
                        //     href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                        // },
                        {
                            label: 'Discord',
                            href: 'https://discord.gg/ukC8KTrRXv',
                        },
                        // {
                        //     label: 'X',
                        //     href: 'https://x.com/docusaurus',
                        // },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        // {
                        //     label: 'Blog',
                        //     to: '/blog',
                        // },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/vulhub/java-chains',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Java Chains, Inc.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
