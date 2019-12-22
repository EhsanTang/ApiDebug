/*********上移*********/
function upModule(moduleId) {
    var modules = getAllModules(moduleId);
    for(var i=0; i<modules.length;i++){
        if(modules[i].moduleId == moduleId){
            if(i > 0) {
                var module = modules[i];
                module.version = module.version + 1;
                modules.splice(i,1);
                modules.splice(i-1, 0, module);
            }
            break;
        }
    }
    saveAllModules(modules);
    refreshSyncIco(0);
    return true;
}
/*********下移*********/
function downModule(moduleId) {
    var modules = getAllModules(moduleId);
    for(var i=0; i<modules.length;i++){
        if(modules[i].moduleId == moduleId){
            if(i < modules.length-1) {
                var module = modules[i];
                module.version = module.version + 1;
                modules.splice(i,1);
                modules.splice(i+1, 0, module);
            }
            break;
        }
    }
    saveAllModules(modules);
    refreshSyncIco(0);
    return true;
}
function getAllModules(){
    var modules;
    try {
        modules = $.parseJSON(localStorage['crap-debug-modules'])
    } catch (e) {
        modules = $.parseJSON("[]");
        console.warn(e);
    }
    return modules;
}
function saveAllModules(modules){
    localStorage['crap-debug-modules'] = JSON.stringify(modules);
}