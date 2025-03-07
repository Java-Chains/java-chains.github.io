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


