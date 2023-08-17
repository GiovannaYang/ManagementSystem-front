<template>
  <a-button type="danger" @click="removebatch()">删除</a-button>
</template>
    
<script lang="ts">
    import { createVNode, ref } from "vue";
    import { notification, Modal } from "ant-design-vue";
    import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { ClassInfo, classData, GetClassData } from "@/utils/classdata";
    
    export default {
      props: {
        name: {
          type: String,
          required: true,
        },
      },
      setup(props) {
        const store = useStore();
        const router = useRouter();
        const visible = ref<boolean>(false);
        const confirmLoading = ref<boolean>(false);
        const removebatch = () => {
          Modal.confirm({
            title: "是否确定删除?",
            icon: createVNode(ExclamationCircleOutlined),
            content: createVNode("div", { style: "color:red;" }, "班级一旦删除无法恢复！"),
            onOk() {
              store.dispatch("adminModule/deleteclass", { name: props.name }).then(() => {
                  Modal.success({
                    title: "删除成功",
                  });
                  GetClassData().then((data: ClassInfo[]) => {
                    classData.list = data;
                  });
                  confirmLoading.value = true;
                  setTimeout(() => {
                    visible.value = false;
                    confirmLoading.value = false;
                  }, 0);
                  router.push({path:'/class',query:{key:new Date().getTime()}});
                }).catch((err) => {
                  notification["error"]({
                    message: "数据验证错误",
                    description: err.response.data.msg,
                  });
                });
            },
            onCancel() {
              console.log("Cancel");
            },
            class: "test",
          });
        };
    
        return {
          removebatch,
        };
      },
    };
    </script>