const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight; 
canvas.width = 400;

const ctx = canvas.getContext("2d")
const car = new Car(100,100,30,50)
car.draw(ctx);


animate();

function animate(){
    car.update()
    canvas.height = window.innerHeight
    car.draw(ctx)   
    requestAnimationFrame(animate)
}