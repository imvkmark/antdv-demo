<template>
    <a-spin :spinning="loading" :indicator="indicator">
        <slot/>
    </a-spin>

</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { mapGetters } from 'vuex';
import { LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'PxSpin',
    setup() {
        const indicator = h(LoadingOutlined, {
            style: {
                fontSize: '24px'
            },
            spin: true
        });
        return {
            indicator
        };
    },
    computed: {
        ...mapGetters([
            'loading'
        ])
    }
})
</script>

<style scoped lang="less">
@import "../../assets/style/vars";

.empty {
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 200px);
}
</style>