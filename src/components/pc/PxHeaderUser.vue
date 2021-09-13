<template>
    <div class="px--base px--header-user">
        <span class="link" v-if="!token">
            <router-link :to="{name: 'user.register'}">注册</router-link>
            <router-link :to="{name: 'user.login'}">登录</router-link>
        </span>
        <span class="link-user" v-if="token">
            <router-link :to="{name: 'cp.home'}">控制台</router-link>
            {{ trans.nickname }}
            <span @click="onLogout">退出</span>
        </span>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from '@/store';
import { get } from 'lodash-es';
import IconFont from '@/components/base/IconFont';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'PxHeaderUser',
    components: {
        IconFont
    },
    setup() {
        const store = useStore();
        const trans = reactive({
            nickname: computed(() => get(store.getters.user, 'username'))
        })

        const onLogout = function () {
            store.dispatch('poppy/Logout')
        }
        return {
            trans,
            onLogout
        }
    },
    computed: {
        ...mapGetters([
            'token'
        ])
    }
})
</script>

<style scoped lang="less">
@import "../../assets/style/vars";

.link {
    font-size: 16px;
    font-weight: bold;
    a {
        padding: 0 8px;
    }
}

.link-user {
    font-size: 14px;
    padding-right: 30px;
    a {
        color: @textColor;
        padding: 0 8px;
    }
    span {
        cursor: pointer;
    }
}

</style>