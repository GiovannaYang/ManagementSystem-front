<template>
  <a-form ref="aloginRef" name="custom-validation" :model="alogin" :rules="aloginrules" v-bind="layout"
    @finish="handleFinish" @finishFailed="handleFinishFailed">
    <a-form-item has-feedback label="邮箱" name="email">
      <a-input v-model:value="alogin.email" type="email" />
    </a-form-item>
    <a-form-item has-feedback label="密码" name="password">
      <a-input v-model:value="alogin.password" type="password" autocomplete="off" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
  <a-button type="link" @click="$router.replace({name:'adminpass'})">忘记密码？</a-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { notification, Modal } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {alogin,aloginrules} from '@/utils/aloginValidator';

export default defineComponent({
  setup() {
    const aloginRef = ref<FormInstance>();
    const store = useStore();
    const router = useRouter();

    // 布局
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const handleFinish = (values) => {
      store.dispatch('adminModule/login',{email:values.email,password:values.password}).then(()=>{
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
      alogin,
      aloginRef,
      aloginrules,
      layout,
      handleFinish,
      handleFinishFailed,
    };
  },
});
</script>