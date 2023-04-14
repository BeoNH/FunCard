import funCard from "./!FunCard";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CardMove extends cc.Component {

    // @property(cc.Node)
    // node: cc.Node = null;

    private isDragging: boolean = false;
    private touchOffset: cc.Vec2 = null;

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    start() {}

    private onTouchStart(event: cc.Event.EventTouch) {
        this.isDragging = true;
        this.touchOffset = this.node.getPosition().sub(event.getLocation());
        this.node.opacity = 230; //chinh do ro rang anh
    }

    private onTouchMove(event: cc.Event.EventTouch) {
        if (this.isDragging) {
            this.node.setPosition(event.getLocation().add(this.touchOffset));
        }
    }

    private onTouchEnd(event: cc.Event.EventTouch) {
        this.isDragging = false;
        this.node.opacity = 255;

        var screenSize = cc.view.getVisibleSize();
        let nodePos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        if (nodePos.x < 0 || nodePos.x > screenSize.width || nodePos.y < 0 || nodePos.y > screenSize.height) {
            this.node.destroy();
            if(!funCard.Ins.isEnd){
                funCard.Ins.numberCardInCanvas --;
            }
        }
    }

    private onTouchCancel(event: cc.Event.EventTouch) {
        this.onTouchEnd(event);
    }
}
