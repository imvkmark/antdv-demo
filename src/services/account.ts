import request from '@/utils/request';

/**
 * 订单申请
 * @param params
 */
export async function apiAccountBuyOrderApplySale(params: object) {
    return request({
        url: '/api/account/buy_order/apply_sale',
        params
    });
}

