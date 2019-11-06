import GameConfig from "./GameConfig";
import My2DArray from "./2DArray";
import Point from "./Point";
import CreateMap from "./CreateMap";
import AStar from "./AStar";
import Sprite = Laya.Sprite;

class Main {
		/**
     * 画矩形方法
     */
	private resPoint:Point;
    private DrawRect(xPos: number,yPos: number,rectColor:string): Sprite 
    {
        let sp: Sprite = new Sprite();
        Laya.stage.addChild(sp);
        sp.graphics.drawRect(xPos, yPos, 10,10, rectColor);         
        return sp;
    }
	constructor() {
		//--------------------------------------------------项目初始化部分-----------------------------------------------------------------------------------------------------
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		Laya.stage.bgColor="#C6E2FF";
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;
		//-----------------------------------------------项目初始化部分--------------------------------------------------------------------------------------------------------
		

		//创建地图
		let pointsArr: My2DArray =new CreateMap().DrawMap();
		
		//路径查找
		let openList: Point;//初始化openList的节点
		let closedList: Point;//初始化closedList的节点

		for(let i=0;i<pointsArr.rows;i++)
		{
			if(pointsArr.getValue(i,0).isObstacle==false)//检查每一列上的通路
			{
				openList=pointsArr.getValue(i,0);//把通路加到openList里面
			}
			if(pointsArr.getValue(i,pointsArr.columns-1).isObstacle==false)//检查每一行上的通路
			{
				closedList=pointsArr.getValue(i,pointsArr.columns-1);//把每一列上的通路加到closeList里面
			}

		}
		let aStar:AStar=new AStar(openList,closedList,pointsArr);//new一个A*对象并把openList和closedList以及地图值传给该对象
		 this.resPoint=aStar.FindPath();//调用A*寻路
		Laya.timer.loop(1,this,this.ondraw);


		/*while(this.resPoint!=null)//给路径填色
		{
			Laya.timer.loop(1000,this,this.DrawRect,[this.resPoint.xIndex*10,this.resPoint.yIndex*10,"#B766AD"],false);
			this.resPoint=this.resPoint.parentPoint;
		}*/
	}


	/*public preCTime:number=0;
	public isSleep(delayTime: number = 0): boolean {
			   let nowTime: number = Date.now();
			   while (!(nowTime - this.preCTime< delayTime)){
				this.preCTime = nowTime;
				if(nowTime - this.preCTime< delayTime)
				break;
				}
				return true;
			}*/

			/*public sleep(numberMillis:number):void{
				let now = new Date(); 
				let exitTime = now.getTime() + numberMillis; 
				while (true) { 
					now = new Date(); 
					if (now.getTime() > exitTime) 
					return;
				}
			}*/

	private ondraw():void{//封装好的路径填色函数
		if(this.resPoint!=null)//给路径填色
		{
			this.DrawRect(this.resPoint.xIndex*10,this.resPoint.yIndex*10,"#B766AD");
			this.resPoint=this.resPoint.parentPoint;
		}
		
		}
	}





//激活启动类
new Main();