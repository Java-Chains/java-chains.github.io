---
sidebar_position: 7
---

# TCP Server

一个简易的 TCP Server，可以将生成的Payload文件挂载到TCP端口服务上，访问该端口即可返回指定内容

适用于 Derby 反序列化 RCE 场景，可直接通过tcp端口获取反序列化数据

参考：
- https://blog.pyn3rd.com/2022/06/06/Make-JDBC-Attacks-Brillian-Again-I/
- https://github.com/su18/JDBC-Attack/blob/main/derby-attack/src/main/java/org/su18/jdbc/attack/derby/EvilServer.java