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

	changeColor(ev){
		const { selected, changeColorofSelected } = this.props;
    if(selected) changeColorofSelected(ev.target.value);
    this.setState({color: ev.target.value});
	}

	sendPiece(){
    this.props.addPiece(this.state);
	}

	removePiece(){
    this.props.removeSelected();
	}

	render(){
		const { selected } = this.props;
		const { x, y, color } = this.state;
		let realColor = color;
    if(selected) realColor = selected.color;

		return <div className={'addBase'}>
      x <input type='number' value={x} onChange={this.changeAttribute('x')}></input>
      y <input type='number' value={y} onChange={this.changeAttribute('y')}></input>
      <button onClick={this.sendPiece.bind(this)}>Add</button>
      {selected >= 0 && <button onClick={this.removePiece.bind(this)}>Remove</button>}
      color <input type = 'color' value = {realColor} onChange = {this.changeColor.bind(this)}></input>
		</div>;
	}
}