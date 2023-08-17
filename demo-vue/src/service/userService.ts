import request from '@/utils/request';

// 用户注册
const register = ({ sid, password }:any) => {
  return request.post('auth/register', { sid, password });
};

// 用户登录
const login = ({ sid, password }:any) => {
  return request.post('auth/login', { sid, password });
};

// 获取用户信息
const info = () => {
  return request.get('auth/info');
};

const update =({id, password})=>{
  return request.put('auth/'+id, {password});
};

const updateinfo =({id, name, classname, gender, email, telephone})=>{
  return request.post('auth/'+id, {name, classname, gender, email, telephone});
};

const remove = ({id}) => {
  return request.delete('auth/'+id);
};

const message = ({sid}:any) => {
  return request.post('message', {sid});
};

export default {
  register,
  info,
  login,
  update,
  updateinfo,
  remove,
  message,
};
