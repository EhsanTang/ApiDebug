/*********上移接口*********/
function upInterface(moduleId, id) {
    var interfaces = getInterfacesByModuleId(moduleId);
    for(var i=0; i<interfaces.length;i++){
        if(interfaces[i].id == id){
            if(i > 0) {
                var interface = interfaces[i];
                interface.version = interface.version + 1;
                interfaces.splice(i,1);
                interfaces.splice(i-1, 0, interface);
            }
            break;
        }
    }
    saveAllInterfaces(moduleId, interfaces);
    refreshSyncIco(0);
    return true;
}
/*********下移接口*********/
function downInterface(moduleId, id) {
    var interfaces = getInterfacesByModuleId(moduleId);
    for(var i=0; i<interfaces.length;i++){
        if(interfaces[i].id == id){
            if(i < interfaces.length-1) {
                var interface = interfaces[i];
                interface.version = interface.version + 1;
                interfaces.splice(i,1);
                interfaces.splice(i+1, 0, interface);
            }
            break;
        }
    }
    saveAllInterfaces(moduleId, interfaces);
    refreshSyncIco(0);
    return true;
}
function getInterfacesByModuleId(moduleId){
    var interfaces;
    try{
        interfaces = $.parseJSON( localStorage['crap-debug-interface-' + moduleId] );
    }catch(e){
        interfaces = $.parseJSON( "[]" );
        console.warn(e);
    }
    return interfaces;
}
function saveAllInterfaces(moduleId, interfaces){
    localStorage['crap-debug-interface-' + moduleId] = JSON.stringify(interfaces);
}