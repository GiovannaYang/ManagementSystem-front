<template>
  <div class="container">
    <a-space direction="vertical" size="large">
      <div class="search">
        <a-space>
          <a-button @click="reload();">
            <template #icon>
              <reload-outlined />
            </template>
          </a-button>
          <a-input-search v-model:value="value" placeholder="搜索用户学号" show-count :maxlength="20" style="width: 300px"
            @search="onSearch" />
          <Create />
        </a-space>
      </div>
      <div class="table">
        <Table />
      </div>
    </a-space>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import adminService from "@/service/adminService";
import Table from '@/views/manage/Table.vue';
import Create from '@/views/manage/Create.vue';
import { UserInfo, userData, GetData} from '@/utils/data';
import { useRouter } from 'vue-router';
import { ReloadOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
     Table,
     Create,
     ReloadOutlined,
  },
  setup() {
    const value = ref<string>('');
    const visible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);
    const router = useRouter();

    const reload=()=>{
      GetData().then((data: UserInfo[]) => {
        userData.list = data;
      });
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
      }, 0);
      router.push({path:'/manage',query:{key:new Date().getTime()}});
    }

    const onSearch = (searchValue: string) => {
      searchData(searchValue).then((data: UserInfo[]) => {
        userData.list = data;
      });
      confirmLoading.value = true;
      setTimeout(() => {
        visible.value = false;
        confirmLoading.value = false;
        router.push({path:'/manage',query:{key:new Date().getTime()}});
      }, 0);
    };

    const searchData = (word: string): Promise<UserInfo[]> => {
      return adminService.search(word).then(res => {
        return res.data.data as UserInfo[];
      });
    };
    return {
      value,
      onSearch,
      reload,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
</style>
