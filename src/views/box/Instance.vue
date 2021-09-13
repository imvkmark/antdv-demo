<template>
    <div class="login">
        游戏盒子实例
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { message } from 'ant-design-vue';

export default defineComponent({
    name: 'BoxInstance',
    setup() {
        message.info('xxx');
    }
})
</script>

<style scoped lang="less">
@import '../../assets/style/vars';

</style>
