/*
 * @Author: qingHui
 * @Date: 2021-09-06 18:04:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-06 19:43:48
 * @Description: main.ts
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import './assets/style/index.less'
createApp(App).use(store).use(router).use(Antd).mount('#app')
