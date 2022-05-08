import {defineBlocksWithDt} from "../../register";

defineBlocksWithDt(`

prefix: modules
style: module_blocks
help: https://pytorch.org/docs/stable/generated/

sequential_e: Module
顺序模型
{}
Python
import: from torch import nn
nn.Sequential(\n$A0)

sequential_create_e
创建顺序模型(var net:Module)
{}
Python
import: from torch import nn
$A0 = nn.Sequential(\n$A1)

list_connector
{Module}
Python
$A0,\\n

`, true);
