<template>
    <div class="container">
        <a-space direction="vertical" size="large">
            <div class="create">
                <CCreate />
            </div>
            <div class="table">
                <CTable />
            </div>
        </a-space>
    </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import CTable from '@/views/manage1/CTable.vue';
  import CCreate from '@/views/manage1/CCreate.vue';
  
  export default defineComponent({
    components: {
       CTable,
       CCreate,
    },
    setup() {
      const value = ref<string>('');
  
      return {
        value,
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