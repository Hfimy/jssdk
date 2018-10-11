const defaultErrPrompt = '神秘力量正在干扰';

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
    return error.msg || '数据解析异常';
  }

  let err = 0; // 默认值
  let title = defaultErrPrompt; // 默认值

  if (typeof error === 'number') {
    err = error;
  }

  switch (err) {
    case 4:
      title = '客户端异常';
      break;
    case 5:
      title = '服务端异常';
      break;
    case 6:
      title = '请求超时';
      break;
    default:
      title = defaultErrPrompt;
      break;
  }
  return title;
}

function addLoading() {
  if (document.getElementById('loading')) return;

  const container = document.createElement('div');
  container.setAttribute('id', 'loading');
  container.classList.add('hide');

  const imageSrc = require('../image/loading.gif');
  const image = document.createElement('img');
  image.src = imageSrc;

  const title = document.createElement('div');
  title.setAttribute('id', 'loadingTitle');

  container.appendChild(image);
  container.appendChild(title);

  document.body.appendChild(container);
}
function showLoading({ title = '加载中', mask = false }) {
  if (mask) {
    showMaskLayer();
  }
  const loading = document.getElementById('loading');
  const loadingTitle = document.getElementById('loadingTitle');

  if (!loading || !loadingTitle) return;

  loadingTitle.innerText = title;
  loading.classList.remove('hide');
}
function hideLoading() {
  hideMaskLayer();

  const loading = document.getElementById('loading');
  if (!loading) return;
  loading.classList.add('hide');
}

function addMaskLayer() {
  if (document.getElementById('maskLayer')) return;

  const maskLayer = document.createElement('div');
  maskLayer.setAttribute('id', 'maskLayer');
  maskLayer.classList.add('hide');
  document.body.appendChild(maskLayer);
}
function showMaskLayer() {
  const maskLayer = document.getElementById('maskLayer');
  if (!maskLayer) return;
  maskLayer.classList.remove('hide');
}
function hideMaskLayer() {
  const maskLayer = document.getElementById('maskLayer');
  if (!maskLayer) return;
  maskLayer.classList.add('hide');
}

function showModal(id) {
  const layer = document.getElementById('layer');
  const modal = document.getElementById(id);
  layer.classList.remove('hide');
  modal.classList.remove('hide');
}
function hideModal(id) {
  const layer = document.getElementById('layer');
  const modal = document.getElementById(id);
  layer.classList.add('hide');
  modal.classList.add('hide');
}

function scrollToTop(cb) {
  let currentPosition;
  const speed = 8;
  const timer = setInterval(() => {
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    if (currentPosition > 0) {
      window.scrollTo(0, currentPosition);
      return;
    }
    clearInterval(timer);
    window.scrollTo(0, 0);
    cb && cb();
  });
}

function initSDK() {
  addToast();
  addLoading();
  addMaskLayer();
}

export {
  initSDK,
  message,
  messageAsync,
  formatErrMessage,
  showLoading,
  hideLoading
};
