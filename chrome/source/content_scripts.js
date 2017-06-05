//点击luceneSearch时执行以下代码
$(function(){
	// 从插件跳转至码云，自动弹出捐赠页面
	if(window.location.href == "http://git.oschina.net/CrapApi/CrapApi?autoDonate=true"){
		$(".modals").removeClass("hidden");
			$(".modals").removeClass("fade");
			$(".modals").removeClass("out");
			$(".modals").addClass("visible");
			$(".modals").addClass("active");
			
			$(".project-donate-modal").removeClass("hidden");
			
			$(".modals").css("display","block");
			$(".project-donate-modal").addClass("visible");
			$(".project-donate-modal").addClass("active");
			$(".project-donate-modal").css("margin-top","-289.5px");


    }
    $("#btn-cancel-donate").click(function(){
        window.location.href="http://git.oschina.net/CrapApi/CrapApi";
    });
})



function httpRequest(url, callback){  
    var xhr = new XMLHttpRequest();  
    xhr.open("GET", url, true);  
    xhr.onreadystatechange = function() {  
        if (xhr.readyState == 4) {  
            callback(xhr.responseText);  
        }  
    }  
    xhr.send();  
} 



