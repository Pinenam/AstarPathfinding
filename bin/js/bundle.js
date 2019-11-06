var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var My2DArray = /** @class */ (function () {
    /**
     * 初始化数组
     */
    function My2DArray(rows, columns, value) {
        this.my2DArray = new Array(); //定义一个二维数组
        this.rows = rows;
        this.columns = columns;
        this.initRows(rows);
        this.initColumns(columns, value);
    }
    /**
     * 取数组中的值
     */
    My2DArray.prototype.getValue = function (rows, columns) {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return null;
        }
        return this.my2DArray[rows][columns];
    };
    /**
     * 为数组赋值
     */
    My2DArray.prototype.setValue = function (rows, columns, value) {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return;
        }
        this.my2DArray[rows][columns] = value;
    };
    /**
     * 初始化行数
     */
    My2DArray.prototype.initRows = function (rows) {
        if (rows < 1) {
            return;
        }
        for (var i = 0; i < rows; i++) {
            this.my2DArray.push(new Array());
        }
    };
    /**
     * 初始化列数
     */
    My2DArray.prototype.initColumns = function (columns, value) {
        if (columns < 1) {
            return;
        }
        for (var i = 0; i < this.my2DArray.length; i++) {
            for (var j = 0; j < columns; j++) {
                this.my2DArray[i].push(value);
            }
        }
    };
    /**
     * 获取数组
     */
    My2DArray.prototype.getArray = function () {
        return this.my2DArray;
    };
    return My2DArray;
}());
exports.default = My2DArray;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AStar = /** @class */ (function () {
    function AStar(startPoint, endPoint, mapArr) {
        this.dirArr = [[1, 0], [0, -1], [-1, 0], [0, 1]]; //判断四个方向
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.mapArr = mapArr;
    }
    /**
     * 查找路径
     */
    AStar.prototype.FindPath = function () {
        //openList元素放在一个Point数组里
        this.openList = new Array();
        this.closedList = new Array();
        this.openList.push(this.startPoint);
        while (this.openList.length > 0) {
            //得到当前点
            var curPoint = this.openList[0];
            var curPointIndex = 0;
            for (var i = 0; i < this.openList.length; i++) //遍历整个openList数组
             {
                if (curPoint.F > this.openList[i].F) {
                    curPoint = this.openList[i];
                    curPointIndex = i;
                }
            }
            this.openList.splice(curPointIndex, 1);
            this.closedList.push(curPoint);
            //查找结束
            if (curPoint == this.endPoint) {
                return curPoint;
            }
            var aroundPoints = this.GetAroundPoints(curPoint);
            for (var i = 0; i < aroundPoints.length; i++) {
                //障碍或在closedList情况
                if (aroundPoints[i].isObstacle || this.Contain(this.closedList, aroundPoints[i])) {
                    continue;
                }
                else {
                    var gCost = this.CalDistance(curPoint, aroundPoints[i]) + curPoint.G;
                    //在openList里或不在
                    if (!this.Contain(this.openList, aroundPoints[i]) || gCost < aroundPoints[i].G) {
                        aroundPoints[i].G = gCost;
                        aroundPoints[i].H = this.CalDistance(aroundPoints[i], this.endPoint);
                        ;
                        aroundPoints[i].F = gCost + aroundPoints[i].H;
                        aroundPoints[i].parentPoint = curPoint;
                        if (!this.Contain(this.openList, aroundPoints[i])) {
                            this.openList.push(aroundPoints[i]);
                        }
                    }
                }
            }
        }
        return null;
    };
    /**
     * 得到周围4个点
     */
    AStar.prototype.GetAroundPoints = function (curPoint) {
        var aroundPoints = new Array();
        for (var i = 0; i < this.dirArr.length; i++) {
            var x = curPoint.xIndex + this.dirArr[i][0];
            var y = curPoint.yIndex + this.dirArr[i][1];
            if (x >= 0 && x < this.mapArr.columns && y >= 0 && y < this.mapArr.rows) {
                aroundPoints.push(this.mapArr.getValue(y, x));
            }
        }
        return aroundPoints;
    };
    /**
     * 检查数组是否包含元素
     */
    AStar.prototype.Contain = function (arr, target) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return true;
            }
        }
        return false;
    };
    /**
     * 得到两个点的距离
     */
    AStar.prototype.CalDistance = function (point_1, point_2) {
        return Math.abs(point_2.xIndex - point_1.xIndex) + Math.abs(point_2.yIndex - point_1.yIndex);
    };
    return AStar;
}());
exports.default = AStar;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite = Laya.Sprite;
var Point_1 = require("./Point");
var _2DArray_1 = require("./2DArray");
var CreateMap = /** @class */ (function () {
    function CreateMap() {
        //矩形宽高(像素)
        this.rectWidth = 10;
        this.rectHeight = 10;
        //地图宽高(格数)
        this.mapWidth = 100;
        this.mapHeight = 100;
    }
    /**
     * 画矩形
     */
    CreateMap.prototype.DrawRect = function (xPos, yPos, rectColor) {
        var sp = new Sprite();
        Laya.stage.addChild(sp);
        sp.graphics.drawRect(xPos, yPos, this.rectWidth, this.rectHeight, rectColor);
        return sp;
    };
    /**
     * 创建地图
     */
    CreateMap.prototype.DrawMap = function () {
        var pointsArr = new _2DArray_1.default(this.mapHeight, this.mapWidth, null); //传入地图高宽的格数，此时不需要Point
        //new 10000个对象
        for (var i = 0; i <= this.mapWidth - 1; i++) {
            for (var j = 0; j <= this.mapHeight - 1; j++) {
                var tempPoint = void 0; //创建一个Point对象用来记录方格信息         
                //墙
                if (i % 2 == 0 || j == 0 || j == this.mapHeight - 1) //偶数列不可通行
                 {
                    var tempSprite = this.DrawRect(i * this.rectWidth, j * this.rectHeight, "#467500"); //Sprite能作为容器使用，这里面放绘制的矩形
                    tempPoint = new Point_1.default(i, j, tempSprite, true); //记录墙的信息
                }
                else {
                    //路
                    var tempSprite = this.DrawRect(i * this.rectWidth, j * this.rectHeight, "#C4C400");
                    tempPoint = new Point_1.default(i, j, tempSprite, false); //记录路的信息
                }
                pointsArr.setValue(j, i, tempPoint); //给数组元素赋值，每一块矩形在二维数组中唯一对应
            }
        }
        //随机生成通路
        var randomNum1 = Math.floor(Math.random() * this.mapHeight);
        pointsArr.getValue(randomNum1, 0).sprite = this.DrawRect(1 * this.rectWidth, randomNum1 * this.rectHeight, "#FFFFFF");
        pointsArr.getValue(randomNum1, 0).isObstacle = false;
        for (var i = 0; i < this.mapWidth; i++) {
            var randomNum0 = void 0;
            for (var k = 0; k < 17; k++) { //每个墙上开17次通路
                if (i % 2 == 0 && i > 0) {
                    randomNum0 = Math.floor(Math.random() * this.mapHeight);
                    if (randomNum0 == 0) {
                        randomNum0++;
                    }
                    if (randomNum0 == this.mapHeight - 1) {
                        randomNum0--;
                    }
                    pointsArr.getValue(randomNum0, i).sprite = this.DrawRect(i * this.rectWidth, randomNum0 * this.rectHeight, "#FFFFFF");
                    pointsArr.getValue(randomNum0, i).isObstacle = false;
                }
            }
        }
        return pointsArr;
    };
    return CreateMap;
}());
exports.default = CreateMap;
},{"./2DArray":1,"./Point":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameUI_1 = require("./script/GameUI");
var GameControl_1 = require("./script/GameControl");
var Bullet_1 = require("./script/Bullet");
var DropBox_1 = require("./script/DropBox");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("script/GameUI.ts", GameUI_1.default);
        reg("script/GameControl.ts", GameControl_1.default);
        reg("script/Bullet.ts", Bullet_1.default);
        reg("script/DropBox.ts", DropBox_1.default);
    };
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/Bullet":7,"./script/DropBox":8,"./script/GameControl":9,"./script/GameUI":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var CreateMap_1 = require("./CreateMap");
var AStar_1 = require("./AStar");
var Sprite = Laya.Sprite;
var Main = /** @class */ (function () {
    function Main() {
        //--------------------------------------------------项目初始化部分-----------------------------------------------------------------------------------------------------
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        Laya.stage.alignV = GameConfig_1.default.alignV;
        Laya.stage.alignH = GameConfig_1.default.alignH;
        Laya.stage.bgColor = "#C6E2FF";
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        //-----------------------------------------------项目初始化部分--------------------------------------------------------------------------------------------------------
        //创建地图
        var pointsArr = new CreateMap_1.default().DrawMap();
        //路径查找
        var openList; //初始化openList的节点
        var closedList; //初始化closedList的节点
        for (var i = 0; i < pointsArr.rows; i++) {
            if (pointsArr.getValue(i, 0).isObstacle == false) //检查每一列上的通路
             {
                openList = pointsArr.getValue(i, 0); //把通路加到openList里面
            }
            if (pointsArr.getValue(i, pointsArr.columns - 1).isObstacle == false) //检查每一行上的通路
             {
                closedList = pointsArr.getValue(i, pointsArr.columns - 1); //把每一列上的通路加到closeList里面
            }
        }
        var aStar = new AStar_1.default(openList, closedList, pointsArr); //new一个A*对象并把openList和closedList以及地图值传给该对象
        var resPoint = aStar.FindPath(); //调用A*寻路
        while (resPoint != null) //给路径填色
         {
            this.DrawRect(resPoint.xIndex * 10, resPoint.yIndex * 10, "#B766AD");
            resPoint = resPoint.parentPoint;
        }
    }
    /**
 * 画矩形方法
 */
    Main.prototype.DrawRect = function (xPos, yPos, rectColor) {
        var sp = new Sprite();
        Laya.stage.addChild(sp);
        sp.graphics.drawRect(xPos, yPos, 10, 10, rectColor);
        return sp;
    };
    return Main;
}());
//激活启动类
new Main();
},{"./AStar":2,"./CreateMap":3,"./GameConfig":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Point定义为一个用来记录方格关键信息的类
var Point = /** @class */ (function () {
    function Point(xIndex, yIndex, sprite, isObstacle) {
        this.F = 0; //A*算法的F值，默认值为0
        this.G = 0; //A*算法的G值，默认值为0
        this.H = 0; //A*算法的H值，默认值为0
        this.parentPoint = null; //Point的父节点，默认值为null
        this.isObstacle = false; //方格是不是障碍物，默认值为false
        this.sprite = null; //Sprite 是基本的显示图形的显示列表节点， Sprite 默认没有宽高，默认不接受鼠标事件，也是一个容器类
        //以下是初始化过程
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.sprite = sprite;
        this.isObstacle = isObstacle;
    }
    return Point;
}());
exports.default = Point;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 子弹脚本，实现子弹飞行逻辑及对象池回收机制
 */
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super.call(this) || this;
    }
    Bullet.prototype.onEnable = function () {
        //设置初始速度
        var rig = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({ x: 0, y: -10 });
    };
    Bullet.prototype.onTriggerEnter = function (other, self, contact) {
        //如果被碰到，则移除子弹
        this.owner.removeSelf();
    };
    Bullet.prototype.onUpdate = function () {
        //如果子弹超出屏幕，则移除子弹
        if (this.owner.y < -10) {
            this.owner.removeSelf();
        }
    };
    Bullet.prototype.onDisable = function () {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Laya.Pool.recover("bullet", this.owner);
    };
    return Bullet;
}(Laya.Script));
exports.default = Bullet;
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameUI_1 = require("./GameUI");
/**
 * 掉落盒子脚本，实现盒子碰撞及回收流程
 */
