<template>
  <a-button type="primary" shape="round" @click="showModal">添加用户</a-button>
  <a-modal v-model:visible="visible" title="添加用户" :confirm-loading="confirmLoading" @ok="handleOk">
    <a-form ref="userRef" name="custom-validation" :model="user" :rules="userrules" v-bind="layout">
      <a-form-item has-feedback label="学号" name="sid">
        <a-input v-model:value="user.sid" type="text" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { useStore } from 'vuex';
import { notification, message } from 'ant-design-vue';
import { user, userrules} from '@/utils/useraddValidator';
import { UserInfo, userData, GetData } from '@/utils/data';

export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);
    const userRef = ref<FormInstance>();
    const store = useStore();

    // 布局
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
        store.dispatch('userModule/register',user.sid).then(()=>{
            message.success('添加成功');
            GetData().then((data: UserInfo[]) => {
              userData.list = data;
            });
            confirmLoading.value = true;
            setTimeout(() => {
                visible.value = false;
                confirmLoading.value = false;
            }, 0);
        }).catch((err)=>{
            notification['error']({
                message: '数据验证错误',
                description: err.response.data.msg,
            });
        });
    };

    return {
      visible,
      confirmLoading,
      showModal,
      handleOk,
      user,
      userRef,
      userrules,
      layout,
    };
  },
});
</script>