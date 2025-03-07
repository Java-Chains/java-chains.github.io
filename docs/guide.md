---
title: 快速上手
sidebar_position: 10
---

# 快速上手

## 什么是 Java Chains

Java Chains 是一个 Java Payload 综合生成与利用平台，提供了生成各种 Java Payload 功能，能够用于测试 JNDI 注入、MySQL JDBC
反序列化、JRMP 反序列化等场景。

## 快速开始

:::warning
该平台默认只对 8011 端口进行了随机密码的登陆保护，其他端口可能存在被反制的风险，使用完相关功能后记得及时关闭相应端口
:::

### 方式一：Docker

你可以通过 `docker` 一条命令启动 `java-chains` 项目（这也是推荐做法）

```shell
docker run -d \
  --name java-chains \
  --restart=always \
  -p 8011:8011 \
  -p 58080:58080 \
  -p 50389:50389 \
  -p 50388:50388 \
  -p 3308:3308 \
  -p 13999:13999 \
  -p 50000:50000 \
  -p 11527:11527 \
  -e CHAINS_AUTH=true \
  -e CHAINS_PASS= \
  javachains/javachains:latest
```

通过环境变量配置鉴权或密码；

**CHAINS_AUTH**: `true`为开启鉴权，`false`为关闭鉴权，默认开启鉴权

**CHAINS_PASS**: 指定 web 密码，若该变量为空则随机生成密码，默认随机生成密码

:::tip
Payload 生成功能仅使用 `8011` 端口即可，其他端口为 `exploit` 模块所使用
:::

使用以下命令从 docker 中获取随机生成的强密码

```shell
docker logs $(docker ps | grep javachains/javachains | awk '{print $1}') | grep -E 'password'
```

输出示例

```text
11-12 06:59:53.301 INFO  [main] c.a.c.w.c.SecurityConfig       |  | password: XSsWerJFGcCjB8FU
```

登录页面：`http://your-ip:8011`

### 方式二：Jar包启动

:::warning
仅支持
JDK8，推荐使用 [Temurin](https://adoptium.net/temurin/releases/?version=8&package=jdk) / [Azul Zulu](https://www.azul.com/downloads/?version=java-8-lts&package=jdk#zulu)
:::

下载链接：https://github.com/vulhub/java-chains/releases/latest

启动命令

```bash
java -jar java-chains-[version].jar
```

每次启动后会默认打印出随机生成的密码

默认监听 0.0.0.0 ，登录页面：`http://your-ip:8011`

可通过环境变量设置 web 登录密码，例如：

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="bash" label="Bash">
```bash
export CHAINS_PASS=[your_password] && java -jar java-chains-[version].jar
```
  </TabItem>
  <TabItem value="cmd" label="Cmd">
```cmd
set CHAINS_PASS=[your_password] && java -jar java-chains-[version].jar
```
  </TabItem>
  <TabItem value="ps" label="Powershell">
```powershell
$env:CHAINS_PASS="[your_password]"; java -jar java-chains-[version].jar
```
  </TabItem>
</Tabs>

## 默认端口说明

| 端口    | 备注                |
|-------|-------------------|
| 8011  | Java Chains Web端  |
| 58080 | JNDI 提供 HTTP 字节码  |
| 50389 | JNDI LDAP         |
| 50388 | JNDI RMI          |
| 3308  | Fake MySQL Server |
| 13999 | JRMPListener      |
| 50000 | HTTP Server       |
| 11527 | TCP Server        |