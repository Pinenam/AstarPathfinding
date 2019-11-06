//Point定义为一个用来记录方格关键信息的类
export default class Point 
{    
    public xIndex:number;//方格的x坐标
    public yIndex:number;//方格的y坐标

    public F:number=0;//A*算法的F值，默认值为0
    public G:number=0;//A*算法的G值，默认值为0
    public H:number=0;//A*算法的H值，默认值为0

    public parentPoint:Point=null;//Point的父节点，默认值为null
    public isObstacle:boolean=false;//方格是不是障碍物，默认值为false

    public sprite:Laya.Sprite=null;//Sprite 是基本的显示图形的显示列表节点， Sprite 默认没有宽高，默认不接受鼠标事件，也是一个容器类

    public constructor(xIndex:number, yIndex:number, sprite:Laya.Sprite,isObstacle:boolean) 
    {  
        //以下是初始化过程
        this.xIndex=xIndex;
        this.yIndex=yIndex;
        this.sprite=sprite;
        this.isObstacle=isObstacle;
    }
}