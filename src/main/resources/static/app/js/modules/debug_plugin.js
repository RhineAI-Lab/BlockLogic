var te = new TextEncoder();
var td = new TextDecoder();

var DebugPlugin = {
    SOURCE_TAG:"DebugService",
    ws:null,
    sendId:0,
    connected:false,
    requestTokenId:-1,
    url:"",
    device:"",
    serverVersion:-1,
    serverId:"",
    token:"",
    connect:function (url) {
        if(this.ws!=null){
            this.ws.close()
        }
        this.ws = new WebSocket(url);
        this.url = url;
        this.ws.binaryType = "arraybuffer";
        var pt = this;
        this.ws.onopen = function () {
            pt.hello();
            pt.connected = true;
        };
        this.ws.onmessage = function (evt) {
            const data = pt.parseData(evt.data);
            pt.onMsgBasic(data[0],data[1]);
        };
        this.ws.onclose = function () {
            pt.onClose();
            pt.connected = false;
        };
        this.ws.onerror = function (evt) {
            pt.onError(evt)
        }
    },
    onMsgBasic:function(type,data){
        console.oldLog("Receive",data);
        if(type===1){
            if(data.type==="hello"){
                this.device = data.data.device_name;
                this.serverVersion = data.data.server_version;
                this.serverId = data.data.server_id;
                this.onConnect();
            }else if(data.type==="response_"+this.requestTokenId){
                this.token = data.data.token;
            }
        }
        this.onMsg(type,data)
    },
    onMsg:function(type,data){
    },
    onConnect:function(){

    },
    onClose:function(){

    },
    onError:function(evt){

    },

    hello:function(){
        this.sendJson({
            type: 'hello',
            data: {
                client_version: 3
            }
        });
    },
    runFile:function(id, code, name){
        name = name || id;
        this.sendJson({
            id: this.sendId,
            type: 'command',
            data: {
                id:id,
                name:name,
                script:code,
                command:"run"
            }
        })
    },
    saveFile:function(id, code, name){
        name = name || id;
        this.sendJson({
            id: this.sendId,
            type: 'command',
            data: {
                id:id,
                name:name,
                script:code,
                command:"save"
            }
        })
    },
    requestToken:function(){
        this.requestTokenId = this.sendId;
        this.sendJson({
            id: this.sendId,
            type: 'command',
            data: {
                command:"browse_files"
            }
        })
    },

    parseData: function (data) {
        const view = new DataView(data,0,8);
        const len = view.getInt32(0,false);
        const type = view.getInt32(4,false);
        if(type==1){
            var str = td.decode(new Uint8Array(data,8));
            return [type,JSON.parse(str)]
        }else {
            return [type,data]
        }
    },
    sendJson: function (data) {
        if(this.ws==null){
            return false
        }
        console.oldLog("Send: ",data);
        const json = JSON.stringify(data);
        const jsonUints = te.encode(json);

        const buffer = new ArrayBuffer(jsonUints.length + 8);
        const view = new DataView(buffer,0,jsonUints.length + 8);
        view.setInt32(0,jsonUints.length);
        view.setInt32(4,1);
        for (var i = 0; i < jsonUints.length; i++) {
            view.setUint8(i+8,jsonUints[i])
        }
        this.ws.send(buffer);
        this.sendId++;
    }
};
