
## 一、通用

### 1.在BlockLogic文件夹，右键空白处打开gitbash

### 2.VsCode中右上角File，openFolder打开BlockLogic目录

### 3.打开目录\BlockLogic\src\main\resources\static

### 4.文件：

main.html 为主文件 <br/>
js/main.js 主文件对应的脚本文件 <br/>
blockly/generators/javascript 用于存放生成代码的文件 <br/>
blockly/blocks 用于存放图形块外观及属性 <br/>

<br/>

## 二、新建模块

### 1.打开官网教程网址，如：https://pro.autojs.org/docs/#/zh-cn/app

### 2.在 blockly/blocks 目录下新建文件，文件名为模块名.js，如app.js。该文件用于处理该模块对应的外观及属性配置信息。

### 3.上文件，修改第三四行结尾，改成对应模块名，注意首字母大写。如：(App换成自己的模块名)

goog.provide('Blockly.Blocks.App');  // Deprecated <br/>
goog.provide('Blockly.Constants.App');

### 4. 上文件12行为颜色，13行为教程网址，教程网址复制到"?id="结尾，如：

https://pro.autojs.org/docs/#/zh-cn/app?id=

### 5. blockly/generators/javascript 目录下新建文件。文件名为模块名.js，如app.js。该文件用于处理齐模块的代码生成逻辑。

### 6. 上文件，修改第三行结尾为模块名，注意用小写。如：(App换成自己的模块名)

goog.provide('Blockly.JavaScript.app');

### 7.完成图形块的属性以及代码逻辑开发（及下文第三四章内容）

### 8.编译blockly图形代码。(使用PlayGround可跳过)

Win+R，输入cmd，回车。打开命令行窗口。 <br/>
运行命令：cd 路径。路径为blockly文件夹所在路径。 <br/>
如：cd C:\xxx\BlockLogic\src\main\resources\static\blockly <br/>
(该窗口建议不用关掉)

编译：执行指令: npm run build

编译完成后会更新blockly目录中compressed相关的四个文件。

### 9.修复blockly_uncompressed.js文件。（每次编译后，如需使用Playground则操作）

去除错误的依赖路径，即删掉中间的绝对路径(粗体部分)，按住鼠标中间可选中多行进行操作。

