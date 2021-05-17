import { falldownImgs as fdi1, peifangs as pf1 } from "./data1";
import { falldownImgs as fdi2, peifangs as pf2 } from "./data2";
import { falldownImgs as fdi3, peifangs as pf3 } from "./data3";

export const falldownImgs = Object.assign({}, fdi1, fdi2, fdi3)
export const peifangs = pf1.concat(pf2).concat(pf3)
