<template>
    <div class="px--cp">
        <h2>充值</h2>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { apiPySystemAuthLogout } from '@/services/poppy';
import { useStore } from '@/store';
import { get } from 'lodash-es';
import { pcToast } from '@/utils/pc';
import { useForm } from 'ant-design-vue/es/form';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'FinanceCharge',
})
</script>

<style scoped lang="less">
@import '../../assets/style/vars';
</style>
