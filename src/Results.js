import React from 'react';
import './Results.css';
import service, { TAGS } from './AppService'
import { peifangs, falldownImgs } from "./data/data";
import { falldownNames, falldownScores } from "./data/extradata";

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
    results: [],
  }

  onSelectedFalldownsChange(selectedFalldowns){

    console.time("calc")
    const currentSelectedFalldowns = Array.from(selectedFalldowns)
    let results = []
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

      if (result.has.length > 0) results.push(result)
    })
    results = results.sort((result1, result2) => {
      if (result1.has.length > result2.has.length) return -1;
      if (result1.has.length < result2.has.length) return 1;
      if (result1.item.score > result1.item.score) return -1;
      if (result1.item.score < result1.item.score) return 1;
      return 0;
    })
    let finalResults = []
    for (let result of results) {
      if (finalResults.length === 21) {
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
    console.timeEnd("calc")
    console.log(finalResults)

    this.setState({
      selectedFalldowns: currentSelectedFalldowns,
      results: finalResults,
    })
  }

  _onSelectedFalldownsChange = null
  componentDidMount(){
    this._onSelectedFalldownsChange = this.onSelectedFalldownsChange.bind(this)
    service.on(TAGS.selectedFalldownsChange, this._onSelectedFalldownsChange)
  }
  componentWillUnmount(){
    service.off(TAGS.selectedFalldownsChangem, this._onSelectedFalldownsChange)
  }


  clearallSelectedFalldowns(){
    service.selectedFalldowns = []
    service.trigger(TAGS.selectedFalldownsChange, [])
  }

  render(){
    return <div className="Results">
      <div className="current-selected">
        <div className="clear-all" onClick={this.clearallSelectedFalldowns.bind(this)}>清除</div>
        { !!this.state.selectedFalldowns.length && this.state.selectedFalldowns.map((falldown, index) => <img key={index} src={falldownImgs[falldown]} alt={falldownNames[falldown]}/>) }
      </div>
      <div className="content">
        { !!this.state.results.length && this.state.results.map(result => <div className="result-card" key={result.item.id}>
          <div className="item">
            <img src={result.item.img} alt={result.item.name} />
            <div>{result.item.name}</div>
          </div>
          { result.matchs.map((match, index) => <div key={index} className="match">
            <div className="match-block">
              <div>配方：</div>
              { match.peifang.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>
            <div className="match-block mb2">
              <div>已有：</div>
              { match.has.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>
            <div className="match-block">
              <div>还缺：</div>
              { match.still.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>
            <div className="match-block mb2">
              <div>多余：</div>
              { match.extra.map((falldown, index) => <img src={falldownImgs[falldown]} alt={falldown} key={index}/>) }
            </div>
          </div>) }
        </div>) }
      </div>
    </div>
  }
}
