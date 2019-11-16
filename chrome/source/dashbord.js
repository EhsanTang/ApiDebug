// 测试数据
window.options = [
    {id:"1",name:"BlogJava",lock:true,url:"http://www.blogjava.net/fantasy",title:"BlogJava-中国最大的搜索引擎",frame:{name:'BlogFrame',style:'width:100%;height:100%'}},
    {id:"2",name:"爱问-中国最大的搜索引擎",lock:false,url:"http://iask.com/",title:"爱问-中国最大的搜索引擎"},
    {id:"3",name:"搜乐-中国最大的搜索引擎",lock:false,url:"http://www.sooule.com/",title:"搜乐-中国最大的搜索引擎"},
    {id:"4",name:"搜狗",lock:false,url:"http://www.sogou.cn",title:"搜狗-中国最大的搜索引擎"},
    {id:"5",name:"百度",lock:true,url:"http://www.baidu.com",title:"百度-中国最大的搜索引擎"},
    {id:"6",name:"谷歌",lock:true,url:"http://www.google.com",title:"谷歌-中国最大的搜索引擎"},
    {id:"7",name:"搜搜",lock:false,url:"http://www.soso.com",title:"搜搜-中国最大的搜索引擎"},
    {id:"8",name:"必应",lock:true,url:"http://cn.bing.com/",title:"必应-中国最大的搜索引擎"}];
// 新增
var add = function(i){
    tab.add(window.options[i]);
};
// 解锁与锁定
var lock = function( isLock ){
    tab.lock("1",isLock);
};
// 关闭
var remove = function( id ){
    tab.close(id);
};

// 移动
var move = function( state ){
    tab.move({action:state});
};

jQuery( function(){
    var option = {tabID:"Tabs",frameID:"Frames",activeClass:"on",lockClass:"locked",leftID:"Left",
        rightID:"Right",resetID:"Reset",closeID:"Close"};
    window.tab = FantasyTab.create(option);
    window.tab.add(window.options[0]);
});