var DropBox = /** @class */ (function (_super) {
    __extends(DropBox, _super);
    function DropBox() {
        var _this = _super.call(this) || this;
        /**盒子等级 */
        _this.level = 1;
        return _this;
    }
    DropBox.prototype.onEnable = function () {
        /**获得组件引用，避免每次获取组件带来不必要的查询开销 */
        this._rig = this.owner.getComponent(Laya.RigidBody);
        this.level = Math.round(Math.random() * 5) + 1;
        this._text = this.owner.getChildByName("levelTxt");
        this._text.text = this.level + "";
    };
    DropBox.prototype.onUpdate = function () {
        //让持续盒子旋转
        this.owner.rotation++;
    };
    DropBox.prototype.onTriggerEnter = function (other, self, contact) {
        var owner = this.owner;
        if (other.label === "buttle") {
            //碰撞到子弹后，增加积分，播放声音特效
            if (this.level > 1) {
                this.level--;
                this._text.changeText(this.level + "");
                owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                Laya.SoundManager.playSound("sound/hit.wav");
            }
            else {
                if (owner.parent) {
                    var effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                    effect.pos(owner.x, owner.y);
                    owner.parent.addChild(effect);
                    effect.play(0, true);
                    owner.removeSelf();
                    Laya.SoundManager.playSound("sound/destroy.wav");
                }
            }
            GameUI_1.default.instance.addScore(1);
        }
        else if (other.label === "ground") {
            //只要有一个盒子碰到地板，则停止游戏
            owner.removeSelf();
            GameUI_1.default.instance.stopGame();
        }
    };
    /**使用对象池创建爆炸动画 */
    DropBox.prototype.createEffect = function () {
        var ani = new Laya.Animation();
        ani.loadAnimation("test/TestAni.ani");
        ani.on(Laya.Event.COMPLETE, null, recover);
        function recover() {
            ani.removeSelf();
            Laya.Pool.recover("effect", ani);
        }
        return ani;
    };
    DropBox.prototype.onDisable = function () {
        //盒子被移除时，回收盒子到对象池，方便下次复用，减少对象创建开销。
        Laya.Pool.recover("dropBox", this.owner);
    };
    return DropBox;
}(Laya.Script));
exports.default = DropBox;
},{"./GameUI":10}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 游戏控制脚本。定义了几个dropBox，bullet，createBoxInterval等变量，能够在IDE显示及设置该变量
 * 更多类型定义，请参考官方文档
 */
