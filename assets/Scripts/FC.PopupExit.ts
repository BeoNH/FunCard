const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    clickYes(): void{
        cc.director.loadScene("StartScene");
        cc.sys.localStorage.clear();
    }
     
    clickNo(): void{
        this.node.destroy();
    }
}
