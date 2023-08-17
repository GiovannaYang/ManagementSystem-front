import storageService from "@/service/storageService";
import userService from '@/service/userService';

const userModule = {
    namespaced: true,
    state: {
        token: storageService.get(storageService.USER_TOKEN),
        userInfo: storageService.get(storageService.USER_INFO) || {sid:''},
    },
    mutations: {
        SET_TOKEN(state,token){
            // 更新本地缓存
            storageService.set(storageService.USER_TOKEN,token)
            // 更新state
            state.token=token;
        },
        SET_USERINFO(state,userInfo){
            // 更新本地缓存
            storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
            // 更新state
            state.userInfo = userInfo;
        },
    },
    actions: {
        register(context, sid:string){
            return new Promise((resolve, reject)=>{
                userService.register({sid}).then(res=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        login({commit}, {sid,password}){
            // 清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN,'')
            // 清除用户信息
            commit('SET_USERINFO', '')
            storageService.set(storageService.USER_INFO,'')
            return new Promise((resolve, reject)=>{
                userService.login({sid,password}).then(res=>{
                    //保存token
                    commit('SET_TOKEN',res.data.data.token)
                    return userService.info();
                }).then(res =>{
                    // 保存用户信息
                    commit('SET_USERINFO',res.data.data.user)
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        logout({commit}){
            // 清除token
            commit('SET_TOKEN', '')
            storageService.set(storageService.USER_TOKEN,'')
            // 清除用户信息
            commit('SET_USERINFO', '')
            storageService.set(storageService.USER_INFO,'')
        },
        update({commit}, {password}){
            userService.info().then(res=>{
                const id=res.data.data.user.id
                return new Promise((resolve, reject)=>{
                    userService.update({id,password}).then(res=>{
                        resolve(res);
                        // 清除token
                        commit('SET_TOKEN', '')
                        storageService.set(storageService.USER_TOKEN,'')
                        // 清除用户信息
                        commit('SET_USERINFO', '')
                        storageService.set(storageService.USER_INFO,'')   
                    }).catch((err)=>{
                        reject(err);
                    });
                });
            });
        },
        async updateinfo({ commit }, { name, classname, gender, email, telephone }) {
            try {
              const response = await userService.info();
              const id = response.data.data.user.id;
              const updateResponse = await userService.updateinfo({
                id,
                name,
                classname, 
                gender,
                email,
                telephone,
              });
              const userInfo = updateResponse.data.data.user;
              // 更新 state 中的 userInfo
              commit("SET_USERINFO", userInfo);
              return Promise.resolve(updateResponse);
            } catch (error) {
              return Promise.reject(error);
            }
        },
        async updateinfo2({ commit }, { id, name, classname, gender, email, telephone }) {
            try {
              const updateResponse = await userService.updateinfo({
                id,
                name,
                classname,
                gender,
                email,
                telephone,
              });
              return Promise.resolve(updateResponse);
            } catch (error) {
              return Promise.reject(error);
            }
        },
        delete({commit},{id}){
            return new Promise((resolve, reject)=>{
                userService.remove({id}).then(res=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
        forget(context, sid:string){
            return new Promise((resolve, reject)=>{
                userService.message({sid}).then(res=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
        },
    }
};

export default userModule;