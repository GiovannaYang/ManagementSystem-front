import adminService from "@/service/adminService";
import { reactive } from 'vue';

export interface MsgInfo {
    Sid: string,
}

export function GetMsg(): Promise<MsgInfo[]> {
  return adminService.msg().then(res => {
    return res.data.data as MsgInfo[];
  });
}

export const msgData = reactive({
    columns: [
        {
          title: '学号',
          dataIndex: 'Sid',
          key: 'Sid',
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
        },
    ],
    list: reactive([] as MsgInfo[]),
    selectedRowkeys: [],
});

GetMsg().then((data: MsgInfo[]) => {
  msgData.list = data;
});
