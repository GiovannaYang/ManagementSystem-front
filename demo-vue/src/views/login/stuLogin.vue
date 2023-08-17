<template>
  <a-form ref="userRef" name="custom-validation" :model="user" :rules="userrules" v-bind="layout" @finish="handleFinish"
    @finishFailed="handleFinishFailed">
    <a-form-item has-feedback label="学号" name="sid">
      <a-input v-model:value="user.sid" type="text" />
    </a-form-item>
    <a-form-item has-feedback label="密码" name="password">
      <a-input v-model:value="user.password" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
  <a-button type="link" @click="$router.replace({name:'stupass'})">忘记密码？</a-button>
</template>
<script lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import { defineComponent, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { useStore } from 'vuex';
import { notification, Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';

interface User {
  sid: string;
  password: string;
}

export default defineComponent({
  setup() {
    const userRef = ref<FormInstance>();
    const store = useStore();
    const router = useRouter();
    const user = reactive<User>({
      sid: '',
      password: '',
    });

    // 校验规则细则
    let checkSid = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('请输入学号');
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
    const userrules: Record<string, Rule[]> = {
      sid: [{ required: true, validator: checkSid, trigger: 'blur' }],
      password: [{ required: true, validator: validatePass, trigger: 'blur' }],
    };

    // 布局
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const handleFinish = (values: User) => {
      store.dispatch('userModule/login',{sid:values.sid,password:values.password}).then(()=>{
        Modal.success({
            title: '登录成功',
        });
        router.push({path:'/',query:{key:new Date().getTime()}});
      }).catch((err)=>{
        notification['error']({
          message: '数据验证错误',
          description: err.response.data.msg,
        });
      });
    };
    const handleFinishFailed = errors => {
      console.log(errors);
    };

    return {
      user,
      userRef,
      userrules,
      layout,
      handleFinish,
      handleFinishFailed,
    };
  },
});
</script>
