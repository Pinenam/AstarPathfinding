
module laya {
    import Sprite = Laya.Sprite;
    import Stage = Laya.Stage;
    import WebGL = Laya.WebGL;

    export class Sprite_DrawShapes {
        private sp: Sprite;
        public x:number;
        public y:number;
        public color:string;
        public pos:[number,number,string];

        constructor()
        {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(1000, 1000, WebGL);

            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;

            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "white";
            this.drawMap();
        }
        //画地图
        private drawMap(): void {
            var a = new Array();
            for(var m=0;m<100;m++){        
                a[m] = new Array();
                for(var n=0;n<100;n++){    
                    a[m][n] = m+n;
                }
            }
            this.sp = new Sprite();
            Laya.stage.addChild(this.sp);
			//画矩形
			for(let i=0;i<100;i++){
                //[m,n]随机取整表达式Math.floor(Math.random()*(m-n)+n);
                let randomy0=Math.floor(Math.random()*(1-100)+100);
                let randomy1=Math.floor(Math.random()*(1-100)+100);
                let randomy2=Math.floor(Math.random()*(1-100)+100);
                let randomy3=Math.floor(Math.random()*(1-100)+100);
                for(let j=0;j<100;j++){
                    if (randomy0==j||randomy1==j||randomy2==j||randomy3==j){
                        this.sp.graphics.drawRect(10*i, 10*j, 10, 10, "white");
                        this.x=10*i;
                        this.y=10*j;
                        this.color="white";
                        this.pos=[this.x,this.y,this.color];
                        a[i][j]=this.pos;
                    }
                    else if(i%2==0)
                    {
                        this.sp.graphics.drawRect(10*i, 10*j, 10, 10, "white");
                        this.x=10*i;
                        this.y=10*j;
                        this.color="white";
                        this.pos=[this.x,this.y,this.color];
                        a[i][j]=this.pos;
                    }
                    else{
                        this.sp.graphics.drawRect(10*i, 10*j, 10, 10, "black");
                        this.x=10*i;
                        this.y=10*j;
                        this.color="black";
                        this.pos=[this.x,this.y,this.color];
                        a[i][j]=this.pos;
                    }
            }
        }

    }
}
}
new laya.Sprite_DrawShapes();
