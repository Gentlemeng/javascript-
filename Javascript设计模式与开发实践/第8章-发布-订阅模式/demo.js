// 发布-订阅模式
/**
 * 1.确定发布者
 * 2.给发布者添加一个缓存列表，用于存放订阅者回调函数
 * 3.发布消息时，发布者会缓存列表，依次触发里面存放的订阅者回调函数
 */
var saleOffice = {}
saleOffice.clientList = {};

saleOffice.listen = function(key,fn){
    if(!this.clientList[key]){
        this.clientList[key] = []
    }

    this.clientList[key].push(fn)

}
saleOffice.trigger = function(){
    let key = Array.prototype.shift.call(arguments); //arguments => "88" 137 =>
    let fns = this.clientList[key]
    if(!fns||fns.length===0){
        return false
    }
    for(var i=0;i<fns.length;i++){
        fns[i].apply(this,arguments)   // arguments => 137
    }
}

// 订阅
saleOffice.listen("88",function(price){
    console.log("价格"+price)
})

// 发布
saleOffice.trigger("88",137)
