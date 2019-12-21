$(function(){
    i18nInit();
    getLocalModules();
    //getHistorys();
    //openMyDialog("title",500);
    var pageName = getValue("id-page-name")
    if (pageName == "debug"){
        refreshSyncIco(-1);
        getLoginInfoDAO(drawLoginInfoDAO);
        // getAdvertisement();
    } else if (pageName == "setting"){
        $("#" + WEB_SITE_URL).val(getWebSiteUrl());
        $("#" + WEB_HTTP_TIMEOUT).val(getHttpTimeout());
        $("#" + SETTING_LANGUAGE).val(getLanguage());
    }

    $("#synch").click(function(){
        $("#float").fadeIn(300);
        var modules;
        try{
            modules = $.parseJSON( localStorage['crap-debug-modules'] )
        }catch(e){
            modules = $.parseJSON( "[]" );
            console.warn(e);
        }
        var moduleText = "[";
        var separator = "";
        for(var i=0 ; i<modules.length; i++){
            moduleText += separator + "{\"status\":" + modules[i].status +",\"version\":" + modules[i].version +",\"moduleId\":\"" + modules[i].moduleId +"\",\"moduleName\":\"" + modules[i].moduleName + "\"";
            var debugs;
            try{
                debugs = $.parseJSON( localStorage['crap-debug-interface-' + modules[i].moduleId] );
            }catch(e){
                debugs = $.parseJSON( "[]" );
                console.warn(e);
            }
            moduleText += ",\"debugs\":" + JSON.stringify(debugs) +"}";
            separator = ",";
        }
        moduleText = moduleText +"]";
        $.ajax({
            type : "POST",
            url : getWebSiteUrl() + "/user/crapDebug/synch.do",
            async : true,
            data : moduleText,
            beforeSend: function(request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            complete: function(responseData, textStatus){
                if(textStatus == "error"){
                    alert("Status:" + responseData.status + "\nStatusText:" + responseData.statusText +"\nTextStatus: " + textStatus);
                }
                else if(textStatus == "success"){
                    var responseJson = $.parseJSON(responseData.responseText);
                    if( responseJson.success == 1){
                        clearLocalStorage();
                        responseJson = responseJson.data;
                        // 存储服务器同步的数据
                        console.log("模块总数：" + responseJson.length);

                        for(var i=responseJson.length-1;i>=0; i--){
                            var resModule = responseJson[i];

                            console.log("处理模块：" + i + "（" + resModule.moduleName + "），状态：" + resModule.status);
                            if(resModule.status == -1){
                                continue;
                            }

                            saveModule(resModule.moduleName, resModule.moduleId, resModule.version, resModule.status);

                            var debugs = resModule.debugs;
                            console.log("处理模块接口：" + i + "，" + resModule.moduleName + "，接口数量：" + debugs.length);

                            for(var j=debugs.length-1;j>=0;j--){
                                saveInterfaceDetail(debugs[j].moduleId, debugs[j].paramType, debugs[j].id, debugs[j].name, debugs[j].method,
                                    debugs[j].url, debugs[j].params, debugs[j].headers, debugs[j].version, debugs[j].status);
                            }
                        }

                        getLocalModules();
                        alert("success!",3,"success");
                        refreshSyncIco(1);
                    }else{
                        alert(responseJson.error.message,5,"error");
                    }
                }else{
                    alert("Status:" + responseData.status + "\nStatusText:" + responseData.statusText +"\nTextStatus: " + textStatus);
                }
                $("#float").fadeOut(300);
            }
        });
    });
    $("#historys-title").click(function(){
        $("#historys").removeClass("none");
        $("#modules").addClass("none");
        $("#modules-title").removeClass("bb2");
        $(this).addClass("bb2");
        getHistorys();
    });
    $("#modules-title").click(function(){
        $("#historys").addClass("none");
        $("#modules").removeClass("none");
        $("#historys-title").removeClass("bb2");
        $(this).addClass("bb2");
        getLocalModules();
    });

    var saveAs = true;
    // 保存
    $("#save-interface").click(function(){
        if( handerStr($("#interface-id").val()) == "" || handerStr($("#module-id").val())== ""){
            saveAs = false;
            intitSaveInterfaceDialog();
        }else{
            // 直接保存
            $("#save-interface-name").val($("#interface-name").val());
            var moduleId = $("#module-id").val();
            if( saveInterface(moduleId) ){
                alert(getText(l_successTip));
            }
        }
    });

    // 另存为
    $("#save-as-interface").click(function(){
        saveAs = true;
        intitSaveInterfaceDialog();
    });

    $("#save-interface-submit").click(function(){
        saveInterface("", saveAs);
    });

    $(".close-dialog").click(function(){
        var id = $(this).attr("crap-data");
        closeMyDialog(id);
    });
    $("#clear-local-data").click(function(){
        if(!myConfirm(getText(l_clearLocalData))){
            return false;
        }
        clearLocalStorage();
        getLocalModules();
        $.ajax({
            type : "POST",
            url : getWebSiteUrl()+"/user/loginOut.do",
            async : true,
            data : "",
            complete: function(responseData, textStatus){
                if(textStatus == "error"){
                    alert(getText(l_clearSuccessLogoutFail), 5, "error", 500);
                }
                else if(textStatus == "success"){
                    alert(l_clearSuccessLogoutSuccess, 5, "success", 500);
                }else{
                    alert(getText(l_clearSuccessLogoutFail), 5, "error", 500);
                }
                $("#float").fadeOut(300);
            }
        });
    });

    // 模块标题点击
    $("#modules").on("click",".panel-heading", function(e) {
        if ($(this).find("div").hasClass("collapsed")){
            $(".module-title-ico").html("&#xe615;");
            $(this).find(".module-title-ico").html("&#xe624;");
        } else {
            $(this).find(".module-title-ico").html("&#xe615;");
        }
    });

    $("#modules").on("click",".interface", function() {
        var urlInfo = $.parseJSON( $(this).attr("crap-data") );
        $("#url").val(urlInfo.url);
        $("#interface-id").val(urlInfo.id);
        $("#module-id").val(urlInfo.moduleId);
        $("#interface-name").val(handerStr(urlInfo.name));
        $("#headers-bulk").val(urlInfo.headers);
        $("#method").val(urlInfo.method);
        $("#method").change();

        if($.inArray(urlInfo.paramType, customerTypes) == -1){
            urlInfo.paramType = "x-www-form-urlencoded;charset=UTF-8";
            $("#param-type-value").prop("checked",true);
            $("#params-bulk").val(urlInfo.params);
            $(".key-value-edit").click();
        }else{
            $("#customer-type-value").prop("checked",true);
            // 下拉选择 customer-type
            $("#customer-type").val(urlInfo.paramType);
            $("#customer-type").change();
            $("#customer-value").val(urlInfo.params);
        }
        $("input[name='param-type']").change();

        $(".interface").removeClass("bg-main");
        $(this).addClass("bg-main");

    });

    $("#historys").on("click","div", function() {
        var urlInfo = $.parseJSON( $(this).attr("crap-data") );
        $("#url").val(urlInfo.url);
        $("#interface-id").val("-1");
        $("#module-id").val("-1");
        $("#interface-name").val(handerStr(urlInfo.name));
        $("#headers-bulk").val(urlInfo.headers);
        $("#method").val(urlInfo.method);
        $("#method").change();

        if($.inArray(urlInfo.paramType, customerTypes) == -1){
            urlInfo.paramType = "x-www-form-urlencoded;charset=UTF-8";
            $("#param-type-value").prop("checked",true);
            $("#params-bulk").val(urlInfo.params);
            $(".key-value-edit").click();
        }else{
            $("#customer-type-value").prop("checked",true);
            // 下拉选择 customer-type
            $("#customer-type").val(urlInfo.paramType);
            $("#customer-type").change();
            $("#customer-value").val(urlInfo.params);
        }
        $("input[name='param-type']").change();


        $(".history-div").removeClass("bg-main");
        $(this).addClass("bg-main");
    });

    $("#new-interface").click(function() {
        $("#interface-name").val("");
        $("#headers-bulk").val("");
        $("#params-bulk").val("");
        $("#url").val("");
        $("#interface-id").val("-1");
        $("#module-id").val("-1");
        $("#method").val("GET");
        $("#method").change();

        $("#param-type-value").prop("checked",true);
        $("#params-bulk").val("");
        $(".key-value-edit").click();
        $("input[name='param-type']").change();

        $(".interface").removeClass("bg-main");
        $(".history-div").removeClass("bg-main");
    });
    $("#save-module-submit").click(function() {
       if($("#rename-module-name").val() == ""){
           alert(getText(l_moduleNameIsNullTip), 5, "error", 300);
           return false;
       }
        renameModule( $("#rename-module-id").val(), $("#rename-module-name").val());
        getLocalModules();
        closeMyDialog("dialog2");
    });

    /******删除接口*********/
	$("#modules").on("click",".delete-interface", function() {
        if(!myConfirm(getText(l_confirmDelete)))
        {
            return false;
        }
        var ids = $(this).attr("crap-data").split("|");
		deleteInterface(ids[0],ids[1]);
		getLocalModules();	
		return false;// 不在传递至父容器
    });
    /*******上移接口**********/
    $("#modules").on("click",".up-interface", function() {
        var ids = $(this).attr("crap-data").split("|");
        upInterface(ids[0],ids[1]);
        getLocalModules();
        return false;// 不在传递至父容器
    });
    /*******下移接口**********/
    $("#modules").on("click",".down-interface", function() {
        var ids = $(this).attr("crap-data").split("|");
        downInterface(ids[0],ids[1]);
        getLocalModules();
        return false;// 不在传递至父容器
    });

    $("#modules").on("click",".delete-module", function() {
        if(!myConfirm(getText(l_confirmDelete)))
        {
            return false;
        }
        var moduleId = $(this).attr("crap-data");
        deleteModule(moduleId);
        getLocalModules();
        return false;// 不在传递至父容器
    });
    /*******上移**********/
    $("#modules").on("click",".up-module", function() {
        var moduleId = $(this).attr("crap-data");
        upModule(moduleId);
        getLocalModules();
        return false;// 不在传递至父容器
    });
    /*******下移**********/
    $("#modules").on("click",".down-module", function() {
        var moduleId = $(this).attr("crap-data");
        downModule(moduleId);
        getLocalModules();
        return false;// 不在传递至父容器
    });

    $("#modules").on("click",".rename-module", function() {
        var moduleId = $(this).attr("crap-data");
        $("#rename-module-id").val(moduleId);
        lookUp('dialog2', '', '', 400 ,7,'');
        $("#dialog-content").css("max-height",($(document).height()*0.8)+'px');
        showMessage('dialog2','false',false,-1);
        showMessage('fade','false',false,-1);
        return false;// 不在传递至父容器
    });


    $("#left-enlarge").click(function(){
        if( !leftEnlarge){
            leftEnlarge = true;
            $("#left").css("width","18%");
            $("#right").css("width","82%");
            $("#left-enlarge i").html("&#xe6a7;");
        }else{
            leftEnlarge = false;
            $("#left").css("width","0%");
            $("#right").css("width","100%");
            $("#left-enlarge i").html("&#xe697;");
        }

    });
	$("#open-debug").click(function(){
			window.open("debug.html")
	});
    $("#open-json").click(function(){
        window.open("json.html")
    });
    $("#set-web-site").click(function(){
        window.open("setting.html")
    });

    $(".submitSetting").click(function(event){
        var _this=$(event.target);
        var name = _this.attr('crap-data-name');
        setSetting(name,$("#" + name).val(), _this);
    });

    $("#login-button").click(function(){
        window.open(getWebSiteUrl() + "/loginOrRegister.do#/login");
    });


	$(".params-headers-table").on("keyup","input", function() {
      if($(this).val() != ''){
          var tr = $(this).parent().parent();
          if( tr.hasClass("last") ){
              var table = tr.parent();
              table.append(paramsTr);
              tr.removeClass("last");
          }
      }
    });

	// 当前是否显示批量编辑
	var showBulkParams = false;
	var showBulkHeaders = false;
	
	// 批量编辑
	$(".bulk-edit").click(function(){
       var preId = $(this).attr("crap-data-value");
	   if( preId == "headers"){
		   showBulkHeaders = true;
	   }
	   if( preId == "params"){
			showBulkParams = true;
	   }
	   $("#"+preId+"-table").addClass("none");
	   $("#"+preId+"-bulk-edit-div").removeClass("none");
	    var bulkParams = "";
	    var texts = $("#"+preId+"-div input[type='text']");
		// 获取所有文本框
		var key = "";
		$.each(texts, function(i, val) {
			   try {
				   if(val.getAttribute("data-stage") == "value"){
					   var p = key+":" + val.value;
					   if( p != ":"){
						   bulkParams += p + "\n";
					   }	
				   }else if(val.getAttribute("data-stage") == "key"){
						key = val.value;
				   }
			   } catch (ex) { }
		});
		$("#"+preId+"-bulk").val(bulkParams);
    });
	
	// key-value编辑
	$(".key-value-edit").click(function(){
       var preId = $(this).attr("crap-data-value");
	   if( preId == "headers"){
		   showBulkHeaders = false;
	   }
	   if( preId == "params"){
			showBulkParams = false;
	   }
	   $("#"+preId+"-table").removeClass("none");
	   $("#"+preId+"-bulk-edit-div").addClass("none");
	    var bulkParams = $("#"+preId+"-bulk").val();
		var params = bulkParams.split("\n");
		$("#"+preId+"-table tbody").empty();
	    for(var i=0 ; i< params.length; i++){
			if( params[i].trim() != ""){
				var p = params[i].split(":");
				if(p.length>2){
                    for(var j=2 ; j< p.length; j++){
                        p[1] = p[1] +":" + p[j];
                    }
                }
				var key = p[0];
				var value = "";
				if(p.length >1 ){
					value = p[1];
				}
				var tdText = paramsTr.replace("'key'","'key' value='"+key+"'").replace("'value'","'value' value='"+decodeURIComponent(value)+"'");
				tdText = tdText.replace("last","");
				$("#"+preId+"-table tbody").append(tdText);
			}
		}
		$("#"+preId+"-table tbody").append(paramsTr);
    });
	
	$("#format-row").click(function(){
	    var rowData = originalResponseText;
	    if( rowData == ""){
            originalResponseText = $("#response-row").val();
            rowData = originalResponseText;
        }
        changeBg("btn-default", "btn-main", "response-menu",this);
        $("#response-row").val(rowData);
        responseShow("response-row");
        $('#response-row').removeAttr("readonly");
        originalResponseText = "";
    });

    $("#format-pretty").click(function(){
        var rowData = originalResponseText;
        if( rowData == ""){
            originalResponseText = $("#response-row").val();
            rowData = originalResponseText;
        }
        try{
            var jsonFormatResult = format(rowData);
            if (jsonFormatResult != null && jsonFormatResult != '') {
                $("#response-row").val(jsonFormatResult);
            }
        }catch(e){
            console.warn(e)
            $("#response-row").val(rowData);
        }
        changeBg("btn-default", "btn-main", "response-menu",this);
        $('#response-row').attr("readonly","readonly");
        responseShow("response-row");
    });

    $('.response-json').on('click', function() {
       if( !formatJson() ){
            return;
       }
       changeBg("btn-default", "btn-main", "response-menu",this);
	   var value = $(this).attr("crap-data-value");
	   var key = $(this).attr("crap-data-name");
       $('#response-pretty').JSONView(key, value);
       responseShow("response-pretty");
    });

    $(".params-headers-table").on("click","i",function() {
        var tr = $(this).parent().parent();
        // 最后一行不允许删除
        if( tr.hasClass("last")){
            return;
        }
        tr.remove();
    });

    // 请求头、参数切换
  $(".params-title").click(function(){
        $(".params-title").removeClass("bb2");
        $(this).addClass("bb2");
        var contentDiv = $(this).attr("data-stage");
        $("#headers-div").addClass("none");
        $("#params-div").addClass("none");
        $("#"+contentDiv).removeClass("none");
  });

    $(".response-title").click(function(){
        $(".response-title").removeClass("bb2");

        $(this).addClass("bb2");
        var contentDiv = $(this).attr("data-stage");
        $(".response-header").addClass("none");
        $(".response-body").addClass("none");
        $(".response-cookie").addClass("none");
        $("."+contentDiv).removeClass("none");
    });



    $("#method").change(function() {
        if( $("#method").val() != "GET"){
            if($("#content-type").hasClass("none")){
                $("#content-type").removeClass("none");
            }
        }else{
            $("#param-type-value").prop("checked",true);
            $("input[name='param-type']").change();
            if(!$("#content-type").hasClass("none")){
                $("#content-type").addClass("none");
            }
        }
    });

    // param-type=customer
    $("#customer-type").change(function() {
        $("#customer-type-value").val( $("#customer-type").val() );
    });
    // 单选param-type监控
    $("input[name='param-type']").change(function(){
        var crapData = $("input[name='param-type']:checked").attr("crap-data");
        if( crapData && crapData=="customer") {
            $("#customer-type").removeClass("none")
            $("#params-table").addClass("none");
            $("#customer-div").removeClass("none");
        }else{
            $("#customer-type").addClass("none");
            $("#customer-div").addClass("none");
            $("#params-table").removeClass("none");
        }
    });

  // 插件调试send
  $("#send").click(function(){
	  if( showBulkHeaders ){
		 $("#headers-bulk-edit-div .key-value-edit").click();
	  }
	  if( showBulkParams ){
		 $("#params-bulk-edit-div .key-value-edit").click();
	  }
      callAjax();
  });

  // div 拖动
    $("#left").resizable(
        {
            autoHide: true,
            handles: 'e',
            maxWidth: 800,
            minWidth: 260,
            resize: function(e, ui)
            {
                var parentWidth = $(window).width();
                var remainingSpace = parentWidth - ui.element.width();

                divTwo = $("#right"),
                    divTwoWidth = remainingSpace/parentWidth*100+"%";
                divTwo.width(divTwoWidth);
            },
            stop: function(e, ui)
            {
                var parentWidth = $(window).width();
                var remainingSpace = parentWidth - ui.element.width();
                divTwo = $("#right");
                divTwoWidth = remainingSpace/parentWidth*100+"%";
                divTwo.width(divTwoWidth);
                ui.element.css(
                    {
                        width: ui.element.width()/parentWidth*100+"%",
                    });
            }
        });
})
