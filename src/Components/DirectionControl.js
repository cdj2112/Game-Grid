import React, { Component } from 'react';

import './DirectionControl.css';

const DIRECTIONS = {
	'North': {className: 'north'},
	'Northeast': {className: 'north east'},
	'East': {className: 'east'},
	'Southeast': {className: 'south east'},
	'South': {className: 'south'},
	'Southwest': {className: 'south west'},
	'West': {className: 'west'},
	'Northwest': {className: 'north west'},
	'Clear': {className: ''}
}

export default class DirectionControl extends Component {
  addPath(key){
  	return () => {
      if(key!==8) this.props.addPath(key);
      else this.props.clearPath();
    }
  }

  render(){
  	const directionlabels = Object.keys(DIRECTIONS).map((d, idx)=>{
  		return <label 
  		  key={idx} 
  		  className={`rosePoint ${DIRECTIONS[d].className}`}
  		  onClick={this.addPath(idx)}
  		>
  		 {d}
  		</label>;
  	})
  	return <div className={'arrowBase'}>
      {directionlabels}
  	</div>
  }
}