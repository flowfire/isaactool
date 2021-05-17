import { peifangs, falldownImgs } from "./data/data";


export const TAGS = {
    selectedFalldownsChange: Symbol("selectedFalldownsChange"),
}

class Search{
    _on = {}
    on(tag, func) {
        if (this._on[tag] === void 0) this._on[tag] = []
        this._on[tag].push(func)
    }
    off(tag, func) {
        if (this._on[tag] === void 0) return
        let index = this._on[tag].findIndex(onFunc => onFunc === func)
        if (index === -1) return
        this._on[tag].splice(index, 1)
    }
    trigger(tag, ...args){
        if (this._on[tag] === void 0) return
        this._on[tag].forEach(func => {
            try{
                func(...args)
            }
            catch(e){}
        })
    }
    selectedFalldowns = []
}

export default new Search()