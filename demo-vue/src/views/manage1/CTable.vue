<template>
  <div>
    <a-table :columns="classData.columns" :data-source="classData.list" row-key="id" bordered=true style="width=100%">
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
            <CEdit :name="record.ClassName" />
            <CDelete :name="record.ClassName" @remove="removeBatch" />
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
    
<script lang="ts">
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { classData } from '@/utils/classdata';
  import CDelete from '@/views/manage1/CDelete.vue';
  import CEdit from '@/views/manage1/CEdit.vue';
  import { defineComponent, reactive, ref, toRefs } from 'vue';
    
  export default {
    components: {
      CDelete,
      CEdit,
      SearchOutlined,
    },
    data() {
      return {
        classData
      };
    },
    methods: {
      removeBatch(id) {
        const index = this.classData.list.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.classData.list.splice(index, 1);
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
    
<style scoped></style>