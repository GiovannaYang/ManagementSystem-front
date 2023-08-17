<template>
  <div class="container">
    <a-card title="登录" style="width: 30rem">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1" tab="学生">
          <stuLogin />
        </a-tab-pane>
        <a-tab-pane key="2" tab="管理员">
          <adLogin />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import stuLogin from '@/views/login/stuLogin.vue';
  import adLogin from '@/views/login/adLogin.vue'
  
  export default defineComponent({
    components:{
        stuLogin,
        adLogin,
    },
    setup() {
      return {
        activeKey: ref('1'),
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