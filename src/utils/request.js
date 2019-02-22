// 主要是对 wx.request 方法进行封装
// 1. 用 Promise 封装

function request(url, method = "GET", data = {}) {
  // 调用 request 函数返回 Promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      success: res => {
        resolve(res);
      }
    });
  });
}

request.baseURL = "https://www.zhengzhicheng.cn/api/public/v1/";

request.get = function(url, data) {
  return request(request.baseURL + url, "GET", data);
};
// 导出 request 函数
export default request;
