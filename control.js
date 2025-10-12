class Controls{
    constructor(){
        this.forward = false;
        this.reverse = false;
        this.right = false;
        this.left = false;

        this.#addKeyboardListeners();    // Private method tei bhayera #
    }
    #addKeyboardListeners(){
        document.onkeydown = (event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        console.log(this)

        }

        
        document.onkeyup = (event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
                console.log(this)           
        }
        
    }
}