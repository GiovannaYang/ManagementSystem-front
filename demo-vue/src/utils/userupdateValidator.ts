import type { Rule } from 'ant-design-vue/es/form';
import { reactive } from 'vue';

interface User {
    password: string;
    checkPass: string;
  }

export const user = reactive<User>({
    password: '',
    checkPass: '',
});

  let validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入密码');
      } else if(value.length<6||value.length>30){
        return Promise.reject('密码的长度应为6位到30位');
      }else{
        return Promise.resolve();
      }
  };
  let validatePass2 = async (_rule: Rule, value: string) => {
    if (user.password!==''&&value === '') {
      return Promise.reject('请再次输入密码');
    } else if (value !== user.password) {
      return Promise.reject("两次输入不相同");
    } else {
      return Promise.resolve();
    }
  };

  // 校验规则
export const userrules: Record<string, Rule[]> = {
    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
};