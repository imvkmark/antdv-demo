import { createApp } from 'vue'
// route
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import useAntUi from '@/utils/use/ant-ui';

// 这里是为了 antdv 无法自动加载 message 样式
import 'element-plus/dist/index.css'
import 'vue-transitions-css'
import './assets/style/style.less';

const app = createApp(App)

useAntUi(app)
    .use(router)
    .use(store, key)
    .mount('#app');
