var ID_DIALOG_ADD_ENV = "id-dialog-add-env";
var ID_ENV_NAME = "id-env-name";
var ID_ENV_ID = "id-env-id";
var ID_ENV_LIST = "id-env-list";
var CRAP_DATA_ENV_ID = "crap-data-env-id";
var CRAP_DATA_ENV_NAME = "crap-data-env-name";
var ID_ENV_VARIABLE_TABLE = "env-variable-table";
var ENV_LIST_MENU = "env-list-menu";
var ID_EDIT_ENG_ID = "id-edit-env-id";

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

    $("#id-env-list").on("click",".edit-env",function() {
        lookUp(ID_DIALOG_ADD_ENV, '', '', 600 ,7,'');
        $("#dialog-content").css("max-height",($(document).height()*0.8)+'px');
        setValue(ID_ENV_ID, $(this).attr(CRAP_DATA_ENV_ID));
        setValue(ID_ENV_NAME, $(this).attr(CRAP_DATA_ENV_NAME));
        showMessage(ID_DIALOG_ADD_ENV,'false',false,-1);
        showMessage('fade','false',false,-1);
        return false;// 不在传递至父容器
    });

    $("#id-env-list").on("click",".delete-env",function() {
        if(!myConfirm(getText(l_confirmDelete)))
        {
            return false;
        }
        deleteEnv($(this).attr(CRAP_DATA_ENV_ID));
        drawEnvList();
        drawEnvVariable();
        return false;
    });

    $("#id-save-env").click(function(){
        saveUpdateEnv(getValue(ID_ENV_ID), getValue(ID_ENV_NAME));
        drawEnvList();
        closeMyDialog(ID_DIALOG_ADD_ENV);
    });

    $("#id-env-list").on("click","." + ENV_LIST_MENU,function() {
        drawEnvVariable($(this).attr(CRAP_DATA_ENV_ID))
        $("." + ENV_LIST_MENU).removeClass("btn-main");
        $(this).addClass("btn-main");
        $("#id-save-env-var").removeClass("none");
        $("#id-save-env-var").addClass("btn-adorn");
        $("#id-save-env-var").removeClass("btn-main");
        $("#id-save-env-var").html(getText(l_save));
    });


    // 变量
    $("#" + ID_ENV_VARIABLE_TABLE).on("keyup","input", function() {
        if($(this).val() != ''){
            var tr = $(this).parent().parent();
            if( tr.hasClass("last") ){
                var table = tr.parent();
                table.append(paramsTr);
                tr.removeClass("last");
            }
        }
    });
    $("#" + ID_ENV_VARIABLE_TABLE).on("click","i",function() {
        var tr = $(this).parent().parent();
        // 最后一行不允许删除
        if( tr.hasClass("last")){
            return;
        }
        tr.remove();
    });

    $("#id-save-env-var").click(function() {
        var texts = $("#" + ID_ENV_VARIABLE_TABLE + " input[type='text']");
        var key = "";
        var varList = $.parseJSON("[]");
        $.each(texts, function(i, val) {
            try {
                if(val.getAttribute("data-stage") == "value"){
                    var value = val.value;
                    if(handerStr(value) != ""){
                        var variable = {
                            "key": key,
                            "value": value
                        };
                        varList.unshift(variable)
                    }
                } else if(val.getAttribute("data-stage") == "key"){
                    key = val.value;
                }
            } catch (ex) { }
        });

        saveAllVar(getValue(ID_EDIT_ENG_ID), varList)
        $(this).html(getText(l_varSaveSuccess));
        $("#id-save-env-var").addClass("btn-main");
        $("#id-save-env-var").removeClass("btn-adorn");
    });

})

function drawInterfaceEnvList() {
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

function drawEnvVariable(envId) {
    setValue(ID_EDIT_ENG_ID, envId)
    $("#" + ID_ENV_VARIABLE_TABLE + " tbody").html("");
    var varList = getAllVar(envId);
    for(var i=0 ; i< varList.length; i++){
        var variable = varList[i];
        var key = variable.key;
        var value = variable.value;

        var tdText = paramsTr.replace("'key'","'key' value='"+key+"'").replace("'value'","'value' value='"+value+"'");
        tdText = tdText.replace("last","");

        $("#" + ID_ENV_VARIABLE_TABLE + " tbody").append(tdText);
    }
    $("#" + ID_ENV_VARIABLE_TABLE + " tbody").append(paramsTr);
}

function drawEnvVariable(envId) {
    if(envId == null){
        setValue(ID_EDIT_ENG_ID, null);
        $("#" + ID_ENV_VARIABLE_TABLE + " tbody").html("");
        $("#id-save-env-var").addClass("none");
        return;
    }

    setValue(ID_EDIT_ENG_ID, envId)
    $("#" + ID_ENV_VARIABLE_TABLE + " tbody").html("");
    var varList = getAllVar(envId);
    for(var i=0 ; i< varList.length; i++){
        var variable = varList[i];
        var key = variable.key;
        var value = variable.value;

        var tdText = paramsTr.replace("'key'","'key' value='"+key+"'").replace("'value'","'value' value='"+value+"'");
        tdText = tdText.replace("last","");

        $("#" + ID_ENV_VARIABLE_TABLE + " tbody").append(tdText);
    }
    $("#" + ID_ENV_VARIABLE_TABLE + " tbody").append(paramsTr);
}