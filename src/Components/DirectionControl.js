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
      if (key!==8) this.props.addPath(key);
      else this.props.clearPath();
    }
  }

  measuePath(path){
    let diagonal = 0;
    return path.reduce((length, direction)=>{
      if (direction % 2 === 0) {
        return length + 1;
      } else if (diagonal % 2 === 1) {
        diagonal++;
        return length + 2;
      } else {
        diagonal++;
        return length + 1;
      }
    }, 0);
  }

  render(){
  	const { path, validDirections, execute } = this.props;
  	const directionlabels = Object.keys(DIRECTIONS).map((d, idx)=>{
  		return <label 
  		  key={idx} 
  		  className={`rosePoint ${DIRECTIONS[d].className} ${validDirections[idx]===false ? 'hide' : ''}`}
  		  onClick={this.addPath(idx)}
  		>
  		 {d}
  		</label>;
  	})
  	return <div className = 'arrowBase'>
      {directionlabels}
      <button className = 'rosePoint bottom west' onClick = {execute}>
        Execute Paths
      </button>
      <label className = 'rosePoint bottom east'>
        {`${this.measuePath(path)*5}ft.`}
      </label>
  	</div>
  }
}