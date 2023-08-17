<template>
  <div class="container">
    <a-card title="修改密码" style="width: 30rem">
      <a-form ref="userRef" name="custom-validation" :model="user" :rules="userrules" v-bind="layout"
        @finish="handleFinish" @finishFailed="handleFinishFailed">
        <a-form-item has-feedback label="密码" name="password">
          <a-input v-model:value="user.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPass">
          <a-input v-model:value="user.checkPass" type="password" autocomplete="off" />
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
    import {user,userrules} from '@/utils/userupdateValidator';
    
    export default defineComponent({
      setup() {
        const userRef = ref<FormInstance>();
        const store = useStore();
        const router = useRouter();
    
        // 布局
        const layout = {
          labelCol: { span: 5 },
          wrapperCol: { span: 18 },
        };
    
        const handleFinish = (values) => {
          store.dispatch('userModule/update',{password:values.password}).then(()=>{
            Modal.success({
              title: '修改成功',
            });
            router.push({path:'/login',query:{key:new Date().getTime()}});
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