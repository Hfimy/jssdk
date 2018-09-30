/**
 * 0 显示默认错误
 * 1 ret非0 服务异常 提示errMsg||defaultErrPrompt
 * 2 数据解析异常,由业务层抛出
 * 4 客户端异常 4xx
 * 5 服务端异常 5xx
 * 6 请求超时
 */

function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // async
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 10 * 1000;
    xhr.withCredentials = true;
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
          return;
        }

        // 错误统一提示
        if (xhr.status >= 400 && xhr.status < 500) {
          reject(4);
          return;
        }

        if (xhr.status > 500) {
          reject(5);
          return;
        }
        // 默认情况
        reject(0);
      }
    };
    xhr.ontimeout = function() {
      reject(6);
    };
  });
}

function post(url, type = 'json', data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.withCredentials = true;
    switch (type) {
      case 'json': {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        break;
      }
      case 'form': {
        xhr.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        );
        xhr.send(getFormString(data));
        break;
      }
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
          return;
        }

        // 错误统一提示
        if (xhr.status >= 400 && xhr.status < 500) {
          reject(4);
          return;
        }

        if (xhr.status > 500) {
          reject(5);
          return;
        }
        // 默认情况
        reject(0);
      }
    };
  });
}

function getFormString(data) {
  const arr = [];
  Object.keys(data).forEach(item => {
    arr.push(`${item}=${data[item]}`);
  });
  return arr.join('&');
}

export default { get, post };
