<template>
  <div class="container">
    <h1>学生管理系统</h1>
    <h2>杨骐榕 2021080903002</h2>
    <a-button type="primary" shape="round" size="large" style="margin-bottom: 1em" v-if="!adminInfo.email&&!userInfo.sid"
      @click="$router.replace({name:'login'})">
      登录
      <template #icon><login-outlined /></template>
    </a-button>
    <a-button type="link" v-if="!adminInfo.email&&!userInfo.sid"
      @click="$router.replace({name:'aregister'})">注册成为管理员</a-button>
    <a-button type="link" @click="$router.replace({name:'about'})">“关于”页面有相关说明</a-button>
  </div>
</template>

<script lang="ts">
import { LoginOutlined } from '@ant-design/icons-vue';
import { defineComponent} from 'vue';
import { mapState } from 'vuex';
export default defineComponent({
  components: {
    LoginOutlined,
  },
  computed: mapState({
    adminInfo: (state:any) => state.adminModule.adminInfo,
    userInfo: (state:any) => state.userModule.userInfo,
  }),
})
</script>

<style scoped>
h1 {
  font-size: 4em;
  text-align: center;
  margin-bottom: 1em;
}

h2 {
  text-align: center;
  margin-bottom: 2em;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
