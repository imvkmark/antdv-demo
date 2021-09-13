import { localStore } from '@/utils/utils';
import { storageKey } from '@/utils/conf';
import { useStore } from '@/store';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { get } from 'lodash-es';
import useUserUtil from '@/composables/useUserUtil';

/**
 * 登录和 Token 的保存以及跳转
 */
export default function useUser() {
    const store = useStore()
    const router = useRouter();

    const { userToLogin } = useUserUtil();

    watch(
        () => store.state.poppy.token,
        (newVal) => {
            if (!newVal) {
                // 清除token
                localStore(storageKey.APP_TOKEN, null);

                // 如果当前页面需要授权, 跳转到登录
                if (get(router.currentRoute.value.meta, 'auth')) {
                    userToLogin();
                }
            } else {
                // token 变化, 请求用户信息
                store.dispatch('user/Fetch').then()
            }
        }, {
            deep: true
        }
    );
}