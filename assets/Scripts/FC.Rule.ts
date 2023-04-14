const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onBack(): void{
        cc.director.loadScene("StartScene");
    }
}
