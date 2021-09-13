import MenuItem = Menu.MenuItem;

const menus: Array<MenuItem> = [
    {
        title: '控制台',
        icon: 'icon-navigate',
        route: 'cp.home'
    },
    {
        title: '用户中心',
        icon: 'icon-user',
        route: 'user.basic',
        children: [
            {
                title: '用户资料',
                route: 'user.basic'
            },
            {
                title: '实名信息',
                route: 'user.verify'
            }
        ]
    },
    {
        title: '财务',
        icon: 'icon-cup',
        route: 'finance.charge',
        children: [
            {
                title: '充值',
                route: 'finance.charge'
            },
            {
                title: '收支明细',
                route: 'finance.detail'
            }
        ]
    }
]
export default menus
