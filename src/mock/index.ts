import Mock, { MockCbOptions } from 'better-mock';
import { fakerImageUrl, fakerSize } from '@/utils/faker';
import { appUrl } from '@/utils/conf';

const mkSuccess = (data: any) => {
    return {
        status: 0,
        message: '# Mock Success #',
        ...{
            data: data
        }
    }
}

const mkUserInfo = () => {
    Mock.mock(`${appUrl}/api/user/info`, mkSuccess({
        name: '@name',
        bio: '@city',
        blog: '@url'
    }))
}
const mkGameServer = (load: boolean = true) => {
    if (!load) {
        return;
    }
    Mock.mock(`${appUrl}/api/account/game/servers`, mkSuccess([{
        'id': 0,
        'title': '全部',
        'servers': [{ 'id': 17, 'title': '安卓QQ区', 'parent_id': 14, 'top_parent_id': 1 }, {
            'id': 18,
            'title': '苹果QQ区',
            'parent_id': 14,
            'top_parent_id': 1
        }, { 'id': 16, 'title': '苹果微信区', 'parent_id': 13, 'top_parent_id': 1 }, {
            'id': 15,
            'title': '安卓微信区',
            'parent_id': 13,
            'top_parent_id': 1
        }]
    }, {
        'id': 14,
        'title': 'QQ大区',
        'servers': [{ 'id': 17, 'title': '安卓QQ区', 'parent_id': 14, 'top_parent_id': 1 }, {
            'id': 18,
            'title': '苹果QQ区',
            'parent_id': 14,
            'top_parent_id': 1
        }]
    }, {
        'id': 13,
        'title': '微信大区',
        'servers': [{ 'id': 16, 'title': '苹果微信区', 'parent_id': 13, 'top_parent_id': 1 }, {
            'id': 15,
            'title': '安卓微信区',
            'parent_id': 13,
            'top_parent_id': 1
        }]
    }]))
}
const mkGameProperty = (load: boolean = true) => {
    if (!load) {
        return;
    }
    Mock.mock(`${appUrl}/api/account/game/property`, mkSuccess([{
        'id': 3,
        'title': '国标截图',
        'type': 'image',
        'is_required': 'N',
        'val': []
    }, {
        'id': 5,
        'title': '防沉迷',
        'type': 'radio',
        'is_required': 'N',
        'val': [{ 'id': 8, 'title': '是' }, { 'id': 9, 'title': '否' }]
    }, {
        'id': 7,
        'title': '商品保障',
        'type': 'checkbox',
        'is_required': 'N',
        'val': [{ 'id': 11, 'title': '已投保' }, { 'id': 13, 'title': '已投保2' }]
    }, {
        'id': 35,
        'title': '账号来源',
        'type': 'radio',
        'is_required': 'Y',
        'val': [{ 'id': 34, 'title': '自己注册' }, { 'id': 35, 'title': '平台购买' }, { 'id': 36, 'title': '他人赠送' }]
    }]))
}
const mkOrderBuy = () => {
    Mock.mock(`${appUrl}/api/order/buy`, function (options: MockCbOptions) {
        let params = JSON.parse(options.body ? options.body : '{}');
        const { size, page, total, pages, pagesize } = fakerSize(params);
        return mkSuccess(Mock.mock({
            'list|15': [{
                'id|+1': page * pagesize,
                'title|5-10': '@CWORD',
                'sell_nickname|5-10': '@CWORD',
                'image': fakerImageUrl(20, 20),
                'area': Mock.Random.cword(4),
                'server': Mock.Random.cword(4),
                'game_nickname': Mock.Random.cword(8),
                'sub_title': Mock.Random.cword(8),
                'price|0-20.2': 20,
                'status': Mock.Random.cword(3),
                'status_desc': Mock.Random.cword(3),
                'time': Mock.Random.cword(8)
            }],
            pagination: {
                total,
                size,
                page,
                pages
            }
        }))
    })
}

const mkListEmpty = () => {
    Mock.mock(`${appUrl}/api/list/empty`, function (options: MockCbOptions) {
        let params = JSON.parse(options.body ? options.body : '{}');
        const { size, page, total, pages } = fakerSize(params);
        return mkSuccess({
            list: [],
            pagination: {
                total,
                size,
                page,
                pages
            }
        })
    })
}


export const mockAll = () => {
    mkUserInfo();
    mkOrderBuy();
    mkListEmpty();
    mkGameProperty(false);
    mkGameServer(false);
}
