import moments from 'moment' // 导入文件
import {
  Loading
} from 'element-ui'; //loading  加载中
moments.locale('zh-cn') // 需要汉化
export const dateFormat = (rows, column, cellValue) => { //格式化时间
  //格式化时间
  if (cellValue) {
    cellValue = moments(cellValue).format("YYYY-MM-DD HH:mm:ss");
  }
  return cellValue;

}
export const moment = (val, index) => {
  if (!index && val) { //val  有值  index 无值   默认格式 YYYY-MM-DD HH:mm:ss
    val = moments(val).format("YYYY-MM-DD HH:mm:ss");
  } else if (!index && !val) { //val index  都为空 获取当前时间
    val = moments().format("YYYY-MM-DD HH:mm:ss");
  } else if (index && val) { //index 有值     格式 是 YYYY-MM-DD
    val = moments().format("YYYY-MM-DD");
  }
  return val

}
/**
 * 
 * @param {每页数字} row 
 * @param {每行数据} column 
 * @param {返回数据} cellValue 
 */
export const notFormat = (row, column, cellValue) => {
  //格式化使用
  return cellValue == "0" ? "否" : "是";
}


/**
 * 
 * @param {需添加的文字} text 
 */
export const loadings = (text) => {    
  const loading = Loading.service({
    fullscreen: true,
    spinner: "el-icon-loading",
    text: text == true ? "保存中" : '加载中',
    background: 'rgba(0, 0, 0, 0.8)'
  });
  return loading
}

/**
 * 关闭
 */
export const closeLoading = () => {
  loadings().close()
}


