<template>
  <a-button type="primary" @click="showModal">编辑</a-button>
  <a-modal v-model:visible="visible" title="修改信息" :confirm-loading="confirmLoading" @ok="handleOk">
    <a-form ref="infoRef" name="custom-validation" :model="info" :rules="inforules" v-bind="layout">
      <a-form-item has-feedback label="姓名" name="name">
        <a-input v-model:value="info.name" type="text" />
      </a-form-item>
      <a-form-item has-feedback label="性别" name="gender">
        <a-radio-group v-model:value="info.gender">
          <a-radio value="男">男</a-radio>
          <a-radio value="女">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item has-feedback label="班级" name="classname">
        <a-input v-model:value="info.classname" type="text" />
      </a-form-item>
      <a-form-item has-feedback label="邮箱" name="email">
        <a-input v-model:value="info.email" type="text" />
      </a-form-item>
      <a-form-item has-feedback label="电话" name="telephone">
        <a-input v-model:value="info.telephone" type="text" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import type { FormInstance } from 'ant-design-vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { notification, Modal } from 'ant-design-vue';
  import { info, inforules} from '@/utils/userinfoValidator';
  import { UserInfo, userData, GetData } from "@/utils/data";

  export default defineComponent({
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const visible = ref<boolean>(false);
      const confirmLoading = ref<boolean>(false);
      const infoRef = ref<FormInstance>();
      const store = useStore();
      const router = useRouter();
  
      // 布局
      const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
      };
  
      const showModal = () => {
        visible.value = true;
      };
  
      const handleOk = () => {
        store.dispatch('userModule/updateinfo2',{id:props.id, name:info.name, major:info.major, classname:info.classname, gender:info.gender, email:info.email, telephone:info.telephone}).then(()=>{
        Modal.success({
          title: '修改成功',
        });
        GetData().then((data: UserInfo[]) => {
            userData.list = data;
        });
        confirmLoading.value = true;
        setTimeout(() => {
            visible.value = false;
            confirmLoading.value = false;
        }, 0);
        router.push({path:'/manage',query:{key:new Date().getTime()}});
      }).catch((err)=>{
        notification['error']({
          message: '数据验证错误',
          description: err.response.data.msg,
        });
      });
      };
      return {
        info,
        inforules,
        visible,
        confirmLoading,
        showModal,
        handleOk,
        infoRef,
        layout,
      };
    },
  });
  </script>