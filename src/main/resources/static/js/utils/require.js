const loaded = [];
var loadFinal = 0;

const ensureRequire = function (url,callback) {
    if(!loaded.indexOf(url)){
        require(url,callback)
    }
};

const requireAll = function (urls, callback) {
    var progress = 0;
    for (let i = 0; i < urls.length; i++) {
        require(urls[i],function () {
            progress++;
            if(progress==urls.length){
                callback()
            }
        })
    }
};

const require = function (url,callback) {
    var script = document.createElement('script'),
        fn = callback || function(){};
    script.type = 'text/javascript';

    if(script.readyState){
        //IE
        script.onreadystatechange = function(){
            if(script.readyState === 'loaded' || script.readyState === 'complete'){
                script.onreadystatechange = null;
                fn();
                loaded.push(url);
                if(checkLoadedAll()){
                    afterLoaded()
                }
            }
        };
    }else{
        //其他浏览器
        script.onload = function(){
            fn();
            loaded.push(url);
            if(checkLoadedAll()){
                afterLoaded()
            }
        };
    }
    script.src = url;
    document.getElementsByTagName('body')[0].appendChild(script);
};

const checkLoadedAll = function() {
    return loaded.length>=loadFinal;
};

var afterLoaded = function () {

};
