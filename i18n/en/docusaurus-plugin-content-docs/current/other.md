---
title: Special Instructions
sidebar_position: 50
---

# Other

## Jeg Modification Notes

Added a compatible encryption logic to the original Jeg: accepts plaintext commands and displays plaintext output;
accepts encrypted parameters and displays encrypted output

> Pros: Can bypass some WAF traffic detection, provided that signatures haven't been added to the database yet
>
> Cons: Response bytecode is slightly larger than the original version, so it's not suitable for scenarios with strict
> Payload length requirements

Encryption and decryption rules are as follows:

### Encryption

Encrypted request to execute ls command, the red part is the encrypted command:

`X-Authorization: eyJeXA10TbkhnteAiS0PtwRFQKqp5EYIIWXXXLKXDf5NPTs2M1FykATDU0w=.eyJ82Df13d=`

![](@site/static/doc/jeg.png)

Command encryption tool:
https://gchq.github.io/CyberChef/#recipe=XOR(%7B'option':'UTF8','string':'?????'%7D,'Standard',false)To_Base64('A-Za-z0-9%2B/%3D')&input=bHM&oeol=CR

### Decryption

The encrypted response has the following format:

`/9j/4AXVBQS0xLTV5PEVVeTTVcXkteU1ZRXhJLXkxUTBFHUlM1XF5LXlNWUV4RXV5LNVxeS15TVlFeEUxXNVxWT1daTUwRXV5LNVxWT1daTUwRTFc1XFBSUlBRTBJbXlpSUFESUV5LVklaEUteTRFYRTVcUFJSUFFMElteWlJQURFVXk01XFBRWVZYS1pMSxFdXks1XFBRWVZYS1pMSxFMVzVbXlpSUFERTFc1W1ZYWkxLEV1eSzVbVlhaTEsRTFc1U1BYNVJeVFpdXkxaEV1eSzVSXlRaXV5MWhFMVzVMWktcU15MTE9eS1cRXV5LNUxaS1xTXkxMT15LVxFMVzVMV0pLW1BIURFdXks1TFdKS1tQSFERTFc1TEteTUtKTxFdXks1TEteTUtKTxFMVzVLUFJcXksSVUpTVhFVXk01S1BSXF5LElFeS1ZJWhFLXk0RWEU1S1BQUxJITV5PT1pNEV1eSzVLUFBTEkhNXk9PWk0RTFc1SVpNTFZQURFdXks1SVpNTFZQURFMVzU=/9k==`

The response will be wrapped with prefix `/9j/4A` and suffix `/9k==`. The response can be decrypted using the following
tool, just paste the complete response:

Decryption
tool: https://gchq.github.io/CyberChef/#recipe=Find_/_Replace(%7B'option':'Simple%20string','string':'/9j/4A'%7D,'',true,false,true,false)Find_/_Replace(%7B'option':'Simple%20string','string':'/9k%3D%3D'%7D,'',true,false,true,false)From_Base64('A-Za-z0-9%2B/%3D',true,false)XOR(%7B'option':'UTF8','string':'??'%7D,'Standard',false)

## Tool Advantages and Disadvantages

**Advantages of this tool:**

1.  Compared to command-line tools, the web interface is simpler and more user-friendly. It allows for convenient generation of test payloads such as JNDI injection and MySQL JDBC.
2.  It decouples and reuses various payloads. The front-end dynamically renders parameter input fields, making it easy to expand and maintain.
3.  It collects, organizes, and covers a relatively comprehensive range of Java and Hessian deserialization payloads. It integrates various small tricks and obfuscation techniques.

**Disadvantages (also points for improvement):**

1.  Some less common payload combinations generated may not function correctly. Due to decoupling, the complexity of combinations increases, and it's currently impossible to test all payload combinations. To mitigate this, the dropdown option 【Preset Chains】 above the Payload output box provides tested chain combinations for reference.
    It's recommended to test less common payload combinations beforehand. If you find a generated payload that doesn't run properly, you can submit Issues feedback.
2.  Due to the need for various dependencies to generate payloads, the project's JAR file has a relatively large size (200+MB).
3.  Less common payloads and those with low practical value are not yet integrated.

## Frequently Asked Questions

**Q: Why use Web instead of Java GUI?**

**A:** Each has its advantages, but I believe Web has a wider range of applicable scenarios. Primarily, it's very convenient to operate on a server to generate payloads like JNDI injection.