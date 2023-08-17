<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px', float: 'right' }">
            <a-menu-item key="2" @click="$router.replace({name:'home'})">首页</a-menu-item>
            <a-menu-item key="1" @click="$router.replace({name:'about'})">关于</a-menu-item>
            <a-menu-item key="3" v-if="$route.name!='login'&&!adminInfo&&!userInfo"
                @click="$router.replace({name:'login'})">登录</a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script lang="ts">
import { mapState } from 'vuex';

export default({
    computed: mapState({
        adminInfo: (state:any) => state.adminModule.adminInfo,
        userInfo: (state:any) => state.userModule.userInfo,
    }),
})
</script>
<style>
.site-layout-background {
    background: #fff;
}
</style>