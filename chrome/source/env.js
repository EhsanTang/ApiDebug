var ID_DIALOG_ADD_ENV = "id-dialog-add-env";
var ID_ENV_NAME = "id-env-name";
var ID_ENV_ID = "id-env-id";
var ID_ENV_LIST = "id-env-list";
var CRAP_DATA_ENV_ID = "crap-data-env-id";
var CRAP_DATA_ENV_NAME = "crap-data-env-name";


var ENV_DIV = "<div class='env-list-menu' crap-data-env-id='ca_envId'> ca_envName ";
ENV_DIV += "<div class='delete-env' crap-data-env-id='ca_envId'><i class='iconfont'>&#xe69d;</i></div>";
ENV_DIV += "<div class='edit-env' crap-data-env-id='ca_envId' crap-data-env-name='ca_envName'><i class='iconfont'>&#xe69e;</i></div>";
ENV_DIV += "</div>";

$(function(){
    drawEnvList();

    // 添加环境
    $("#id-add-env").click(function(){
        lookUp(ID_DIALOG_ADD_ENV, '', '', 600 ,7,'');
        $("#dialog-content").css("max-height",($(document).height()*0.8)+'px');
        showMessage(ID_DIALOG_ADD_ENV,'false',false,-1);
        showMessage('fade','false',false,-1);
        return false;// 不在传递至父容器
    });

    $(".edit-env").click(function(){
        lookUp(ID_DIALOG_ADD_ENV, '', '', 600 ,7,'');
        $("#dialog-content").css("max-height",($(document).height()*0.8)+'px');
        setValue(ID_ENV_ID, $(this).attr(CRAP_DATA_ENV_ID));
        setValue(ID_ENV_NAME, $(this).attr(CRAP_DATA_ENV_NAME));
        showMessage(ID_DIALOG_ADD_ENV,'false',false,-1);
        showMessage('fade','false',false,-1);
        return false;// 不在传递至父容器
    });

    $(".delete-env").click(function(){
        if(!myConfirm(getText(l_confirmDelete)))
        {
            return false;
        }
        deleteEnv($(this).attr(CRAP_DATA_ENV_ID));
        drawEnvList();
        return false;
    });

    $("#id-save-env").click(function(){
        saveUpdateEnv(getValue(ID_ENV_ID), getValue(ID_ENV_NAME));
        drawEnvList();
        closeMyDialog(ID_DIALOG_ADD_ENV);
    });


})

function drawEnvList() {
    var envList = getAllEnv();
    var envText = "";
    for(var i=0 ; i<envList.length; i++) {
        if (envList[i].status == -1) {
            continue;
        }

        var name = envList[i].name;
        var id = envList[i].id;

        // 第一个文件夹默认打开
        envText += ENV_DIV.replace(/ca_envId/g, id).replace(/ca_envName/g, name);
    }
    setHtml(ID_ENV_LIST, envText);
}