<template>
  <div class="container">
    <a-card title="修改信息" style="width: 30rem">
      <a-form ref="adminRef" name="custom-validation" :model="admin" :rules="adminrules" v-bind="layout"
        @finish="handleFinish" @finishFailed="handleFinishFailed">
        <a-form-item has-feedback label="用户名" name="name">
          <a-input v-model:value="admin.name" type="text" />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="password">
          <a-input v-model:value="admin.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="checkPass" v-if="admin.password">
          <a-input v-model:value="admin.checkPass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-divider />
    <a-button @click="remove()">注销账号</a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, createVNode } from 'vue';
  import type { FormInstance } from 'ant-design-vue';
  import { notification, Modal } from 'ant-design-vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import {admin,adminrules} from '@/utils/aupdateValidator';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  
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
        store.dispatch('adminModule/update',{name:values.name,password:values.password}).then(()=>{
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

      const remove = () =>{
        Modal.confirm({
          title: '是否确定注销账号？',
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode('div', { style: 'color:red;' }, '账号一旦删除无法恢复！'),
          onOk() {
            store.dispatch('adminModule/delete').then(()=>{
              Modal.success({
                title: '删除成功',
              });
              router.push('/')
            }).catch((err)=>{
              notification['error']({
                message: '数据验证错误',
                description: err.response.data.msg,
              });
            });
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      }
  
      return {
        admin,
        adminRef,
        adminrules,
        layout,
        handleFinish,
        handleFinishFailed,
        remove,
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