import './App.css';
import Tips from './Tips';
import Controls from './Controls';
import Results from './Results';
import AppService from './AppService';
import React from 'react';

export default class App extends React.PureComponent {
  componentDidMount(){
    const hundouluo = new Audio("/otherfiles/hundouluo.mp3")
    let isPlaying = false
    let aimKeyList = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"]
    let keyPressed = []
    document.addEventListener("keydown", event => {
      if (isPlaying) return
      let code = event.code
      if (aimKeyList.indexOf(code) === -1) return keyPressed = []
      keyPressed.push(code)
      if (keyPressed.join(",").indexOf(aimKeyList.join(",")) === -1) return
      isPlaying = true
      hundouluo.play()
    })
  }
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
