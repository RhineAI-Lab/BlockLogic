@echo off
chcp 65001

del /f /s /q space\*.*
rd /q /s space\
echo 删除旧项目space\*

ren "app" "space"
echo 重命名文件夹app

del /f /q space\index.html
echo 删除原index.html

copy index_html_code.txt space\index.html
echo 复制生成新index.html

echo 运行完成
pause