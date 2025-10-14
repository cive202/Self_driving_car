const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const A = {x:200, y:150};
const B = {x:150, y:250};
const C = {x:50, y:100};
const D = {x:250, y:200};

const ctx = canvas.getContext("2d");

const mouse = {x:0,y:0 };
document.onmousemove=(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
}

let t= -1;
animate();
function animate(){ 
    const radius = 50 
    ctx.clearRect(0,0,canvas.width,canvas.height) //the last two parameters are the area where the rectangles will be clear

    ctx.beginPath();
    ctx.moveTo(A.x,A.y);
    ctx.lineTo(B.x,B.y);
    ctx.moveTo(C.x,C.y);
    ctx.lineTo(D.x,D.y);
    ctx.stroke();

    drawPoint(A,"A");
    drawPoint(B,"B");
    drawPoint(C,"C");
    drawPoint(D,"D");

    
    // const M ={
    //     x:lerp(A.x,B.x,t),    
    //     y:lerp(A.y,B.y,t)
    // }
    // const N ={
    //     x:lerp(C.x,D.x,t),    
    //     y:lerp(C.y,D.y,t)
    // }

    //drawPoint(M,"M", t<0 || t>1)   
    //drawPoint(N,"N", t<0 || t>1)  

    const I = getIntersection(A,B,C,D)
    drawPoint(I,"I",t<0 || t>1)
    t+=0.005;   
    requestAnimationFrame(animate);
}   

function getIntersection(A,B,C,D){
    const top = (A.y-C.y)*(D.x-C.x)  - (D.y-C.y)*(A.x-C.x);
    const bottom = (D.y-C.y)*(B.x-A.x) - (B.y-A.y)*(D.x-C.x);

    const t = top/bottom;
console.log(t)
    return {
        x : lerp(A.x,B.x,t),
        y : lerp(A.y,B.y,t)
    }
}

function lerp(A,B,t){
    return A+(B-A)*t;
}


function drawPoint(point,label, isRed){
    ctx.beginPath()
    ctx.fillStyle ="white" //ctx.fillStyle = isRed? "red":"white"
    ctx.arc(point.x,point.y,10,0,Math.PI*2)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle= "black"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "bold 14px Arial"
    ctx.fillText(label,point.x,point.y)
}