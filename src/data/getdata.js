{
    let consoleTag = 0
    let datas = []
    let falldownImgs = {}
    document.querySelectorAll(".wikitable.sortable.jquery-tablesorter > tbody > tr").forEach(item => {
    let data = {};
    data.item = {
        name: "",
        id: "",
        img: "",
    };
    data.peifangs = []
    Array.prototype.forEach.call(item.children, (td, index) => {
        if (index === 0) {
            data.item.img = td.querySelector("img:not(.dlc)").src
            data.item.name = td.querySelectorAll("a")[1].innerHTML
            return
        }
        if (index === 1) {
            data.item.id = Number(td.innerHTML)
            return
        }
        let links = td.querySelectorAll("tbody tr td a img")
        let peifang = []
        links.forEach(link => {
            let name = link.alt
            name = name.replace(/ \(\d+\)/, '')
            peifang.push(name)
            if (falldownImgs[name] === void 0) {
                falldownImgs[name] = link.src
            }
        })
        data.peifangs.push(peifang)
    })
    datas.push(data)
    })

    console.log(datas.map(a => a.item.img))
    // console.log(falldownImgs)
    // console.log(Object.keys(falldownImgs).length)
}
{
    let datas = []
    document.querySelectorAll("#AAA tr").forEach(tr => {
        let data = {
            id: null,
            chineseName: "",
            description: "",
        }
        let tds = tr.querySelectorAll("td")
        tds.forEach((td, index) => {
            switch(index){
                case 0:
                    data.chineseName = td.querySelector("a").innerHTML
                    break;
                case 2:
                    data.id = Number(td.innerHTML)
                    break;
                case 6:
                    data.description = td.innerHTML
                    break;
            }
        })
        datas.push(data)
    })
    console.log(datas)
}