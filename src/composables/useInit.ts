import { onMounted } from 'vue'
import { useStore } from '@/store';

/**
 * 系统信息
 */
export default function useInit() {
    const store = useStore();
    onMounted(() => {
        store.dispatch('poppy/Init').then()
    })
}