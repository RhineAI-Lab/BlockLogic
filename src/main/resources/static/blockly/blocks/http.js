'use strict';

goog.provide('Blockly.Blocks.http');  // Deprecated
goog.provide('Blockly.Constants.Http');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.Mutator');

var colour = "#339999";
var colour1 = "#336699";

var baseHelpUrl = "https://pro.autojs.org/docs/#/zh-cn/http?id=";

Blockly.defineBlocksWithJsonArray([
    {
        "type": "http_get",
        "message0": "HTTP GET请求 地址: %1 选项: %2 回调: %3",
        "args0": [
            { "type": "input_value", "name": "URL", "check": "String" },
            { "type": "input_value", "name": "OPTIONS", "align": "RIGHT", "check": "HttpOptions"},
            { "type": "input_value", "name": "CALLBACK", "align": "RIGHT", "check": "Function" }
        ],
        "output": "String",
        "inputsInline": false,
        "colour": colour,
        "tooltip": "对地址url进行一次GET请求,如果没有回调函数，则在请求完成或失败时返回此次请求的响应",
        "helpUrl": baseHelpUrl + "httpgeturl-options-callback"
    }, {
        "type": "http_post",
        "message0": "HTTP POST请求 地址: %1  数据: %2  选项: %3   回调: %4",
        "args0": [
            { "type": "input_value", "name": "URL", "check": "String" },
            { "type": "input_value", "name": "DATA", "align": "RIGHT", "check": ["String", "Object"] },
            { "type": "input_value", "name": "OPTIONS", "align": "RIGHT", "check": "HttpOptions" },
            { "type": "input_value", "name": "CALLBACK", "align": "RIGHT", "check": "Function" }
        ],
        "output": "String",
        "colour": colour,
        "tooltip": "对地址url进行一次POST请求,如果没有回调函数，则在请求完成或失败时返回此次请求的响应",
        "helpUrl": baseHelpUrl + "httpposturl-data-options-callback"
    }, {
        "type": "http_post_json",
        "message0": "HTTP POSTJSON请求 地址: %1  数据: %2  选项: %3   回调: %4",
        "args0": [
            { "type": "input_value", "name": "URL", "check": "String" },
            { "type": "input_value", "name": "DATA", "align": "RIGHT", "check": "Object" },
            { "type": "input_value", "name": "OPTIONS", "align": "RIGHT", "check": "HttpOptions" },
            { "type": "input_value", "name": "CALLBACK", "align": "RIGHT", "check": "Function" }
        ],
        "output": "String",
        "colour": colour,
        "tooltip": "以JSON格式向目标Url发起POST请求,如果没有回调函数，则在请求完成或失败时返回此次请求的响应",
        "helpUrl": baseHelpUrl + "httppostjsonurl-data-options-callback"
    }, {
        "type": "http_post_multipart",
        "message0": "HTTP POSTMULTIPART请求 地址: %1  数据: %2  选项: %3   回调: %4",
        "args0": [
            { "type": "input_value", "name": "URL", "check": "String" },
            { "type": "input_value", "name": "DATA", "align": "RIGHT", "check": "Object" },
            { "type": "input_value", "name": "OPTIONS", "align": "RIGHT", "check": "HttpOptions" },
            { "type": "input_value", "name": "CALLBACK", "align": "RIGHT", "check": "Function" }
        ],
        "output": "String",
        "colour": colour,
        "tooltip": "向目标Url发起类型为multipart/form-data的请求（通常用于文件上传等)",
        "helpUrl": baseHelpUrl + "httppostmultiparturl-files-options-callback"
    }, {
        "type": "http_request",
        "message0": "HTTP REQUEST请求 地址: %1  选项: %2   回调: %3",
        "args0": [
            { "type": "input_value", "name": "URL", "check": "String" },
            { "type": "input_value", "name": "DATA", "align": "RIGHT", "check": "HttpOptions" },
            { "type": "input_value", "name": "CALLBACK", "align": "RIGHT", "check": "Function" }
        ],
        "inputsInline": false,
        "output": "String",
        "colour": colour,
        "tooltip": "对url发起一次HTTP请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应",
        "helpUrl": baseHelpUrl + "httprequesturl-options-callback"
    }, {
        "type": "http_response",
        "message0": "获取请求返回信息 请求: %1 信息: %2",
        "args0": [
            {
                "type": "input_value",
                "name": "RES",
                "check": "String"
            }, {
                "type": "field_dropdown",
                "name": "VALUE",
                "options": [
                    ["HTTP-状态码", "statusCode"],
                    ["HTTP-响应头", "headers"],
                    ["HTTP-请求Url", "url"],
                    ["HTTP-请求方法", "method"],
                    ["HTTP-状态信息", "statusMessage"],
                    ["HTTP-响应内容", "body"],
                    ["HTTP-响应对应的请求", "request"]
                ]
            }
        ],
        // "previousStatement": null,
        // "nextStatement": null,
        "inputsInline": false,
        "output": "String",
        "colour": colour1,
        "tooltip": "获取HTTP请求的响应信息",
        "helpUrl": baseHelpUrl + "response",
    }
]);
