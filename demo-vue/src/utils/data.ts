import adminService from "@/service/adminService";
import { reactive } from 'vue';

export interface UserInfo {
  Sid: string,
  SchoolName: string,
  MajorName: string,
  ClassName: string,
  Name: string,
  Gender: string,
  Telephone: string,
  Email: string,
}

export function GetData(): Promise<UserInfo[]> {
  return adminService.show().then(res => {
    return res.data.data as UserInfo[];
  });
}

export const userData = reactive({
  columns: [
    {
      title: '学号',
      dataIndex: 'Sid',
      key: 'Sid',
    },
    {
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name',
      customFilterDropdown: true,
      onFilter: (value, record) => record.Name.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: '性别',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: '学院',
      dataIndex: 'SchoolName',
      key: 'SchoolName',
      filters: [
        {
          text: '信息与通信工程学院',
          value: '信息与通信工程学院',
        },
        {
          text: '电子科学与工程学院',
          value: '电子科学与工程学院',
        },
        {
          text: '材料与能源学院',
          value: '材料与能源学院',
        },
        {
          text: '机械与电气工程学院',
          value: '机械与电气工程学院',
        },
        {
          text: '光电科学与工程学院',
          value: '光电科学与工程学院',
        },
        {
          text: '自动化工程学院',
          value: '自动化工程学院',
        },
        {
          text: '资源与环境学院',
          value: '资源与环境学院',
        },
        {
          text: '计算机科学与工程学院',
          value: '计算机科学与工程学院',
        },
        {
          text: '信息与软件工程学院',
          value: '信息与软件工程学院',
        },
        {
          text: '航空航天学院',
          value: '航空航天学院',
        },
        {
          text: '数学科学学院',
          value: '数学科学学院',
        },
        {
          text: '物理学院',
          value: '物理学院',
        },
        {
          text: '医学院',
          value: '医学院',
        },
        {
          text: '生命科学与技术学院',
          value: '生命科学与技术学院',
        },
        {
          text: '经济与管理学院',
          value: '经济与管理学院',
        },
        {
          text: '公共管理学院',
          value: '公共管理学院',
        },
        {
          text: '外国语学院',
          value: '外国语学院',
        },
        {
          text: '马克思主义学院',
          value: '马克思主义学院',
        },
        {
          text: '未知',
          value: '未知',
        },
      ],
      onFilter: (value: string, record: UserInfo) => record.SchoolName.indexOf(value) === 0,
    },
    {
      title: '专业',
      dataIndex: 'MajorName',
      key: 'MajorName',
      filters: [
        {
          text: '电子信息工程',
          value: '电子信息工程',
        },
        {
          text: '通信工程',
          value: '通信工程',
        },
        {
          text: '网络工程',
          value: '网络工程',
        },
        {
          text: '物联网工程',
          value: '物联网工程',
        },
        {
          text: '信息对抗技术',
          value: '信息对抗技术',
        },
        {
          text: '电子科学与技术',
          value: '电子科学与技术',
        },
        {
          text: '电磁场与无线技术',
          value: '电磁场与无线技术',
        },
        {
          text: '电波传播与天线',
          value: '电波传播与天线',
        },
        {
          text: '材料科学与工程',
          value: '材料科学与工程',
        },
        {
          text: '化学工程与技术',
          value: '化学工程与技术',
        },
        {
          text: '机械设计制造及其自动化',
          value: '机械设计制造及其自动化',
        },
        {
          text: '电气工程及其自动化',
          value: '电气工程及其自动化',
        },
        {
          text: '工业工程',
          value: '工业工程',
        },
        {
          text: '机器人工程',
          value: '机器人工程',
        },
        {
          text: '智能电网信息工程',
          value: '智能电网信息工程',
        },
        {
          text: '光电信息科学与工程',
          value: '光电信息科学与工程',
        },
        {
          text: '光源与照明',
          value: '光源与照明',
        },
        {
          text: '信息工程',
          value: '信息工程',
        },
        {
          text: '仪器科学与技术',
          value: '仪器科学与技术',
        },
        {
          text: '控制科学与工程',
          value: '控制科学与工程',
        },
        {
          text: '空间信息与数字技术',
          value: '空间信息与数字技术',
        },
        {
          text: '地球信息科学与技术',
          value: '地球信息科学与技术',
        },
        {
          text: '计算机科学与技术',
          value: '计算机科学与技术',
        },
        {
          text: '网络空间安全',
          value: '网络空间安全',
        },
        {
          text: '人工智能',
          value: '人工智能',
        },
        {
          text: '数字媒体技术',
          value: '数字媒体技术',
        },
        {
          text: '数据科学与大数据技术',
          value: '数据科学与大数据技术',
        },
        {
          text: '软件工程',
          value: '软件工程',
        },
        {
          text: '探测制导与控制技术',
          value: '探测制导与控制技术',
        },
        {
          text: '航空航天工程',
          value: '航空航天工程',
        },
        {
          text: '无人驾驶航空器系统工程',
          value: '无人驾驶航空器系统工程',
        },
        {
          text: '飞行器控制与信息工程',
          value: '飞行器控制与信息工程',
        },
        {
          text: '数学与应用数学',
          value: '数学与应用数学',
        },
        {
          text: '信息与计算科学',
          value: '信息与计算科学',
        },
        {
          text: '数据科学与大数据技术',
          value: '数据科学与大数据技术',
        },
        {
          text: '电子信息科学与技术',
          value: '电子信息科学与技术',
        },
        {
          text: '应用物理学',
          value: '应用物理学',
        },
        {
          text: '临床医学',
          value: '临床医学',
        },
        {
          text: '护理学',
          value: '护理学',
        },
        {
          text: '生物医学工程',
          value: '生物医学工程',
        },
        {
          text: '生物技术',
          value: '生物技术',
        },
        {
          text: '管理科学与工程',
          value: '管理科学与工程',
        },
        {
          text: '工商管理',
          value: '工商管理',
        },
        {
          text: '应用经济学',
          value: '应用经济学',
        },
        {
          text: '行政管理',
          value: '行政管理',
        },
        {
          text: '信息管理与信息系统',
          value: '信息管理与信息系统',
        },
        {
          text: '法学',
          value: '法学',
        },
        {
          text: '城市管理',
          value: '城市管理',
        },
        {
          text: '英语',
          value: '英语',
        },
        {
          text: '日语',
          value: '日语',
        },
        {
          text: '翻译',
          value: '翻译',
        },
        {
          text: '法语',
          value: '法语',
        },
        {
          text: '马克思主义理论',
          value: '马克思主义理论',
        },
        {
          text: '未知',
          value: '未知',
        },
      ],
      onFilter: (value: string, record: UserInfo) => record.MajorName.indexOf(value) === 0,
    },
    {
      title: '班级',
      dataIndex: 'ClassName',
      key: 'ClassName',
      customFilterDropdown: true,
      onFilter: (value, record) => record.ClassName.toString().toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: '电话',
      dataIndex: 'Telephone',
      key: 'Telephone',
    },
    {
      title: '邮箱',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
  ],
  list: reactive([] as UserInfo[]),
  selectedRowkeys: [],
});

GetData().then((data: UserInfo[]) => {
  userData.list = data;
});

export function onSelectChange(selectedkeys){
  userData.selectedRowkeys = selectedkeys;
}
