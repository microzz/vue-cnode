var star = document.getElementById('star');
var context = star.getContext("2d"); // 获得绘图上下文
var point = 70; // 初始圆点的数量
var circleArr = [];

//画布的相关设定
star.width = window.innerWidth;
star.height = window.innerHeight;

// 画圆
function drawCircle (x, y, r, changeX, changeY) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "rgba(255,255,255,.5)";
    context.fill();

    return {x: x, y: y, r: r, changeX: changeX, changeY: changeY};
}

//画线
function drawLine (x, y, _x, _y, o) {
    context.moveTo(x, y);   // 起始点
    context.lineTo(_x, _y); // 终点
    context.strokeStyle = "rgba(240, 240, 240, " + o + ")";
    context.strokeWidth = 1;
    context.stroke();
}

//产生 b(b不存在时为0) 到 a 随机数
function generateNum (a, b) {
   // b = arguments[1] || 0;
    //return Math.ceil(Math.random() * (a - b)) + b;
    var b = arguments[1] || 0;
return Math.floor(Math.random()*(a-b+1)+b);
}

//绘制所有圆点
function init () {
    for (var i = 0; i < point; i++) {
        //画圆,并存储其坐标
        circleArr[i] = drawCircle(generateNum(star.width), generateNum(star.height), generateNum(4, 2), generateNum(10, -10) / 5, generateNum(10, -10) / 5);
    }
}
init();

//帧动画
function control () {
    context.clearRect(0,0,star.width, star.height);//初始化画布

     for (var i = 0; i < point; i++) {
         var x = circleArr[i]["x"] + circleArr[i]["changeX"];
         var y = circleArr[i]["y"] + circleArr[i]["changeY"];
         var r = circleArr[i]["r"];
         var changeX = circleArr[i]["changeX"];
         var changeY = circleArr[i]["changeY"];
         if (x > star.width) {
             x = 0;
         } else if (x < 0) {
             x = star.width;
         }
         if (y > star.height) {
             y = 0;
         } else if (y < 0) {
             y = star.height;
         }
        //画圆,并存储其坐标
        circleArr[i] = drawCircle(x, y, r, changeX, changeY);
    }

    //连线
    for (var j = 0; j < point; j++) {
        for (var k = j + 1; k < point; k++) {
            //计算两点间的距离
            var a = circleArr[j]["x"] - circleArr[k]["x"];
            var b = circleArr[j]["y"] - circleArr[k]["y"];
            var lineLength = Math.sqrt(a*a + b*b);
            //画线
            var x = circleArr[j]["x"],
                ifLine = star.width / 8,
                y = circleArr[j]["y"],
                _x = circleArr[k]["x"],
                _y = circleArr[k]["y"];

            if (lineLength < ifLine) {
                o = (lineLength / ifLine) / 200;
                drawLine(x, y, _x, _y, o);
            }
        }
    }

    setTimeout(arguments.callee, 115);
    //requestID = window.requestAnimationFrame(control);
}
//requestID = window.requestAnimationFrame(control);
control();

//鼠标滑动效果
function moveAni (e) {
    var x = e.offsetX;
    var y = e.offsetY;

    drawCircle(x, y, 2);
    for (var i = 0; i < point; i++) {
        //计算两点间的距离
        var a = circleArr[i]["x"] - x;
        var b = circleArr[i]["y"] - y;
        var lineLength = Math.sqrt(a*a + b*b);
        //连线
        var ifLine = ifLine = star.width / 8,
            _x = circleArr[i]["x"],
            _y = circleArr[i]["y"];

        if (lineLength < ifLine) {
            o = 0.1;
            drawLine(x, y, _x, _y, o);
        }

    }
};
console.log("%c Powered by Zhaohui - microzz.com(＾_＾)","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #3bfc31), color-stop(0.15, #00695C), color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;");
star.onmousemove = moveAni;
// star.onmouseover = moveAni;
