import { useStore } from '@/store';
import { userLoginSuccess } from '@/utils/app';
import { get } from 'lodash-es';
import { useRouter } from 'vue-router';
import { localStore } from '@/utils/utils';
import { storageKey } from '@/utils/conf';

/**
 * 登录和 Token 的保存以及跳转
 */
export default function useUserUtil() {
    const store = useStore();
    const router = useRouter();

    /**
     * 用户登录成功之后调用
     * @param data
     */
    const userLogin = function (data: any) {
        const { token } = data;
        // set store
        store.dispatch('poppy/Login', {
            token
        }).then();
        const go = get(router.currentRoute.value, 'query.go', '');
        if (!go) {
            router.push({ name: 'cp.home' }).then()
        } else {
            router.push(window.atob(go)).then()
        }
    }

    /**
     * 让用户去跳转登录
     */
    const userToLogin = function () {
        router.push({
            name: 'user.login',
            query: {
                go: window.btoa(router.currentRoute.value.fullPath)
            }
        }).then();
    }
    return {
        userLogin,
        userToLogin
    }
}