var Event = (function(){
    var clientList = {},
        listen,
        trigger,
        remove;
    function listen(key,fn){
        if(!clientList[key]){
            clientList[key] = [];
        }
        clientList[key].push(fn);
    }
    function trigger(){
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
            if(!fns||fns.length===0){
                return false;
            }
            for(var i=0;i<fns.length;i++){
                fn.apply(this,arguments)
            }
    }
    function remove(key,fn){
        var fns = clientList[key];
        if(!fns){
            return false;
        }
        if(!fn){
            fns && (fns.length===0)
        }else{
            for(var l = fns.length-1;l>=0;l--){
                var _fn = fns[l];
                if(_fn===fn)
                    fns.splice(l,1)
            }
        }
    }
    return {
        listen,trigger,remove
    }
})()

Event.listen("88",function(price){
    console.log('价格'+price);
})

Event.trigger("88",137)