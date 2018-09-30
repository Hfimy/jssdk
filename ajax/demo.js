import request from './request.js';
const queryUrl = 'www.baidu.com';

request
  .get(queryUrl)
  .then(res => {
    // 未登录;
    // if (res.ret === 50) {
    //   goLogin();
    //   return;
    // }

    if (res.ret !== 0) {
      // 服务异常
      return Promise.reject(1);
    }
    // fillInfo(res.data);
  })
  .catch(err => {
    // messageAsync(formatErrMessage(err));
  });
