<template>
    <div class="header">
        <div class="px--container">
            <a href="/" title="Wulicode" class="logo"><img src="@/assets/app/logo.png" alt="Wulicode"></a>
            <ul>
                <li><a :href="siteUrl.home">首页</a></li>
            </ul>
            <div class="user">
                <px-header-user/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PxHeaderUser from '@/components/pc/PxHeaderUser.vue';
import { siteUrl } from '@/utils/conf';

export default defineComponent({
    name: 'PxHeader',
    components: { PxHeaderUser },
    setup() {
        return {
            siteUrl
        }
    }
})
</script>

<style scoped lang="less">
@import "../../assets/style/vars";

.header {
    height: 64px;
    line-height: 64px;
    box-sizing: border-box;
    background: #FFF;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.10);
    display: flex;
    .logo {
        margin-right: 15px;
        img {
            height: 36px;
        }
    }
}

.px--container {
    display: flex;
}

ul {
    flex: 1;
    display: flex;
    height: 64px;
    margin-bottom: 0;
    list-style: none;
    a {
        margin: 0 15px;
        font-size: 18px;
        color: #191A24;
        transition: all 0.3s;
        display: block;
        &:hover {
            color: @primaryColor;
        }
    }
}


</style>