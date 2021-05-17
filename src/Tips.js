import React from 'react';
import './Tips.css';

export default class Tips extends React.PureComponent {
  render(){
    return <div className="Tips">
      <div className="real-tip">超级电池，超级炸弹，碎骰子（碎掉的 d6）暂未收录。目前暂时只显示前20条查询结果。</div>
    </div>
  }
}
