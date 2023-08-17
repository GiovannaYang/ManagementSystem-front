<template>
  <a-layout-sider
    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, marginTop: '64px' }">
    <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline"
      :style="{ height: '100%', borderRight: 0 }">
      <a-sub-menu key="sub1" v-if="adminInfo.email">
        <template #title>
          <span>
            <user-outlined />
            {{ adminInfo.name }}
          </span>
        </template>
        <a-menu-item key="5" @click="$router.replace({name:'class'})">班级信息</a-menu-item>
        <a-menu-item key="1" @click="$router.replace({name:'manage'})">学生信息</a-menu-item>
        <a-menu-item key="2" @click="$router.replace({name:'forget'})">重置密码</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2" v-if="userInfo.sid">
        <template #title>
          <span>
            <user-outlined />
            {{ userInfo.sid }}
          </span>
        </template>
        <a-menu-item key="3" @click="$router.replace({name:'profile'})">个人主页</a-menu-item>
        <a-menu-item key="4" @click="$router.replace({name:'modify'})">修改信息</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key=" sub3" @click="$router.replace({name:'asetting'})" v-if="adminInfo.email">
        <template #title>
          <span>
            <setting-outlined />
            设置
          </span>
        </template>
      </a-sub-menu>
      <a-sub-menu key="sub4" @click="$router.replace({name:'usetting'})" v-if="userInfo.sid">
        <template #title>
          <span>
            <setting-outlined />
            设置
          </span>
        </template>
      </a-sub-menu>
      <a-sub-menu key="sub5" @click="alogout();back();" v-if="adminInfo.email">
        <template #title>
          <span>
            <logout-outlined />
            退出登录
          </span>
        </template>
      </a-sub-menu>
      <a-sub-menu key="sub6" @click="logout();back();" v-if="userInfo.sid">
        <template #title>
          <span>
            <logout-outlined />
            退出登录
          </span>
        </template>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { mapState, mapActions } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
  },
  computed: mapState({
    adminInfo: (state:any) => state.adminModule.adminInfo,
    userInfo: (state:any) => state.userModule.userInfo,
  }),
  methods: {
    ...mapActions('adminModule', ['alogout']),
    ...mapActions('userModule',['logout']),
  },
  setup() {
    const router = useRouter();
    const back=()=>{
      router.push({path:'/',query:{key:new Date().getTime()}});
    }
    return {
      selectedKeys2: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
      openKeys: ref<string[]>(['sub1']),
      back,
    };
  },
});
</script>
<style>
.site-layout-background {
  background: #fff;
}
</style>
