const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const data = require("./data.js")

let imgs = data

// let stream = fs.createWriteStream(path.join(import.meta.url, "../" , "items", fileName).substr(5));
// request(url).pipe(stream).on("close", function (err) {
//     if (err) {
//         console.error(`${fileName}下载失败，正在重新下载。`)
//         getImg(i)
//     } else {
//         console.log(`${fileName}下载成功。`)
//     }
// });

let retry = 0
let getImg = i => {
    let img = imgs[i]
    if (img === void 0) return
    if (retry >= 10) {
        console.warn("重新下载超过10次，跳过")
    }
    let fileName1 = img.split("/")[5]
    let fileName2 = img.split("/")[6]
    let fileName3 = img.split("/")[7]
    let fileName = [fileName1, fileName2, fileName3].join("/")
    let url = `https://static.wikia.nocookie.net/bindingofisaacre_gamepedia/images/${fileName}/revision/latest/scale-to-width-down/128?cb=20180430090408`
    fileName = fileName3.replace(/%../g, "_url_code_")
    fileName = fileName.replace(/__/g, "_")
    fetch(url,   {
            method: 'GET',
            headers: { 'Content-Type': 'application/octet-stream' },
    }).then(res => res.buffer()).then(_=>{
      fs.writeFile(path.join(__dirname , "items", fileName), _, "binary", function (err) {
            if (err) {
                console.log(err)
                console.error(`${fileName} 保存错误，重新下载`)
                retry++
                getImg(i)
            } else {
                retry = 0
            }
        });
    }).catch(e => {
        console.error(`${fileName} 网络错误，重新下载`)
        retry++
        getImg(i)
    })
}

imgs.forEach((img, i) => {
    getImg(i)
})