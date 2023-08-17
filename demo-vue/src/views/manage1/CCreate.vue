<template>
  <a-button type="primary" shape="round" @click="showModal">创建班级</a-button>
  <a-modal v-model:visible="visible" title="创建班级" :confirm-loading="confirmLoading" @ok="handleOk">
    <a-form ref="claRef" name="custom-validation" :model="class" :rules="clarules" v-bind="layout">
      <a-form-item has-feedback label="班级ID" name="classid">
        <a-input v-model:value="cla.name" type="text" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
  import { ref, reactive, defineComponent } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import type { FormInstance } from 'ant-design-vue';
  import { useStore } from 'vuex';
  import { notification, message } from 'ant-design-vue';
  import { ClassInfo, classData, GetClassData } from '@/utils/classdata';
  
  interface Cla {
    name: string;
  }
  const cla = reactive<Cla>({
    name: "",
  });

  let checkid = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('请输入班级ID');
    } else if(value.length<2||value.length>20){
      return Promise.reject('班级ID的长度应为2位到20位');
    }else if(!/^[0-9]$/.test(value)){
        return Promise.reject('班级ID格式不正确');
    }else{
      return Promise.resolve();
    }
  };

  const clarules: Record<string, Rule[]> = {
    id: [{ required: true, validator: checkid, trigger: 'blur' }],
  };

  export default defineComponent({
    setup() {
      const visible = ref<boolean>(false);
      const confirmLoading = ref<boolean>(false);
      const claRef = ref<FormInstance>();
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
          store.dispatch('adminModule/addclass',cla.name).then(()=>{
              message.success('添加成功');
              GetClassData().then((data: ClassInfo[]) => {
                classData.list = data;
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
        cla,
        claRef,
        clarules,
        layout,
      };
    },
  });
  </script>