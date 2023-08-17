<template>
  <a-button type="primary" @click="showModal">编辑</a-button>
  <a-modal v-model:visible="visible" title="修改班级信息" :confirm-loading="confirmLoading" @ok="handleOk">
    <a-form ref="claRef" name="custom-validation" :model="cla" :rules="clarules" v-bind="layout">
      <a-form-item has-feedback label="专业" name="major">
        <a-cascader v-model:value="cla.major" :options="options" expand-trigger="hover" placeholder="Please select" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { reactive, ref, defineComponent } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { notification, Modal } from 'ant-design-vue';
import { ClassInfo, classData, GetClassData } from "@/utils/classdata";
import type { Rule } from 'ant-design-vue/es/form';
import type { CascaderProps } from 'ant-design-vue';
  
interface Cla {
  major: string,
}
const cla = reactive<Cla>({
  major: '',
});
export const clarules: Record<string, Rule[]> = {};

const options: CascaderProps['options'] = [
  {
    label: '信息与通信工程学院',
    value: '信息与通信工程学院',
    children: [
      {
        value: '电子信息工程',
        label: '电子信息工程',
      },
      {
        value: '通信工程',
        label: '通信工程',
      },
      {
        value: '网络工程',
        label: '网络工程',
      },
      {
        value: '物联网工程',
        label: '物联网工程',
      },
      {
        value: '信息对抗技术',
        label: '信息对抗技术',
      },
    ],
  },
  {
    label: '电子科学与工程学院',
    value: '电子科学与工程学院',
    children: [
      {
        value: '电子科学与技术',
        label: '电子科学与技术',
      },
      {
        value: '电磁场与无线技术',
        label: '电磁场与无线技术',
      },
      {
        value: '电波传播与天线',
        label: '电波传播与天线',
      },
    ],
  },
  {
    label: '材料与能源学院',
    value: '材料与能源学院',
    children: [
      {
        value: '材料科学与工程',
        label: '材料科学与工程',
      },
      {
        value: '化学工程与技术',
        label: '化学工程与技术',
      },
    ],
  },
  {
    label: '机械与电气工程学院',
    value: '机械与电气工程学院',
    children: [
      {
        value: '机械设计制造及其自动化',
        label: '机械设计制造及其自动化',
      },
      {
        value: '电气工程及其自动化',
        label: '电气工程及其自动化',
      },
      {
        value: '工业工程',
        label: '工业工程',
      },
      {
        value: '机器人工程',
        label: '机器人工程',
      },
      {
        value: '智能电网信息工程',
        label: '智能电网信息工程',
      },
    ],
  },
  {
    label: '光电科学与工程学院',
    value: '光电科学与工程学院',
    children: [
      {
        value: '光电信息科学与工程',
        label: '光电信息科学与工程',
      },
      {
        value: '光源与照明',
        label: '光源与照明',
      },
      {
        value: '信息工程',
        label: '信息工程',
      },
    ],
  },
  {
    label: '自动化工程学院',
    value: '自动化工程学院',
    children: [
      {
        value: '仪器科学与技术',
        label: '仪器科学与技术',
      },
      {
        value: '控制科学与工程',
        label: '控制科学与工程',
      },
    ],
  },
  {
    label: '资源与环境学院',
    value: '资源与环境学院',
    children: [
      {
        value: '空间信息与数字技术',
        label: '空间信息与数字技术',
      },
      {
        value: '地球信息科学与技术',
        label: '地球信息科学与技术',
      },
    ],
  },
  {
    label: '计算机科学与工程学院',
    value: '计算机科学与工程学院',
    children: [
      {
        value: '计算机科学与技术',
        label: '计算机科学与技术',
      },
      {
        value: '网络空间安全',
        label: '网络空间安全',
      },
      {
        value: '人工智能',
        label: '人工智能',
      },
      {
        value: '数字媒体技术',
        label: '数字媒体技术',
      },
      {
        value: '数据科学与大数据技术',
        label: '数据科学与大数据技术',
      },
    ],
  },
  {
    label: '信息与软件工程学院',
    value: '信息与软件工程学院',
    children: [
      {
        value: '软件工程',
        label: '软件工程',
      },
    ],
  },
  {
    label: '航空航天学院',
    value: '航空航天学院',
    children: [
      {
        value: '探测制导与控制技术',
        label: '探测制导与控制技术',
      },
      {
        value: '航空航天工程',
        label: '航空航天工程',
      },
      {
        value: '无人驾驶航空器系统',
        label: '无人驾驶航空器系统',
      },
      {
        value: '飞行器控制与信息工程',
        label: '飞行器控制与信息工程',
      },
    ],
  },
  {
    label: '数学科学学院',
    value: '数学科学学院',
    children: [
      {
        value: '数学与应用数学',
        label: '数学与应用数学',
      },
      {
        value: '信息与计算科学',
        label: '信息与计算科学',
      },
      {
        value: '数据科学与大数据技术',
        label: '数据科学与大数据技术',
      },
    ],
  },
  {
    label: '物理学院',
    value: '物理学院',
    children: [
      {
        value: '电子信息科学与技术',
        label: '电子信息科学与技术',
      },
      {
        value: '应用物理学',
        label: '应用物理学',
      },
    ],
  },
  {
    label: '医学院',
    value: '医学院',
    children: [
      {
        value: '临床医学',
        label: '临床医学',
      },
      {
        value: '护理学',
        label: '护理学',
      },
    ],
  },
  {
    label: '生命科学与技术学院',
    value: '生命科学与技术学院',
    children: [
      {
        value: '生物医学工程',
        label: '生物医学工程',
      },
      {
        value: '生物技术',
        label: '生物技术',
      },
    ],
  },
  {
    label: '经济与管理学院',
    value: '经济与管理学院',
    children: [
      {
        value: '管理科学与工程',
        label: '管理科学与工程',
      },
      {
        value: '工商管理',
        label: '工商管理',
      },
      {
        value: '应用经济学',
        label: '应用经济学',
      },
    ],
  },
  {
    label: '公共管理学院',
    value: '公共管理学院',
    children: [
      {
        value: '行政管理',
        label: '行政管理',
      },
      {
        value: '信息管理与信息系统',
        label: '信息管理与信息系统',
      },
      {
        value: '法学',
        label: '法学',
      },
      {
        value: '城市管理',
        label: '城市管理',
      },
    ],
  },
  {
    label: '外国语学院',
    value: '外国语学院',
    children: [
      {
        value: '英语',
        label: '英语',
      },
      {
        value: '日语',
        label: '日语',
      },
      {
        value: '翻译',
        label: '翻译',
      },
      {
        value: '法语',
        label: '法语',
      },
    ],
  },
  {
    label: '马克思主义学院',
    value: '马克思主义学院',
    children: [
      {
        value: '马克思主义理论',
        label: '马克思主义理论',
      },
    ],
  },
];

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const visible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);
    const claRef = ref<FormInstance>();
    const store = useStore();
    const router = useRouter();
    
    // 布局
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
    };
    
    const showModal = () => {
      visible.value = true;
    };
    
    const handleOk = () => {
      store.dispatch('adminModule/updateclass',{name:props.name, SchoolName:cla.major[0],MajorName:cla.major[1]}).then(()=>{
        Modal.success({
          title: '修改成功',
        });
        GetClassData().then((data: ClassInfo[]) => {
          classData.list = data;
        });
        confirmLoading.value = true;
        setTimeout(() => {
          visible.value = false;
          confirmLoading.value = false;
        }, 0);
        router.push({path:'/class',query:{key:new Date().getTime()}});
      }).catch((err)=>{
        notification['error']({
          message: '数据验证错误',
          description: err.response.data.msg,
        });
      });
    };
    return {
      cla,
      clarules,
      visible,
      confirmLoading,
      showModal,
      handleOk,
      claRef,
      layout,
      options,
    };
  },
});
</script>