<template>
  <a-layout>
    <Header />
    <a-layout style="padding: 24px 0; background: #fff">
      <a-layout-sider v-if="adminInfo.email||userInfo.sid">
        <Sider v-if="adminInfo.email||userInfo.sid" />
      </a-layout-sider>
      <a-layout-content :style="{ padding: '0 50px', marginTop: '64px',marginLeft:'0px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import Sider from '@/views/layout/Sider.vue';
import Header from '@/views/layout/Header.vue';
import { mapState } from 'vuex';

export default{
  components:{
    Sider,
    Header,
  },
  computed: mapState({
    adminInfo: (state:any) => state.adminModule.adminInfo,
    userInfo: (state:any) => state.userModule.userInfo,
  }),
}
</script>

<style></style>
