<template>
    <div class="container">
        <a-card title="忘记密码" style="width: 30rem">
            <a-form ref="adminRef" name="custom-validation" :model="admin" :rules="adminrules" v-bind="layout"
                @finish="handleFinish">
                <a-form-item has-feedback label="邮箱" name="email">
                    <a-input v-model:value="admin.email" type="text" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
            <a-divider />
            请输入邮箱，密码将发至您的邮箱中。
        </a-card>
    </div>
</template>
<script lang="ts">
import { notification, Modal } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, defineComponent } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { admin, adminrules} from '@/utils/aregisterValidator';

export default defineComponent({
  setup() {
    const userRef = ref<FormInstance>();
    const store = useStore();
    const router = useRouter();

    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };

    const handleFinish = (values) => {
        store.dispatch('adminModule/forget',values.email).then(()=>{
          Modal.success({
            title: '发送成功',
          });
          router.push({path:'/',query:{key:new Date().getTime()}});
        }).catch((err)=>{
          notification['error']({
            message: '数据验证错误',
            description: err.response.data.msg,
          });
        });
    };

    return {
      handleFinish,
      admin,
      userRef,
      adminrules,
      layout,
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