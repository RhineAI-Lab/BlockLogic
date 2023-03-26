
### 本地环境

1. 安装JDK20+，可使用IDEA自带的下载安装工具，位置：File -> Project Structure -> SDKs -> Download JDK
2. 安装Maven3.6.3+，可使用IDEA自带的下载安装工具，位置：File -> Project Structure -> SDKs -> Download Maven
3. 执行环境安装，命令：mvn clean install -Dmaven.test.skip=true

### 服务器环境

1. 安装Java，命令：yum install java-1.8.0-openjdk.x86_64


### 部署 (打包，上传，执行)

1. 本地打包，命令：mvn clean package -Dmaven.test.skip=true
2. 打包后可见target目录下的jar包，名称默认为：blocklogic-0.0.1-SNAPSHOT.jar
3. 执行上传至服务器

