import { storageKey } from '@/utils/conf';
import { localStore } from '@/utils/utils';


/**
 * 用户登录成功
 */
export const userLoginSuccess = (obj: any) => {
    const { token } = obj;
    localStore(storageKey.APP_TOKEN, token);
};

/**
 * 保存 QsToken
 * @param token
 */
export const userSaveQsToken = (token: string) => {
    localStore(storageKey.APP_TOKEN, token);
};


/**
 * 用户的 Token
 */
export const userToken = (): string => {
    return localStore(storageKey.APP_TOKEN) ? localStore(storageKey.APP_TOKEN) : '';
}


/**
 * 用户登录出去的后续操作
 */
export const userLogout = () => {
    localStore(storageKey.APP_TOKEN, null);
};