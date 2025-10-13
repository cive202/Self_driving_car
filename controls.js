class Controls{
    constructor(forward,reverse,left,right){
        this.forward = false,
        this.reverse = false,
        this.left = false,
        this.right = false,

        this.#addKeyboardListners()
    }
    #addKeyboardListners(){
        document.onkeydown = (event) =>{
            switch(event.key){
                case "w" :
                    this.forward = true;
                    break;
                case "a":
                    this.right = true;
                    break;
                case "s":
                    this.reverse = true;
                    break;
                case "d":
                    this.left = true;
                    break;
            }
            console.table(this)
        } 
        document.onkeyup = (event) =>{
            switch(event.key){
                case "w" :
                    this.forward = false;
                    break;
                case "a":
                    this.right = false;
                    break;
                case "s":
                    this.reverse = false;
                    break;
                case "d":
                    this.left = false;
                    break;
            }
            console.table(this)
        } 
        
    }
}