错误: goog.addDependency('../../ **C:/Users/xxx/BlockLogic/src/main/resources/static/blockly/** core/block.js', ... <br/>
正确: goog.addDependency('../../core/block.js', ...
<br/>

### 10.添加playground依赖。(如需使用Playground)

打开 blockly/tests/playground.html 文件。
添加制作好的两个js文件的依赖，大致在71行后。如：(App换成自己的模块名)

```html
<script src="../generators/javascript/app.js"></script>
<script src="../blocks/app.js"></script>
```

### 11.添加categorie。

找到xml标签，其id="toolbox-categories"。
在其中末尾新增category标签，name为模块名。如：(App换成自己的模块名)
```xml
<xml id="toolbox-categories">
    ...
    <category name="App">  
    </category>
</xml>
```

### 12.添加block。

添加block标签到category中。如: (type属性对应blocks文件中的属性)
```xml
<category name="App">  
    <block type="app_version_code"></block>
</category>
```

### 13.查看预览效果

用浏览器打开playground.html文件（已经打开则可用crtl+f5强制刷新）。<br/>
左侧选择对应的category，就可以看到效果了。
点击左侧的“To Javascript”按钮，可以生成当前图形块对应的js代码。

<br/>

## 三，图形块开发-外观

### 1.图形块分为两种

第一种为有输出块，左侧可以连接其他块，上下不可以。具有属性： <br/>
```json
"output":"xxx", 
```
表示该模块的输出数据类型。<br/>
output属性可以为null，代表任意类型。 <br/>
output属性有多个时用数组表示，如: "output":["xxxa","xxxb"]<br/>
当前已确认类型：字符串-String，数字-Number，布尔值(对错)-Boolean，列表数组-Array

第二种为无输出块，上下可以连接其他块，左侧不可以。具有属性： <br/>
```json
"previousStatement": null,
"nextStatement": null,
```
这两条属性的值固定为null。不可修改。

每个图形块上述属性只可选一种，即要么具有output属性，要么具有previousStatement,nextStatement属性。
<br/>

### 2. type属性

图形块名。用纯英文小写组成，不可重复，多个单词之间用下划线连接，如：app_version_code。
<br/>

### 3. message0属性: 模块文本。

### 4. colour属性: 固定值为变量colour

### 5. tooltip属性: 鼠标悬停时的图形块提示文本。

### 6. helpUrl属性: 右键-帮助，后的跳转链接。一般由baseHelpUrl+函数名构成。

### 7. args0属性: 输入参数，必须为数组。

在message中的%1，%2，%3等位置除，显示出对应args0数组第123个输入。如: 
```json
"message0": "输入 %3 文本 控件: %1 文本: %2",
"args0": [
    {"type": "input_value", "name": "WIDGET", "check": "UiObject"},
    {"type": "input_value", "name": "TEXT", "check": "String" ,"align": "RIGHT"},
    {"type": "field_dropdown", "name": "MODE", "options": [["快速", "FAST"], ["准确", "ACC"]]}
],
```

type属性: 输入类型。可选值:<br/>
input_value 图形块输入，提供个缺口用于对接其他拼图。<br/>
input_statement 语句输入，用于输入代码块。<br/>
field_dropdown 下拉菜单，多个选项给用户进行选择。<br/>
其他值不建议使用。

name属性: 输入名。<br/>
同一图形块多个输入的name不可重复。用全大写字母，下划线分割。<br/>
用于在生成代码时获取当前的输入值。

align属性: 对齐。<br/>
设置其文本在当前行靠左或靠右，默认为LEFT，可选值:LEFT/RIGHT。

check属性: 校验输入数据类型。仅当type=input_value时有效。<br/>
具体设置同上output属性设置(null,字符串，字符串数组)。

options属性: 下拉菜单选项。仅当type=field_dropdown时有效。<br/>
是一个二维数组。子数组第一个值为显示给用户的选项文本，第二个值为生成代码时获取到的文本。一个子数组为一个选项。

<br/>

### 8. inputsInLine属性: 输入值是否显示在同一行。

可选true或false，也可不设置，会自动判断适合的需求。

### 9.典型示例
无输入有输出型:
```javascript
    {
        "type": "app_version_code",
        "message0": "获取当前软件版本号",
        "output":"Number",
        "colour": colour,
        "tooltip": "当前软件版本号，整数值。例如160, 256等。",
        "helpUrl": baseHelpUrl+"appversioncode"
    },
```
选项输入有输出型:
```javascript
    {
        "type": "console_config_level",
        "message0": "配置-写入级别 %1",
        "args0": [{
            "type": "field_dropdown",
            "name": "VALUE",
            "options": [
                ["所有信息 - ALL", "ALL"],
                ["调试信息 - DEBUG", "DEBUG"],
                ["关闭 - OFF", "OFF"],
            ]
        }],
        "colour": colour,
        "previousStatement": "ConsoleConfig",
        "nextStatement": "ConsoleConfig",
        "tooltip": "写入的日志级别",
        "helpUrl": baseHelpUrl + "consolesetgloballogconfigconfig"
    },
```
无输入无输出型:
```javascript
    {
        "type": "console_clear",
        "message0": "清空控制台",
        "colour": colour,
        "previousStatement": null,
        "nextStatement": null,
        "tooltip": "清空控制台所有日志",
        "helpUrl": baseHelpUrl + "consoleclear"
    },
```
多输入无输出型:
```javascript
    {
        "type": "dialogs_alert",
        "message0": "对话框 标题 %2 正文 %3",
        "args0": [
            {"type": "input_value","name": "TITLE","check": "String"},
            {"type": "input_value","name": "CONTENT","check": "String","align": "right"}
        ],
        "colour": colour,
        "inputsInline": false,
        "output": null,
        "tooltip": "显示一个提示对话框",
        "helpUrl": baseHelpUrl + "dialogsalerttitle-content-callback"
    },
```
多输入有输出型:
```javascript
    {
        "type": "coordinate_press",
        "message0": "按住屏幕   坐标 X: %1 Y: %2 时长(毫秒): %3",
        "tooltip": "根据坐标按住屏幕",
        "args0": [
            {"type": "input_value", "name": "X", "check": "Number"},
            {"type": "input_value", "name": "Y", "check": "Number", "align": "RIGHT"},
            {"type": "input_value", "name": "D", "check": "Number", "align": "RIGHT"}],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": colour,
        "helpUrl": baseHelpUrl+"pressx-y-duration"
    },
```

<br/>

## 四、图形块开发-代码生成

### 1.生成函数储存

Blockly.JavaScript['xxx'] <br/>
xxx为图形块名，对应blocks文件中的图形块type属性。如: <br/>

```javascript
Blockly.JavaScript['app_version_code'] = function(block) {
    xxxxxx;
    return xx;
};
```
<br/>

### 2.生成函数返回值

第一种，无输出块<br/>
直接返回代码，注意代码要以;结尾，末尾应附带换行符。如：
```javascript
var code = "auto();\n";
return code;
```

第二种，有输出块<br/>
返回代码，以及输出逻辑，用数组表示。
输出逻辑建议固定使用Blockly.JavaScript.ORDER_ATOMIC。如:
```javascript
var code = "app.versionCode";
return [code, Blockly.JavaScript.ORDER_ATOMIC];
```
<br/>

### 3.获取当前输入值

type=input_value 图形块输入型

```javascript
var xxx_value = Blockly.JavaScript.valueToCode(block, 'XXX', Blockly.JavaScript.ORDER_ATOMIC, true);
```

type=input_statement 图形块输入型

```javascript
var xxx_statements = Blockly.JavaScript.statementToCode(block, 'XXX');
```

type=field_dropdown 图形块输入型

```javascript
var xxx_checked = block.getFieldValue('XXX');
```

上文传入值'XXX'对应args中输入口的name属性的值。
