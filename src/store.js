import { create } from "zustand";

const useAppState = create(
    (set, get)=>({
        authToken: '',
        authorized: false,
        roleName: '',
        curPage: 'main',
        setAuthToken: (token)=>{
            set({authToken: token})
        },
        getAuthToken: () => get().authToken,
        setAuthorized: (authorized)=>set({authorized}),
        isAuthorized: () => get().authorized,
        setRoleName: (roleName) => set({roleName}),
        getRoleName: ()=>get().roleName,
        getCurPage: ()=>get().curPage,
        setCurPage: (curPage)=>set({curPage}),
        setUserInfo: (userInfo) => set({roleName: userInfo.roleName, authToken: userInfo.authToken, authorized: userInfo.authorized})
    })
)
export {useAppState}