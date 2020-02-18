//时间转换
function dateFormat(obj,fmt){
  let dateTime = new Date(obj)
  var o = {
    "M+" : dateTime.getMonth()+1,                 //月份
    "d+" : dateTime.getDate(),                    //日
    "h+" : dateTime.getHours(),                   //小时
    "m+" : dateTime.getMinutes(),                 //分
    "s+" : dateTime.getSeconds(),                 //秒
    "q+" : Math.floor((dateTime.getMonth()+3)/3), //季度
    "S"  : dateTime.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (dateTime.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
//会议类型映射
function filterMeetingType(param){
  let meetingType = ''
  param = Number(param)
  switch(param){
    case 1:
      meetingType =  "初期会议"
      break;
    case 2:
      meetingType =   "中期会议"
      break;
    case 3:
      meetingType =   "末期会议"
      break;
    default:
      meetingType =   "初期会议"
  }
  return meetingType
}
//评定类型
function assessmentType(param){
  let assessmentType = ''
  param = Number(param)
  switch(param){
    case 1:
      assessmentType =  "初期评定"
      break;
    case 2:
      assessmentType =   "中期评定"
      break;
    case 3:
      assessmentType =   "末期评定"
      break;
    default:
      assessmentType =   "初期评定"
  }
  return assessmentType
}
//状态
function exec_state(param){
  let state = ''
  switch(param){
    case 1:
      state =  "已执行"
      break;
    case 0:
      state =   "未执行"
      break;
    default:
      state =   "未执行"
  }
  return state
}
//病历返回状态映射
function medical_record_state(param){
  let state = ''
  param = Number(param)
  switch(param){
    case 0:
      state =  "未完成"
      break;
    case 1:
      state =   "完成"
      break;
    case 2:
      state =   "归档"
      break;
    case 3:
      state =   "连续"
      break;
    case 4:
      state =   "退回"
      break;
    case 5:
      state =   "病案评分"
      break;
    default:
      state =   "未完成"
  }
  return state
}
//获取前n天时间
function getBeforeDate(n){
  var n = n;
  var s;
  var d = new Date();
  var year = d.getFullYear();
  var mon=d.getMonth()+1;
  var day=d.getDate();
  if(day <= n){
    if(mon>1) {
      mon=mon-1;
    }
    else {
      year = year-1;
      mon = 12;
    }
  }
  d.setDate(d.getDate()-n);
  year = d.getFullYear();
  mon=d.getMonth()+1;
  day=d.getDate();
  s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day) + ' 00:00:00';
  return s;
}
//人员角色
function role(param){
  let state = ''
  param = Number(param)
  switch(param){
    case 1:
      state =   "医生"
      break;
    case 2:
      state =   "护士"
      break;
    default:
      state =   "医生"
  }
  return state
}
export {dateFormat,filterMeetingType,assessmentType,exec_state,medical_record_state,getBeforeDate,role}
