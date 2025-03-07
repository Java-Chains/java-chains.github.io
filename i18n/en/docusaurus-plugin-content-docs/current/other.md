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


