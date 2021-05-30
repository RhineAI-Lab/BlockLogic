var ws = null;

function initWebSocket(url) {
    if(ws!=null){
        ws.close()
    }
    ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    ws.onopen = function () {
        sendJson({
            type: 'hello',
            data: {
                client_version: 3
            }
        })
    };
    ws.onmessage = function (evt) {
        var data = parseData(evt.data);
        console.oldLog("Receive: ",data)
    }
}

function parseData(data) {
    var view = new DataView(data,0,8);
    var length = view.getInt32(0,false);
    var type = view.getInt32(4,false);
    if(type==1){
        var str = String.fromCharCode.apply(null, new Uint8Array(data,8));
        return JSON.parse(str)
    }else {
        return new DataView(data,8)
    }
}

function sendJson(data) {
    if(ws==null){
        return false
    }
    const json = JSON.stringify(data);
    const buffer = new ArrayBuffer(json.length + 8);
    var view = new DataView(buffer,0,8);
    view.setInt32(0,json.length);
    view.setInt32(4,1);
    var buf8View = new Uint8Array(buffer,8);
    for (var i=0, strLen=json.length; i<strLen; i++) {
        buf8View[i] = json.charCodeAt(i);
    }
    console.oldLog("Send: ",buffer);
    ws.send(buffer);
}
