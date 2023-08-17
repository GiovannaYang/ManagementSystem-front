import request from '@/utils/request';

// 用户注册
const register = ({ email, name, password }:any) => {
  return request.post('admin/register', { email, name, password });
};

// 用户登录
const login = ({ email, password }:any) => {
  return request.post('admin/login', { email, password });
};

// 获取用户信息
const info = () => {
  return request.get('admin/info');
};

const update =({id, name, password})=>{
  return request.put('admin/'+id, {name, password});
};

const remove = ({id}) => {
  return request.delete('admin/'+id);
};

const show = () => {
  return request.get('admin/show');
}

const search = (word) => {
  return request.get('admin/search', { params: { word } });
}

const msg = () =>{
  return request.get('message/show');
}

const removemsg=({sid})=>{
  return request.delete('message/'+sid);
}

const addclass=({Name})=>{
  return request.post('class/add',{Name});
}

const showclass=() => {
  return request.get('class/show');
}

const deleteclass=({name})=>{
  return request.delete('class/'+name);
}

const updateclass =({name, SchoolName, MajorName})=>{
  return request.post('class/'+name, {SchoolName, MajorName});
};

export default {
  register,
  info,
  login,
  update,
  remove,
  show,
  search,
  msg,
  removemsg,
  addclass,
  showclass,
  deleteclass,
  updateclass,
};
