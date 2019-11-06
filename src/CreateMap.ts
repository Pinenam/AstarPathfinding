import Sprite = Laya.Sprite;
import Stage = Laya.Stage;
import WebGL = Laya.WebGL;

import Point from "./Point";
import My2DArray from "./2DArray";

export default class CreateMap {
    //矩形宽高(像素)
    private rectWidth:number=10;
    private rectHeight:number=10;

    //地图宽高(格数)
    private mapWidth:number=100;
    private mapHeight:number=100;
    constructor(){}
 
    /**
     * 画矩形 
     */
    private DrawRect(xPos: number,yPos: number,rectColor:string): Sprite 
    {
        let sp: Sprite = new Sprite();
        Laya.stage.addChild(sp);
        sp.graphics.drawRect(xPos, yPos, this.rectWidth,this.rectHeight, rectColor);         
        return sp;
    }

    /**
     * 创建地图
     */
    public DrawMap(): My2DArray //函数返回值是一个2D数组
    {
        let pointsArr: My2DArray=new My2DArray(this.mapHeight,this.mapWidth,null);//传入地图高宽的格数，此时不需要Point
        //new 10000个对象
        for(let i=0;i<=this.mapWidth-1;i++)
        {
            for(let j=0;j<=this.mapHeight-1;j++)
            {      
                let tempPoint:Point;//创建一个Point对象用来记录方格信息         
                //墙
                if(i%2==0||j==0||j==this.mapHeight-1)//偶数列不可通行
                {              
                    let tempSprite: Sprite = this.DrawRect(i*this.rectWidth,j*this.rectHeight,"#467500"); //Sprite能作为容器使用，这里面放绘制的矩形
                    tempPoint=new Point(i,j,tempSprite,true);//记录墙的信息
                }
                else{
                    //路
                    let tempSprite: Sprite = this.DrawRect(i*this.rectWidth,j*this.rectHeight,"#C4C400");     
                    tempPoint=new Point(i,j,tempSprite,false);//记录路的信息
                }
                pointsArr.setValue(j,i,tempPoint);//给数组元素赋值，每一块矩形在二维数组中唯一对应
            }
        }

        //随机生成通路
        
        let randomNum1:number= Math.floor(Math.random()*this.mapHeight);

            pointsArr.getValue(randomNum1,0).sprite=this.DrawRect(1*this.rectWidth,randomNum1*this.rectHeight,"#FFFFFF");     
            pointsArr.getValue(randomNum1,0).isObstacle=false;   
        for(let i=0;i<this.mapWidth;i++)
        {
            let randomNum0:number;
            for (let k=0;k<17;k++){//每个墙上开17次通路
            if(i%2==0&&i>0){
                randomNum0 = Math.floor(Math.random()*this.mapHeight);
                if(randomNum0==0)
                {
                    randomNum0++;
                }
                if(randomNum0==this.mapHeight-1)
                {
                    randomNum0--;
                }
                pointsArr.getValue(randomNum0,i).sprite=this.DrawRect(i*this.rectWidth,randomNum0*this.rectHeight,"#FFFFFF");     
                pointsArr.getValue(randomNum0,i).isObstacle=false;   
            }
         }
        }

        return pointsArr;
    }
}