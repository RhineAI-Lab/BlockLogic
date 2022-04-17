
# <div align="center">BlockLogic</div>
B-Logic是一款开源的在线代码编辑器，适合于新手在线学习程序，和小型项目的在线快速开发。<br/>
类似于麻省理工的AppInventor，但在快速调试，专业级Api等方面，都有着更出色的表现。他同时支持脱离图形块进行JS规范化开发，以及完整的补全功能。<br/>

在线体验<br/>
主页: <a href="http://logic.autojs.org/" target="_blank">http://logic.autojs.org/</a><br/>
编辑器: <a href="http://logic.autojs.org/space/" target="_blank">http://logic.autojs.org/space/</a><br/>

<details open>
<summary>预览图(暗色)</summary>
<div align="center">
  <img width="850" src="http://logic.autojs.org/space/assets/readme/show-dark.png">
</div>
</details>

<details>
<summary>预览图(亮色)</summary>
<div align="center">
  <img width="850" src="http://logic.autojs.org/space/assets/readme/show-light.png">
</div>
</details>


## <div align="center">简介</div>


<details open>
<summary>Function</summary>
  
主要适用于学生学习，以及脚本或小型项目的快速开发。以及深度学习模型的快速搭建（实验中）。  

```
1.学习JavaScript,Python,TypeScript语言，及其在线编辑运行调试。
2.开发AutoJs项目，Android应用。包含开发脚本,工具,APP,Web项目等。
3.快速搭建并研究学习 深度学习 项目。可通过网络服务器训练。
```

</details>

<details open>
<summary>Characteristic</summary>
  
```
1.支持图形块，使开发更便捷。可以在零基础上手的同时学习。
2.支持远程调试手机，远程查看运行效果。
3.支持深度学习程序的快速生成，模型代码生成。
4.全面的目录管理，可以在线管理多文件项目。 
```
  
</details>

<details open>
<summary>DevelopLines</summary>

研发路线如下
  
```
JavaScript ──┬── 学习 ── Js基础 AutoJs图形生成 在线运行 [A]
             └── 开发 ── 安卓应用开发，脚本开发，页面设计 (AutoJs引擎) [B]
Python ──────┬── 学习 ── Python基础 深度学习图形生成 [C]
             └── 开发 ── 深度学习研究及开发，安卓端迁移 [D]
```
  
站点以ABC线路为主，A部分完成度高，当前继续顺次开发BCD路线功能。
  
</details>


## <div align="center">快速开始</div>

  
<details open>
<summary>Install</summary>

请确保电脑上已经安装 [NodeJs](https://nodejs.org/) 和 [Git](https://gitforwindows.org/)。 

```bash
$ git clone https://github.com/HRan2004/BlockLogic
$ cd BlockLogic/Client
$ npm i
$ ng serve
```

浏览器中访问 [http://localhost:4200/](http://localhost:4200/) 即可看到页面。
  
</details>

<details open>
<summary>About</summary>
  
```
服务端
框架: SpringBoot
数据库: MySQL
主语言: Java
  
客户端
框架: Angular
组件库: AntDesign(editor),Bootstrap(index)
主语言: TypeScript,HTML,Less
  
整体
前后分离代理: Nginx
代码规范: ESLint,Prettier
提交规范: type(scope): message
部署: Docker,AlibabaToolkiyt
开源协议: GNU v3.0
```
  
</details>
