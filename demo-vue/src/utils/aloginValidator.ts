import type { Rule } from 'ant-design-vue/es/form';
import { reactive } from 'vue';

interface Alogin {
    email: string;
    password: string;
}

export const alogin = reactive<Alogin>({
    email: '',
    password: '',
});

// 校验规则细则
let checkEmail = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请输入邮箱');
    }else if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(value) ){
      return Promise.reject('邮箱格式不正确');
    }else{
      return Promise.resolve();
    }
};
let validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请输入密码');
    } else if(value.length<6||value.length>30){
      return Promise.reject('密码的长度应为6位到30位');
    }else{
      return Promise.resolve();
    }
};

  // 校验规则
export const aloginrules: Record<string, Rule[]> = {
    email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
};