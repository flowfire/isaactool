import React from 'react';
import { falldownImgs } from "./data/data";
import { falldownNames, falldownTypes } from "./data/extradata";
import service, { TAGS } from "./AppService";

import './Controls.css';

export default class Controls extends React.PureComponent {
  selectFalldown(falldown){
    service.selectedFalldowns.push(falldown)
    service.trigger(TAGS.selectedFalldownsChange, service.selectedFalldowns)
  }

  render(){
    return <div className="Controls">
      <div className="chosen-falldown"></div>
      <div className="all-falldown">
        { falldownTypes.map(type => {
          return (<div key={type.label}>
          <div className="type-title">{type.label}</div>
          <div className="type-item">
            { type.falldowns.map(falldown => 
              <div className="card" key={falldown} onClick={this.selectFalldown.bind(this, falldown)}>
                <img src={falldownImgs[falldown]} alt={falldownNames[falldown]}></img>
                {falldownNames[falldown].split(" ").map(name => 
                  <div className="title" key={name}>{name}</div>
                )}
              </div>
            ) }
          </div>
          </div>)
        }) }
      </div>
    </div>
  }
}