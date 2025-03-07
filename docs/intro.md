---
title: 介绍
sidebar_position: 20
---
# Java Chains 介绍

了解以下内容可以帮助你更好使用 Java Chains

## Payload 与 Gadget

Java Chains 内部实现了一个简单的生成框架，生成指定 Poc 时，至少需要一个 Payload 以及多个 Gadget 链。

**Payload** 是对 Gadget 链的处理，例如 `JavaNativePayload` 对 Gadget 链进行序列化，能够生成 Java 反序列化 Payload

在前端页面的对应关系

![](@site/static/doc/payload-gadget-intro.png)

## 标签

Payload 与 Gadget 之间、Gadget 与 Gadget 之间使用**标签**进行衔接，每个 Gadget 都有当前标签 tags、衔接标签 nextTags

例如，名为 `CommonsBeanutils1` Gadget 的 nextTags 标签为 **Getter**，意味着允许任意 Getter 方法的调用，而 `TemplatesImpl`、
`JdbcRowSetImpl`、`SignedObject`等 Gadget 含有 **Getter** 标签，所以会出现在 `CommonsBeanutils1` 的下一级

使用标签衔接，在前端展示是通过级联选择器来实现，如下图所示：

![](@site/static/doc/cb-tag-show.png)

:::tip
Gadget 名称显示为黄色，说明发现该 Gadget 在一些特殊情况下无法使用，需要自行查询 Gadget 的**描述**字段进行查看。

例: `TemplatesImpl` Gadget 不适用于直接应用在 Hessian 反序列化中
![](@site/static/doc/templates-not-for-hessian.png)

:::

## 模块

Java Chains 有以下模块，点击即可跳转到文档详情

[Generate: 生成](./module/generate.md)

[JNDI: JNDI 利用](./module/jndi.md)

[JRMPListener: RMI 反序列化利用](./module/jrmplistener.md)

[FakeMySQL Server: MySQL 反序列化利用](./module/fakemysql.md)

[HTTP Server: HTTP 服务](./module/httpserver.md)

[TCP Server: HTTP 服务](./module/tcpserver.md)

## System

Java Chains 自身相关配置，例如 `ShowPayload` 可展示所有 Payload列表、 `ShowGadget` 可展示所有 Gadget

![](@site/static/doc/showgadget.png)

## WebsocketLog

实时同步服务器 Java Chains 的日志

适用于在 JNDI 等反连模块中查看请求日志
