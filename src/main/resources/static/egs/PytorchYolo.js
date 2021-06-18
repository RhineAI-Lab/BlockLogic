//本功能对应图形块仍在开发中，将于近日完成

//可视化识别效果，使用此三行代码：
pytorch = plugins.load("com.hraps.pytorch");
pytorch.debugOd();
exit();

//详细使用方式
//导入插件模块
pytorch = plugins.load("com.hraps.pytorch")

//导入神经网络模型 输入模型文件路径 (此处导入了内置Yolov5s模型)
var model = pytorch.load("yolov5s")
//导入识别结果对应类型名 （为类名构成的字符串数组,可自己写死，如["car","plane","person"...]）
var classes = pytorch.getCocoClasses()

//定义模型输入图片的边长 输入维度为w*h*3
var inputWidth = 640
var inputHeight = 640
//定义模型输出数量以及每个的大小 输出维度为row*column
//row为yolo模型的分格数，由输入大小有关
var outputRow = 25200
//column为每个分格的维度，由 位置(x,y,w,h)4个值,分数(score)1个值,类型(coco数据集80个类)80个值，共计85个值
var outputColumn = 4+1+80

//导入需识别的图片
var img = images.read("/sdcard/DCIM/Camera/b.jpg")
//缩放至模型输入维度
var inputImg = images.resize(img,[inputWidth,inputHeight])
//图片转换至张量 MEAN和STD值设置为000和111，即不启用特殊归一化
inputTensor = pytorch.bitmapToTensor(inputImg.getBitmap(),[0,0,0],[1,1,1])
//执行神经网络推进 获得输出张量
output = pytorch.forwardTuple(model,inputTensor)
//张量转浮点数组
f = output.getDataAsFloatArray()
log("模型输出维度: "+f.length)

//计算图形缩放比例
imgScaleX = img.getWidth()/inputWidth
imgScaleY = img.getHeight()/inputHeight
//还原识别结果的真实位置 转换至目标检测结果类数组
results = pytorch.floatsToResults(f,outputRow,outputColumn,imgScaleX,imgScaleY)
log("网络初始识别数量: "+results.size())
//NMS算法过滤重复结果
nmsResults = pytorch.useNMS(results)
toastLog("最终结果数量: "+nmsResults.size())
//遍历输出结果
for(var i=0;i<nmsResults.size();i++){
    result = nmsResults.get(i)
    rect = result.rect
    str = "类型: "+classes.get(result.classIndex)+"  置信度: "+result.score+"   位置: 左"+rect.left+" 上"+rect.top+" 右"+rect.right+" 下"+rect.bottom;
    log(str)
}




//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://BLogic.AutoJs.org/xml"><block type="explain" x="110" y="30"><field name="TEXT">本功能对应图形块仍在开发中，将于近日完成</field></block><block type="explain" x="110" y="110"><field name="TEXT">可视化识别效果，使用此三行代码：</field><next><block type="puzzle_block"><field name="TEXT">pytorch = plugins.load("com.hraps.pytorch");&amp;#10;pytorch.debugOd();&amp;#10;exit();</field></block></next></block><block type="explain" x="110" y="270"><field name="TEXT">详细使用方式</field><next><block type="puzzle_block"><field name="TEXT">//导入插件模块&amp;#10;pytorch = plugins.load("com.hraps.pytorch")&amp;#10;&amp;#10;//导入神经网络模型 输入模型文件路径 (此处导入了内置Yolov5s模型)&amp;#10;var model = pytorch.load("yolov5s")&amp;#10;//导入识别结果对应类型名 （为类名构成的字符串数组,可自己写死，如["car","plane","person"...]）&amp;#10;var classes = pytorch.getCocoClasses()&amp;#10;&amp;#10;//定义模型输入图片的边长 输入维度为w*h*3&amp;#10;var inputWidth = 640&amp;#10;var inputHeight = 640&amp;#10;//定义模型输出数量以及每个的大小 输出维度为row*column&amp;#10;//row为yolo模型的分格数，由输入大小有关&amp;#10;var outputRow = 25200&amp;#10;//column为每个分格的维度，由 位置(x,y,w,h)4个值,分数(score)1个值,类型(coco数据集80个类)80个值，共计85个值&amp;#10;var outputColumn = 4+1+80&amp;#10;&amp;#10;//导入需识别的图片&amp;#10;var img = images.read("/sdcard/DCIM/Camera/b.jpg")&amp;#10;//缩放至模型输入维度&amp;#10;var inputImg = images.resize(img,[inputWidth,inputHeight])&amp;#10;//图片转换至张量 MEAN和STD值设置为000和111，即不启用特殊归一化&amp;#10;inputTensor = pytorch.bitmapToTensor(inputImg.getBitmap(),[0,0,0],[1,1,1])&amp;#10;//执行神经网络推进 获得输出张量&amp;#10;output = pytorch.forwardTuple(model,inputTensor)&amp;#10;//张量转浮点数组&amp;#10;f = output.getDataAsFloatArray()&amp;#10;log("模型输出维度: "+f.length)&amp;#10;&amp;#10;//计算图形缩放比例&amp;#10;imgScaleX = img.getWidth()/inputWidth&amp;#10;imgScaleY = img.getHeight()/inputHeight&amp;#10;//还原识别结果的真实位置 转换至目标检测结果类数组&amp;#10;results = pytorch.floatsToResults(f,outputRow,outputColumn,imgScaleX,imgScaleY)&amp;#10;log("网络初始识别数量: "+results.size())&amp;#10;//NMS算法过滤重复结果&amp;#10;nmsResults = pytorch.useNMS(results)&amp;#10;toastLog("最终结果数量: "+nmsResults.size())&amp;#10;//遍历输出结果&amp;#10;for(var i=0;i&lt;nmsResults.size();i++){&amp;#10;    result = nmsResults.get(i)&amp;#10;    rect = result.rect&amp;#10;    str = "类型: "+classes.get(result.classIndex)+"  置信度: "+result.score+"   位置: 左"+rect.left+" 上"+rect.top+" 右"+rect.right+" 下"+rect.bottom;&amp;#10;    log(str)&amp;#10;}&amp;#10;</field></block></next></block></xml>*/
