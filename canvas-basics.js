let canvas = document.getElementById("myCanvas");

let ctx = canvas.getContext("2d")

canvas.height = window.innerHeight
canvas.width = window.innerWidth

canvas.style.background = "#ff8"

ctx.beginPath();
ctx.fillRect(canvas.width/2,canvas.height/2,200,200)
ctx.fillStyle = "red"
ctx.fillRect(canvas.width/2,canvas.height/2,100,100)

