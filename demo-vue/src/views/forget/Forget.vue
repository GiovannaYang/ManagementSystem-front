<template>
  <div class="container">
    <div class="table">
      <a-table :columns="msgData.columns" :data-source="msgData.list" row-key="id" bordered=true style="width=100%">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key==='action'">
            <a-space>
              <Reset :sid="record.Sid" @remove="removeBatch" />
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { msgData } from '@/utils/msg';
  import Reset from '@/views/forget/Reset.vue';
  
  export default {
    components: {
      Reset,
    },
    data() {
      return {
        msgData
      };
    },
    methods: {
      removeBatch(sid) {
        const index = this.msgData.list.findIndex((item) => item.sid === sid);
        if (index !== -1) {
          this.msgData.list.splice(index, 1);
        }
      }
    }
  };
  </script>