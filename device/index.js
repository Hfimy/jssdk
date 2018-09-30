function isIphone() {
  // 区分iOS平台或者安卓平台
  // const userAgent = window.navigator.userAgent.toLowerCase();
  // const isIphone = userAgent.indexOf('iphone') > -1;
  // const isAndroid = userAgent.indexOf('android') > -1;
  const deviceType = !!window.navigator.userAgent.match(
    /\(i[^;]+;( U;)? CPU.+Mac OS X/
  )
    ? 'ios'
    : 'android';
  if (deviceType === 'ios') {
    return true;
  }
  return false;
}

export { isIphone };
