import React from 'react';
import './Results.css';
import service, { TAGS } from './AppService'
import { peifangs, falldownImgs } from "./data/data";
import { falldownNames, falldownScores } from "./data/extradata";

let number = Number(location.search.substr(1)) || 20
let peifangsFlat = []
peifangs.forEach(item => {
  item.item.score = 0
  item.peifangs.forEach(peifang => {
    let score = 0
    peifang.forEach(falldown => {
      score += falldownScores[falldown]
    })
    if (score > item.item.score) item.item.score = score
    let flat = {
      peifang,
      item: item.item,
    }
    peifangsFlat.push(flat)
  })
})


export default class Results extends React.PureComponent {
  state = {
    selectedFalldowns: [],
    filterResults: [],
    searchResults: [],
    thinMode: false,
    toolMode: "filter",
    searchKeyWord: "",
  }

  searchTimeout = 300
  searchTimeoutTag = null

  onSelectedFalldownsChange(selectedFalldowns){
    const currentSelectedFalldowns = Array.from(selectedFalldowns)
    this.setState({
      selectedFalldowns: currentSelectedFalldowns,
    })
    if (this.searchTimeoutTag !== null) {
      clearTimeout(this.searchTimeoutTag)
    }
    this.searchTimeoutTag = setTimeout(() => {
      let filterResults = []
      peifangsFlat.forEach(peifang => {
        let result = {
          item: peifang.item,
          peifang: peifang.peifang,
          has: [],
          still: [],
          extra: [],
        }
        let check = Array.from(peifang.peifang)
        currentSelectedFalldowns.forEach(falldown => {
          let index = check.findIndex(nowFalldown => nowFalldown === falldown)
          if (index === -1) {
            result.extra.push(falldown)
            return
          }
          result.has.push(falldown)
          check[index] = null
        })
        result.still = check.filter(nowFalldown => nowFalldown !== null)

        if (result.has.length > 0) filterResults.push(result)
      })
      filterResults = filterResults.sort((result1, result2) => {
        if (result1.has.length > result2.has.length) return -1;
        if (result1.has.length < result2.has.length) return 1;
        if (result1.item.score > result1.item.score) return -1;
        if (result1.item.score < result1.item.score) return 1;
        return 0;
      })
      let finalResults = []
      for (let result of filterResults) {
        if (finalResults.length === number + 1) {
          finalResults.pop()
          break;
        }
        let finalResult = finalResults.find(fr => fr.item.id === result.item.id)
        if (finalResult === void 0) {
          finalResult = {
            item: result.item,
            matchs: [],
          }
          finalResults.push(finalResult)
        }
        finalResult.matchs.push({
          peifang: result.peifang,
          has: result.has,
          still: result.still,
          extra: result.extra,
        })
      }

      this.setState({
        filterResults: finalResults,
      })

    }, this.searchTimeout)
  }

  onSearchKeywordChange(keyWord){
    if (this.searchTimeoutTag !== null) {
      clearTimeout(this.searchTimeoutTag)
    }
    
    this.searchTimeoutTag = setTimeout(() => {
      let searchResults = peifangs.filter(peifang => {
        let item = peifang.item
        if (item.id.toString().indexOf(keyWord) !== -1) return true
        if (item.name.indexOf(keyWord) !== -1) return true
        return false
      })
      searchResults = searchResults.slice(0, number);
      this.setState({
        searchResults,
      })
    }, this.searchTimeout)
  }

  onToolModeChange(toolMode){
    this.setState({
      toolMode,
    })
  }
  

  _onSelectedFalldownsChange = null
  _onSearchKeywordChange = null
  _onToolModeChange = null
  componentDidMount(){
    this._onSelectedFalldownsChange = this.onSelectedFalldownsChange.bind(this)
    service.on(TAGS.selectedFalldownsChange, this._onSelectedFalldownsChange)
    this._onToolModeChange = this.onToolModeChange.bind(this)
    service.on(TAGS.toolModeChange, this._onToolModeChange)
    this._onSearchKeywordChange = this.onSearchKeywordChange.bind(this)
    service.on(TAGS.searchKeywordChange, this._onSearchKeywordChange)
  }
  componentWillUnmount(){
    service.off(TAGS.selectedFalldownsChangem, this._onSelectedFalldownsChange)
    service.off(TAGS.toolModeChange, this._onToolModeChange)
    service.on(TAGS.searchKeywordChange, this._onSearchKeywordChange)
  }


  clearallSelectedFalldowns(){
    service.selectedFalldowns = []
    service.trigger(TAGS.selectedFalldownsChange, [])
  }

  deleteSelectedFalldowns(){
    service.selectedFalldowns.pop()
    service.trigger(TAGS.selectedFalldownsChange, service.selectedFalldowns)
  }

  itemMaded(match){
    if (match.has.length < 8) return
    match.has.forEach(falldown => {
      let index = service.selectedFalldowns.findIndex(falldownNow => falldown === falldownNow)
      if (index === -1) return
      service.selectedFalldowns[index] = null
    })
    service.selectedFalldowns = service.selectedFalldowns.filter(falldown => falldown !== null)
    service.trigger(TAGS.selectedFalldownsChange, service.selectedFalldowns)
  }

  render(){

    let classArr = ["match"]
    if (this.state.thinMode) classArr.push("two-block")
    let className = classArr.join(" ")
    return <div className="Results">
      {this.state.toolMode === "filter" ? <><div className="current-selected">
        <div className="red-button opera-button" onClick={this.clearallSelectedFalldowns.bind(this)}>清除</div>
        <div className="delete-one opera-button" onClick={this.deleteSelectedFalldowns.bind(this)}>删除</div>
        {!this.state.thinMode && <div className="blue-button opera-button" onClick={() => {this.setState({thinMode: true})}}>精简模式</div>}
        { !!this.state.selectedFalldowns.length && this.state.selectedFalldowns.map((falldown, index) => <img key={index} src={falldownImgs[falldown]} alt={falldownNames[falldown]}/>) }
      </div>
      <div className="content">
        { !!this.state.filterResults.length && this.state.filterResults.map(result => <div className="result-card" key={result.item.id}>
          <div className="item" style={{backgroundImage:`url(${result.item.img})`}}>
            {/* <img src={result.item.img} alt={result.item.name} /> */}
            <div>{result.item.name}</div>
          </div>
          { result.matchs.map((match, index) => <div key={index} className={match.has.length === 8 ? `${className} can-make`: className} onClick={this.itemMaded.bind(this, match)}>
            <div className="match-block">
              <div>配方：</div>
              { match.peifang.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>
            {!this.state.thinMode && <div className="match-block">
              <div>已有：</div>
              { match.has.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>}
            <div className="match-block">
              <div>还缺：</div>
              { match.still.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>
            {!this.state.thinMode && <div className="match-block">
              <div>多余：</div>
              { match.extra.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>}
          </div>) }
        </div>) }
      </div></> : <div className="content">
        { !!this.state.searchResults.length && this.state.searchResults.map(result => <div className="result-card" key={result.item.id}>
          <div className="item">
            <img src={result.item.img} alt={result.item.name} />
            <div>{result.item.name}</div>
          </div>
          { result.peifangs.map((peifang, index) => <div key={index} className="match one-block">
            <div className="match-block">
              <div>配方 {index + 1}：</div>
              { peifang.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>
          </div>) }
        </div>) }
      </div>}
    </div>
  }
}
