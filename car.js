class Car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

       
        this.speed = 0;
        this.acclerataion = 0.2 
        this.maxspeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.sensor = new Sensor(this)
        this.control = new Controls();

    }
    draw(ctx){
        ctx.save()
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle)
        ctx.beginPath();//Start a new drawing path — forget any previous shapes I was drawing
        ctx.rect(
            - this.width/4,
            -this.height/4-22,
            this.width/2,
            this.height
        );
        ctx.fillStyle = "blue";     // Set fill color
        ctx.fill();

        ctx.rect(
            - this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fillStyle = "black";     // Set fill color

        ctx.fill();


        ctx.restore();
        
        this.sensor.draw(ctx)
    }

    update(){
        this.#move()
        this.sensor.update();
    }

    #move(){
        if(this.control.forward){
            this.speed +=this.acclerataion;
        }
        if(this.control.reverse){
            this.speed -=this.acclerataion;
        }
        if(this.speed>this.maxspeed){
            this.speed = this.maxspeed;
        }
        if(this.speed<-this.maxspeed/2){
            this.speed =-this.maxspeed/2;
        }
       if(this.speed>0){
           this.speed -= this.friction;
       }
       if(this.speed<0){
           this.speed +=this.friction;
       }
       if(Math.abs(this.speed)<this.friction){
        this.speed = 0;
       }
       if(this.speed!=0){
        const flip = this.speed>0?1:-1;

       

            if(this.control.left){
                this.angle += 0.03*flip;
            }
            if(this.control.right){
                this.angle -= 0.03*flip;
       }
    }
       this.x -=Math.sin(this.angle)*this.speed;
       this.y -=Math.cos(this.angle)*this.speed;
    }
}

        
