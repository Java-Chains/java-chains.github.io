import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {Features, Modules} from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import {JSX} from 'react';
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle"><Translate id="homepage.tagline">Java Payload 综合生成平台</Translate></p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/guide">
                        {/*Docusaurus Tutorial - 5min ⏱️*/}
                        <Translate id="homepage.quicklystart">快速上手️</Translate>
                    </Link>
                </div>
            </div>
        </header>
    );
}

function Preview() {
    const { i18n } = useDocusaurusContext(); // 获取 Docusaurus 上下文
    const currentLocale = i18n.currentLocale; // 从上下文中获取当前 locale

    // 根据 locale 动态构建图片路径
    const imageName = currentLocale === 'en' ? 'main.png' : 'main.zh-cn.png';
    const imagePath = `/img/${imageName}`;
    const imageUrl = useBaseUrl(imagePath); // 使用 useBaseUrl 解析路径

    return (
        <section className={clsx("padding-vert--lg", styles.bgPreview)}>
            <div className="container">
                <div className="text--center margin-top--lg">
                    <h1>
                        <Translate id="homepage.preview.title">预览</Translate>
                    </h1>
                </div>
                <div className="row">
                    <img
                        className={styles.previewImage}
                        src={imageUrl} // 使用动态构建的 imageUrl
                        alt="Preview Image"
                    />
                </div>
            </div>
        </section>
    );
}


export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title} Official Website`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader/>
            <main>
                <Modules/>
                <Preview/>
                {/*<Features/>*/}
            </main>
        </Layout>
    );
}
