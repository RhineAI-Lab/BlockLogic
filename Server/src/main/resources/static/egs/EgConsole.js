console.show();
//设置一些基本属性
console.setGlobalLogConfig({
  'path':'/sdcard/file.txt',
  console.setSize(500,500);
});
//不同等级的信息在控制台上会有不同的颜色
console.verbose('观察信息');
console.log('普通信息');
console.info('重要信息');
console.warn('警告信息');
console.error('错误信息');
sleep(3000);
//清空控制台
console.clear();




//------ 图形块结构记录 请勿随意修改 ------
/*<xml xmlns="https://BLogic.AutoJs.org/xml"><block type="console_show" x="170" y="130"><field name="VALUE">show</field><next><block type="explain"><field name="TEXT">设置一些基本属性</field><next><block type="console_config"><statement name="DO"><block type="console_config_path"><value name="VALUE"><shadow type="text"><field name="TEXT">/sdcard/file.txt</field></shadow></value><next><block type="console_set_size"><value name="WIDTH"><shadow type="math_number"><field name="NUM">500</field></shadow></value><value name="HEIGHT"><shadow type="math_number"><field name="NUM">500</field></shadow></value></block></next></block></statement><next><block type="explain"><field name="TEXT">不同等级的信息在控制台上会有不同的颜色</field><next><block type="console_output"><field name="TYPE">verbose</field><value name="CONTENT"><shadow type="text"><field name="TEXT">观察信息</field></shadow></value><next><block type="console_output"><field name="TYPE">log</field><value name="CONTENT"><shadow type="text"><field name="TEXT">普通信息</field></shadow></value><next><block type="console_output"><field name="TYPE">info</field><value name="CONTENT"><shadow type="text"><field name="TEXT">重要信息</field></shadow></value><next><block type="console_output"><field name="TYPE">warn</field><value name="CONTENT"><shadow type="text"><field name="TEXT">警告信息</field></shadow></value><next><block type="console_output"><field name="TYPE">error</field><value name="CONTENT"><shadow type="text"><field name="TEXT">错误信息</field></shadow></value><next><block type="globals_sleep"><value name="VALUE"><shadow type="math_number"><field name="NUM">3000</field></shadow></value><next><block type="explain"><field name="TEXT">清空控制台</field><next><block type="console_clear"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>*/
