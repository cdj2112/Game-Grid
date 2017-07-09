import React, { Component } from 'react';

import CanvasGrid from './Components/CanvasGrid';
import PieceAdder from './Components/PieceAdder';
import DirectionControl from './Components/DirectionControl';

import findPieceInPosition from './utils/findPieceInPosition';

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

  render() {
    const { pieces, selected } = this.state;
    return (
      <div className="App">
        <CanvasGrid 
          gridSideLength={10} pieces={pieces} selected={selected}
          selectPiece={this.selectPiece.bind(this)}
        />
        <PieceAdder selected={selected} 
          addPiece={this.addPiece.bind(this)}
          removeSelected={this.removeSelected.bind(this)}
        />
        <DirectionControl 
          addPath={this.addPathToSelected.bind(this)}
          clearPath={this.clearPathOfSelected.bind(this)}
        />
      </div>
    );
  }
}

export default App;
