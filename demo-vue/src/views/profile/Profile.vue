<template>
  <div class="container">
    <a-card style="width: 40rem">
      <a-descriptions title="个人信息" :column=2>
        <a-descriptions-item label="姓名">{{userInfo.name}}</a-descriptions-item>
        <a-descriptions-item label="性别">{{userInfo.gender}}</a-descriptions-item>
        <a-descriptions-item label="学号">{{userInfo.sid}}</a-descriptions-item>
        <a-descriptions-item label="学院">{{userInfo.school}}</a-descriptions-item>
        <a-descriptions-item label="专业">{{userInfo.major}}</a-descriptions-item>
        <a-descriptions-item label="班级">{{userInfo.class}}</a-descriptions-item>
        <a-descriptions-item label="电话">{{ userInfo.telephone }}</a-descriptions-item>
        <a-descriptions-item label="邮箱">{{ userInfo.email }}</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  computed: mapState({
    userInfo: (state:any) => state.userModule.userInfo,
  }),
  setup() {

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
