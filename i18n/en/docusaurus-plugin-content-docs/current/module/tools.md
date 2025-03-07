---
sidebar_position: 8
---

# Utility Tools Module

## SerializationDumper

Made a small modification to the original SerializationDumper project: the serialVersionUID value was originally output in Hex encoding, now changed to long string format for easier viewing and modification.

:::warning
Note: SerializationDumper does not support parsing obfuscated Java serialization data
:::

Can parse Base64 and Hex encoded Java serialization data. Click the [Parse] button to generate SerializationDumper analysis results

![](@site/static/doc/SerializationDumper-tools.png)

For example, to modify the serialVersionUID value of the org.apache.commons.beanutils.BeanComparator class, search for keywords to locate the specific position of serialVersionUID
Manually change the value after the serialVersionUID field to -3490850999041592962, then click [Rebuild] to output the processing results below

When rebuilding, SerializationDumper only recognizes 0x Hex encoding and then assembles it into a byte stream, so theoretically you can still manually make targeted modifications to other places. Currently, the most common scenario is modifying a class's serialVersionUID
