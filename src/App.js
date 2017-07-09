import React, { Component } from 'react';

import CanvasGrid from './Components/CanvasGrid';
import PieceAdder from './Components/PieceAdder';

import findPieceInPosition from './utils/findPieceInPosition';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super()
    this.state={
      pieces: [],
      selected: -1,
    }
  }

  addPiece({ x, y, color }){
    const { pieces } = this.state;
    const taken = findPieceInPosition(pieces, parseInt(x), parseInt(y));

    if(!taken) {
      pieces.push({
        pos: {x:parseInt(x), y:parseInt(y)},
        color
      });
    }
    this.setState({pieces});
  }

  selectPiece(index){
    this.setState({selected: index})
  }

  render() {
    const { pieces, selected } = this.state;
    return (
      <div className="App">
        <CanvasGrid 
          gridSideLength={10} pieces={pieces} selected={selected}
          selectPiece={this.selectPiece.bind(this)}
        />
        <PieceAdder addPiece={this.addPiece.bind(this)}/>
      </div>
    );
  }
}

export default App;
