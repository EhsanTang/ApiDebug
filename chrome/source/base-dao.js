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

/**********登陆****************/
function getLoginInfoDAO(callBack) {
    httpPost(INIT_URL, {}, callBack);
}
function drawLoginInfoDAO(response) {
    if (response.success == 1){
        setHtml(ID_USER_NAME, "Hi, " + response.data.sessionAdminName + " !");
        showDiv(ID_USER_NAME);
        hiddenDiv(ID_LOGIN);
        showDiv(ID_LOGOUT);
    }
}
$("#" + ID_LOGOUT).click(function(){
    httpPost(LOGOUT_URL, {}, drawLogoutDAO);
});

function drawLogoutDAO(response) {
    alert("Logout success!",3,"success");
    if (response.success == 1){
        hiddenDiv(ID_USER_NAME);
        showDiv(ID_LOGIN);
        hiddenDiv(ID_LOGOUT);
    }
}


function i18nInit() {
    $.i18n.init({
        lng : 'zh', //指定语言
        resGetPath : 'source/locales/__lng__/__ns__.json',
        lngWhitelist:['zh', 'en'],
        preload:['zh', 'en'],
        ns: {
            namespaces: ['translation'],
            defaultNs: 'translation'   //默认使用的，不指定namespace时
        }
    },function(err, t){
        $('[data-i18n]').i18n(); // 通过选择器集体翻译
    });
}