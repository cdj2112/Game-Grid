import React, { Component } from 'react';

import CanvasGrid from './Components/CanvasGrid';
import PieceAdder from './Components/PieceAdder';

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super()
    this.state={
      pieces: []
    }
  }

  addPiece({ x, y, color }){
    const { pieces } = this.state;
    pieces.push({
      pos: {x:parseInt(x), y:parseInt(y)},
      color,
    })
    this.setState({pieces})
  }

  render() {
    const { pieces } = this.state;
    return (
      <div className="App">
        <CanvasGrid gridSideLength={10} pieces={pieces}/>
        <PieceAdder addPiece={this.addPiece.bind(this)}/>
      </div>
    );
  }
}

export default App;
