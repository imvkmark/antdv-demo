/*
 * 全局配置
 * 文件描述：
 *    主要存放路径及接口相关
 *      iconUrl: 字体文件路径
 *    storageKey: 存入的 storage 的 key
 *      api: 系统接口相关
 */

// 访问接口URL
export const appUrl: string = String(import.meta.env.VITE_APP_URL);

// App 版本号
export const appVersion = String(import.meta.env.DEF_APP_VERSION);

// App 环境
export const appMode = String(import.meta.env.MODE);

// 是否是生产环境
export const appIsProd = import.meta.env.PROD;

// 存储KEY
export const storageKey = {
    PY_DEVICE_ID: 'x-device-id',
    PY_CORE_INFO: 'x-core',
    APP_TOKEN: 'app-token',
    APP_USER: 'app-user',
    PC_USER: 'pc-user'
}

export const siteUrl = {
    home: `${appUrl}/`,
}