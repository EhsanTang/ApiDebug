var ENV_LOC_KEY = "crap-env-list";
function saveAllEnv(envList){
    localStorage[ENV_LOC_KEY] = JSON.stringify(envList);
}

function getAllEnv(){
    try {
        var lovEnvList = localStorage[ENV_LOC_KEY];
        if (lovEnvList == null){
            lovEnvList = "[]";
        }
        return $.parseJSON(lovEnvList);
    } catch (e) {
        console.warn(e);
        return $.parseJSON("[]");
    }
}

function deleteEnv(id) {
    var envList = getAllEnv();
    // 如果已经存在则删除
    var env;
    for (var i = 0; i < envList.length; i++) {
        if (envList[i].id == id) {
            env = envList[i];
            env.status=-1;
            envList.splice(i, 1);
            break;
        }
    }
    envList.unshift(env);
    // TODO 删除环境变量
    saveAllEnv(envList);
}

// 保存 or 更新
function saveUpdateEnv(id, name) {
    var envList = getAllEnv();
    if( handerStr(id) == ""){
        id = new Date().getTime() + "-" + random(10);
    }

    var h = {
        "id": id,
        "name": name,
        "version":0,
        "status":1
    };

    // 如果已经存在则删除
    for (var i = 0; i < envList.length; i++) {
        if (envList[i].id == h.id) {
            h.status = envList[i].status;
            h.version = envList[i].version + 1;
            envList.splice(i, 1);
            break;
        }
    }
    envList.unshift(h);
    saveAllEnv(envList)
    //refreshSyncIco(0);
}