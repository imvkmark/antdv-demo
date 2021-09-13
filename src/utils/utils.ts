import { MD5 } from 'crypto-js';
import { appMode, appVersion, storageKey } from '@/utils/conf';
import UAParser from 'ua-parser-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import locale from 'dayjs/locale/zh-cn'
import { localStore as _localStore, sessionStore as _sessionStore, uniqueId } from '@popjs/util';


/**
 * 实现localStorage缓存的 存, 取, 删操作
 * @param key 对象, 批量设置
 * @param val 有值:设置; 无值: 获取; null, 删除;
 */
export const localStore = (key: any, val?: any) => {
    return _localStore(hashKey(key), val);
};

/**
 * 实现sessionStorage缓存的 存, 取, 删操作
 * @param key 对象, 批量设置
 * @param val 有值:设置; 无值: 获取; null, 删除;
 */
export const sessionStore = (key: any, val?: any) => {
    return _sessionStore(hashKey(key), val);
};

/**
 * 返回设备ID, 如果本地存在则取本地
 */
export const deviceId = (): string => {
    if (localStore(storageKey.PY_DEVICE_ID)) {
        return localStore(storageKey.PY_DEVICE_ID);
    } else {
        let id = 'h-' + MD5(uniqueId('idc')) + '-5'
        localStore(storageKey.PY_DEVICE_ID, id);
        return id
    }
}


/**
 * 通过域名 + 版本号摒弃缓存
 * @returns {*}
 */
export const hashKey = (key: string) => {
    return `${appMode}-${appVersion}:${key}`;
};


/**
 * 通过域名 + 版本号摒弃缓存
 * @returns {*}
 */
export const isIos = () => {
    return (new UAParser()).getOS().name === 'iOS';
};

/**
 * 设备的DPR
 */
export const dpr = () => {
    return window.devicePixelRatio;
}

/**
 * 是否是微信浏览器
 */
export const isWechat = () => {
    let userAgent = navigator.userAgent.toLowerCase();
    return !!userAgent.match(/micromessenger/);
};

/**
 * 用于 Im 的时间展示
 * @param timestamp
 */
export const formatUnixFromNow = (timestamp: any) => {
    if (!timestamp) {
        return '####-##-##'
    }
    dayjs.extend(relativeTime);
    dayjs.locale(locale.name);
    return dayjs().to(dayjs(timestamp * 1000))
}


export const ossImage = (url: string, size: number) => {
    return `${url}?x-oss-process=image/resize,l_${size}`;
}
