class Car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.controls = new Controls()
        }

        update(){
        if(this.controls.forward){
            this.y +=2
        }
        if (this.controls.reverse){
            this.y -=2
        }
        if(this.controls.right){
            this.y-=2
        }
        if(this.controls.left){
            this.y +=2
        }


        }
    draw(ctx){
        ctx.save()
        ctx.beginPath();
        ctx.rect(
            this.x-this.width/2,
            this.y-this.height/2,
            this.width,
            this.height
        );
        ctx.fillStyle = "black"
        ctx.fill()
        ctx.restore()
    }
}