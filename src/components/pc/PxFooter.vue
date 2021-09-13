<template>
    <div class="footer">
        <div class="content">
            <!--   todo 这里的信息从服务端返回     -->
            <div v-html="trans.footer"/>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from '@/store';
import { get } from 'lodash-es';

export default defineComponent({
    name: 'PxFooter',
    setup() {
        const store = useStore();
        const trans = reactive({
            footer: computed(() => get(store.state.poppy.core, 'misc.site_footer'))
        })
        return {
            trans
        }
    }
})
</script>

<style scoped lang="less">
@import "../../assets/style/vars";

.footer {
    width: 100%;
    background: #2E3341;
    color: #D1D8E4;
    display: flex;
    align-items: center;
    align-content: center;
    height: 170px;
    .content {
        width: 100%;
        text-align: center;
        font-size: 12px;
        line-height: 28px;
    }
}

</style>