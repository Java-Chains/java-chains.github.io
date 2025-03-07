---
sidebar_position: 8
---

# 小工具模块

## SerializationDumper

在原项目 SerializationDumper 的基础上做了小小的修改：serialVersionUID 的值原先是 Hex 编码输出，现改为了long字符串格式，更便于查看与修改。

:::warning
注意：SerializationDumper 不支持解析混淆后的Java序列化数据
:::

能够解析Base64、Hex编码的Java序列化数据，点击【解析】按钮后会生成 SerializationDumper 的分析结果

![](@site/static/doc/SerializationDumper-tools.png)

例如想要修改 org.apache.commons.beanutils.BeanComparator 类的 serialVersionUID 的值，搜索关键词定位到 serialVersionUID
的具体位置
手动将 serialVersionUID 字段后面的值修改为 -3490850999041592962，然后点击【重构建】，会在下面输出处理结果

SerializationDumper 在重新构建的时候只会识别 0x Hex编码，然后组装成字节流，所以理论上还可以手动对其他地方进行针对性修改。目前比较常用的场景是修改类的
serialVersionUID
