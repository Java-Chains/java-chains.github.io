---
sidebar_position: 7
---

# TCP Server

A simple TCP Server that can mount generated Payload files to TCP port service, accessing the port will return specified content

Suitable for Derby deserialization RCE scenarios, can directly obtain deserialization data through tcp port

References:
- https://blog.pyn3rd.com/2022/06/06/Make-JDBC-Attacks-Brillian-Again-I/
- https://github.com/su18/JDBC-Attack/blob/main/derby-attack/src/main/java/org/su18/jdbc/attack/derby/EvilServer.java