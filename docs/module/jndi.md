---
title: JNDI 注入
sidebar_position: 3
#custom_edit_url: https://github.com/facebook/docusaurus/edit/main/docs/api-doc-markdown.md
tags: [ jndi ]
last_update:
  date: 3/7/2025
  author: Ar3h
---

# JNDI 注入

支持六种利用姿势，外加一个便于一键测试常见链的 ShowHand 链

| Payload 名称                 | 说明                                                                | 适用版本                                                                                      | 支持协议     |
|----------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------|
| JNDIBasicPayload           | 最基础漏洞利用姿势，可远程加载，推荐使用LDAP，可利用的JDK版本覆盖比RMI的广                        | JDK < 8u191                                                                               | LDAP、RMI |
| JNDILDAPDeserializePayload | LDAP 反序列化                                                         | 低版本JDK                                                                                    | LDAP     |
| JNDIResourceRefPayload     | 基于ObjectFactory的利用，通过 Tomcat BeanFactory 类实现漏洞利用                  | 大部分Tomcat版本: tomcat8 < 8.5.79 tomcat9 < 9.0.63 tomcat10 < 10.0.21 tomcat10.1 < 10.1.0-M14 | LDAP、RMI |
| JNDIReferencePayload       | 基于ObjectFactory的利用，通过其他姿势实现漏洞利用，条件相对苛刻                            | 低版本JDK                                                                                    | LDAP、RMI |
| JNDIRefBypassPayload       | 在高版本 JDK 中限制 LDAP 反序列化，该姿势使用 javaReferenceAddress 属性绕过高版本 JDK 的限制 | 低版本JDK                                                                                    | LDAP、RMI |
| JNDIRMIDeserializePayload  | RMI 反序列化                                                          | 全JDK版本                                                                                    | RMI      |

使用该模块时，必须保证开启相关端口，若使用 JNDIBasicPayload 远程类加载，需要进一步配置好 Reverse IP 选项

> Java Chains 自从 1.4.0 版本加入了自动启动服务功能，点击生成时会自动判断并启动对应服务

## JNDIBasicPayload

LDAP 远程加载字节码

:::warning
注意：在使用该姿势时，必须在 JNDI 控制面板中设置 Reverse IP，保证目标服务器通过此 IP 反连到 Java Chains 的 HTTP 端口（默认情况下为
58080 端口）
:::

这里是一个远程类加载方式，所以这里可以根据恶意字节码来生成 JNDI Payload

这里选择的 Gadget 是 `Exec`，用于执行命令，点击可展开查看 Gadget 详情，可以在 cmd 参数框内输入要执行的命令，这里默认是执行 calc 命令

![](@site/static/doc/jndi-basic.zh_cn.png)

将生成的 LDAP/RMI Payload 放到存在 JNDI 注入的地方即可

以下功能操作基本上都是相通的，不多赘述

## JNDILDAPDeserializePayload

基于 LDAP 中 javaSerializedData 字段实现的反序列化

这里的控制面板是选择反序列化利用链

## JNDIResourceRefPayload

LDAP 基于 BeanFactory 的 Tomcat EL、Groovy 等利用

| class                                    | description    | remark            |
|------------------------------------------|----------------|-------------------|
| javax.el.ELProcessor#eval                | el表达式执行        | tomcat自带，最常见的利用   |
| groovy.lang.GroovyShell#evaluate         | Groovy表达式执行    |                   |
| org.mvel2.sh.ShellSession#exec           | mvel表达式执行      |                   |
| bsh.Interpreter#eval                     | Beanshell表达式执行 |                   |
| org.yaml.snakeyaml.Yaml#load             | snakeyaml反序列化  | springboot环境下测试成功 |
| com.thoughtworks.xstream.XStream#fromXML | xstream反序列化    | xstream依赖需要在漏洞版本内 |
| com.sun.glass.utils.NativeLibLoader      | 本地加载动态链接库      | jdk自带类            |

## JNDIReferencePayload

LDAP 基于其他 ObjectFactory 的Reference利用，例如各种DataSource JDBC利用

以下类适用于 BeanFactory 无法使用的场景，可用于替代的ObjectFactory的一些数据源工厂，可以实现加载本地jdbc url，转为jdbc相关利用：

| DataSource className                                | description  | remark                          |
|-----------------------------------------------------|--------------|---------------------------------|
| org.apache.tomcat.dbcp.dbcp.BasicDataSourceFactory  | 加载本地jdbc url |                                 |
| org.apache.tomcat.dbcp.dbcp2.BasicDataSourceFactory | 加载本地jdbc url |                                 |
| org.apache.commons.dbcp.BasicDataSourceFactory      | 加载本地jdbc url |                                 |
| org.apache.commons.dbcp2.BasicDataSourceFactory     | 加载本地jdbc url |                                 |
| org.apache.tomcat.jdbc.pool.DataSourceFactory       | 加载本地jdbc url |                                 |
| com.alibaba.druid.pool.DruidDataSourceFactory       | 加载本地jdbc url | 与 BasicDataSourceFactory        
 格式稍微不同；本地测试发现无限执行Payload                            |
