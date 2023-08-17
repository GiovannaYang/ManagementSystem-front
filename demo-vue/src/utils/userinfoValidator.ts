import type { Rule } from 'ant-design-vue/es/form';
import { reactive } from 'vue';


interface Info {
    name: string;
    major: string,
    classname: string,
    gender: string;
    email: string;
    telephone: string;
}

export const info = reactive<Info>({
    name: '',
    major: '',
    classname: '',
    gender: '',
    email: '',
    telephone: '',
});

let validateName = async (_rule: Rule, value: string) => {
    if (value !== '' && value.length<2||value.length>5){
        return Promise.reject('姓名应为2到5位');
    }else{
        return Promise.resolve();
    }
};

let validateClass = async (_rule: Rule, value: string) => {
    if (value !== '' && value.length<2||value.length>20){
        return Promise.reject('班级ID长度应为2到20位');
    }else if(!/^[0-9]\d{2,20}$/.test(value)){
        return Promise.reject('班级ID格式不正确');
    }else{
        return Promise.resolve();
    }
};

let checkEmail = async (_rule: Rule, value: string) => {
    if (value !== ''&&!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(value) ){
        return Promise.reject('邮箱格式不正确');
    }else{
        return Promise.resolve();
    }
};

let validateTelephone = (_rule: Rule, value: string) => {
    if (value!=='' && value.length!==11){
        return Promise.reject('手机号应为11位');
    }else if (value!==''&&!/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
        return Promise.reject('手机号格式不正确');
    } else {
        return Promise.resolve();
    }
};

// 校验规则
export const inforules: Record<string, Rule[]> = {
    name: [{ validator: validateName, trigger: 'blur' }],
    email: [{ validator: checkEmail, trigger: 'blur' }],
    classname: [{ validator: validateClass, trigger: 'blur' }],
    telephone: [{ validator: validateTelephone, trigger: 'blur' }],
};