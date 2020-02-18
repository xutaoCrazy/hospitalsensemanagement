import {
  medicalInsuranceCardAJax
} from '@/service/api/InstitutionInterface'
import store from '@/store';
/**
 * 工具类
 *  {
 *      网络请求工具,
 *      JS类型判断工具,
 *      精度计算工具 
 */


var document = window.document,
  navigator = window.navigator,
  location = window.location;

var classtype = {};
classtype["[object Boolean]"] = "Boolean".toLowerCase();
classtype["[object Number]"] = "Number".toLowerCase();
classtype["[object String]"] = "String".toLowerCase();
classtype["[object Function]"] = "Function".toLowerCase();
classtype["[object Array]"] = "Array".toLowerCase();
classtype["[object Date]"] = "Date".toLowerCase();
classtype["[object RegExp]"] = "RegExp".toLowerCase();
classtype["[object Object]"] = "Object".toLowerCase();
let tools = {
  _type: function (obj) {
    return obj == null ?
      String(obj) : classtype[Object.prototype.toString.call(obj)] || "object";
  },
  isFunction: function (obj) {
    return this._type(obj) === "function";
  },

  isString: function (obj) {
    return this._type(obj) === "string";
  },

  isObject: function (obj) {
    return this._type(obj) === "object";
  },
  hasJQuery: function () {
    return !(undefined == window.jQuery || undefined == window.$ || undefined == jQuery);
  },
  isNum: function (num) {
    if (num != null) {
      var r, re;
      re = /\d+/i;
      r = num.match(re);
      return (r == num) ? true : false;
    }
    return false;
  },
  isNull: function (obj) {
    if (undefined == obj || null == obj || '' == obj)
      return true;
    return false;
  },
  isEmpty: function (obj) {
    if ({} == obj || '' == obj || 0 == obj.length)
      return true;
    return false;
  },
  isNulls: function () {
    var input = arguments;
    for (var i = 0; i < input.length; i++) {
      if (this.isNull(input[i]))
        return true;
    }
    return false;
  },
  resultErrorMsgObject: function (msg) {
    return {
      code: "11000",
      msg: msg,
      data: []
    };
  },
  _checkFunction: function (successFun, failFun) {
    if (!this.isFunction(successFun))
      throw "【successFun】参数位置上不是一个方法对象.";

    if (!this.isFunction(failFun))
      throw "【failFun】参数位置上不是一个方法对象";
  },
  /**
   * 判断对象属性是否为空（开发）
   * @param obj -- 需要判断的对象
   * @param array -- 需要判断的属性集合,例: ['name', 'password', 'sex']
   *
   * @result {
   *      state : true,
   *      msg : '成功'
   * }  OR {
   *      state : false,
   *      msg : '属性【name】不存在或者值为空.'
   * }
   *
   */
  judgeObjectPropertyNotNull: function (obj, array) {
    if (this.isNull(obj))
      return {
        state: false,
        msg: '对象不存在'
      };

    var that = this;
    $.each(array, function (index, value, array) {
      if (that.isNull(obj[value]))
        return {
          state: false,
          msg: "对象属性【" + value + "】不存在或者值为空."
        };
    });

    return {
      state: true,
      msg: ''
    };
  },
  /**
   * 判断对象属性是否为空， 支持自定义提示(适用于提示用户)
   * @param obj -- 需要判断的对象
   * @param array -- 需要判断的属性集合,例: [{
   *      value : 'name',
   *      text : '请填写姓名'
   * },{
   *      value : 'password',
   *      text : ''
   * },{
   *      value : 'sex',
   *      text : ''
   * } ]
   *
   * @result {
   *      state : true,
   *      msg : '成功'
   * }  OR {
   *      state : false,
   *      msg : '请填写姓名'
   * }
   *
   */
  judgeObjectPropertyNotNullAndTips: function (obj, array) {
    if (this.isNull(obj))
      return {
        state: false,
        msg: '对象不存在'
      };

    var that = this;
    var returnMsg = {
      state: true,
      msg: ''
    };
    $.each(array, function (index, value, array) {
      if (that.isNull(obj[value.value])) {
        returnMsg = {
          state: false,
          msg: that.isNull(value.text) ? "对象属性【" + value.value + "】不存在或者值为空." : value.text
        };
        return false;
      }
    });

    return returnMsg;
  },
  /*********************时间************************/
  /**
   * 获取当前时间
   * @returns {string}
   *
   * 返回值 ："2019-10-17 22:39:49"
   */
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  },
  /**
   * 返回当前年份
   * @returns {number} 例如： '2019'
   */
  getCurrentYear: function () {
    return new Date().getFullYear();
  },
  /*******************JQuery****************************/
  /**
   * select 赋值
   * @param id -- select控件的标识
   * @param options -- 是option的value和text的对象集合
   *
   * 例如 ：
   *  需要添加的option格式为：
   *      <option value="value">text</option>
   *         options : [{
   *              value : '1',
   *              text : '测试1'
   *         },{
   *              value : '2',
   *              text : '测试2'
   *         },{
   *              value : '3',
   *              text : '测试3'
   *         }];
   */
  selectSet: function (id, options) {
    this.selectSet(id, options, 'value', 'text');
  },

  selectSet: function (id, options, valueName, textName) {
    $.each(options, function (index, value, array) {
      $("#" + id).append("<option value='" + value[valueName] + "'>" + value[textName] + "</option>");
    });
  },
  /**
   * combo 赋值
   * @param combo -- combo对象
   * @param options -- 是option的value（必须），text（必须），css（不必须）的对象集合
   *
   * 例如 ：
   *  需要添加的option格式为：
   *      <option value="value">text</option>
   *         options : [{
   *              value : '1',
   *              text : '测试1',
   *              css : 'color:red;'
   *         },{
   *              value : '2',
   *              text : '测试2',
   *              css : 'color:red;'
   *         },{
   *              value : '3',
   *              text : '测试3',
   *              css : 'color:red;'
   *         }];
   */
  comboSet: function (combo, options) {
    this.selectSet(id, options, 'value', 'text', 'css');
  },

  comboSet: function (combo, options, valueName, textName, cssName) {
    $.each(options, function (index, value, array) {
      var _option = [{
        value: value[valueName],
        text: value[textName],
        css: value[cssName || "css"]
      }];
      combo.addOption(_option);
    });
  },

  comboSet: function (options, valueName, textName) {
    var _options = [];
    $.each(options, function (index, value) {
      var _option = {};
      _option['value'] = value[valueName];
      _option['text'] = value[textName];
      _options.push(_option);
    });
    return _options;
  },

  /**
   * 获取html元素控件的值，控件包括： input文本控件、select控件
   * @param id
   */
  getHtmlElementValue: function (id) {
    return $("#" + id).val();
  },

  /**
   * 获取HTML的Radio选中值
   * @param name
   */
  getHtmlRadioValue: function (name) {
    return $("input[name='" + name + "']:checked").val();
  },
  /**
   * get方式异步请求
   * @param url -- 请求路径
   * @param parameters
   * @param successFun -- 成功方法回调
   * @param failFun -- 失败方法回调
   */
  getAsyncAjax: function (url, parameters, successFun, failFun) {
    return this._ajax(url, "GET", this.serialize(parameters), successFun, failFun, true);
  },
  /**
   * get方式同步请求
   * @param url -- 请求路径
   * @param parameters
   * @param successFun -- 成功方法回调
   * @param failFun -- 失败方法回调
   */
  getSynchAjax: function (url, parameters, successFun, failFun) {
    return this._ajax(url, "GET", this.serialize(parameters), successFun, failFun, false);
  },
  /**
   * 同步请求
   * @param url -- 请求路径
   * @param parameters
   * @param successFun -- 成功方法回调
   * @param failFun -- 失败方法回调
   */
  synchAjax: function (url, parameters, successFun, failFun) {
    return this._ajax(url, "POST", JSON.stringify(parameters), successFun, failFun, false);
  },
  /**
   * 异步请求
   * @param url -- 请求路径
   * @param parameters
   * @param successFun -- 成功方法回调
   * @param failFun
   */
  asyncAjax: function (url, parameters, successFun, failFun) {
    return this._ajax(url, "POST", JSON.stringify(parameters), successFun, failFun, true);
  },
  _ajax: function (url, method, paramaters, successFun, failFun, async) {
    debugger;
    this._checkFunction(successFun, failFun);

    var result = {};

    if (url.indexOf("?jsessionids") < 0) {
      console.log(store.state.jsessionids)
      url = url + "?jsessionids=" + store.state.jsessionids
    }

    medicalInsuranceCardAJax(
        paramaters,
        url,
        method ? method : "POST"
      )
      .then(data => {
        if (data.code == "0" || data.result == "Success") {
          successFun(data);
        } else {
          failFun(data);
        }
        result.code = data.code;
        result.msg = data.msg;
        result.data = data.data;
      }).catch(data => {
        result.code = '12000';
        result.data = null;
        failFun(result);
      })
    return result;
  },
  /**
   * 支持JSON方式的同步请求
   * @param url -- 请求路径
   * @param parameters -- json对象转成字符,可以使用JSON.stringify(数据对象)格式化
   * @param successFun -- 成功方法回调
   * @param failFun -- 失败方法回调
   */
  synchJsonAjax: function (url, parameters, successFun, failFun) {
    return this._jsonAjax(url, parameters, successFun, failFun, false);
  },
  /**
   * 支持JSON方式的异步请求
   * @param url -- 请求路径
   * @param parameters -- json对象转成字符,可以使用JSON.stringify(数据对象)格式化
   * @param successFun -- 成功方法回调
   * @param failFun -- 失败方法回调
   */
  asyncJsonAjax: function (url, parameters, successFun, failFun) {
    return this._jsonAjax(url, parameters, successFun, failFun, true);
  },
  //异步
  insSystemAjax: function (url, param) {

    if (url.indexOf("?jsessionids") < 0) {
      url = url + "?jsessionids=" + store.state.jsessionids
    }
    var def = $.Deferred(); // 新建一个Deferred对象
    var returnData = {};
    medicalInsuranceCardAJax(
        param.data,
        insurance.config.baseInfo.insCommonParams.hisBaseUrl + url,
      )
      .then(data => {
        if (data.code != 200 || data.result == "Failure") {
          returnData.msg = '保存医嘱异常,请联系管理员!';
          def.reject(returnData);
        }
        console.log(data);
        def.resolve(data);
      }).catch(data => {
        returnData.msg = '保存医嘱异常,请联系管理员!';
        def.reject(returnData);
      })

    return def.promise();
  },
  // tong步方法
  insSystemSyncAjax: function (url, param, callback, insurance) {
    let p = new Promise(function (resolve, reject) {

      if (url.indexOf("?jsessionids") < 0) {
        url = url + "?jsessionids=" + store.state.jsessionids
      }

      var returnData = {};

      medicalInsuranceCardAJax(
          JSON.stringify(param),
          insurance.config.baseInfo.insCommonParams.hisBaseUrl + url,
          'POST'
        )
        .then(data => {
          debugger
          if (data.code != 200 || data.result == "Failure") {
            returnData = data;
          } else {
            insurance.tools.isFunction(callback) ? returnData = callback(data) : returnData = data;
          }
          resolve(returnData);

        })
        .catch(res => {
          if (res.resultMsg) {
            returnData.resultMsg = res.resultMsg
          } else {
            returnData.resultMsg = '调用医保服务发生错误,请联系管理员';

          }
          returnData.result = "Failure";
          returnData.code = 0;
          reject(returnData);
        })
    })
    return p



  },
  _jsonAjax: function (url, paramaters, successFun, failFun, async) {
    this._checkFunction(successFun, failFun);
    var result = {};

    medicalInsuranceCardAJax(
        paramaters,
        url,
        'POST'
      )
      .then(data => {
        if (data.code != "10000") {
          failFun(data);
        } else {
          successFun(data);
        }
        result.code = data.code;
        result.msg = data.msg;
        result.data = data.data;
      })
      .catch(res => {
        result.code = '12000';
        result.data = null;
        failFun(result);
      });
    return result;
  },
  serialize: function (obj) {
    var ary = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p) && obj[p]) {
        ary.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return ary.join('&');
  }
};

