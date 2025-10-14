class Controls {
    constructor(type) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        switch(type){
            case "KEYS" :
                this.#addKeyboardListeners();
                break;
            case "DUMMY" :
                this.forward=true;
                break;
        }

    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                    this.left = true;
                    break;
                case "ArrowRight":
                case "d":
                    this.right = true;
                    break;
                case "ArrowUp":
                case "w":
                    this.forward = true;
                    break;
                case "ArrowDown":
                case "s":
                    this.reverse = true;
                    break;
            }
        };

        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                case "a":
                    this.left = false;
                    break;
                case "ArrowRight":
                case "d":
                    this.right = false;
                    break;
                case "ArrowUp":
                case "w":
                    this.forward = false;
                    break;
                case "ArrowDown":
                case "s":
                    this.reverse = false;
                    break;
            }
        };
    }
}
