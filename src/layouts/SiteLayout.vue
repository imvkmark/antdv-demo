<template>
    <px-header/>
    <div class="content px--base">
        <router-view v-slot="{ Component }">
            <transition name="fade" appear>
                <component :is="Component"/>
            </transition>
        </router-view>
    </div>
    <px-footer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useUser from '@/composables/useUser';
import useInit from '@/composables/useInit';
import PxHeader from '@/components/pc/PxHeader.vue';
import PxFooter from '@/components/pc/PxFooter.vue';

export default defineComponent({
    name: 'SiteLayout',
    components: { PxFooter, PxHeader },
    setup() {
        useInit();
        useUser();
    }
})
</script>

<style scoped lang="less">
.content {
    min-height: calc(100vh - 164px);
}

.slide-fade {
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    background-color: white;
}

.slide-fade-enter, .slide-fade-leave-to {
    left: 0;
    top: 0;
    right: 0;
    position: absolute;
    transform: translateX(-500px) translateY(-500px) rotate(-150deg) scale(0.5);
    opacity: 1;
}

.slide-fade-enter-active {
    background-color: white;
    transition: all 0.6s ease;
}

.slide-fade-leave-active {
    transition: all 0.7s ease;
    background-color: white;
    transform: translateX(500px) translateY(500px) rotate(150deg) scale(1);
    z-index: 100;
}
</style>