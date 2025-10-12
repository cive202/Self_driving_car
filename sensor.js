class Sensor {
    constructor(car){
        this.car = car;
        this.rayCount = 3;
        this.rayLength = 100;
        this.raySpread = Math.PI/4; 
        this.rays = [];

    }

    update(roadBoarders){
        this.#castRays();
        this.readings =[];
        for(let i =0; this.rays.length;i++){
            this.readings.push(
                this.#getReading(this.rays[i],roadBoarders)
            )

        }
    }
    #getReading(ray,roadBoarders){
        let touches = [];
        for(let i=0; i<roadBoarders.lenth;i++){
            const touch = getintersection(
                ray[0],
                ray[1],
                roadBoarders[i][0],
                roadBoarders[i][1]
            )
            if(touch){
                touches.push(touch)
            }
        }
        if(touches.length ===0){
        return null
    }
    else{
        const offsets = touches.map(e=>e.offset);
        const minOffset =Math.min(...offsets);
        return touches.find(e=>e.offset == minOffset);
    }

 }

    

    #castRays(){
        this.rays = [];
        for(let i = 0; i<this.rayCount;i++){
            const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount=1?0.5:i/(this.rayCount-1)
            )+this.car.angle;
            const start = {x:this.car.x, y:this.car.y};
            const end = {
                x : this.car.x- 
                    Math.sin(rayAngle)*this.rayLength,
                y: this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end])
            };
    }
    draw(ctx){
            for(let i = 0;i<this.rayCount;i++){
                ctx.beginPath();
                ctx.lineWdith = 2;
                ctx.strokeStyle = "yellow";
                ctx.moveTo(
                    this.rays[i][0].x,
                    this.rays[i][0].y
                )
                ctx.lineTo(
                    this.rays[i][1].x,
                    this.rays[i][1].y      
                )
                ctx.stroke()
            }

        }
}