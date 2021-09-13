<template>
    <router-view/>
</template>

<!-- 这里不使用 scope, 用于输出全局变量 -->
<script lang="ts">
import useInit from '@/composables/useInit';
import useClearCache from '@/composables/useClearCache';
// style
import '@/assets/style/index.less'

export default {
    setup() {
        useClearCache()
        useInit()
    }
}
</script>