export {
  tools
}




/**
 * date:2019/11/35
 * description:精度计算工具

 */
var CashConversionTool = {

  /**
   * 精确度规则
   */
  ACCURACY_1: "0", //精确到分(默认对厘进行四舍五入)
  ACCURACY_2: "10", //精确到角，分舍去
  ACCURACY_3: "11", //精确到角，分四舍五入
  ACCURACY_4: "12", //精确到角，分进位

  /**
   * 获取默认数
   * @param value
   * @returns {*}
   */
  getNumHasDefault: function (value) {
    var valueType = typeof (value);
    if (isNaN(value) || null == value) {
      value = 0.00;
    }
    return value;
  },

  /**
   * 浮点运算加
   * @param a
   * @param b
   */
  plus: function (a, b) {
    var c, d, e;
    try {
      c = a.toString().split(".")[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split(".")[1].length;
    } catch (f) {
      d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (CashConversionTool.multiply(a, e) + CashConversionTool.multiply(b, e)) / e;
  },

  /**
   * 浮点运算加,返回数组内各浮点数之和
   * @param array
   */
  plusForArray: function (arr) {
    var arr = arr || [];
    var result = 0.00;
    for (var i = 0; i < arr.length; i++) {
      result = this.plus(result, arr[i]);
    }
    return result;
  },
  /**
   * 浮点运算减
   * @param a
   * @param b
   */
  minus: function (a, b) {
    var c, d, e;
    try {
      c = a.toString().split(".")[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split(".")[1].length;
    } catch (f) {
      d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (CashConversionTool.multiply(a, e) - CashConversionTool.multiply(b, e)) / e;
  },
  /**
   * 浮点运算乘
   * @param a
   * @param b
   */
  multiply: function (a, b) {
    var c = 0,
      d = a.toString(),
      e = b.toString();
    try {
      c += d.split(".")[1].length;
    } catch (f) {}
    try {
      c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
  },
  /**
   * 浮点运算除
   * @param a
   * @param b
   */
  divided: function (a, b) {
    var c, d, e = 0,
      f = 0;
    try {
      e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
      f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), CashConversionTool.multiply(c / d, Math.pow(10, f - e));
  },
  /**
   * 精确到几位有效数字
   * @param value
   * @param placeholder
   * @returns {*}
   */
  toDecimal: function (value, placeholder) {
    var f = parseFloat(value);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(value * Math.pow(10, placeholder)) / Math.pow(10, placeholder);
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + placeholder) {
      s += '0';
    }
    return s;
  },
  /**
   * 至少显示多少位有效数字
   * @param value
   * @param placeholder
   */
  showDecimal: function (value, placeholder) {
    var s = value.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + placeholder) {
      s += '0';
    }
    return s;
  },
  amtUpCase: function (value) {
    //转成字符串
    value = value + "";
    if (value == "") {
      return value;
    } else if (!/^[-]{0,1}(\d+)\.?\d*$/.test(value)) {
      alert("交款金额输入有误");
      return value;
    }
    var isFushu = '';
    if (value.substring(0, 1) == '-') {
      isFushu = '负';
      value = value.substring(1, value.length);
    }
    var index_true = -1; //小数点位置
    var value_xs = ""; //小数点后面数据
    if (value.indexOf(".") != -1) {
      index_true = value.indexOf(".");
      //分小数和整数
      var value_zs = value.substring(0, index_true);
      value_xs = value.substring(index_true + 1, value.length);
      value = value_zs;
    }
    if (value_xs.length > 2) {
      value_xs = value_xs.substring(0, 2);
    }
    if (value.length > 8) {
      var lower1 = value.substring(0, value.length - 8);
      var lower2 = value.substring(value.length - 8, value.length - 4);
      var lower3 = value.substring(value.length - 4, value.length);
      var xs = "";
      var upper1 = monUp(lower1) + "亿";
      var upper2 = "";
      if (lower2 == "0000") {
        upper2 = "";
      } else if (lower2.indexOf("0") == 0) {
        upper2 = "零" + monUp(lower2) + "万";
      } else {
        upper2 = monUp(lower2) + "万";
      }
      var upper3 = "";
      if (lower3 == "0000") {
        if (value_xs == "") {
          upper3 = "元整";
        } else {
          upper3 = "元";
        }

      } else if (lower3.indexOf("0") == 0) {
        if (value_xs == "") {
          upper3 = "零" + CashConversionTool.monUp(lower3) + "元整";
        } else {
          upper3 = "零" + CashConversionTool.monUp(lower3) + "元";
        }
      } else {
        if (value_xs == "") {
          upper3 = monUp(lower3) + "元整";
        } else {
          upper3 = monUp(lower3) + "元";
        }
      }

      if (value_xs.length == 2) {
        xs = CashConversionTool.monUp(value_xs.substring(0, 1)) + "角" + CashConversionTool.monUp(value_xs.substring(1, 2)) + "分";
      } else if (value_xs.length == 1) {
        xs = CashConversionTool.monUp(value_xs.substring(0, 1)) + "角";
      }

      return isFushu + upper1 + upper2 + upper3 + xs;
    } else if (value.length > 4) {
      var lower1 = value.substring(0, value.length - 4);
      var lower2 = value.substring(value.length - 4, value.length);
      var upper1 = CashConversionTool.monUp(lower1) + "万";
      var upper2 = "";
      var xs = "";
      if (lower2 == "0000") {
        if (value_xs == "") {
          upper2 = "元整";
        } else {
          upper2 = "元";
        }
      } else if (lower2.indexOf("0") == 0) {
        if (value_xs == "") {
          upper2 = "零" + CashConversionTool.monUp(lower2) + "元整";
        } else {
          upper2 = "零" + CashConversionTool.monUp(lower2) + "元";
        }
      } else {
        if (value_xs == "") {
          upper2 = CashConversionTool.monUp(lower2) + "元整";
        } else {
          upper2 = CashConversionTool.monUp(lower2) + "元";
        }
      }

      if (value_xs.length == 2) {
        xs = CashConversionTool.monUp(value_xs.substring(0, 1)) + "角" + CashConversionTool.monUp(value_xs.substring(1, 2)) + "分";
      } else if (value_xs.length == 1) {
        xs = CashConversionTool.monUp(value_xs.substring(0, 1)) + "角";
      }

      return isFushu + upper1 + upper2 + xs;
    } else {
      var xs = "";
      if (value_xs.length == 2) {
        xs = CashConversionTool.monUp(value_xs.substring(0, 1)) + "角" + CashConversionTool.monUp(value_xs.substring(1, 2)) + "分";
      } else if (value_xs.length == 1) {
        xs = CashConversionTool.monUp(value_xs.substring(0, 1)) + "角";
      }
      if (value_xs == "") {
        return isFushu + CashConversionTool.monUp(value) + "元整";
      } else {
        return isFushu + CashConversionTool.monUp(value) + "元" + xs;
      }
    }
  },
  numUp: function (value) {
    switch (value) {
      case '0':
        return "零";
        break;
      case '1':
        return "壹";
        break;
      case '2':
        return "贰";
        break;
      case '3':
        return "叁";
        break;
      case '4':
        return "肆";
        break;
      case '5':
        return "伍";
        break;
      case '6':
        return "陆";
        break;
      case '7':
        return "柒";
        break;
      case '8':
        return "捌";
        break;
      case '9':
        return "玖";
        break;
    }
  },
  monUp: function (str) {
    //转成字符串
    str = str + "";
    //去首零
    while (str.length > 0 && str.substring(0, 1) == "0") {
      str = str.substring(1);
    }
    var sb = "";
    for (var i = 0; i < str.length; i++) {
      sb = sb + CashConversionTool.numUp(str.substring(i, i + 1));
    }
    if (sb.length == 0) {
      return "零";
    } else if (sb.length == 1) {
      return sb;
    } else if (sb.length == 2) {
      if (sb.substring(1, 2) == "零") { //例:10
        return sb.substring(0, 1) + "拾";
      } else { //例:11
        return sb.substring(0, 1) + "拾" + sb.substring(1, 2);
      }
    } else if (sb.length == 3) {
      if (sb.indexOf("零零") != -1) { //例:100
        sb = sb.substring(0, 1);
        return sb + "佰";
      } else if (sb.substring(1, 2) == "零") { //例:101
        return sb.substring(0, 1) + "佰" + sb.substring(1);
      } else if (sb.substring(2, 3) == "零") { //例:110
        return sb.substring(0, 1) + "佰" + sb.substring(1, 2) + "拾";
      } else { //例:111
        return sb.substring(0, 1) + "佰" + sb.substring(1, 2) + "拾" + sb.substring(2, 3);
      }
    } else if (sb.length == 4) {
      if (sb.indexOf("零零零") != -1) { //例:1000
        return sb.substring(0, 1) + "仟";
      } else if (sb.indexOf("零零") == 1) { //例:1001
        return sb.substring(0, 1) + "仟零" + sb.substring(3, 4);
      } else if (sb.indexOf("零零") == 2) { //例:1100
        return sb.substring(0, 1) + "仟" + sb.substring(1, 2) + "佰";
      } else if (sb.substring(1, 2) == "零" && sb.substring(3, 4) == "零") { //例:1010
        return sb.substring(0, 1) + "仟零" + sb.substring(2, 3) + "拾";
      } else if (sb.substring(1, 2) == "零") { //例:1011
        return sb.substring(0, 1) + "仟零" + sb.substring(2, 3) + "拾" + sb.substring(3, 4);
      } else if (sb.substring(2, 3) == "零") { //例:1101
        return sb.substring(0, 1) + "仟" + sb.substring(1, 2) + "佰零" + sb.substring(3, 4);
      } else if (sb.substring(3, 4) == "零") { //例:1110
        return sb.substring(0, 1) + "仟" + sb.substring(1, 2) + "佰" + sb.substring(2, 3) + "拾";
      } else { //例:1111
        return sb.substring(0, 1) + "仟" + sb.substring(1, 2) + "佰" + sb.substring(2, 3) + "拾" + sb.substring(3, 4);
      }
    }
  },
  /**
   * 经过精确度处理后得到的数值
   * @param num 原始数值,默认正数小数点后面为分
   * @param accuracy 精确度类型
   * @param deviationSign 尾差标识，若为true则返回真实尾差
   */
  getActualNumber: function (num, accuracy, deviationSign) {
    var _number = CashConversionTool.getNumHasDefault(num);
    var _actualNumber = '0.00';
    var _deviation = '0.00';
    switch (accuracy) {
      case CashConversionTool.ACCURACY_1:
        _actualNumber = Math.round(_number * 100) / 100;
        break;
      case CashConversionTool.ACCURACY_2:
        _actualNumber = Math.floor(_number * 10) / 10;
        break;
      case CashConversionTool.ACCURACY_3:
        _actualNumber = Math.round(_number * 10) / 10;
        break;
      case CashConversionTool.ACCURACY_4:
        _actualNumber = Math.ceil(_number * 10) / 10;
        break;
      default:
        break;
    }
    if (deviationSign) {
      return CashConversionTool.toDecimal(num - _actualNumber, 4)
    }
    return _actualNumber;
  },
  /**
   * 经过精确度处理后得到的数值,兼容正负数
   * @param num
   * @param accuracy
   * @param deviationSign
   * @returns {*}
   */
  getAccuracyNumber: function (num, accuracy, deviationSign) {
    var _number = CashConversionTool.getNumHasDefault(num);
    var _actualNumber = '0.00';
    var positiveNumber = Math.abs(_number);
    switch (accuracy) {
      case CashConversionTool.ACCURACY_1:
        _actualNumber = Math.round(positiveNumber * 100) / 100;
        if (_number < 0) {
          _actualNumber = _actualNumber * (-1);
        }
        _actualNumber = _actualNumber.toFixed(2);
        break;
      case CashConversionTool.ACCURACY_2:
        _actualNumber = Math.floor(positiveNumber * 10) / 10;
        if (_number < 0) {
          _actualNumber = _actualNumber * (-1);
        }
        _actualNumber = _actualNumber.toFixed(1);
        break;
      case CashConversionTool.ACCURACY_3:
        _actualNumber = Math.round(positiveNumber * 10) / 10;
        if (_number < 0) {
          _actualNumber = _actualNumber * (-1);
        }
        _actualNumber = _actualNumber.toFixed(1);
        break;
      case CashConversionTool.ACCURACY_4:
        _actualNumber = Math.ceil(positiveNumber * 10) / 10;
        if (_number < 0) {
          _actualNumber = _actualNumber * (-1);
        }
        _actualNumber = _actualNumber.toFixed(1);
        break;
      default:
        break;
    }
    if (deviationSign) {
      _actualNumber = CashConversionTool.toDecimal(num - _actualNumber, 4)
    }
    return _actualNumber;
  }
};