var GameControl = /** @class */ (function (_super) {
    __extends(GameControl, _super);
    function GameControl() {
        var _this = _super.call(this) || this;
        /** @prop {name:createBoxInterval,tips:"间隔多少毫秒创建一个下跌的容器",type:int,default:1000}*/
        _this.createBoxInterval = 1000;
        /**开始时间*/
        _this._time = 0;
        /**是否已经开始游戏 */
        _this._started = false;
        return _this;
    }
    GameControl.prototype.onEnable = function () {
        this._time = Date.now();
        this._gameBox = this.owner.getChildByName("gameBox");
    };
    GameControl.prototype.onUpdate = function () {
        //每间隔一段时间创建一个盒子
        var now = Date.now();
        if (now - this._time > this.createBoxInterval && this._started) {
            this._time = now;
            this.createBox();
        }
    };
    GameControl.prototype.createBox = function () {
        //使用对象池创建盒子
        var box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
        box.pos(Math.random() * (Laya.stage.width - 100), -100);
        this._gameBox.addChild(box);
    };
    GameControl.prototype.onStageClick = function (e) {
        //停止事件冒泡，提高性能，当然也可以不要
        e.stopPropagation();
        //舞台被点击后，使用对象池创建子弹
        var flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
        flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        this._gameBox.addChild(flyer);
    };
    /**开始游戏，通过激活本脚本方式开始游戏*/
    GameControl.prototype.startGame = function () {
        if (!this._started) {
            this._started = true;
            this.enabled = true;
        }
    };
    /**结束游戏，通过非激活本脚本停止游戏 */
    GameControl.prototype.stopGame = function () {
        this._started = false;
        this.enabled = false;
        this.createBoxInterval = 1000;
        this._gameBox.removeChildren();
    };
    return GameControl;
}(Laya.Script));
exports.default = GameControl;
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./../ui/layaMaxUI");
var GameControl_1 = require("./GameControl");
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        GameUI.instance = _this;
        //关闭多点触控，否则就无敌了
        Laya.MouseManager.multiTouchEnabled = false;
        return _this;
    }
    GameUI.prototype.onEnable = function () {
        this._control = this.getComponent(GameControl_1.default);
        //点击提示文字，开始游戏
        this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
    };
    GameUI.prototype.onTipClick = function (e) {
        this.tipLbll.visible = false;
        this._score = 0;
        this.scoreLbl.text = "";
        this._control.startGame();
    };
    /**增加分数 */
    GameUI.prototype.addScore = function (value) {
        if (value === void 0) { value = 1; }
        this._score += value;
        this.scoreLbl.changeText("分数：" + this._score);
        //随着分数越高，难度增大
        if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
            this._control.createBoxInterval -= 20;
    };
    /**停止游戏 */
    GameUI.prototype.stopGame = function () {
        this.tipLbll.visible = true;
        this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
        this._control.stopGame();
    };
    return GameUI;
}(layaMaxUI_1.ui.test.TestSceneUI));
exports.default = GameUI;
},{"./../ui/layaMaxUI":11,"./GameControl":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var test;
    (function (test) {
        var TestSceneUI = /** @class */ (function (_super) {
            __extends(TestSceneUI, _super);
            function TestSceneUI() {
                return _super.call(this) || this;
            }
            TestSceneUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.loadScene("test/TestScene");
            };
            return TestSceneUI;
        }(Scene));
        test.TestSceneUI = TestSceneUI;
        REG("ui.test.TestSceneUI", TestSceneUI);
    })(test = ui.test || (ui.test = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjLzJEQXJyYXkudHMiLCJzcmMvQVN0YXIudHMiLCJzcmMvQ3JlYXRlTWFwLnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvTWFpbi50cyIsInNyYy9Qb2ludC50cyIsInNyYy9zY3JpcHQvQnVsbGV0LnRzIiwic3JjL3NjcmlwdC9Ecm9wQm94LnRzIiwic3JjL3NjcmlwdC9HYW1lQ29udHJvbC50cyIsInNyYy9zY3JpcHQvR2FtZVVJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNSQTtJQUtJOztPQUVHO0lBQ0gsbUJBQW1CLElBQVcsRUFBQyxPQUFjLEVBQUMsS0FBVztRQVBqRCxjQUFTLEdBQTBCLElBQUksS0FBSyxFQUFnQixDQUFDLENBQUEsVUFBVTtRQVEzRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFRLEdBQWYsVUFBZ0IsSUFBVyxFQUFDLE9BQWM7UUFDdEMsSUFBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDdkUsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFP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TyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN4QixJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztBQUM3QyxJQUFjLEVBQUUsQ0FXZjtBQVhELFdBQWMsRUFBRTtJQUFDLElBQUEsSUFBSSxDQVdwQjtJQVhnQixXQUFBLElBQUk7UUFDakI7WUFBaUMsK0JBQUs7WUFHbEM7dUJBQWUsaUJBQU87WUFBQSxDQUFDO1lBQ3ZCLG9DQUFjLEdBQWQ7Z0JBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQ0wsa0JBQUM7UUFBRCxDQVJBLEFBUUMsQ0FSZ0MsS0FBSyxHQVFyQztRQVJZLGdCQUFXLGNBUXZCLENBQUE7UUFDRCxHQUFHLENBQUMscUJBQXFCLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxFQVhnQixJQUFJLEdBQUosT0FBSSxLQUFKLE9BQUksUUFXcEI7QUFBRCxDQUFDLEVBWGEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBV2YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFBvaW50IGZyb20gXCIuL1BvaW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeTJEQXJyYXl7XHJcbiAgICBwcml2YXRlIG15MkRBcnJheSA6IEFycmF5PEFycmF5PFBvaW50Pj4gPSAgbmV3IEFycmF5PEFycmF5PFBvaW50Pj4oKTsvL+WumuS5ieS4gOS4quS6jOe7tOaVsOe7hFxyXG4gICAgcHVibGljIHJvd3MgOm51bWJlcjsvL+ihjFxyXG4gICAgcHVibGljIGNvbHVtbnMgOm51bWJlcjsvL+WIl1xyXG4gXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaVsOe7hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm93czpudW1iZXIsY29sdW1uczpudW1iZXIsdmFsdWU6UG9pbnQpe1xyXG4gICAgICAgIHRoaXMucm93cyA9IHJvd3M7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucztcclxuICAgICAgICB0aGlzLmluaXRSb3dzKHJvd3MpO1xyXG4gICAgICAgIHRoaXMuaW5pdENvbHVtbnMoY29sdW1ucyx2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5bmlbDnu4TkuK3nmoTlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFZhbHVlKHJvd3M6bnVtYmVyLGNvbHVtbnM6bnVtYmVyKTpQb2ludHtcclxuICAgICAgICBpZihyb3dzIDwgMCB8fCBjb2x1bW5zIDwgMCB8fCByb3dzID49IHRoaXMucm93cyB8fCBjb2x1bW5zID49IHRoaXMuY29sdW1ucyl7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5teTJEQXJyYXlbcm93c11bY29sdW1uc107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuLrmlbDnu4TotYvlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFZhbHVlKHJvd3M6bnVtYmVyLGNvbHVtbnM6bnVtYmVyLHZhbHVlOlBvaW50KTp2b2lke1xyXG4gICAgICAgIGlmKHJvd3MgPCAwIHx8IGNvbHVtbnMgPCAwIHx8IHJvd3MgPj0gdGhpcy5yb3dzIHx8IGNvbHVtbnMgPj0gdGhpcy5jb2x1bW5zKXtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5teTJEQXJyYXlbcm93c11bY29sdW1uc10gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluihjOaVsFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRSb3dzKHJvd3M6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIGlmKHJvd3MgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCByb3dzIDsgaSArKyl7XHJcbiAgICAgICAgICAgIHRoaXMubXkyREFycmF5LnB1c2gobmV3IEFycmF5PFBvaW50PigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5YiX5pWwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdENvbHVtbnMoY29sdW1uczpudW1iZXIsdmFsdWU6UG9pbnQpOnZvaWR7XHJcbiAgICAgICAgaWYoY29sdW1ucyA8IDEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy5teTJEQXJyYXkubGVuZ3RoIDsgaSArKyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDAgOyBqIDwgY29sdW1ucyA7IGogKyspe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teTJEQXJyYXlbaV0ucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaVsOe7hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QXJyYXkoKTpBcnJheTxBcnJheTxQb2ludD4+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLm15MkRBcnJheTtcclxuICAgIH1cclxufSIsImltcG9ydCBQb2ludCBmcm9tIFwiLi9Qb2ludFwiO1xyXG5pbXBvcnQgTXkyREFycmF5IGZyb20gXCIuLzJEQXJyYXlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFTdGFyICBcclxue1xyXG4gICAgcHJpdmF0ZSBtYXBBcnI6TXkyREFycmF5O1xyXG4gICAgcHJpdmF0ZSBzdGFydFBvaW50OlBvaW50O1xyXG4gICAgcHJpdmF0ZSBlbmRQb2ludDpQb2ludDtcclxuXHJcbiAgICBwcml2YXRlIGRpckFycjpudW1iZXJbXVtdPVtbMSwwXSxbMCwtMV0sWy0xLDBdLFswLDFdXTsvL+WIpOaWreWbm+S4quaWueWQkVxyXG4gICAgcHJpdmF0ZSBvcGVuTGlzdDpBcnJheTxQb2ludD47XHJcbiAgICBwcml2YXRlIGNsb3NlZExpc3Q6QXJyYXk8UG9pbnQ+O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihzdGFydFBvaW50OlBvaW50LGVuZFBvaW50OlBvaW50LCBtYXBBcnI6IE15MkRBcnJheSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0UG9pbnQ9c3RhcnRQb2ludDtcclxuICAgICAgICB0aGlzLmVuZFBvaW50PWVuZFBvaW50O1xyXG4gICAgICAgIHRoaXMubWFwQXJyPW1hcEFycjtcclxuICAgIH0gXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmn6Xmib7ot6/lvoRcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZpbmRQYXRoKCk6UG9pbnRcclxuICAgIHtcclxuICAgICAgICAvL29wZW5MaXN05YWD57Sg5pS+5Zyo5LiA5LiqUG9pbnTmlbDnu4Tph4xcclxuICAgICAgICB0aGlzLm9wZW5MaXN0PW5ldyBBcnJheTxQb2ludD4oKTtcclxuICAgICAgICB0aGlzLmNsb3NlZExpc3Q9bmV3IEFycmF5PFBvaW50PigpO1xyXG5cclxuICAgICAgICB0aGlzLm9wZW5MaXN0LnB1c2godGhpcy5zdGFydFBvaW50KTtcclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5vcGVuTGlzdC5sZW5ndGg+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5b6X5Yiw5b2T5YmN54K5XHJcbiAgICAgICAgICAgIGxldCBjdXJQb2ludDogUG9pbnQgPXRoaXMub3Blbkxpc3RbMF07ICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY3VyUG9pbnRJbmRleD0wOyAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5vcGVuTGlzdC5sZW5ndGg7aSsrKS8v6YGN5Y6G5pW05Liqb3Blbkxpc3TmlbDnu4RcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoY3VyUG9pbnQuRj50aGlzLm9wZW5MaXN0W2ldLkYpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyUG9pbnQ9dGhpcy5vcGVuTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJQb2ludEluZGV4PWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMub3Blbkxpc3Quc3BsaWNlKGN1clBvaW50SW5kZXgsMSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkTGlzdC5wdXNoKGN1clBvaW50KTtcclxuXHJcbiAgICAgICAgICAgIC8v5p+l5om+57uT5p2fXHJcbiAgICAgICAgICAgIGlmKGN1clBvaW50PT10aGlzLmVuZFBvaW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyUG9pbnQ7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgbGV0IGFyb3VuZFBvaW50cz10aGlzLkdldEFyb3VuZFBvaW50cyhjdXJQb2ludCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8YXJvdW5kUG9pbnRzLmxlbmd0aDtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v6Zqc56KN5oiW5ZyoY2xvc2VkTGlzdOaDheWGtVxyXG4gICAgICAgICAgICAgICAgaWYoYXJvdW5kUG9pbnRzW2ldLmlzT2JzdGFjbGV8fHRoaXMuQ29udGFpbih0aGlzLmNsb3NlZExpc3QsYXJvdW5kUG9pbnRzW2ldKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ0Nvc3Q9dGhpcy5DYWxEaXN0YW5jZShjdXJQb2ludCxhcm91bmRQb2ludHNbaV0pK2N1clBvaW50Lkc7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lnKhvcGVuTGlzdOmHjOaIluS4jeWcqFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLkNvbnRhaW4odGhpcy5vcGVuTGlzdCxhcm91bmRQb2ludHNbaV0pIHx8IGdDb3N0PGFyb3VuZFBvaW50c1tpXS5HKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJvdW5kUG9pbnRzW2ldLkc9Z0Nvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyb3VuZFBvaW50c1tpXS5IPXRoaXMuQ2FsRGlzdGFuY2UoYXJvdW5kUG9pbnRzW2ldLHRoaXMuZW5kUG9pbnQpOztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJvdW5kUG9pbnRzW2ldLkY9Z0Nvc3QrYXJvdW5kUG9pbnRzW2ldLkg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyb3VuZFBvaW50c1tpXS5wYXJlbnRQb2ludD1jdXJQb2ludDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLkNvbnRhaW4odGhpcy5vcGVuTGlzdCxhcm91bmRQb2ludHNbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5MaXN0LnB1c2goYXJvdW5kUG9pbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvpfliLDlkajlm7Q05Liq54K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgR2V0QXJvdW5kUG9pbnRzKGN1clBvaW50OiBQb2ludCk6QXJyYXk8UG9pbnQ+XHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGFyb3VuZFBvaW50czpBcnJheTxQb2ludD49bmV3IEFycmF5PFBvaW50PigpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5kaXJBcnIubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB4PWN1clBvaW50LnhJbmRleCArIHRoaXMuZGlyQXJyW2ldWzBdO1xyXG4gICAgICAgICAgICBsZXQgeT1jdXJQb2ludC55SW5kZXggKyB0aGlzLmRpckFycltpXVsxXTtcclxuICAgICAgICAgICAgaWYoeD49MCAmJiB4PHRoaXMubWFwQXJyLmNvbHVtbnMgJiYgeT49MCAmJiB5PHRoaXMubWFwQXJyLnJvd3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFyb3VuZFBvaW50cy5wdXNoKHRoaXMubWFwQXJyLmdldFZhbHVlKHkseCkpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJvdW5kUG9pbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5p+l5pWw57uE5piv5ZCm5YyF5ZCr5YWD57SgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgQ29udGFpbihhcnI6IEFycmF5PFBvaW50Pix0YXJnZXQ6UG9pbnQpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGFyci5sZW5ndGg7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoYXJyW2ldPT10YXJnZXQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW+l+WIsOS4pOS4queCueeahOi3neemu1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIENhbERpc3RhbmNlKHBvaW50XzE6UG9pbnQscG9pbnRfMjpQb2ludCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHBvaW50XzIueEluZGV4LXBvaW50XzEueEluZGV4KStNYXRoLmFicyhwb2ludF8yLnlJbmRleC1wb2ludF8xLnlJbmRleCk7XHJcbiAgICB9ICAgIFxyXG59IiwiaW1wb3J0IFNwcml0ZSA9IExheWEuU3ByaXRlO1xyXG5pbXBvcnQgU3RhZ2UgPSBMYXlhLlN0YWdlO1xyXG5pbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMO1xyXG5cclxuaW1wb3J0IFBvaW50IGZyb20gXCIuL1BvaW50XCI7XHJcbmltcG9ydCBNeTJEQXJyYXkgZnJvbSBcIi4vMkRBcnJheVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlTWFwIHtcclxuICAgIC8v55+p5b2i5a696auYKOWDj+e0oClcclxuICAgIHByaXZhdGUgcmVjdFdpZHRoOm51bWJlcj0xMDtcclxuICAgIHByaXZhdGUgcmVjdEhlaWdodDpudW1iZXI9MTA7XHJcblxyXG4gICAgLy/lnLDlm77lrr3pq5go5qC85pWwKVxyXG4gICAgcHJpdmF0ZSBtYXBXaWR0aDpudW1iZXI9MTAwO1xyXG4gICAgcHJpdmF0ZSBtYXBIZWlnaHQ6bnVtYmVyPTEwMDtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gXHJcbiAgICAvKipcclxuICAgICAqIOeUu+efqeW9oiBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBEcmF3UmVjdCh4UG9zOiBudW1iZXIseVBvczogbnVtYmVyLHJlY3RDb2xvcjpzdHJpbmcpOiBTcHJpdGUgXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHNwOiBTcHJpdGUgPSBuZXcgU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChzcCk7XHJcbiAgICAgICAgc3AuZ3JhcGhpY3MuZHJhd1JlY3QoeFBvcywgeVBvcywgdGhpcy5yZWN0V2lkdGgsdGhpcy5yZWN0SGVpZ2h0LCByZWN0Q29sb3IpOyAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBzcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuWcsOWbvlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRHJhd01hcCgpOiBNeTJEQXJyYXkgLy/lh73mlbDov5Tlm57lgLzmmK/kuIDkuKoyROaVsOe7hFxyXG4gICAge1xyXG4gICAgICAgIGxldCBwb2ludHNBcnI6IE15MkRBcnJheT1uZXcgTXkyREFycmF5KHRoaXMubWFwSGVpZ2h0LHRoaXMubWFwV2lkdGgsbnVsbCk7Ly/kvKDlhaXlnLDlm77pq5jlrr3nmoTmoLzmlbDvvIzmraTml7bkuI3pnIDopoFQb2ludFxyXG4gICAgICAgIC8vbmV3IDEwMDAw5Liq5a+56LGhXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTw9dGhpcy5tYXBXaWR0aC0xO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaj0wO2o8PXRoaXMubWFwSGVpZ2h0LTE7aisrKVxyXG4gICAgICAgICAgICB7ICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcFBvaW50OlBvaW50Oy8v5Yib5bu65LiA5LiqUG9pbnTlr7nosaHnlKjmnaXorrDlvZXmlrnmoLzkv6Hmga8gICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8v5aKZXHJcbiAgICAgICAgICAgICAgICBpZihpJTI9PTB8fGo9PTB8fGo9PXRoaXMubWFwSGVpZ2h0LTEpLy/lgbbmlbDliJfkuI3lj6/pgJrooYxcclxuICAgICAgICAgICAgICAgIHsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wU3ByaXRlOiBTcHJpdGUgPSB0aGlzLkRyYXdSZWN0KGkqdGhpcy5yZWN0V2lkdGgsaip0aGlzLnJlY3RIZWlnaHQsXCIjNDY3NTAwXCIpOyAvL1Nwcml0ZeiDveS9nOS4uuWuueWZqOS9v+eUqO+8jOi/memHjOmdouaUvue7mOWItueahOefqeW9olxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBQb2ludD1uZXcgUG9pbnQoaSxqLHRlbXBTcHJpdGUsdHJ1ZSk7Ly/orrDlvZXlopnnmoTkv6Hmga9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/ot69cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcFNwcml0ZTogU3ByaXRlID0gdGhpcy5EcmF3UmVjdChpKnRoaXMucmVjdFdpZHRoLGoqdGhpcy5yZWN0SGVpZ2h0LFwiI0M0QzQwMFwiKTsgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBQb2ludD1uZXcgUG9pbnQoaSxqLHRlbXBTcHJpdGUsZmFsc2UpOy8v6K6w5b2V6Lev55qE5L+h5oGvXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwb2ludHNBcnIuc2V0VmFsdWUoaixpLHRlbXBQb2ludCk7Ly/nu5nmlbDnu4TlhYPntKDotYvlgLzvvIzmr4/kuIDlnZfnn6nlvaLlnKjkuoznu7TmlbDnu4TkuK3llK/kuIDlr7nlupRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/pmo/mnLrnlJ/miJDpgJrot69cclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmFuZG9tTnVtMTpudW1iZXI9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLm1hcEhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBwb2ludHNBcnIuZ2V0VmFsdWUocmFuZG9tTnVtMSwwKS5zcHJpdGU9dGhpcy5EcmF3UmVjdCgxKnRoaXMucmVjdFdpZHRoLHJhbmRvbU51bTEqdGhpcy5yZWN0SGVpZ2h0LFwiI0ZGRkZGRlwiKTsgICAgIFxyXG4gICAgICAgICAgICBwb2ludHNBcnIuZ2V0VmFsdWUocmFuZG9tTnVtMSwwKS5pc09ic3RhY2xlPWZhbHNlOyAgIFxyXG4gICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5tYXBXaWR0aDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcmFuZG9tTnVtMDpudW1iZXI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGs9MDtrPDE3O2srKyl7Ly/mr4/kuKrlopnkuIrlvIAxN+asoemAmui3r1xyXG4gICAgICAgICAgICBpZihpJTI9PTAmJmk+MCl7XHJcbiAgICAgICAgICAgICAgICByYW5kb21OdW0wID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMubWFwSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGlmKHJhbmRvbU51bTA9PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tTnVtMCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYocmFuZG9tTnVtMD09dGhpcy5tYXBIZWlnaHQtMSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb21OdW0wLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwb2ludHNBcnIuZ2V0VmFsdWUocmFuZG9tTnVtMCxpKS5zcHJpdGU9dGhpcy5EcmF3UmVjdChpKnRoaXMucmVjdFdpZHRoLHJhbmRvbU51bTAqdGhpcy5yZWN0SGVpZ2h0LFwiI0ZGRkZGRlwiKTsgICAgIFxyXG4gICAgICAgICAgICAgICAgcG9pbnRzQXJyLmdldFZhbHVlKHJhbmRvbU51bTAsaSkuaXNPYnN0YWNsZT1mYWxzZTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcG9pbnRzQXJyO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vc2NyaXB0L0dhbWVVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbCBmcm9tIFwiLi9zY3JpcHQvR2FtZUNvbnRyb2xcIlxyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL3NjcmlwdC9CdWxsZXRcIlxyXG5pbXBvcnQgRHJvcEJveCBmcm9tIFwiLi9zY3JpcHQvRHJvcEJveFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJ0ZXN0L1Rlc3RTY2VuZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L0dhbWVVSS50c1wiLEdhbWVVSSk7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L0dhbWVDb250cm9sLnRzXCIsR2FtZUNvbnRyb2wpO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9CdWxsZXQudHNcIixCdWxsZXQpO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9Ecm9wQm94LnRzXCIsRHJvcEJveCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgTXkyREFycmF5IGZyb20gXCIuLzJEQXJyYXlcIjtcclxuaW1wb3J0IFBvaW50IGZyb20gXCIuL1BvaW50XCI7XHJcbmltcG9ydCBDcmVhdGVNYXAgZnJvbSBcIi4vQ3JlYXRlTWFwXCI7XHJcbmltcG9ydCBBU3RhciBmcm9tIFwiLi9BU3RhclwiO1xyXG5pbXBvcnQgU3ByaXRlID0gTGF5YS5TcHJpdGU7XHJcblxyXG5jbGFzcyBNYWluIHtcclxuXHRcdC8qKlxyXG4gICAgICog55S755+p5b2i5pa55rOVXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgRHJhd1JlY3QoeFBvczogbnVtYmVyLHlQb3M6IG51bWJlcixyZWN0Q29sb3I6c3RyaW5nKTogU3ByaXRlIFxyXG4gICAge1xyXG4gICAgICAgIGxldCBzcDogU3ByaXRlID0gbmV3IFNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoc3ApO1xyXG4gICAgICAgIHNwLmdyYXBoaWNzLmRyYXdSZWN0KHhQb3MsIHlQb3MsIDEwLDEwLCByZWN0Q29sb3IpOyAgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBzcDtcclxuICAgIH1cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3pobnnm67liJ3lp4vljJbpg6jliIYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5hbGlnblYgPSBHYW1lQ29uZmlnLmFsaWduVjtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25IID0gR2FtZUNvbmZpZy5hbGlnbkg7XHJcblx0XHRMYXlhLnN0YWdlLmJnQ29sb3I9XCIjQzZFMkZGXCI7XHJcblx0XHQvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcblx0XHRMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG5cdFx0Ly/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcblx0XHRpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLemhueebruWIneWni+WMlumDqOWIhi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcclxuXHJcblx0XHQvL+WIm+W7uuWcsOWbvlxyXG5cdFx0bGV0IHBvaW50c0FycjogTXkyREFycmF5ID1uZXcgQ3JlYXRlTWFwKCkuRHJhd01hcCgpO1xyXG5cdFx0XHJcblx0XHQvL+i3r+W+hOafpeaJvlxyXG5cdFx0bGV0IG9wZW5MaXN0OiBQb2ludDsvL+WIneWni+WMlm9wZW5MaXN055qE6IqC54K5XHJcblx0XHRsZXQgY2xvc2VkTGlzdDogUG9pbnQ7Ly/liJ3lp4vljJZjbG9zZWRMaXN055qE6IqC54K5XHJcblxyXG5cdFx0Zm9yKGxldCBpPTA7aTxwb2ludHNBcnIucm93cztpKyspXHJcblx0XHR7XHJcblx0XHRcdGlmKHBvaW50c0Fyci5nZXRWYWx1ZShpLDApLmlzT2JzdGFjbGU9PWZhbHNlKS8v5qOA5p+l5q+P5LiA5YiX5LiK55qE6YCa6LevXHJcblx0XHRcdHtcclxuXHRcdFx0XHRvcGVuTGlzdD1wb2ludHNBcnIuZ2V0VmFsdWUoaSwwKTsvL+aKiumAmui3r+WKoOWIsG9wZW5MaXN06YeM6Z2iXHJcblx0XHRcdH1cclxuXHRcdFx0aWYocG9pbnRzQXJyLmdldFZhbHVlKGkscG9pbnRzQXJyLmNvbHVtbnMtMSkuaXNPYnN0YWNsZT09ZmFsc2UpLy/mo4Dmn6Xmr4/kuIDooYzkuIrnmoTpgJrot69cclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNsb3NlZExpc3Q9cG9pbnRzQXJyLmdldFZhbHVlKGkscG9pbnRzQXJyLmNvbHVtbnMtMSk7Ly/miormr4/kuIDliJfkuIrnmoTpgJrot6/liqDliLBjbG9zZUxpc3Tph4zpnaJcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHRcdGxldCBhU3RhcjpBU3Rhcj1uZXcgQVN0YXIob3Blbkxpc3QsY2xvc2VkTGlzdCxwb2ludHNBcnIpOy8vbmV35LiA5LiqQSrlr7nosaHlubbmiopvcGVuTGlzdOWSjGNsb3NlZExpc3Tku6Xlj4rlnLDlm77lgLzkvKDnu5nor6Xlr7nosaFcclxuXHRcdGxldCByZXNQb2ludD1hU3Rhci5GaW5kUGF0aCgpOy8v6LCD55SoQSrlr7vot69cclxuXHJcblx0XHR3aGlsZShyZXNQb2ludCE9bnVsbCkvL+e7mei3r+W+hOWhq+iJslxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLkRyYXdSZWN0KHJlc1BvaW50LnhJbmRleCoxMCxyZXNQb2ludC55SW5kZXgqMTAsXCIjQjc2NkFEXCIpXHJcblx0XHRcdHJlc1BvaW50PXJlc1BvaW50LnBhcmVudFBvaW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpOyIsIi8vUG9pbnTlrprkuYnkuLrkuIDkuKrnlKjmnaXorrDlvZXmlrnmoLzlhbPplK7kv6Hmga/nmoTnsbtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnQgXHJcbnsgICAgXHJcbiAgICBwdWJsaWMgeEluZGV4Om51bWJlcjsvL+aWueagvOeahHjlnZDmoIdcclxuICAgIHB1YmxpYyB5SW5kZXg6bnVtYmVyOy8v5pa55qC855qEeeWdkOagh1xyXG5cclxuICAgIHB1YmxpYyBGOm51bWJlcj0wOy8vQSrnrpfms5XnmoRG5YC877yM6buY6K6k5YC85Li6MFxyXG4gICAgcHVibGljIEc6bnVtYmVyPTA7Ly9BKueul+azleeahEflgLzvvIzpu5jorqTlgLzkuLowXHJcbiAgICBwdWJsaWMgSDpudW1iZXI9MDsvL0Eq566X5rOV55qESOWAvO+8jOm7mOiupOWAvOS4ujBcclxuXHJcbiAgICBwdWJsaWMgcGFyZW50UG9pbnQ6UG9pbnQ9bnVsbDsvL1BvaW5055qE54i26IqC54K577yM6buY6K6k5YC85Li6bnVsbFxyXG4gICAgcHVibGljIGlzT2JzdGFjbGU6Ym9vbGVhbj1mYWxzZTsvL+aWueagvOaYr+S4jeaYr+manOeijeeJqe+8jOm7mOiupOWAvOS4umZhbHNlXHJcblxyXG4gICAgcHVibGljIHNwcml0ZTpMYXlhLlNwcml0ZT1udWxsOy8vU3ByaXRlIOaYr+WfuuacrOeahOaYvuekuuWbvuW9oueahOaYvuekuuWIl+ihqOiKgueCue+8jCBTcHJpdGUg6buY6K6k5rKh5pyJ5a696auY77yM6buY6K6k5LiN5o6l5Y+X6byg5qCH5LqL5Lu277yM5Lmf5piv5LiA5Liq5a655Zmo57G7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHhJbmRleDpudW1iZXIsIHlJbmRleDpudW1iZXIsIHNwcml0ZTpMYXlhLlNwcml0ZSxpc09ic3RhY2xlOmJvb2xlYW4pIFxyXG4gICAgeyAgXHJcbiAgICAgICAgLy/ku6XkuIvmmK/liJ3lp4vljJbov4fnqItcclxuICAgICAgICB0aGlzLnhJbmRleD14SW5kZXg7XHJcbiAgICAgICAgdGhpcy55SW5kZXg9eUluZGV4O1xyXG4gICAgICAgIHRoaXMuc3ByaXRlPXNwcml0ZTtcclxuICAgICAgICB0aGlzLmlzT2JzdGFjbGU9aXNPYnN0YWNsZTtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiDlrZDlvLnohJrmnKzvvIzlrp7njrDlrZDlvLnpo57ooYzpgLvovpHlj4rlr7nosaHmsaDlm57mlLbmnLrliLZcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy/orr7nva7liJ3lp4vpgJ/luqZcclxuICAgICAgICB2YXIgcmlnOiBMYXlhLlJpZ2lkQm9keSA9IHRoaXMub3duZXIuZ2V0Q29tcG9uZW50KExheWEuUmlnaWRCb2R5KTtcclxuICAgICAgICByaWcuc2V0VmVsb2NpdHkoeyB4OiAwLCB5OiAtMTAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UcmlnZ2VyRW50ZXIob3RoZXI6IGFueSwgc2VsZjogYW55LCBjb250YWN0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL+WmguaenOiiq+eisOWIsO+8jOWImeenu+mZpOWtkOW8uVxyXG4gICAgICAgIHRoaXMub3duZXIucmVtb3ZlU2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIC8v5aaC5p6c5a2Q5by56LaF5Ye65bGP5bmV77yM5YiZ56e76Zmk5a2Q5by5XHJcbiAgICAgICAgaWYgKCh0aGlzLm93bmVyIGFzIExheWEuU3ByaXRlKS55IDwgLTEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3duZXIucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy/lrZDlvLnooqvnp7vpmaTml7bvvIzlm57mlLblrZDlvLnliLDlr7nosaHmsaDvvIzmlrnkvr/kuIvmrKHlpI3nlKjvvIzlh4/lsJHlr7nosaHliJvlu7rlvIDplIBcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcImJ1bGxldFwiLCB0aGlzLm93bmVyKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lVUkgZnJvbSBcIi4vR2FtZVVJXCI7XHJcbi8qKlxyXG4gKiDmjonokL3nm5LlrZDohJrmnKzvvIzlrp7njrDnm5LlrZDnorDmkp7lj4rlm57mlLbmtYHnqItcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3BCb3ggZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcbiAgICAvKirnm5LlrZDnrYnnuqcgKi9cclxuICAgIGxldmVsOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq562J57qn5paH5pys5a+56LGh5byV55SoICovXHJcbiAgICBwcml2YXRlIF90ZXh0OiBMYXlhLlRleHQ7XHJcbiAgICAvKirliJrkvZPlr7nosaHlvJXnlKggKi9cclxuICAgIHByaXZhdGUgX3JpZzogTGF5YS5SaWdpZEJvZHlcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLyoq6I635b6X57uE5Lu25byV55So77yM6YG/5YWN5q+P5qyh6I635Y+W57uE5Lu25bim5p2l5LiN5b+F6KaB55qE5p+l6K+i5byA6ZSAICovXHJcbiAgICAgICAgdGhpcy5fcmlnID0gdGhpcy5vd25lci5nZXRDb21wb25lbnQoTGF5YS5SaWdpZEJvZHkpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA1KSArIDE7XHJcbiAgICAgICAgdGhpcy5fdGV4dCA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFR4dFwiKSBhcyBMYXlhLlRleHQ7XHJcbiAgICAgICAgdGhpcy5fdGV4dC50ZXh0ID0gdGhpcy5sZXZlbCArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy/orqnmjIHnu63nm5LlrZDml4vovaxcclxuICAgICAgICAodGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZSkucm90YXRpb24rKztcclxuICAgIH1cclxuXHJcbiAgICBvblRyaWdnZXJFbnRlcihvdGhlcjogYW55LCBzZWxmOiBhbnksIGNvbnRhY3Q6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHZhciBvd25lcjogTGF5YS5TcHJpdGUgPSB0aGlzLm93bmVyIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIGlmIChvdGhlci5sYWJlbCA9PT0gXCJidXR0bGVcIikge1xyXG4gICAgICAgICAgICAvL+eisOaSnuWIsOWtkOW8ueWQju+8jOWinuWKoOenr+WIhu+8jOaSreaUvuWjsOmfs+eJueaViFxyXG4gICAgICAgICAgICBpZiAodGhpcy5sZXZlbCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwtLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RleHQuY2hhbmdlVGV4dCh0aGlzLmxldmVsICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBvd25lci5nZXRDb21wb25lbnQoTGF5YS5SaWdpZEJvZHkpLnNldFZlbG9jaXR5KHsgeDogMCwgeTogLTEwIH0pO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvaGl0LndhdlwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChvd25lci5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWZmZWN0OiBMYXlhLkFuaW1hdGlvbiA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oXCJlZmZlY3RcIiwgdGhpcy5jcmVhdGVFZmZlY3QsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdC5wb3Mob3duZXIueCwgb3duZXIueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3duZXIucGFyZW50LmFkZENoaWxkKGVmZmVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnBsYXkoMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3duZXIucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2Rlc3Ryb3kud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVVSS5pbnN0YW5jZS5hZGRTY29yZSgxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG90aGVyLmxhYmVsID09PSBcImdyb3VuZFwiKSB7XHJcbiAgICAgICAgICAgIC8v5Y+q6KaB5pyJ5LiA5Liq55uS5a2Q56Kw5Yiw5Zyw5p2/77yM5YiZ5YGc5q2i5ri45oiPXHJcbiAgICAgICAgICAgIG93bmVyLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgR2FtZVVJLmluc3RhbmNlLnN0b3BHYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuS9v+eUqOWvueixoeaxoOWIm+W7uueIhueCuOWKqOeUuyAqL1xyXG4gICAgY3JlYXRlRWZmZWN0KCk6IExheWEuQW5pbWF0aW9uIHtcclxuICAgICAgICBsZXQgYW5pOiBMYXlhLkFuaW1hdGlvbiA9IG5ldyBMYXlhLkFuaW1hdGlvbigpO1xyXG4gICAgICAgIGFuaS5sb2FkQW5pbWF0aW9uKFwidGVzdC9UZXN0QW5pLmFuaVwiKTtcclxuICAgICAgICBhbmkub24oTGF5YS5FdmVudC5DT01QTEVURSwgbnVsbCwgcmVjb3Zlcik7XHJcbiAgICAgICAgZnVuY3Rpb24gcmVjb3ZlcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgYW5pLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoXCJlZmZlY3RcIiwgYW5pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFuaTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgLy/nm5LlrZDooqvnp7vpmaTml7bvvIzlm57mlLbnm5LlrZDliLDlr7nosaHmsaDvvIzmlrnkvr/kuIvmrKHlpI3nlKjvvIzlh4/lsJHlr7nosaHliJvlu7rlvIDplIDjgIJcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcImRyb3BCb3hcIiwgdGhpcy5vd25lcik7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IERyb3BCb3ggZnJvbSBcIi4vRHJvcEJveFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG4vKipcclxuICog5ri45oiP5o6n5Yi26ISa5pys44CC5a6a5LmJ5LqG5Yeg5LiqZHJvcEJveO+8jGJ1bGxldO+8jGNyZWF0ZUJveEludGVydmFs562J5Y+Y6YeP77yM6IO95aSf5ZyoSURF5pi+56S65Y+K6K6+572u6K+l5Y+Y6YePXHJcbiAqIOabtOWkmuexu+Wei+WumuS5ie+8jOivt+WPguiAg+WumOaWueaWh+aho1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbnRyb2wgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcbiAgICAvKiogQHByb3Age25hbWU6ZHJvcEJveCx0aXBzOlwi5o6J6JC95a655Zmo6aKE5Yi25L2T5a+56LGhXCIsdHlwZTpQcmVmYWJ9Ki9cclxuICAgIGRyb3BCb3g6IExheWEuUHJlZmFiO1xyXG4gICAgLyoqIEBwcm9wIHtuYW1lOmJ1bGxldCx0aXBzOlwi5a2Q5by56aKE5Yi25L2T5a+56LGhXCIsdHlwZTpQcmVmYWJ9Ki9cclxuICAgIGJ1bGxldDogTGF5YS5QcmVmYWI7XHJcbiAgICAvKiogQHByb3Age25hbWU6Y3JlYXRlQm94SW50ZXJ2YWwsdGlwczpcIumXtOmalOWkmuWwkeavq+enkuWIm+W7uuS4gOS4quS4i+i3jOeahOWuueWZqFwiLHR5cGU6aW50LGRlZmF1bHQ6MTAwMH0qL1xyXG4gICAgY3JlYXRlQm94SW50ZXJ2YWw6IG51bWJlciA9IDEwMDA7XHJcbiAgICAvKirlvIDlp4vml7bpl7QqL1xyXG4gICAgcHJpdmF0ZSBfdGltZTogbnVtYmVyID0gMDtcclxuICAgIC8qKuaYr+WQpuW3sue7j+W8gOWni+a4uOaIjyAqL1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5a2Q5by55ZKM55uS5a2Q5omA5Zyo55qE5a655Zmo5a+56LGhICovXHJcbiAgICBwcml2YXRlIF9nYW1lQm94OiBMYXlhLlNwcml0ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuX2dhbWVCb3ggPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiZ2FtZUJveFwiKSBhcyBMYXlhLlNwcml0ZTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAvL+avj+mXtOmalOS4gOauteaXtumXtOWIm+W7uuS4gOS4quebkuWtkFxyXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChub3cgLSB0aGlzLl90aW1lID4gdGhpcy5jcmVhdGVCb3hJbnRlcnZhbCYmdGhpcy5fc3RhcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gbm93O1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJveCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCb3goKTogdm9pZCB7XHJcbiAgICAgICAgLy/kvb/nlKjlr7nosaHmsaDliJvlu7rnm5LlrZBcclxuICAgICAgICBsZXQgYm94OiBMYXlhLlNwcml0ZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oXCJkcm9wQm94XCIsIHRoaXMuZHJvcEJveC5jcmVhdGUsIHRoaXMuZHJvcEJveCk7XHJcbiAgICAgICAgYm94LnBvcyhNYXRoLnJhbmRvbSgpICogKExheWEuc3RhZ2Uud2lkdGggLSAxMDApLCAtMTAwKTtcclxuICAgICAgICB0aGlzLl9nYW1lQm94LmFkZENoaWxkKGJveCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFnZUNsaWNrKGU6IExheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICAvL+WBnOatouS6i+S7tuWGkuazoe+8jOaPkOmrmOaAp+iDve+8jOW9k+eEtuS5n+WPr+S7peS4jeimgVxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgLy/oiJ7lj7Dooqvngrnlh7vlkI7vvIzkvb/nlKjlr7nosaHmsaDliJvlu7rlrZDlvLlcclxuICAgICAgICBsZXQgZmx5ZXI6IExheWEuU3ByaXRlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNyZWF0ZUZ1bihcImJ1bGxldFwiLCB0aGlzLmJ1bGxldC5jcmVhdGUsIHRoaXMuYnVsbGV0KTtcclxuICAgICAgICBmbHllci5wb3MoTGF5YS5zdGFnZS5tb3VzZVgsIExheWEuc3RhZ2UubW91c2VZKTtcclxuICAgICAgICB0aGlzLl9nYW1lQm94LmFkZENoaWxkKGZseWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlvIDlp4vmuLjmiI/vvIzpgJrov4fmv4DmtLvmnKzohJrmnKzmlrnlvI/lvIDlp4vmuLjmiI8qL1xyXG4gICAgc3RhcnRHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fc3RhcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq57uT5p2f5ri45oiP77yM6YCa6L+H6Z2e5r+A5rS75pys6ISa5pys5YGc5q2i5ri45oiPICovXHJcbiAgICBzdG9wR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVCb3hJbnRlcnZhbCA9IDEwMDA7XHJcbiAgICAgICAgdGhpcy5fZ2FtZUJveC5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEdhbWVDb250cm9sIGZyb20gXCIuL0dhbWVDb250cm9sXCJcclxuLyoqXHJcbiAqIOacrOekuuS+i+mHh+eUqOmdnuiEmuacrOeahOaWueW8j+WunueOsO+8jOiAjOS9v+eUqOe7p+aJv+mhtemdouWfuuexu++8jOWunueOsOmhtemdoumAu+i+keOAguWcqElERemHjOmdouiuvue9ruWcuuaZr+eahFJ1bnRpbWXlsZ7mgKfljbPlj6/lkozlnLrmma/ov5vooYzlhbPogZRcclxuICog55u45q+U6ISa5pys5pa55byP77yM57un5om/5byP6aG16Z2i57G777yM5Y+v5Lul55u05o6l5L2/55So6aG16Z2i5a6a5LmJ55qE5bGe5oCn77yI6YCa6L+HSURF5YaFdmFy5bGe5oCn5a6a5LmJ77yJ77yM5q+U5aaCdGhpcy50aXBMYmxs77yMdGhpcy5zY29yZUxibO+8jOWFt+acieS7o+eggeaPkOekuuaViOaenFxyXG4gKiDlu7rorq7vvJrlpoLmnpzmmK/pobXpnaLnuqfnmoTpgLvovpHvvIzpnIDopoHpopHnuYHorr/pl67pobXpnaLlhoXlpJrkuKrlhYPntKDvvIzkvb/nlKjnu6fmib/lvI/lhpnms5XvvIzlpoLmnpzmmK/ni6znq4vlsI/mqKHlnZfvvIzlip/og73ljZXkuIDvvIzlu7rorq7nlKjohJrmnKzmlrnlvI/lrp7njrDvvIzmr5TlpoLlrZDlvLnohJrmnKzjgIJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIHVpLnRlc3QuVGVzdFNjZW5lVUkge1xyXG4gICAgLyoq6K6+572u5Y2V5L6L55qE5byV55So5pa55byP77yM5pa55L6/5YW25LuW57G75byV55SoICovXHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6IEdhbWVVSTtcclxuICAgIC8qKuW9k+WJjea4uOaIj+enr+WIhuWtl+autSAqL1xyXG4gICAgcHJpdmF0ZSBfc2NvcmU6IG51bWJlcjtcclxuICAgIC8qKua4uOaIj+aOp+WItuiEmuacrOW8leeUqO+8jOmBv+WFjeavj+asoeiOt+WPlue7hOS7tuW4puadpeS4jeW/heimgeeahOaAp+iDveW8gOmUgCAqL1xyXG4gICAgcHJpdmF0ZSBfY29udHJvbDogR2FtZUNvbnRyb2w7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBHYW1lVUkuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIC8v5YWz6Zet5aSa54K56Kem5o6n77yM5ZCm5YiZ5bCx5peg5pWM5LqGXHJcbiAgICAgICAgTGF5YS5Nb3VzZU1hbmFnZXIubXVsdGlUb3VjaEVuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb250cm9sID0gdGhpcy5nZXRDb21wb25lbnQoR2FtZUNvbnRyb2wpO1xyXG4gICAgICAgIC8v54K55Ye75o+Q56S65paH5a2X77yM5byA5aeL5ri45oiPXHJcbiAgICAgICAgdGhpcy50aXBMYmxsLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25UaXBDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UaXBDbGljayhlOiBMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aXBMYmxsLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zY29yZSA9IDA7XHJcbiAgICAgICAgdGhpcy5zY29yZUxibC50ZXh0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9jb250cm9sLnN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWinuWKoOWIhuaVsCAqL1xyXG4gICAgYWRkU2NvcmUodmFsdWU6IG51bWJlciA9IDEpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zY29yZSArPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNjb3JlTGJsLmNoYW5nZVRleHQoXCLliIbmlbDvvJpcIiArIHRoaXMuX3Njb3JlKTtcclxuICAgICAgICAvL+maj+edgOWIhuaVsOi2iumrmO+8jOmavuW6puWinuWkp1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250cm9sLmNyZWF0ZUJveEludGVydmFsID4gNjAwICYmIHRoaXMuX3Njb3JlICUgMjAgPT0gMCkgdGhpcy5fY29udHJvbC5jcmVhdGVCb3hJbnRlcnZhbCAtPSAyMDtcclxuICAgIH1cclxuXHJcbiAgICAvKirlgZzmraLmuLjmiI8gKi9cclxuICAgIHN0b3BHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGlwTGJsbC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpcExibGwudGV4dCA9IFwi5ri45oiP57uT5p2f5LqG77yM54K55Ye75bGP5bmV6YeN5paw5byA5aeLXCI7XHJcbiAgICAgICAgdGhpcy5fY29udHJvbC5zdG9wR2FtZSgpO1xyXG4gICAgfVxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xudmFyIFJFRzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XG5leHBvcnQgbW9kdWxlIHVpLnRlc3Qge1xyXG4gICAgZXhwb3J0IGNsYXNzIFRlc3RTY2VuZVVJIGV4dGVuZHMgU2NlbmUge1xyXG5cdFx0cHVibGljIHNjb3JlTGJsOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIHRpcExibGw6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcInRlc3QvVGVzdFNjZW5lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnRlc3QuVGVzdFNjZW5lVUlcIixUZXN0U2NlbmVVSSk7XHJcbn1cciJdfQ==
