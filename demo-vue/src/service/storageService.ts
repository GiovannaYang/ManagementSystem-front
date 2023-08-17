// 本地缓存服务
const PREFIX = 'demo_';

// user 模块
const USER_PREFIX = `${PREFIX}user_`;
const USER_TOKEN = `${USER_PREFIX}token_`;
const USER_INFO = `${USER_PREFIX}info`;

// 储存
const set = (key:any, data:any) => {
  localStorage.setItem(key, data);
};

// 读取
const get = (key:any) => localStorage.getItem(key);

export default {
  set,
  get,
  USER_INFO,
  USER_TOKEN,
};
