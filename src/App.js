import './App.css';
import Tips from './Tips';
import Controls from './Controls';
import Results from './Results';
import AppService from './AppService';
import React from 'react';

export default class App extends React.PureComponent {
  render(){ 
    return (
    <div className="App">
      <div className="top"><Tips></Tips></div>
      <div className="bottom">
        <div className="left"><Controls></Controls></div>
        <div className="right"><Results></Results></div>
      </div>
    </div>
    )
  }
}
