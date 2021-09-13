import request from '@/utils/request';

/**
 * 用户详细
 */
export async function apiUserProfileInfo(params = {}) {
    return request({
        url: '/api_v1/user/profile/info',
        params
    });
}


export async function apiUserProfileRegister(params = {}) {
    return request({
        url: '/api_v1/user/profile/register',
        params
    });
}

/**
 * 实名认证U
 */
export async function apiUserProfileVerify(params: object) {
    return request({
        url: '/api_v1/user/profile/verify',
        params
    });
}


/**
 * 信息修改
 */
export async function apiUserProfileModify(params: object) {
    return request({
        url: '/api_v1/user/profile/modify',
        params
    });
}

/**
 * 重置密码
 */
export async function apiUserProfileResetPassword(params: object) {
    return request({
        url: '/api_v1/user/profile/reset_password',
        params
    });
}

