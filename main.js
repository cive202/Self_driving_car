const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight;
canvas.width = 200;


const ctx = canvas.getContext("2d");
// getContex("2d") returns a class which has all the 2d drawing tools
const road = new Road (canvas.width/2,canvas.width)
const car = new Car(road.getLaneCenter(1),100,30,50);

animate();  

function animate(){
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}



