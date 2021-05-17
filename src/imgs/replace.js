let fs = require("fs")

let list =  fs.readdirSync(__dirname + "/items")


list.forEach(file => {
    newFile = file.replace("__", "_")
    fs.renameSync(__dirname + "/items/" + file, __dirname + "/items/" + newFile)
    console.log(newFile)
})