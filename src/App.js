import React, { Component } from 'react';

import CanvasGrid from './Components/CanvasGrid';
import PieceAdder from './Components/PieceAdder';
import DirectionControl from './Components/DirectionControl';

import findPieceInPosition from './utils/findPieceInPosition';
import DIRECTIONS from './utils/Directions';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super();
    this.state={
      pieces: [],
      selected: -1,
    };
  }

  addPiece({ x, y, color }){
    const { pieces } = this.state;
    const taken = findPieceInPosition(pieces, parseInt(x), parseInt(y));

    if(!taken) {
      pieces.push({
        pos: {x:parseInt(x), y:parseInt(y)},
        color,
        path:[]
      });
    }
    this.setState({pieces});
  }

  selectPiece(index){
    this.setState({selected: index});
  }

  changeColorofSelected(color){
    const { pieces, selected } = this.state;
    if(selected < 0) return;
    pieces[selected].color = color;
    this.setState({ pieces });
  }

  addPathToSelected(direction){
    const {pieces, selected} = this.state;
    if(selected>=0){
      const selP = pieces[selected];
      if(Math.abs(selP.path[selP.path.length-1] - direction) !== 4){
        selP.path.push(direction);
      } else {
        selP.path.splice(-1,1);
      }
      pieces.splice(selected, 1, selP);
      this.setState({pieces});
    }
  }

  clearPathOfSelected(){
    const {pieces, selected} = this.state;
    if(selected>=0){
      pieces[selected].path=[];
      this.setState({pieces})
    }
  }

  removeSelected(){
    const { pieces, selected } = this.state;
    if(selected >= 0){
      pieces.splice(selected, 1);
      this.setState({pieces, selected: -1});
    }
  }

  deriveCollision(){
    const { pieces, selected } = this.state;
    if(selected >= 0){
      const { x, y } = pieces[selected].pos;
      let newPosition = pieces[selected].path.reduce((curPos, d)=>{
        curPos.x += DIRECTIONS[d][0];
        curPos.y += DIRECTIONS[d][1];
        return curPos;
      }, {x, y});

      return DIRECTIONS.map((d)=>{
        return !(newPosition.x + d[0] >= 10 ||
        newPosition.x + d[0] < 0 ||
        newPosition.y + d[1] >= 10 ||
        newPosition.y + d[1] < 0 ||
        findPieceInPosition(pieces, newPosition.x+d[0], newPosition.y+d[1]))
      })
    } else {
      return [];
    }
  }

  executePaths(){
    const { pieces } = this.state;
    const newPieces = pieces.map((p)=>{
      const newPos = p.path.reduce((pos, d)=>{
        return { x: pos.x + DIRECTIONS[d][0], y: pos.y + DIRECTIONS[d][1]}
      }, p.pos);
      return {...p, pos: newPos, path:[]};
    });
    this.setState({pieces: newPieces});
  }

  render() {
    const { pieces, selected } = this.state;
    return (
      <div className="App">
        <CanvasGrid 
          gridSideLength={10} pieces={pieces} selected={selected}
          selectPiece={this.selectPiece.bind(this)}
        />
          addPiece={this.addPiece.bind(this)}
          removeSelected={this.removeSelected.bind(this)}
        <PieceAdder selected = {selected >= 0 && pieces[selected]}
        />
        <DirectionControl 
          validDirections = {this.deriveCollision()}
          addPath={this.addPathToSelected.bind(this)}
          clearPath={this.clearPathOfSelected.bind(this)}
          execute={this.executePaths.bind(this)}
        />
      </div>
    );
  }
}

export default App;
