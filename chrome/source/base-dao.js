/***********获取本地存储的数据**********/
function getLocData(key){
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
function saveLocData(key, value){
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
    alert(getText(l_logoutSuccessTip),3,"success");
    if (response.success == 1){
        hiddenDiv(ID_USER_NAME);
        showDiv(ID_LOGIN);
        hiddenDiv(ID_LOGOUT);
    }
}

/**********系统设置**************/
function getHttpTimeout(){
    try {
        var httpTimeout = localStorage[WEB_HTTP_TIMEOUT];
        httpTimeout = parseFloat(httpTimeout);
        if (httpTimeout && httpTimeout != null && httpTimeout.toString() != "NaN" && httpTimeout > 1000) {
            return httpTimeout;
        } else {
            return 10000;
        }
    }catch(e){
        return 10000;
    }
}
function getWebSiteUrl(){
    var webSiteUrl = localStorage[WEB_SITE_URL];
    if (webSiteUrl && webSiteUrl != null && webSiteUrl != ''){
        return webSiteUrl;
    }else{
        return "http://api.crap.cn";
    }
}

function getLanguage(){
    try {
        var language = localStorage[SETTING_LANGUAGE] || navigator.language;
        if ($.inArray(language, SUPPORT_LANGUAGE_ZH) != -1){
            return LANG_ZH_CN;
        }
        if ($.inArray(language, SUPPORT_LANGUAGE_EN) != -1){
            return LANG_EN;
        }
        return LANG_ZH_CN;
    } catch (e){
        return LANG_ZH_CN;
    }
}

function getText(name) {
    if (getLanguage() == LANG_ZH_CN){
        return textObj[name];
    } else {
        return textObj[name + _en];
    }
}

function i18nInit() {
    $.i18n.init({
        lng : getLanguage(), //指定语言
        resGetPath : 'source/locales/__lng__/__ns__.json',
        lngWhitelist:[LANG_ZH_CN, LANG_EN],
        preload:[LANG_ZH_CN, LANG_EN],
        ns: {
            namespaces: ['translation'],
            defaultNs: 'translation'   //默认使用的，不指定namespace时
        }
    },function(err, t){
        $('[data-i18n]').i18n(); // 通过选择器集体翻译
    });
}