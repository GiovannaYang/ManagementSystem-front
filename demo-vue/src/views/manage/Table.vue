<template>
  <div>
    <a-table :columns="userData.columns" :data-source="userData.list" row-key="id" bordered=true style="width=100%">
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
          <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
            <template #icon>
              <SearchOutlined />
            </template>
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            Reset
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='action'">
          <a-space>
            <Edit :id="record.ID" />
            <Delete :id="record.ID" @remove="removeBatch" />
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
  
<script lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
import { userData } from '@/utils/data';
import Delete from '@/views/manage/Delete.vue';
import Edit from '@/views/manage/Edit.vue';
import { defineComponent, reactive, ref, toRefs } from 'vue';
  
export default {
  components: {
    Delete,
    Edit,
    SearchOutlined,
  },
  data() {
    return {
      userData
    };
  },
  methods: {
    removeBatch(id) {
      const index = this.userData.list.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.userData.list.splice(index, 1);
      }
    }
  },

  setup(){
    const state = reactive({
      searchText: '',
      searchedColumn: '',
    });

    const searchInput = ref();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
      clearFilters({ confirm: true });
      state.searchText = '';
    };

    return {
      handleSearch,
      handleReset,
      searchInput,
      ...toRefs(state),
    };
  }
};
</script>
  
<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
  