/***********id********/
var ID_USER_NAME = "id-user-name";
var ID_LOGIN = "login-button";
var ID_LOGOUT = "id-logout";

var ADVERTISEMENT = "http://crap.cn/mock/trueExam.do?id=155030837878212000015&cache=true";
var INIT_URL = "/admin/init.do";
var LOGOUT_URL = "/user/loginOut.do";

// zh-CN 华 -中国
// zh-HK 华 - 香港的 SAR
// zh-MO 华 - 澳门的 SAR
// zh-SG 华 -新加坡
// zh-TW 华 -台湾
var LANG_ZH_CN = "zh-CN";
var LANG_ZH_HK = "zh-HK";
var LANG_ZH_MO = "zh-MO";
var LANG_ZH_SG = "zh-SG";
var LANG_ZH_TW = "zh-TW";

// en 英国
// en-AU 英国 -澳洲
// en-BZ 英国 -伯利兹
// en-CA 英国 -加拿大
// en-CB 英国 -加勒比海
// en-IE 英国 -爱尔兰
// en-JM 英国 -牙买加
// en-NZ 英国 - 新西兰
// en-PH 英国 -菲律宾共和国
// en-ZA 英国 - 南非
// en-TT 英国 - 千里达托贝哥共和国
// en-GB 英国 - 英国
// en-US 英国 - 美国
// en-ZW 英国 -津巴布韦

var LANG_EN = "en";
var LANG_EN_AU = "en-AU";
var LANG_EN_CA = "en-CA";
var LANG_EN_IE = "en-IE";
var LANG_EN_NZ = "en-NZ";
var LANG_EN_GB = "en-GB";
var LANG_EN_US = "en-US";

var SUPPORT_LANGUAGE_ZH = [LANG_ZH_CN, LANG_ZH_HK, LANG_ZH_MO, LANG_ZH_SG, LANG_ZH_TW];
var SUPPORT_LANGUAGE_EN = [LANG_EN, LANG_EN_AU, LANG_EN_CA, LANG_EN_IE, LANG_EN_NZ, LANG_EN_GB, LANG_EN_US];

var WEB_SITE_URL = "crap-web-site-url";
var WEB_HTTP_TIMEOUT = "crap-http-timeout";
var SETTING_LANGUAGE = "crap-setting-language";


/***********js 提示，必须以l_开头：表示language **********/
var _en = "_en"
var l_responseNotJsonTip = "l_responseNotJsonTip";
var l_logoutSuccessTip = "l_logoutSuccessTip";
var l_successTip = "l_successTip"
var l_clearLocalData = "l_clearLocalData";
var l_clearSuccessLogoutFail = "l_clearSuccessLogoutFail";
var l_clearSuccessLogoutSuccess = "l_clearSuccessLogoutSuccess";
var l_moduleNameIsNullTip = "l_moduleNameIsNullTip";
var l_confirmDelete = "l_confirmDelete";
var l_formatErrorTip = "l_formatErrorTip";
var l_timeoutFormatErrorTip = "l_timeoutFormatErrorTip";
var l_languageChangeTip = "l_languageChangeTip";
var l_updateSuccessTip = "l_updateSuccessTip";
var l_netErrorTip = "l_netErrorTip";
var l_unknownErrorTip = "l_unknownErrorTip";
var l_clickSendTip = "l_clickSendTip";
var l_urlIsNullTip = "l_urlIsNullTip";
var l_connectingError = "l_connectingError";
var l_interfaceNameIsNullTip = "l_interfaceNameIsNullTip";
var l_selectModuleTip = "l_selectModuleTip";
var l_saveInterface = "l_saveInterface";
var l_edit = "l_edit";
var l_closeAlertTip = "l_closeAlertTip";
var l_varSaveSuccess = "l_varSaveSuccess";
var l_save = "l_save";

var textObj = {
    "l_logoutSuccessTip":"退出登陆成功!",
    "l_logoutSuccessTip_en":"Logout success!",

    "l_successTip":"成功 !",
    "l_successTip_en" :"Success !",

    "l_clearLocalData" : "确定要删除本地数据吗?",
    "l_clearLocalData_en" : "Delete local data, Are you sure ?",

    "l_clearSuccessLogoutFail":"清除数据本地数据成功，但退出登陆失败!",
    "l_clearSuccessLogoutFail_en":"Clear local data success, But logout fail!",

    "l_clearSuccessLogoutSuccess":"清除数据本地数据成功，退出成功!",
    "l_clearSuccessLogoutSuccess_en":"Clear local data success, Logout success!",

    "l_moduleNameIsNullTip" :"模块名不能为空!",
    "l_moduleNameIsNullTip_en" :"Module name is empty!",

    "l_confirmDelete":"确定删除？",
    "l_confirmDelete_en":"Confirm delete?",

    "l_formatErrorTip":"格式化异常，请检查json格式是否有误：",
    "l_formatErrorTip_en":"Format error, please check input data:",

    "l_timeoutFormatErrorTip":"异常! 超时时间必须是数字，且必须大于1000!",
    "l_timeoutFormatErrorTip_en":"Error! Timeout must be number, and must then 1000!",

    "l_languageChangeTip":"修改成功，刷新页面后生效!",
    "l_languageChangeTip_en":"Change success, Please refresh page!",

    "l_updateSuccessTip":"修改成功!",
    "l_updateSuccessTip_en":"Update success!",

    "l_netErrorTip":"网络异常",
    "l_netErrorTip_en":"Net error",
    "l_unknownErrorTip":"未知异常",
    "l_unknownErrorTip_en":"Unknown error",

    "l_clickSendTip":"请点击【发送】按钮获取返回数据",
    "l_clickSendTip_en":"Please click [Send] button to get a response",

    "l_responseNotJsonTip":"返回数据不是Json格式",
    "l_responseNotJsonTip_en":"Response data is not json",

    "l_urlIsNullTip":"接口Url不能为空！",
    "l_urlIsNullTip_en":"Interface url can't be null!",

    "l_interfaceNameIsNullTip":"接口名不能为空！",
    "l_interfaceNameIsNullTip_en":"Interface name can't be null！",


    "l_connectingError":"连接网络时发生异常 ",
    "l_connectingError_en":"There was an error connecting to ",

    "l_selectModuleTip":"点击选择模块",
    "l_selectModuleTip_en":"Select module",

    "l_saveInterface" :"保存接口:",
    "l_saveInterface_en" :"Save Interface:",

    "l_edit":"编辑",
    "l_edit_en":"edit",

    "l_closeAlertTip":"请勿禁用【确认】弹窗，直接操作非常危险!",
    "l_closeAlertTip_en":"Do not forbid [confirm] dialog, is very dangerous",

    "l_varSaveSuccess":"环境变量保存成功!",
    "l_varSaveSuccess_en":"Environment Variable Save Success!",

    "l_save" :"提交保存",
    "l_save_en" :"Submit",

}

