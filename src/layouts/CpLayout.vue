<template>
    <a-layout>
        <a-layout-header class="header">
            <div class="logo">
                <img src="@/assets/app/logo.png" alt="Wulicode">
            </div>
            <a-menu class="menu px--menu"
                theme="light"
                @click="onMenuClick"
                mode="horizontal"
                v-model:selectedKeys="trans.nav">
                <a-menu-item v-for="menu in menus" :key="menu.route">
                    <icon-font :type="menu.icon" v-if="menu.icon"/>
                    {{ menu.title }}
                </a-menu-item>
            </a-menu>
            <div class="user">
                <px-header-user/>
            </div>
        </a-layout-header>
        <a-layout class="main" v-if="get(submenu, 'children')">
            <a-layout-sider class="side">
                <div class="title">
                    {{ submenu.title }}
                    <span class="icon">
                        <icon-font :type="submenu.icon" v-if="submenu.icon"/>
                    </span>
                </div>
                <div class="menu-wrapper">
                    <el-scrollbar :native="false">
                        <a-menu
                            class="side-menu px--side"
                            mode="inline"
                            v-model:selectedKeys="trans.sidebar"
                            :style="{borderRight: 0 }">
                            <template v-for="mu in submenu.children" :key="mu">
                                <a-menu-item v-if="get(mu, 'route')" :key="get(mu, 'route')">
                                    <router-link :to="{name: get(mu, 'route')}"> {{ get(mu, 'title') }}</router-link>
                                </a-menu-item>
                                <a-sub-menu v-else>
                                    <template #title>
                                        <span>{{ get(mu, 'title') }}</span>
                                    </template>
                                    <a-menu-item v-for="child in get(mu, 'children')" :key="get(child, 'route')">
                                        <router-link :to="{name: get(child, 'route')}">
                                            {{ get(child, 'title') }}
                                        </router-link>
                                    </a-menu-item>
                                </a-sub-menu>
                            </template>
                        </a-menu>
                    </el-scrollbar>
                </div>
            </a-layout-sider>
            <a-layout-content class="content">
                <a-spin wrapperClassName="spin-wrapper" size="large" :spinning="loading">
                    <router-view/>
                </a-spin>
            </a-layout-content>
        </a-layout>
        <a-layout class="main" v-else>
            <a-spin wrapperClassName="spin-wrapper" size="large" :spinning="loading">
                <router-view/>
            </a-spin>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import menus from '@/router/menu';
import { find, get, head, map } from 'lodash-es';
import { useRouter } from 'vue-router';
import { ElScrollbar } from 'element-plus';
import IconFont from '@/components/base/IconFont';

// 这里是为了 antdv 无法自动加载 message 样式
import 'ant-design-vue/lib/message/style/index.css'
import useUser from '@/composables/useUser';
import useInit from '@/composables/useInit';
import PxHeaderUser from '@/components/pc/PxHeaderUser.vue';
import * as Menu from '@/router/menu.d';
import SubMenuItem = Menu.SubMenuItem;

export default defineComponent({
    name: 'CpLayout',
    components: {
        PxHeaderUser,
        IconFont, ElScrollbar
    },
    setup() {
        useInit();
        useUser();


        const router = useRouter();
        const routeName = router.currentRoute.value.name;
        const trans = reactive({
            nav: [''],
            sidebar: [''] // 默认选中第一个, 暂时不支持子菜单
        });

        // 子菜单
        const submenu: SubMenuItem = ref({});


        const calcMenuKey = (route_name: any) => {
            let key = '';
            map(menus, (menu) => {
                if (menu.route === route_name) {
                    key = menu.route;
                }
                let children = get(menu, 'children');
                map(children, (child) => {
                    let route = get(child, 'route');
                    if (route) {
                        if (route === route_name) {
                            key = menu.route;
                        }
                    } else {
                        let it = find(get(child, 'children'), (item) => {
                            return get(item, 'route') === route_name;
                        })
                        if (it) {
                            key = menu.route;
                        }
                    }
                })
            });
            submenu.value = find(menus, (item) => {
                return item.route === key;
            });
            trans.nav = [key];
            trans.sidebar = [route_name];
        }

        // 点击跳转路由
        const onMenuClick = (item: any) => {
            router.push({ name: get(item, 'key') })
        }

        // 初始化进入, 计算激活项目
        onMounted(() => {
            calcMenuKey(routeName);
        });

        // 监听路由变化, 切换菜单和激活当前
        watch(() => router.currentRoute.value.name, (newVal) => {
            calcMenuKey(newVal);
        })
        return {
            trans, menus, submenu, get, head, onMenuClick
        }
    },
    computed: {
        ...mapGetters([
            'loading'
        ])
    }
})
</script>

<style scoped lang="less">

.header {
    display: flex;
    position: fixed;
    background: #FFF;
    z-index: 1;
    width: 100%;
    padding: 0;
}

.logo {
    width: 201px;
    box-sizing: border-box;
    border-right: 1px solid #EFEFEF;
    img {
        height: 32px;
        position: absolute;
        top: 14px;
        left: 20px;
    }
}

.menu {
    line-height: 60px;
    flex: auto;
}

.user {
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
    min-width: 120px;
    border-bottom: 1px solid #F0F0F0;
    box-sizing: border-box;
    height: 64px;
}

.main {
    margin-top: 60px;
    height: calc(100vh - 60px);
}

.side {
    height: calc(100vh - 60px);
    background: #F5F7FA;
    box-shadow: -3px 0 10px 0 rgba(0, 0, 0, 0.50);
    width: 200px;
    .menu-wrapper {
        height: calc(100vh - 205px);
    }
    .title {
        height: 105px;
        line-height: 105px;
        font-size: 22px;
        color: rgba(45, 51, 64, .3);
        padding-left: 16px;
        position: relative;
        overflow: hidden;
        .icon {
            font-size: 90px;
            position: absolute;
            right: -10px;
            bottom: -16px;
        }
    }
    .side-menu {
        overflow-x: hidden;
        .ant-menu-submenu-title {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
}

.content {
    background: #FFF;
    padding: 24px;
    margin: 0;
    height: calc(100vh - 60px);
}
</style>
