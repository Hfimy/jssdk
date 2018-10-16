// 主要作用在于利用缓存避免同一个函数多次执行
function createSelector(initialState, fn) {
  let lastState = initialState;
  let result = fn(initialState);
  return state => {
    if (JSON.stringify(state) === JSON.stringify(lastState)) {
      return result;
    }
    lastState = state;
    result = fn(state);
    return result;
  };
}
