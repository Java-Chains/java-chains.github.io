---
title: Payload 生成
sidebar_position: 2
---

# Payload 生成

## JavaNativePayload

Java 反序列化原生 Payload 生成

部分常用链展示：

- CB链：CommonsBeanutils 19.x、CommonsBeanutils 18.x、CommonsBeanutils 1.6 版本
- CC链：CommonCollection K1、CommonCollection K2、CommonCollection K3、CommonCollection K4
- JSON相关链：Fastjson1、Fastjson2、Jackson
- 二次反序列化相关：SignedObject 二次反序列化、RMIConnector 二次反序列化、C3p0 二次反序列化
- DataSource 相关链：共计 13 个不同版本以及不同类的 getter 利用
- C3p0：JNDI链、二次反序列化链、原生类加载链，支持两个不同的SUID版本
- FindClass 探测类，搜集网上大部分gadget类，可探测 100+ 个类。探测 payload 中间隔插入canary，可辅助判断哪些类被拉入黑名单导致探测失败。支持手动设置、文件读取，可自定义批量探测类

![](@site/static/img/main.png)

## HessianPayload

`HessianPayload`: Hessian1 反序列化 Payload 生成，并支持 HessianServlet 格式反序列化数据

`Hessian2Payload`: Hessian2 反序列化 Payload 生成

- 支持Hessian1、Hessian2版本的Payload
- 部分Hessian链展示如下：
- SwingLazyValue：JDK原生链加载BCEL
- SwingLazyValue2：JDK原生链触发JNDI
- SwingLazyValue3 + MethodUtil：JDK原生链执行任意字节码
- UnixPrintService：JDK原生链，Linux命令注入
- UnixPrintServiceLookup：JDK原生链，Linux命令注入
- ProxyLazyValue + SerializationUtils：依赖spring，可实现二次反序列化
- SpringAbstractBeanFactoryPointcutAdvisor：spring jndi链
- SpringPartiallyComparableAdvisorHolder：spring jndi链
- Xslt：本链做了整合，文件写入并加载Xslt文件实现字节码执行

![](@site/static/doc/hessian-generate.png)

生成的 Hessian 反序列化 Payload 可应用于 xxl-job 中

![](@site/static/doc/hessian-deserialization.png)

## BytecodePayload

字节码生成

- 例如可生成执行命令字节码、Sleep字节码、DNSLog字节码，注入内存马字节码，回显字节码、中间件探测字节码、写文件字节码、下载文件字节码
- 支持自定义字节码版本
- 支持自定义字节码类名
- 支持生成 TemplatesImpl 字节码格式 - 实现 AbstractTranslet 接口
- 支持使用 Class-Obf 进行字节码混淆

![](@site/static/doc/bytecode.png)

## ShiroPayload

Shiro Payload 生成，在某些特殊环境下方便手动进行生成与测试

- 支持自定义 AES KEY
- 支持 AES GCM 模式
- 支持插入 Base64 混淆字符

## OtherPayload

部分常用 Payload 配合 HTTP Server 模块实现目标服务器反连，内容详见：[HTTP Server 模块](./httpserver.md) 介绍

### CharsetJar 生成

适用于 SpringBoot 环境下写 charsets.jar RCE

:::tip
想要直接获取jar包，需要设置格式为 raw，并使用「下载模式」
:::

![](@site/static/doc/charset.png)

参考：

- https://landgrey.me/blog/22/
- https://github.com/LandGrey/spring-boot-upload-file-lead-to-rce-tricks

## ExpressionPayload

表达式 Payload 生成，本质上是将表达式加载字节码模板中的字节码部分进行替换，推荐手动实现

- `BcelConvert`: BCEL 格式字节码生成
- `JsConvert`: Oracle Nashorn JS 表达式加载字节码
- `VelocityConvert`: Velocity 通过 bcel 来加载字节码
- ...

## Payload 混淆支持

本平台生成的 Payload 支持的一些混淆情况如下：

|                         | JavaNativePayload | HessianPayload | Hessian2Payload |
|-------------------------|-------------------|----------------|-----------------|
| 随机集合脏数据填充               | ✅                 | ✅              | ✅               |
| 垃圾类填充                   | ✅                 | ✅              | ✅               |
| UTF-8 Overlong Encoding | ✅                 | ✅              | ✅               |
| TC_RESET 填充             | ✅                 | ❌              | ❌               |

注：若想通过 UserCustomByteArrayFromXXX Gadget 提供自定义的Java序列化字节流数据来进行混淆，那么目前暂不支持使用随机集合与垃圾类插入混淆，这与混淆的实现有关，具体支持情况如下：

|                         | JavaNativePayload(自定义序列化场景) |
|-------------------------|-----------------------------|
| 随机集合混淆                  | ❌                           |
| 垃圾类插入                   | ❌                           |
| UTF-8 Overlong Encoding | ✅                           |
| TC_RESET 填充             | ✅                           |
