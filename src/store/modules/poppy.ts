import { Module } from 'vuex'
import { PoppyTypes, RootStateTypes } from '@/store/types'
import { get } from 'lodash-es';
import { apiPySystemCoreInfo } from '@/services/poppy';
import { deviceId, localStore } from '@/utils/utils';
import { storageKey } from '@/utils/conf';
import { useRouter } from 'vue-router';

const poppy: Module<PoppyTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        loading: false,
        appId: '',
        token: '',
        core: {}
    },
    actions: {
        Loading({ state }) {
            state.loading = true
        },
        Loaded({ state }) {
            state.loading = false
        },
        Logout({ state }) {
            state.token = '';
            localStore(storageKey.APP_TOKEN, null);
        },
        Login({ state }, { token }) {
            state.token = token;
            localStore(storageKey.APP_TOKEN, token);
        },
        Init({ state }) {
            // 设备ID
            state.appId = deviceId();

            // 系统信息
            let info = localStore(storageKey.PY_CORE_INFO);
            if (info) {
                state.core = info;
            } else {
                apiPySystemCoreInfo().then(({ success, data }) => {
                    if (success) {
                        localStore(storageKey.PY_CORE_INFO, data);
                        state.core = data;
                    }
                })
            }

            let router = useRouter();
            const qsToken = get(router.currentRoute.value, 'query.token', '');
            // 处理 token, 存在 qs Token , 则覆盖本地的 token, 否则用户登录之后的token 也是可以使用的
            let token = localStore(storageKey.APP_TOKEN) ? localStore(storageKey.APP_TOKEN) : '';
            if (qsToken) {
                localStore(storageKey.APP_TOKEN, qsToken);
                token = qsToken;
            }
            if (token) {
                state.token = token;
            }
        }
    }
}

export default poppy
