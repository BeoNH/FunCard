import CardMove from "./FC.CardMove";

const {ccclass, property} = cc._decorator;

let Heart = {
    Text: [],
};
let Sup = {
    Text: [],
}

@ccclass
export default class funCard extends cc.Component {
    public static Ins : funCard;

    @property(cc.Prefab)
    card : cc.Prefab[] = [];

    @property(cc.Node)
    popup: cc.Node = null;
    @property(cc.Prefab)
    popupExit: cc.Prefab = null;

    public numberCardInCanvas: number = 0;
    public isEnd: boolean = false;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        funCard.Ins = this;
        this.getTxtCard("HeartTxt", Heart);
        this.getTxtCard("SupTxt", Sup);
        
        this.schedule(()=>{ 
            if(this.numberCardInCanvas < 5){
                this.spawnCard();
            }
        },0.1)
    }

    spawnCard(): void {
        let rand =  Math.floor(Math.random() * this.card.length);
        let newCard = cc.instantiate(this.card[rand]);
        cc.Canvas.instance.node.addChild(newCard);
        newCard.setSiblingIndex(3) // chuyen vi tri xuong cuoi cung sau camera[0], BG[1].

        //Add text cho luat cua the bai
        let heart = newCard.children[0].getComponent(cc.Label);
        let heartData = JSON.parse(cc.sys.localStorage.getItem("HeartTxt"));
        let randHeart = Math.floor(Math.random() * heartData.Text.length);
        heart.string = heartData.Text[randHeart];
        heartData.Text.splice(randHeart,1);
        cc.sys.localStorage.setItem("HeartTxt", JSON.stringify(heartData));

        //Add text cho hinh phat cua the bai
        let sup = newCard.children[1].getComponent(cc.Label);
        let supData = JSON.parse(cc.sys.localStorage.getItem("SupTxt"));
        sup.string = supData.Text[Math.floor(Math.random() * supData.Text.length)];

        if(heartData.Text.length == 0){
            this.isEnd = true;
        }

        this.numberCardInCanvas++;
    }

    getTxtCard(fileName: string, data: any): void{
        cc.resources.load(fileName, cc.TextAsset, (err, file: cc.TextAsset) => {
            cc.sys.localStorage.setItem(fileName, JSON.stringify(data));   

            var Data = JSON.parse(cc.sys.localStorage.getItem(fileName));
            Data.Text = file.text.split('\n');
            cc.sys.localStorage.setItem(fileName, JSON.stringify(Data));        
        });
        
    }

    onBack(): void{
        if(!this.popup.children[0]){
            let node = cc.instantiate(this.popupExit);
            node.parent = this.popup;
        }
    }
}
