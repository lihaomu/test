/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
};

/**
 * @param {Date} date 传入的Date对象
 */
const isToday = date => {
  return new Date().toDateString() === date.toDateString()
};

/**
 * @param {Date} date 传入的Date对象
 */
const isThisYear = date => {
  return new Date().getFullYear() === date.getFullYear()
};


/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
const getRelativeTime = (timeStamp) => {
  // 获取两个时间戳差值
  let diff = Date.now() - timeStamp;

  if (diff < 120000) {                                                    // < 120s
    return '1分钟前'
  } else if (diff < 3600000) {                                            // < 60min
    return ~~ (diff / 60000) + '分钟前'
  } else {
    let time   = new Date(timeStamp);
    let year   = time.getFullYear();
    let month  = getHandledValue(time.getMonth() + 1);
    let date   = getHandledValue(time.getDate());
    let hour   = getHandledValue(time.getHours());
    let minute = getHandledValue(time.getMinutes());

    if (isToday(time)) {                                                  // 今天
      return '今天 ' + hour + ':' + minute
    } else if (isThisYear(time)) {                                        // 今年
      return month + '/' + date + ' ' + hour + ':' + minute
    } else {                                                              // 跨年
      return year + '/' + month + '/' + date + ' ' + hour + ':' + minute
    }
  }
};

export default function (timestamp) {
  return getRelativeTime(timestamp)
}
