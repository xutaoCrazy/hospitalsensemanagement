//时间转换
const loading = {
  bind: function (el, binding, vnode) {
    el.innerHTML = '<div style="padding:20px;">暂无数据</div>'
  }
}
const tableThStyle = {
  inserted:function(el){
    let newSpan = document.createElement('span')
       newSpan.innerHTML = el.innerText
       newSpan.style.cssText = "height:28px;line-height:28px;border:1px solid #fff"
       el.innerText = ''
       el.append(newSpan)
  }
}
export {loading,tableThStyle}
