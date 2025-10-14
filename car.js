class Car{
    constructor(x,y,width,height,controlType,maxSpeed=3){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;
        this.angle=0;
        this.damaged = false    
        if(controlType!="DUMMY"){
            this.sensor=new Sensor(this);
        }
        this.controls=new Controls(controlType);
        
    }

    update(roadBorders){
        if(!this.damaged){
            this.#move()
            this.polygon = this.#createpolygon();
            this.damaged = this.#assessDamage(roadBorders)
        }
        if(this.sensor){
        this.sensor.update(roadBorders);
        }
    }
    #assessDamage(roadBorders){
        for(let i = 0;i< roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true
            }
        }
        return false
    }





    //here we are defining the corners for the car, before we had only the center point. we want to show the collison so we want to define every corner of the car  
#createpolygon(){
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);

    // top-right
    points.push({
        x: this.x - Math.sin(this.angle - alpha) * rad,
        y: this.y - Math.cos(this.angle - alpha) * rad
    });

    // top-left
    points.push({
        x: this.x - Math.sin(this.angle + alpha) * rad,
        y: this.y - Math.cos(this.angle + alpha) * rad
    });

    // bottom-left
    points.push({
        x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
        y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
    });

    // bottom-right
    points.push({
        x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
        y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
    });

    return points;
}
    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        if(this.damaged){
            ctx.fillStyle="grey"
        }
        else{
            ctx.fillStyle ="black"
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i=1; i<this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }

        ctx.closePath();  // connect last point to first
        ctx.fill()
        if(this.sensor){
        this.sensor.draw(ctx);
        }
    }
}