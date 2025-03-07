import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, {translate} from "@docusaurus/Translate";
import {JSX} from 'react';

type ModuleOrFeatureItem = {
    title: string;
    Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
    imageUrl?: React.ComponentType<React.ComponentProps<'img'>>;
    description: JSX.Element;
};


function ModulesOrFeatures({title, Svg, imageUrl, description}: ModuleOrFeatureItem) {
    // @ts-ignore
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                {Svg ? (
                    <Svg className={`${styles.featureSvg} ${styles.svgHover}`} role="img"/>
                ) : imageUrl ? (
                    <img className={`${styles.featureSvg} ${styles.svgHover}`}
                         src={imageUrl}
                         alt={title}/>
                ) : null} {/* 可以添加默认的占位符或者不渲染任何内容 */}
            </div>

            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}


const ModuleList: ModuleOrFeatureItem[] = [
    {
        title: translate({id: 'homepage.modules.generate.title', message: 'Java Payload 生成'}),
        // Svg: require('@site/static/img/generate.bak.svg').default,
        imageUrl: require('@site/static/img/generate.png').default,
        description: (
            <>
                <Translate id="homepage.modules.generate">Java 反序列化、Hessian 反序列化、字节码等生成</Translate>
            </>
        ),
    },
    {
        title: translate({id: 'homepage.modules.jndi.title', message: 'JNDI 注入'}),
        Svg: require('@site/static/img/jndi.svg').default,
        description: (
            <>
                <Translate id="homepage.modules.jndi">6 种 JNDI 注入利用以及 Fuzz 功能</Translate>
            </>
        ),
    },
    {
        title: translate({id: 'homepage.modules.fakemysql.title', message: 'Fake MySQL Server'}),
        // Svg: require('@site/static/img/fake-mysql.svg').default,
        imageUrl: require('@site/static/img/fake-mysql-logo.png').default,
        description: (
            <>
                <Translate id="homepage.modules.fakemysql">MySQL JDBC 反序列化利用以及 Fuzz 功能</Translate>
            </>
        ),
    },
    {
        title: translate({id: 'homepage.modules.rmi.title', message: 'JRMPListener'}),
        Svg: require('@site/static/img/jrmp-listener.svg').default,
        description: (
            <>
                <Translate id="homepage.modules.rmi">RMI (JRMP) 反序列化利用</Translate>
            </>
        ),
    },
    {
        title: translate({id: 'homepage.modules.httpserver.title', message: 'HTTP Server'}),
        imageUrl: require('@site/static/img/http-server.png').default,
        description: (
            <>
                <Translate id="homepage.modules.httpserver">适用于SpringXml、Groovy Jar、Snakeyaml jar 等 HTTP
                    反连场景</Translate>
            </>
        ),
    },
    {
        title: translate({id: 'homepage.modules.tcpserver.title', message: 'TCP Server'}),
        // Svg: require('@site/static/img/tcp-server.svg').default,
        imageUrl: require('@site/static/img/tcp-server.png').default,
        description: (
            <>
                <Translate id="homepage.modules.tcpserver">适用于 Derby 反序列化</Translate>
            </>
        ),
    },
];

export function Modules(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <h1 className="text--center margin-top--lg">
                    <Translate id="homepage.modules.title">模块</Translate>
                </h1>
                <div className="row">
                    {ModuleList.map((props, idx) => (
                        <ModulesOrFeatures key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}


const FeatureList: ModuleOrFeatureItem[] = [
    {
        title: translate({id: 'homepage.feature.one.title', message: '方便'}),
        Svg: require('@site/static/img/trust.svg').default,
        description: (
            <>
                <Translate id="homepage.feature.one">一键搭建部署，Java Payload 生成通过 Web 一站式搞定</Translate>
            </>
        ),
    },
    {
        title: translate({id: 'homepage.feature.two.title', message: '简单'}),
        Svg: require('@site/static/img/professional.svg').default,
        description: (
            <>
                <Translate id="homepage.feature.two">Gadget 与 Payload
                    在各种场景下通用，一次编写，到处应用，杜绝重复代码</Translate>
            </>
        ),
    },
    {
        title: translate({id: 'homepage.feature.three.title', message: '多样'}),
        Svg: require('@site/static/img/community.svg').default,
        description: (
            <>
                <Translate id="homepage.feature.three">提供多样化的模块，包括生成模块、JNDI、RMI、Fake MySQL
                    等，覆盖了常见反连测试环境</Translate>
            </>
        ),
    },
];

export function Features(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <h1 className="text--center margin-top--lg">
                    <Translate id="homepage.modules.title">特点</Translate>
                </h1>
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <ModulesOrFeatures key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
