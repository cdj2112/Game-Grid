import React, { Component } from 'react';

import findPieceInPosition from '../utils/findPieceInPosition';
import DIRCTIONS from '../utils/Directions';

class CanvasGrid extends Component {
	componentDidMount(){
		this.redraw();
	}

  componentDidUpdate(){
    this.redraw();
  }

  redraw(){
    const { gridSideLength, pieces, selected } = this.props;
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

    if(selected >= 0){
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      const selPos = pieces[selected].pos;
      ctx.fillRect(
        gridSizeW*selPos.x, gridSizeH*selPos.y, 
        gridSizeW, gridSizeH
      );
    }

    pieces.forEach((p)=>{
      const { pos, color, path } = p;
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

      ctx.beginPath();
      let lx = (x+0.5)*gridSizeW, ly = (y+0.5)*gridSizeH
      ctx.moveTo( lx, ly );
      path.forEach((d)=>{
        lx += gridSizeW * DIRCTIONS[d][0];
        ly += gridSizeH * DIRCTIONS[d][1];
        ctx.lineTo( lx, ly );
      });
      ctx.stroke();
    })
  }

  handleClick(ev){
  	const { gridSideLength, pieces, selectPiece } = this.props;
		const canvas = this.refs.canvasBase;
		const { width, height } = canvas;

  	const x = ev.nativeEvent.offsetX;
  	const y = ev.nativeEvent.offsetY;
    
    const gridX = Math.floor(x/width*gridSideLength);
    const gridY = Math.floor(y/height*gridSideLength);

    const hitPiece = findPieceInPosition(pieces, gridX, gridY);
    selectPiece(pieces.indexOf(hitPiece));
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