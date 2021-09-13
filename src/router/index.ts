import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import { get } from 'lodash-es';
import CpLayout from '@/layouts/CpLayout.vue';
import SiteLayout from '@/layouts/SiteLayout.vue';
import { localStore } from '@/utils/utils';
import { storageKey } from '@/utils/conf';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/user',
        component: SiteLayout,
        children: [
            {
                path: 'login', component: () => import('@/views/user/Login.vue'), name: 'user.login', meta: {
                    title: '登录'
                }
            },
            {
                path: 'register', component: () => import('@/views/user/Register.vue'), name: 'user.register', meta: {
                    title: '注册'
                }
            },
            {
                path: 'forgot-password', component: () => import('@/views/user/ForgotPassword.vue'), name: 'user.forgot_password', meta: {
                    title: '注册'
                }
            }
        ]
    },
    {
        path: '/user',
        component: CpLayout,
        children: [
            {
                path: 'basic', component: () => import('@/views/user/Basic.vue'), name: 'user.basic', meta: {
                    title: '用户资料',
                    auth: true
                }
            },
            {
                path: 'verify', component: () => import('@/views/user/Verify.vue'), name: 'user.verify', meta: {
                    title: '用户实名',
                    auth: true
                }
            }
        ]
    },
    {
        path: '/finance',
        component: CpLayout,
        children: [
            {
                path: 'charge', component: () => import('@/views/finance/Charge.vue'), name: 'finance.charge', meta: {
                    title: '充值',
                    auth: true
                }
            },
            {
                path: 'detail', component: () => import('@/views/finance/Detail.vue'), name: 'finance.detail', meta: {
                    title: '收支明细',
                    auth: true
                }
            }
        ]
    },
    {
        path: '/',
        component: CpLayout,
        children: [
            {
                path: '', component: () => import('@/views/cp/Home.vue'), name: 'cp.home', meta: {
                    title: '控制台',
                    auth: true
                }
            }
        ]
    }
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

/**
 * 路由标题
 */
router.beforeEach((to, from, next) => {
    let title = get(to, 'meta.title');
    if (title) {
        document.title = title;
    }
    next();
});

/**
 * 路由的跳转
 */
router.beforeResolve(async (to) => {
    if (get(to, 'meta.auth')) {
        if (localStore(storageKey.APP_TOKEN)) {
            return true;
        } else {
            return {
                name: 'user.login',
                query: {
                    go: window.btoa(to.fullPath)
                }
            }
        }
    }
})
export default router
