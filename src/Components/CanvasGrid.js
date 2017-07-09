import React, { Component } from 'react';

class CanvasGrid extends Component {
	componentDidMount(){
		this.redraw();
	}

  componentWillReceiveProps(){
    this.redraw();
  }

  redraw(){
    const { gridSideLength, pieces } = this.props;
    const canvas = this.refs.canvasBase;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const gridSizeW = width/gridSideLength;
    const gridSizeH = height/gridSideLength;

    ctx.clearRect(0,0,width,height);

    ctx.strokeStyle = '#000';
    ctx.beginPath();
    for (let i = 1; i < gridSideLength; i++){
      ctx.moveTo(i*gridSizeW, 0);
      ctx.lineTo(i*gridSizeW, height);

      ctx.moveTo(0, i*gridSizeH);
      ctx.lineTo(width, i*gridSizeH);
    }
    ctx.closePath();
    ctx.strokeRect(0,0,500,500);
    ctx.stroke();

    pieces.forEach((p)=>{
      const { pos, color } = p;
      const { x, y } = pos;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.ellipse(
        (x+0.5)*gridSizeW, (y+0.5)*gridSizeH, 
        gridSizeW/2, gridSizeH/2,
        0, 0, 2*Math.PI
      )
      ctx.closePath();
      ctx.fill();
    })
  }

  handleClick(ev){
  	const { gridSideLength } = this.props;
		const canvas = this.refs.canvasBase;
		const { width, height } = canvas;

  	const x = ev.nativeEvent.offsetX;
  	const y = ev.nativeEvent.offsetY;
    console.log(
    	Math.floor(x/width*gridSideLength), 
    	Math.floor(y/height*gridSideLength)
    );
  }

  render(){
  	return <canvas 
		  	ref={'canvasBase'} 
		  	height={500} width={500} 
		  	onClick={this.handleClick.bind(this)}
		/>
  }
}

export default CanvasGrid;