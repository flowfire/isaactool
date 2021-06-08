import React from 'react';
import './Tips.css';
let number = Number(location.search.substr(1)) || 20

export default class Tips extends React.PureComponent {
  componentDidMount(){
    console.log("更新日志：")
    console.log("2021-05-24: 增加了点击图标删除此掉落物的功能；添加了一个小彩蛋；增加了更新日志功能。")
    console.log("2021-05-27: 增加了百度统计功能。")
    console.log("2021-06-08: 增加备案信息，修改提示信息，增加本地版本下载链接。")
  }
  render(){
    return <div className="Tips">
      <div className="real-tip">
        目前展示前 {number} 条结果（地址栏最后添加 ?数字 后回车可以更改展示数量）
        作者：
        <a href="https://space.bilibili.com/731375" target="_blank">bilibili：-德川家康薛定谔</a>
        本地版下载链接：
        <a href="https://github.com/flowfire/isaactool/releases" target="_blank">bilibili：-德川家康薛定谔</a>
      </div>
    </div>
  }
}
