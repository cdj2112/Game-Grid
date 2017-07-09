import React, { Component } from 'react';

import './PieceAdder.css'

export default class PieceAdder extends Component {
	constructor(props){
		super(props);
		this.state = {
			x: 0,
			y: 0,
			color: '#ff0000'
		}
	}

	changeAttribute(attr){
    return (ev) => {
    	this.setState({[attr]:ev.target.value});
    }
	}

	sendPiece(){
    this.props.addPiece(this.state);
	}

	render(){
		const { x, y, color } = this.state;
		return <div className={'addBase'}>
      x <input type='number' value={x} onChange={this.changeAttribute('x')}></input>
      y <input type='number' value={y} onChange={this.changeAttribute('y')}></input>
      color <input type='color' value={color} onChange={this.changeAttribute('color')}></input>
      <button onClick={this.sendPiece.bind(this)}>Add</button>
		</div>;
	}
}