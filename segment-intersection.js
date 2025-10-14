const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const A = {x:200, y:150};
const B = {x:150, y:250};
const C = {x:50, y:100};
const D = {x:250, y:200};

const ctx = canvas.getContext("2d");

let angle = 0;
const mouse = {x:0,y:0 };
document.onmousemove=(event)=>{ //This sets up an event listener that runs every time you move your mouse anywhere on the page.
    mouse.x=event.x;
    mouse.y=event.y;
    // storing mouse coordinates inside an object called mouse
}

let t= -1;
animate();
function animate(){ 
    const radius = 50;
    A.x = mouse.x 
    A.y = mouse.y - radius 
    B.x = mouse.x + radius 
    B.y = mouse.y  

    //const angle = getAngle(A,B) // me messing around
    // A.x = mouse.x + radius * Math.cos(angle);
    // A.y = mouse.y - radius * Math.sin(angle);
    // B.x = mouse.x - radius * Math.cos(angle);
    // B.y = mouse.y + radius * Math.sin(angle);
    //angle = angle + 0.02

    

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
    if(I){
    drawPoint(I,"I",t<0 || t>1)
    }
    ctx.beginPath()
    ctx.fill()
    requestAnimationFrame(animate);
}   
// function getAngle(A,B){ ///this is just me messing around
//     if(B.x-A.x){
//         return 90;
//     }
//     else{
//         const slope = (B.y-A.y)/(B.x-A.x)
//         const angle = Math.atan(slope)
//         return angle 
//     }


function getIntersection(A,B,C,D){
    const tTop = (A.y-C.y)*(D.x-C.x)  - (D.y-C.y)*(A.x-C.x);
    const bottom = (D.y-C.y)*(B.x-A.x) - (B.y-A.y)*(D.x-C.x);
    const uTop = (C.y-A.y)*(A.x-B.x) -(C.x-A.x)*(A.y-B.y)
    

    //!!!! here the bottom is the 2D cross product of (B-A){line AB} and (D-C) {line CD}!!!
    //!!this is why we check bottom = 0 or not because is cross product is 0 that means sine is 0 and it means they are parallel and they have no intersection point
    if(bottom!=0){
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
        return {
            x : lerp(A.x,B.x,t),    
            y : lerp(A.y,B.y,t),
            offset : t
        }
    }
    return null
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