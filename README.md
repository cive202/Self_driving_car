###In this commmit we learned how to use controls wasd to control

##first of all in car.js we need to put the controls we used "update()"

The update() method is where you:

Change the car’s state (position, angle, speed, etc.)

Based on input (keyboard) or physics (friction, acceleration)

Before redrawing it on the canvas each frame


update() = logic (what happens)

draw() = rendering (how it looks)


and also finally we have to animate it using the animate() function and defining it ourselves in main function


algo for the function animation is
    - call car.update()
    - draw the car