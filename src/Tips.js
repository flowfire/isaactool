import React from 'react';
import './Tips.css';
let number = Number(location.search.substr(1)) || 20

export default class Tips extends React.PureComponent {
  componentDidMount(){
    console.debug("更新日志：")
    console.debug("2021-05-24: 增加了点击图标删除此掉落物的功能；添加了一个小彩蛋；增加了更新日志功能。")
  }
  render(){
    return <div className="Tips">
      <div className="real-tip">
        部分掉落未收录；目前展示前 {number} 条查询结果（地址栏最后添加 ?数字 后回车可以更改展示数量，展示数量过多会影响性能） 作者：
        <a href="https://space.bilibili.com/731375" target="_blank">bilibili：-德川家康薛定谔</a>
      </div>
    </div>
  }
}