| com.zaxxer.hikari.HikariJNDIFactory                 | 加载本地jdbc url | 与 BasicDataSourceFactory 格式稍微不同 |

## JNDIRMIDeserializePayload

RMI 反序列化，适用于所有 JDK 版本

## JNDIRefBypassPayload

LDAP 高版本 JDK 绕过之 ReferenceBypass，相当于 JNDIReferencePayload 的绕过版本

## JNDIShowHandPayload

JNDI 爆破链，一键测试常规利用链，提高测试效率

### 通过 DNSLog 探测链

该 Payload 适用于目标环境已配置 DNS 服务器，且 DNS 协议出网。

使用爆破链，批量生成几十种 LDAP Payload URL，可以进行批量尝试

选择 JNDIShowHandPayload -> DNSLogAndHttp，并配置好 DNSLog 地址

点击【Run】按钮，稍等片刻即可批量生成LDAP URL Payload地址

![](@site/static/doc/jndi-dnslog.png)

以Log4j漏洞为例，通过 Burpsuite 的 Intruder 模块批量发包

![](@site/static/doc/jndi-Intruder.png)

配置 Payload，以及根据实际情况取消URL编码

![](@site/static/doc/jndi-intruder2.png)

推荐使用单线程，并设置发包间隔至少为 3 秒

![](@site/static/doc/jndi-intruder3.png)

点击【Start attack】开始爆破

### 分析 DNSLog 结果

查看 DNSLog 平台，如果存在 DNSLog，说明一定存在字节码执行；如果没有任何DNSLog，存在以下可能性，需要自行排查：

1. 发送的 Payload 被 WAF/RASP 拦截
   a. 解决办法：绕 WAF/RASP
2. 目标服务器没有配置 DNS，或 DNS 协议不出网
   a. 解决办法：使用 Sleep 字节码，通过延迟判断利用链是否存在，或换用 HTTPReq gadget 进行判断，不使用 DNS 解析IP，直接通过IP发起请求，看
   HTTP 协议是否出网
3. 目标不存在常用链，或环境较为极端
   a. 解决办法：可根据 FindClass 等手段综合判断JDK版本、依赖，进行针对性利用或绕过。

如果进展顺利，会有很多 DNSLog 请求（只要出现一个 DNSLog 就可以直接R了）：

![](@site/static/doc/jndi-dnslog-result.png)

![](@site/static/doc/jndi-result2.png)

如果存在 WebLog 说明 HTTP 出网

![](@site/static/doc/jndi-result3.png)

DNSLog 结果形如：
```
basic.dnslogandhttp.macos.xxx.eyes.sh
deser.jackson.templatesimpl.macos.xxx.eyes.sh
resourceref.tomcatelref.elconvert.macos.xxx.eyes.sh
reference.tomcatdbcp2jdbcattack.pgsql-jdbc-jndi.bean-xml.macos.xxx.eyes.sh
```

第一个字段含义对应如下

| DNSLog 记录                                                     | 对应可用利用方式                   |
|---------------------------------------------------------------|----------------------------|
| basic.dnslogandhttp.macos.xxx.eyes.sh                         | JNDIBasicPayload           |
| deser.jackson.templatesimpl.macos.xxx.eyes.sh                 | JNDILDAPDeserializePayload |
| resourceref.tomcatelref.elconvert.macos.xxx.eyes.sh           | JNDIResourceRefPayload     |
| reference.tomcatdbcp2jdbcattack.pgsql.sbxcl.macos.xxx.eyes.sh | JNDIReferencePayload       |
| rmi.jackson.templatesimpl.macos.xxx.eyes.sh                   | JNDIRMIDeserializePayload  |

### DNSLog 别名映射

由于部分 gadget 名称过长，可能在某些 dnslog 平台上无法回显，部分gadget做了alias别名操作，别名会在dnslog中出现，gadget与alias的对应列表如下：

| Gadget 名称                  | 别名                      |
|----------------------------|-------------------------|
| JNDIBasicPayload           | basic                   |
| JNDILDAPDeserializePayload | ldap_deser 或 deser      |
| JNDIReferencePayload       | reference               |
| JNDIResourceRefPayload     | resourceref             |
| JNDIRefBypassPayload       | refbypass               |
| JNDIRMIDeserializePayload  | rmi                     |
| CommonsBeanutils1          | cb1                     |
| CommonsBeanutils2          | cb2                     |
| CommonsBeanutils3          | cb3                     |
| CommonsBeanutils4          | cb4                     |
| CommonsCollectionsK1       | K1                      |
| CommonsCollectionsK2       | K2                      |
| CommonsCollectionsK3       | K3                      |
| CommonsCollectionsK4       | K4                      |
| PostgreSqlJdbc4Jndi        | pgsql 或 pgsql-jdbc-jndi |
| SnakeyamlJarConvert        | sjc 或 snake_convert     |
| SnakeyamlJarSpi4JNDI       | sjsj 或 snake_jar_jndi   |
| SpringBeanXmlClassLoader   | sbxcl 或 bean-xml        |

