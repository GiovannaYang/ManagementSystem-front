import storageService from "@/service/storageService";
import adminService from '@/service/adminService';

const adminModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        adminInfo: storageService.get(storageService.USER_INFO) || {email:''},
    },
    mutations: {
        SET_TOKEN(state,token){
            // 更新本地缓存
            storageService.set(storageService.USER_TOKEN,token)
            // 更新state
            state.token=token;
        },
        SET_ADMININFO(state,adminInfo){
            // 更新本地缓存
            storageService.set(storageService.USER_INFO, JSON.stringify(adminInfo));
            // 更新state
            state.adminInfo = adminInfo;
        },
    },
    actions: {
        register(context, {email,name,password}){
            return new Promise((resolve, reject)=>{
                adminService.register({email,name,password}).then(res=>{
                    //保存token
                    context.commit('SET_TOKEN',res.data.data.token)
                    return adminService.info();
                }).then(res =>{
                    // 保存用户信息
                    context.commit('SET_ADMININFO',res.data.data.admin)
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        login({commit}, {email,password}){
            // 清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN,'')
            // 清除用户信息
            commit('SET_ADMININFO', '')
            storageService.set(storageService.USER_INFO,'')
            return new Promise((resolve, reject)=>{
                adminService.login({email,password}).then(res=>{
                    //保存token
                    commit('SET_TOKEN',res.data.data.token)
                    return adminService.info();
                }).then(res =>{
                    // 保存用户信息
                    commit('SET_ADMININFO',res.data.data.admin)
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        alogout({commit}){
            // 清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN,'')
            // 清除用户信息
            commit('SET_ADMININFO', '')
            storageService.set(storageService.USER_INFO,'')
        },
        update({commit}, {name,password}){
            adminService.info().then(res=>{
                const id=res.data.data.admin.id
                return new Promise((resolve, reject)=>{
                    adminService.update({id,name,password}).then(res=>{
                        resolve(res);
                        // 清除token
                        commit('SET_TOKEN', '')
                        storageService.set(storageService.USER_TOKEN,'')
                        // 清除用户信息
                        commit('SET_ADMININFO', '')
                        storageService.set(storageService.USER_INFO,'')   
                    }).catch((err)=>{
                        reject(err);
                    });
                });
            });
        },
        delete({commit}){
            adminService.info().then(res=>{
                const id=res.data.data.admin.id
                return new Promise((resolve, reject)=>{
                    adminService.remove({id}).then(res=>{
                        resolve(res);
                        // 清除token
                        commit('SET_TOKEN', '')
                        storageService.set(storageService.USER_TOKEN,'')
                        // 清除用户信息
                        commit('SET_ADMININFO', '')
                    }).catch((err)=>{
                        reject(err);
                    });
                });
            });
        },
        deletemsg({commit},{sid}){
            return new Promise((resolve, reject)=>{
                adminService.removemsg({sid}).then(res=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        addclass(context, Name:string){
            return new Promise((resolve, reject)=>{
                adminService.addclass({Name}).then(res=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        deleteclass({commit},{name}){
            return new Promise((resolve, reject)=>{
                adminService.deleteclass({name}).then(res=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        async updateclass({ commit }, { name, SchoolName, MajorName}) {
            try {
              const updateResponse = await adminService.updateclass({
                name,
                SchoolName,
                MajorName, 
              });
              return Promise.resolve(updateResponse);
            } catch (error) {
              return Promise.reject(error);
            }
        },
    }
};

export default adminModule;