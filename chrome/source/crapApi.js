$(function(){
    getLocalModules();
    //getHistorys();
    //openMyDialog("title",500);

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
            moduleText += separator + "{\"moduleId\":\"" + modules[i].moduleId +"\",\"moduleName\":\"" + modules[i].moduleName + "\"";
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
            url : websiteUrl + "/user/crapDebug/synch.do",
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
                        alert("success!",3,"success");
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
        $("#modules-title").removeClass("bb3");
        $(this).addClass("bb3");
        getHistorys();
    });
    $("#modules-title").click(function(){
        $("#historys").addClass("none");
        $("#modules").removeClass("none");
        $("#historys-title").removeClass("bb3");
        $(this).addClass("bb3");
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
                alert("Success !");
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

    $("#close-dialog").click(function(){
        closeMyDialog("dialog");
    });


    $("#modules").on("click",".interface", function() {
        var urlInfo = $.parseJSON( $(this).attr("crap-data") );
        $("#interface-name").val(handerStr(urlInfo.name));
        $("#headers-bulk").val(urlInfo.headers);
        if(urlInfo.paramType == "") {
            $("#params-bulk").val(urlInfo.params);
        }else{
            $("#customer-value").val(urlInfo.params);
        }
        $("#url").val(urlInfo.url);
        $("#interface-id").val(urlInfo.id);
        $("#module-id").val(urlInfo.moduleId);
        $("#method").val(urlInfo.method);
        $("#method").change();
        $("#customer-type").val(urlInfo.paramType);
        $("#customer-type").change();
        $(".key-value-edit").click();
        $("#params-div input[value='"+urlInfo.paramType+"']").prop("checked",true);
        $("input[name='param-type']").change();

        $(".interface").removeClass("bg-main");
        $(this).addClass("bg-main");

    });

    $("#historys").on("click","div", function() {
        var urlInfo = $.parseJSON( $(this).attr("crap-data") );
        $("#interface-name").val(handerStr(urlInfo.name));
        $("#headers-bulk").val(urlInfo.headers);
        if(urlInfo.paramType == "") {
            $("#params-bulk").val(urlInfo.params);
        }else{
            $("#customer-value").val(urlInfo.params);
        }
        $("#url").val(urlInfo.url);
        $("#interface-id").val("-1");
        $("#method").val(urlInfo.method);
        $("#method").change();
        $("#module-id").val("-1");
        $("#customer-type").val(urlInfo.paramType);
        $("#customer-type").change();
        $("#params-div input[value='"+urlInfo.paramType+"']").prop("checked",true);
        $(".key-value-edit").click();
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
        $("#customer-type").val("application/json");
        $("#customer-type").change();
        $("input[name='param-type']").change();

        $(".interface").removeClass("bg-main");
        $(".history-div").removeClass("bg-main");
        $(".key-value-edit").click();
    });
	
	$("#modules").on("click",".delete-interface", function() {
        if(!myonfirm("Are you sure you want to delete? 「确定要删除吗」"))
        {
            return false;
        }
        var ids = $(this).attr("crap-data").split("|");
		deleteInterface(ids[0],ids[1]);
		getLocalModules();	
		return false;// 不在传递至父容器
    });
    $("#left-enlarge").click(function(){
        if( !leftEnlarge){
            leftEnlarge = true;
            $("#left").css("width","18%");
            $("#right").css("width","82%");
            $("#left-enlarge div").html("<i class='iconfont'>&#xe605;</i>");
        }else{
            leftEnlarge = false;
            $("#left").css("width","0%");
            $("#right").css("width","100%");
            $("#left-enlarge div").html("<i class='iconfont'>&#xe641;</i>");
        }

    });
	$("#open-debug").click(function(){
			window.open("debug.html")
	});
    $("#open-json").click(function(){
        window.open("json.html")
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
				var key = p[0];
				var value = "";
				if(p.length >1 ){
					value = p[1];
				}
				var tdText = paramsTr.replace("'key'","'key' value='"+key+"'").replace("'value'","'value' value='"+value+"'");
				tdText = tdText.replace("last","");
				$("#"+preId+"-table tbody").append(tdText);
			}
		}
		$("#"+preId+"-table tbody").append(paramsTr);
    });
	
	$("#format-row").click(function(){
	    var rowData = originalResponseText;
	    if( rowData == ""){
            rowData = $("#response-row").val();
        }
        changeBg("btn-default", "btn-main", "response-menu",this);
        $("#response-row").val(rowData);
        responseShow("response-row");
    });

    $("#format-pretty").click(function(){
        var rowData = originalResponseText;
        if( rowData == ""){
            rowData = $("#response-row").val();
        }
        try{
            $("#response-row").val(jsonFormat(rowData));
        }catch(e){
            console.warn(e)
            $("#response-row").val(rowData);
        }
        changeBg("btn-default", "btn-main", "response-menu",this);
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
        $(".params-title").removeClass("bb3");
        $(this).addClass("bb3");
        var contentDiv = $(this).attr("data-stage");
        $("#headers-div").addClass("none");
        $("#params-div").addClass("none");
        $("#"+contentDiv).removeClass("none");
  });

    $(".response-title").click(function(){
        $(".response-title").removeClass("bb3");

        $(this).addClass("bb3");
        var contentDiv = $(this).attr("data-stage");
        $(".response-header").addClass("none");
        $(".response-body").addClass("none");
        $(".response-cookie").addClass("none");
        $("."+contentDiv).removeClass("none");
    });



    $("#method").change(function() {
        if( $("#method").val() == "POST"){
            if($("#content-type").hasClass("none")){
                $("#content-type").removeClass("none");
            }
        }else{
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
        var crapData = $('input:radio[name="param-type"]:checked').attr("crap-data");
        if (crapData =="customer"){
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
