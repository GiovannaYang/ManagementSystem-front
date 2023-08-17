<template>
  <div style="text-align: -webkit-center">
    <a-card title="修改信息" style="width: 30rem">
      <a-form ref="infoRef" name="custom-validation" :model="info" :rules="inforules" v-bind="layout"
        @finish="handleFinish" @finishFailed="handleFinishFailed">
        <a-form-item has-feedback label="姓名" name="name">
          <a-input v-model:value="info.name" type="text" />
        </a-form-item>
        <a-form-item has-feedback label="性别" name="gender">
          <a-radio-group v-model:value="info.gender">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item has-feedback label="邮箱" name="email">
          <a-input v-model:value="info.email" type="text" />
        </a-form-item>
        <a-form-item has-feedback label="电话" name="telephone">
          <a-input v-model:value="info.telephone" type="text" />
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
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { notification, Modal } from 'ant-design-vue';
import { info, inforules} from '@/utils/userinfoValidator';

export default defineComponent({
  setup() {
    const infoRef = ref<FormInstance>();
    const store = useStore();
    const router = useRouter();

    // 布局
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };

    const handleFinish = (values) => {
      store.dispatch('userModule/updateinfo',{name:values.name,gender:values.gender, email:values.email, telephone:values.telephone}).then(()=>{
        Modal.success({
          title: '修改成功',
        });
        router.push({path:'/profile',query:{key:new Date().getTime()}});
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
      info,
      inforules,
      infoRef,
      layout,
      handleFinish,
      handleFinishFailed,
    };
  },
});
</script>
