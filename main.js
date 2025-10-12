const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight;
canvas.width = 200;


const ctx = canvas.getContext("2d");
// getContex("2d") returns a class which has all the 2d drawing tools
const road = new Road (canvas.width/2,canvas.width*0.9)
const car = new Car(road.getLaneCenter(1),100,30,50);

animate();  

function animate(){
    car.update();
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7)
    road.draw(ctx);
    car.draw(ctx);
    ctx.restore()
    requestAnimationFrame(animate);
}



