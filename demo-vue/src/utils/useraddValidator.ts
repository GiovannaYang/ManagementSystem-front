import type { Rule } from 'ant-design-vue/es/form';
import { reactive } from 'vue';

interface User {
    sid: string;
}

export const user = reactive<User>({
    sid: "",
});

let checkSid = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请输入学号');
    } else if(value.length<3||value.length>20){
      return Promise.reject('学号的长度应为3位到20位');
    }else{
      return Promise.resolve();
    }
};

  // 校验规则
export const userrules: Record<string, Rule[]> = {
    sid: [{ required: true, validator: checkSid, trigger: 'blur' }],
};