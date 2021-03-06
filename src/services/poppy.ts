import request from '@/utils/request';
import { deviceId } from '@/utils/utils';

/**
 * 发送验证码
 */
export async function apiPySystemCaptchaSend(params: object) {
    return request({
        url: '/api_v1/system/captcha/send',
        params
    });
}


export async function apiPySystemAuthLogin(params: object) {
    return request({
        url: '/api_v1/system/auth/login',
        params: {
            guard: 'web',
            device_type: 'h5',
            device_id: deviceId(),
            ...params
        }
    });
}


/**
 *上传图片
 */
export function apiPySystemUploadImage(image) {
    const data = new FormData()
    data.set('image', image, image.name)
    return request({
        url: 'api_v1/system/upload/image',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: data
    });
}

/**
 * 登录访问
 */
export async function apiPySystemAuthAccess(params = {}, from = 'app') {
    return request({
        url: '/api_v1/system/auth/access',
        params,
        from
    });
}

/**
 * 退出登录
 */
export async function apiPySystemAuthLogout(from = 'app') {
    return request({
        url: '/api_v1/system/auth/logout',
        from
    });
}

/**
 * Core Info
 */
export async function apiPySystemCoreInfo() {
    return request({
        url: '/api_v1/system/core/info'
    });
}

/**
 * 重设密码
 */
export async function apiSystemAuthResetPassword(params: any) {
    return request({
        url: '/api_v1/system/auth/reset_password',
        params
    });
}
