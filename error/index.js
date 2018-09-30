function addToast() {
  if (document.getElementById('toast')) return;

  const toast = document.createElement('div');
  toast.setAttribute('id', 'toast');
  toast.classList.add('hide');
  document.body.appendChild(toast);
}

function message(msg = defaultErrPrompt, seconds = 3, cb) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.remove('hide');
  setTimeout(() => {
    toast.classList.add('hide');
    cb && cb();
  }, seconds * 1000);
}

function messageAsync(msg = defaultErrPrompt, seconds = 3, cb) {
  setTimeout(() => {
    message(msg, seconds, cb);
  });
}

function formatErrMessage(error) {
  if (typeof error === 'object') {
    // 如果error由throw抛出，则识别为数据解析异常
    return '数据解析异常';
  }

  let err = 0; // 默认值
  let title = defaultErrPrompt; // 默认值

  if (typeof error === 'number') {
    err = error;
  }

  switch (err) {
    // ret非0 服务异常 提示errMsg||defaultErrPrompt
    case 0:
      title = defaultErrPrompt;
      break;
    case 1:
      title = '服务异常';
      break;
    case 4:
      title = '客户端异常';
      break;
    case 5:
      title = '服务端异常';
      break;
    case 6:
      title = '请求超时';
      break;
  }
  return title;
}

export { message, messageAsync };
