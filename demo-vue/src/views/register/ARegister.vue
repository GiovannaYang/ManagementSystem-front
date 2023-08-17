<template>
  <div class="container">
    <a-card title="管理员注册" style="width: 30rem">
      <a-form ref="adminRef" name="custom-validation" :model="admin" :rules="adminrules" v-bind="layout"
        @finish="handleFinish" @finishFailed="handleFinishFailed">
        <a-form-item has-feedback label="邮箱" name="email">
          <a-input v-model:value="admin.email" type="email" />
        </a-form-item>
        <a-form-item has-feedback label="用户名" name="name">
          <a-input v-model:value="admin.name" type="text" />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="password">
          <a-input v-model:value="admin.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPass">
          <a-input v-model:value="admin.checkPass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { notification, Modal } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {admin,adminrules} from '@/utils/aregisterValidator';

export default defineComponent({
  
  setup() {
    const adminRef = ref<FormInstance>();
    const store = useStore();
    const router = useRouter();

    // 布局
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };

    const handleFinish = (values) => {
      store.dispatch('adminModule/register',{email:values.email,name:values.name,password:values.password}).then(()=>{
        Modal.success({
          title: '注册成功',
        });
        router.push('/')
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
      admin,
      adminRef,
      adminrules,
      layout,
      handleFinish,
      handleFinishFailed,
      
    };
  },
});
</script>

<style scoped>
.container {
  text-align: -webkit-center;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>