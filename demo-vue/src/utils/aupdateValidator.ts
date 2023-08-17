import type { Rule } from 'ant-design-vue/es/form';
import { reactive } from 'vue';

interface Admin {
    name: string;
    password: string;
    checkPass: string;
  }

export const admin = reactive<Admin>({
    name: '',
    password: '',
    checkPass: '',
});

  let checkName = async(_rule: Rule, value: string)=>{
      if (value === '') {
      return Promise.resolve();
    } else if(value.length>15){
      return Promise.reject('用户名的长度应不大于15位');
    }else{
      return Promise.resolve();
    }
  };
  let validatePass = async (_rule: Rule, value: string) => {
    if(value!==''&&value.length<6||value.length>30){
      return Promise.reject('密码的长度应为6位到30位');
    }else{
      return Promise.resolve();
    }
  };
  let validatePass2 = async (_rule: Rule, value: string) => {
    if (admin.password!==''&&value === '') {
      return Promise.reject('请再次输入密码');
    } else if (value !== admin.password) {
      return Promise.reject("两次输入不相同");
    } else {
      return Promise.resolve();
    }
  };

  // 校验规则
export const adminrules: Record<string, Rule[]> = {
    name: [{ validator: checkName, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
};