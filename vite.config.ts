import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components';
// 获取 package 的版本号
import pkgJson from './package.json';
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // 读取环境变量放置到代码中
    const fs = require('fs')
    const dotenv = require('dotenv')
    const envFiles = [
        `./config/.env`, // default file
        `./config/.env.${mode}` // mode file
    ]

    for (const file of envFiles) {
        const envConfig = dotenv.parse(fs.readFileSync(file))
        for (const k in envConfig) {
            process.env[k] = envConfig[k]
        }
    }

    return {
        envDir: './config/',
        plugins: [
            vue(),
            ViteComponents({
                customComponentResolvers: [
                    AntDesignVueResolver({
                        importStyle: 'css'
                    })
                ]
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src/') // 设置 `@` 指向 `src` 目录
            }
        },
        base: '/webapp/',
        define: {
            'import.meta.env.DEF_APP_VERSION': JSON.stringify(pkgJson.version)
        },
        build: {
            outDir: `build/idc-${mode}`,
            sourcemap: (mode === 'prod' || mode === 'dev'),
            rollupOptions: {
                output: {
                    manualChunks: {
                        lodash: ['lodash-es'],
                        antdv: ['ant-design-vue'],
                        crypto: ['crypto-js']
                    }
                }
            }
        },
        server: {
            port: 8000, // 设置服务启动端口号
            open: true, // 设置服务启动时是否自动打开浏览器
            cors: true, // 允许跨域
            host: '0.0.0.0'
        }
    }
});
