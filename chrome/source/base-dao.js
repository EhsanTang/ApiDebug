/***********获取本地存储的数据**********/
function getLoaclData(key){
    try{
        var value = localStorage[key];
        if(value){
            return value;
        }
    }catch(e){
        console.warn(e);
        return "";
    }
}
/*********存储数据至本地***********/
function saveLoaclData(key,value){
    try{
        localStorage[key] = value;
        return true;
    }catch(e){
        console.warn(e);
        return false;
    }
}
