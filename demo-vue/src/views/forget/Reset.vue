<template>
    <a-button @click="removebatch()">重置</a-button>
</template>
    
<script lang="ts">
    import { ref } from "vue";
    import { notification, Modal } from "ant-design-vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { MsgInfo, msgData, GetMsg } from "@/utils/msg";
    
    export default {
      props: {
        sid: {
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
              store.dispatch("adminModule/deletemsg", { sid: props.sid }).then(() => {
                Modal.success({
                  title: "重置成功",
                });
                GetMsg().then((data: MsgInfo[]) => {
                  msgData.list = data;
                });
                confirmLoading.value = true;
                setTimeout(() => {
                  visible.value = false;
                  confirmLoading.value = false;
                }, 0);
                router.push({path:'/forget',query:{key:new Date().getTime()}});
              }).catch((err) => {
                notification["error"]({
                  message: "数据验证错误",
                  description: err.response.data.msg,
                });
              });
        }
        return {
          removebatch,
        }
      },
    }
</script>