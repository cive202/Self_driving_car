const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=400;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);

const N = 1
const cars  =generateCars(N);
let bestCar = cars[0]

if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
     cars[i].brain = JSON.parse(
        localStorage.getItem("bestBrain"))
    if(i!=0){
        NeuralNetwork.mutate(cars[i].brain,0.2);
    }
    }
}
const traffic = [
    // 🔹 Early confusion: blocked center, open sides
    new Car(road.getLaneCenter(1), -150, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -350, 30, 50, "DUMMY", 2),

    // 🔹 Zig-zag cluster
    new Car(road.getLaneCenter(2), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -650, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -750, 30, 50, "DUMMY", 2),

    // 🔹 Lane traps (forcing quick turns)
    new Car(road.getLaneCenter(0), -950, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -950, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -1200, 30, 50, "DUMMY", 2),

    new Car(road.getLaneCenter(0), -1450, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -1470, 30, 50, "DUMMY", 2),
// Move the car in lane 2 a bit further down
    new Car(road.getLaneCenter(2), -1600, 30, 50, "DUMMY", 2),


    // 🔹 Narrow escape zone
    new Car(road.getLaneCenter(1), -1800, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -2000, 30, 50, "DUMMY", 2),

    // 🔹 Sneaky same-lane blockers
    new Car(road.getLaneCenter(1), -2200, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -2300, 30, 50, "DUMMY", 2),

    // 🔹 Alternating pattern again
    new Car(road.getLaneCenter(0), -2500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -2700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -2950, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -3200, 30, 50, "DUMMY", 2),

    // 🔹 Deep tunnel challenge (tight cluster)
    new Car(road.getLaneCenter(0), -3500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -3510, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -3600, 30, 50, "DUMMY", 2),
];


animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain)
    )
}

function discard(){
    localStorage.removeItem("bestBrain")
}
function generateCars(N){
    const cars = []

    for(let i=0;i<N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"))
    }
    return cars
}

function animate(){

    for(let i =0; i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    bestCar = cars.find(
        c=>c.y == Math.min(
            ...cars.map(c=>c.y)
        )
    )

    for(let i=0;i<cars.length;i++){
    cars[i].update(road.borders,traffic);
    }
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;


    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    

    road.draw(carCtx);
    for(let i =0; i<traffic.length;i++){
        traffic[i].draw(carCtx)    
        
    }
    carCtx.globalAlpha = 0.2    
    for(let i=0;i<cars.length;i++){

    cars[i].draw(carCtx);
    }
    carCtx.globalAlpha = 1
    bestCar.draw(carCtx,true);
    
    Visualizer.drawNetwork(networkCtx,bestCar.brain)

    carCtx.restore();
    requestAnimationFrame(animate);
}       