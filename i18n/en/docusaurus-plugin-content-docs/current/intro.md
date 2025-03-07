---
title: Introduction
sidebar_position: 20
---

# Introduction to Java Chains

Understanding the following content can help you better use Java Chains.

## Payload and Gadget

Java Chains implements a simple generation framework internally. When generating a specified Poc, at least one Payload and multiple Gadget chains are required.

**Payload** is the processing of Gadget chains, for example, `JavaNativePayload` serializes the Gadget chain to generate Java deserialization Payload.

The corresponding relationship in the front-end page is as follows:

![](@site/static/doc/payload-gadget-intro.png)

## Tags

Payloads and Gadgets are connected using **tags**. Each Gadget has a current tag `tags` and a connecting tag `nextTags`.

For example, the `nextTags` tag of the Gadget named `CommonsBeanutils1` is **Getter**, which means that any Getter method call is allowed. Gadgets like `TemplatesImpl`, `JdbcRowSetImpl`, and `SignedObject` contain **Getter** tags, so they will appear in the next level of `CommonsBeanutils1`.

Using tags for connection is implemented in the front-end display through cascading selectors, as shown in the figure below:

![](@site/static/doc/cb-tag-show.png)

:::tip
If the Gadget name is displayed in yellow, it indicates that the Gadget may not be usable in some special cases. You need to check the **description** field of the Gadget for details.
:::

For example, the `TemplatesImpl` Gadget is not suitable for direct application in Hessian deserialization.

![](@site/static/doc/templates-not-for-hessian.png)

## Modules

Java Chains has the following modules, click to jump to the documentation details:

[Generate: Generate](./module/generate.md)

[JNDI: JNDI Exploitation](./module/jndi.md)

[JRMPListener: RMI Deserialization Exploitation](./module/jrmplistener.md)

[FakeMySQL Server: MySQL Deserialization Exploitation](./module/fakemysql.md)

[HTTP Server: HTTP Service](./module/httpserver.md)

[TCP Server: HTTP Service](./module/tcpserver.md)

## System

Java Chains related configurations, such as `ShowPayload` can display all Payload lists, and `ShowGadget` can display all Gadgets.

![](@site/static/doc/showgadget.png)

## WebsocketLog

Real-time synchronization of server Java Chains logs.

Suitable for viewing request logs in JNDI and other reverse connection modules.
