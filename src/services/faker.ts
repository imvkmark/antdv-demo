import request from '@/utils/request';

export async function apiFakerEmptyList(params: object) {
    return request({
        url: '/api/list/empty',
        params
    });
}