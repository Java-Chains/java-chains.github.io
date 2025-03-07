---
title: 特殊说明
sidebar_position: 50
---

# 其他

## Jeg 魔改说明

在原版 Jeg 的基础上，添加了一个兼容的加密逻辑，即传入明文命令、使用明文进行回显；传入加密参数、使用加密回显

> 利：可以规避一些 WAF 流量检测，当然，前提是还没有加入特征库
> 
> 弊：回显字节码相较于原版增大了一点，所以不适合对 Payload 长度有严格要求的场景

加解密规则如下：

### 加密

加密请求执行ls命令，红色部分为加密的命令：

`X-Authorization: eyJeXA10TbkhnteAiS0PtwRFQKqp5EYIIWXXXLKXDf5NPTs2M1FykATDU0w=.eyJ82Df13d=`

![](@site/static/doc/jeg.png)

命令加密工具：
https://gchq.github.io/CyberChef/#recipe=XOR(%7B'option':'UTF8','string':'?????'%7D,'Standard',false)To_Base64('A-Za-z0-9%2B/%3D')&input=bHM&oeol=CR

### 解密

加密后的响应为如下格式：

`/9j/4AXVBQS0xLTV5PEVVeTTVcXkteU1ZRXhJLXkxUTBFHUlM1XF5LXlNWUV4RXV5LNVxeS15TVlFeEUxXNVxWT1daTUwRXV5LNVxWT1daTUwRTFc1XFBSUlBRTBJbXlpSUFESUV5LVklaEUteTRFYRTVcUFJSUFFMElteWlJQURFVXk01XFBRWVZYS1pMSxFdXks1XFBRWVZYS1pMSxFMVzVbXlpSUFERTFc1W1ZYWkxLEV1eSzVbVlhaTEsRTFc1U1BYNVJeVFpdXkxaEV1eSzVSXlRaXV5MWhFMVzVMWktcU15MTE9eS1cRXV5LNUxaS1xTXkxMT15LVxFMVzVMV0pLW1BIURFdXks1TFdKS1tQSFERTFc1TEteTUtKTxFdXks1TEteTUtKTxFMVzVLUFJcXksSVUpTVhFVXk01S1BSXF5LElFeS1ZJWhFLXk0RWEU1S1BQUxJITV5PT1pNEV1eSzVLUFBTEkhNXk9PWk0RTFc1SVpNTFZQURFdXks1SVpNTFZQURFMVzU=/9k==`

前后会被前缀 `/9j/4A` 和后缀 `/9k==` 包裹，响应可以通过以下工具来解密，将响应完整粘贴上去即可解密：

解密工具：https://gchq.github.io/CyberChef/#recipe=Find_/_Replace(%7B'option':'Simple%20string','string':'/9j/4A'%7D,'',true,false,true,false)Find_/_Replace(%7B'option':'Simple%20string','string':'/9k%3D%3D'%7D,'',true,false,true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)XOR(%7B'option':'UTF8','string':'??'%7D,'Standard',false)


## 工具优缺点

本工具的优势：

1. 相较于命令行的各种工具，Web 界面上的操作更加简单易用，能够在很方便的生成 JNDI 注入、MySQL JDBC 等测试 Payload
2. 将各种 Payload 进行解耦与复用，前端动态渲染参数输入框，方便拓展与维护
3. 搜集整理并覆盖了较为全面的 Java、Hessian 等反序列化 Payload，集成了各种小 trick 以及混淆等姿势

劣势（同时也是待改进的点）：

1. 生成的某些冷门 Payload 组合无法正常使用。由于解耦会导致组合的复杂度上升，并且目前无法覆盖测试所有 Payload
   组合。针对该情况，目前的缓解措施是通过 Payload 输出框上方的有个下拉选项【预设链】，提供了测试好的链子组合，可以提供一些参考。
   生成冷门 Payload 组合建议提前测试一下，若发现无法正常运行的 Payload 可以提交 Issues 反馈
2. 由于需要各种依赖去生成Payload，所以项目的 jar 包的体积较大 (200+MB)
3. 比较冷门的以及实战价值比较低的 Payload 暂未集成

## 常见问题

问：为什么用 Web，而不是 Java GUI？

答：各有优势，但是我认为 Web 适用场景较广，主要是很方便的在服务器上操作生成 JNDI 注入等 Payload
