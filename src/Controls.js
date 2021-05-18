import React from 'react';
import { falldownImgs } from "./data/data";
import { falldownNames, falldownTypes } from "./data/extradata";
import service, { TAGS } from "./AppService";

import './Controls.css';

export default class Controls extends React.PureComponent {

  state = {
    toolMode: "filter"
  }

  componentDidMount(){
    this._onToolModeChange = this.onToolModeChange.bind(this)
    service.on(TAGS.toolModeChange, this._onToolModeChange)
  }
  componentWillUnmount(){
    service.off(TAGS.toolModeChange, this._onToolModeChange)
  }
  _onToolModeChange = null
  onToolModeChange(toolMode){
    this.setState({
      toolMode,
    })
  }

  onChangeSearchKeyword(event){
    service.searchKeyword = event.target.value
    service.trigger(TAGS.searchKeywordChange, service.searchKeyword)
  }

  changeToolMode(){
    service.toolMode = service.toolMode === "search" ? "filter" : "search"
    service.trigger(TAGS.toolModeChange, service.toolMode)
  }

  selectFalldown(falldown){
    service.selectedFalldowns.push(falldown)
    service.trigger(TAGS.selectedFalldownsChange, service.selectedFalldowns)
  }

  render(){
    return <div className="Controls">
      <div className="all-falldown">
        <div className="tool-mode">
          <div className="opera-button" onClick={this.changeToolMode.bind(this)}>切换到{this.state.toolMode === "filter" ? "道具搜索" : "掉落物搜索"}模式</div>
        </div>
        { this.state.toolMode === "filter" ? falldownTypes.map(type => {
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
        }) : <div className="search-bar"><input onInput={this.onChangeSearchKeyword.bind(this)} placeholder="请输入道具 id 或道具名（英文或中文）"/></div> }
      </div>
    </div>
  }
}