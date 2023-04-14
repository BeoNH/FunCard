const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    onStart(){
        cc.director.loadScene("Main");
        cc.sys.localStorage.clear();
    }

    onRule(): void {
        cc.director.loadScene("Rule");
    }
    
    onSetting(){
        cc.director.loadScene("Setting");
    }
}
