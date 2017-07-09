import React, { Component } from 'react';

import CanvasGrid from './Components/CanvasGrid' 

//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super()
    this.state={
      pieces: []
    }
  }

  addPiece(){
    const { pieces } = this.state;
    pieces.push({
      pos: {x:0, y:0}
    })
    this.setState({pieces})
  }

  render() {
    const { pieces } = this.state;
    return (
      <div className="App">
        <CanvasGrid gridSideLength={10} pieces={pieces}/>
        <button onClick={this.addPiece.bind(this)}>Add</button>
      </div>
    );
  }
}

export default App;
