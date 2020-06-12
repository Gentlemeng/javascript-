// 发布-订阅模式的通过实现
var event = {
    clientList:{},
    listen:function(key,fn){
        if(this.clientList[key]){
            this.clientList[key] = []
        }
        this.clientList[key].push(fn);
    },
    trigger:function(){
        let key = Array.prototype.shift.call(arguments)
        let fns = this.clientList[key]
        if(!fns||fns.length===0){
            return false;
        };
        for(var i=0;i<fns.length;i++){
            fns[i].apply(this,arguments);
        }
    }
}
// installEvent 可以给所有对象动态安装发布-订阅功能
var installEvent = function(obj){
    for(var i in event){
        obj[i] = event[i]
    }
}
// let login = {}
installEvent(login = {})
// 登录-应用发布订阅模式
$.ajax("url",function(data){ //登录成功
    login.trigger('loginSucc',data);
})

// 各模块监听登录消息
var header = (function(){
    login.listen("loginSucc",function(data){
        header.setAvatar(data.avatar);
    })
    return {
        setAvatar:function(data){console.log('设置header模块头像')}
    }
})();
var nav = (function(){
    login.listen("loginSucc",function(data){
        nav.setAvatar(data.avatar);
    })
    return {
        setAvatar:function(data){console.log('设置nav模块头像')}
    }
})();