import { peifangs , falldownImgs } from './../data/data';
import fetch from "node-fetch"
import fs from "fs";
import path from "path";

let imgs = []
Object.values(falldownImgs).forEach(falldownImg => {
    imgs.push(falldownImg)
})

// let stream = fs.createWriteStream(path.join(import.meta.url, "../" , "items", fileName).substr(5));
// request(url).pipe(stream).on("close", function (err) {
//     if (err) {
//         console.error(`${fileName}下载失败，正在重新下载。`)
//         getImg(i)
//     } else {
//         console.log(`${fileName}下载成功。`)
//     }
// });

let getImg = i => {
    let img = imgs[i]
    if (img === void 0) return
    let fileName = img.split("/")[7]
    
    fetch(img,   {
            method: 'GET',
            headers: { 'Content-Type': 'application/octet-stream' },
    }).then(res => res.buffer()).then(_=>{
      fs.writeFile(path.join(import.meta.url, "../" , "falldowns", fileName).substr(5), _, "binary", function (err) {
            if (err) {
                console.error(`${fileName} 保存错误，重新下载`)
                getImg(i)
            }
        });
    }).catch(e => {
        console.error(`${fileName} 网络错误，重新下载`)
        getImg(i)
    })
}

imgs.forEach((img, i) => {
    getImg(i)
})