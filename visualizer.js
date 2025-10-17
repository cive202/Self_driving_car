  class Visualizer {
    static drawNetwork(ctx, network) {
      const margin = 50;
      const left = margin;
      const top = margin;
      const width = ctx.canvas.width - margin * 2;
      const height = ctx.canvas.height - margin * 2;

      const levelHeight = height / network.levels.length

      for(let i=network.levels.length-1;i>=0;i--){
        const LevelTop = top+ lerp(height-levelHeight,
          0,
          network.levels.length==1? 0.5:i/(network.levels.length-1)
        )
                      
      ctx.setLineDash([3,3])
      Visualizer.drawLevel(ctx,network.levels[i],left,LevelTop,width,levelHeight,i==network.levels.length-1?['🠉','🠈','🠊','🠋']:[])
      }
    }
  static drawLevel(ctx, level, left, top, width, height,outputLabels) {
    const right = left + width;
    const bottom = top + height;
    const nodeRadius = 18;


    //const inputs = level.inputs;
    // const outputs = level.outputs;
    // const weights = level.weights;
    const { inputs, outputs, weights,biases  } = level;
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < outputs.length; j++) {
        ctx.beginPath();
        ctx.moveTo(Visualizer.#getNodeX(inputs, i, left, right), bottom);
        ctx.lineTo(Visualizer.#getNodeX(outputs, j, left, right), top);
        ctx.lineWidth = 2;
          const value = weights[i][j];
          ctx.strokeStyle =getRGBA(value);
          ctx.stroke();
      }
    }
    for (let i = 0; i < level.inputs.length; i++) {
      const x = Visualizer.#getNodeX(inputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2); //ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
      ctx.fillStyle = "black";
      ctx.fill(); 
      


      ctx.beginPath();
      ctx.arc(x, bottom, nodeRadius*0.6, 0, Math.PI * 2); //ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
      ctx.fillStyle = getRGBA(inputs[i]);
      // ctx.fillStyle = "white"
      ctx.fill();
    }
    for (let i = 0; i < level.outputs.length; i++) {
      const x = Visualizer.#getNodeX(outputs, i, left, right);
      ctx.beginPath();
      ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, top, nodeRadius*0.6, 0, Math.PI * 2);
      ctx.fillStyle = getRGBA(outputs[i]);
      // ctx.fillStyle = "white"
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(x,top,nodeRadius*0.8,0,Math.PI* 2)
      ctx.strokeStyle=getRGBA(biases[i])
      ctx.setLineDash([3,3])
      ctx.stroke()
      ctx.setLineDash([])

      if(outputLabels [i]){
        ctx.beginPath()
        ctx.textAlign = "center"
        ctx.textBaseline ="middle"  
        ctx.fillStyle="black"
        ctx.strokeStyle="white"
        ctx.font = (nodeRadius*1.5)+"px Arial"
        ctx.fillText(outputLabels[i],x,top+nodeRadius*0.1)
        ctx.lineWidth=0.5
        ctx.strokeText(outputLabels[i],x,top)
      }

    }
  }
  static #getNodeX(nodes, index, left, right) {
    return lerp(
      left,
      right,
      nodes.length == 1 ? 0.5 : index / (nodes.length - 1)
    );
  }
}
