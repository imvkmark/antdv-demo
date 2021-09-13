<template>
    <div class="cp-wrapper">
        <a-row>
            <a-col :span="8">
                <div class="cp-box">
                    <h3>
                        <icon-font type="icon-user"/>
                        账号信息
                    </h3>
                    <div class="box-info">
                        <img src="@/assets/app/favicon.png" alt="Wulicode">
                        <p>{{ get(trans.user, 'nickname') ? get(trans.user, 'nickname') : '尚未设置昵称' }}</p>
                        <router-link :to="{name:'user.basic'}">
                            <icon-font type="icon-edit"/>
                            编辑资料
                        </router-link>
                    </div>
                    <div class="box-footer">
                        <span>会员ID : {{ get(trans.user, 'id') }}</span>
                        <span>注册时间 : {{ get(trans.user, 'created_at') }}</span>
                    </div>
                </div>
            </a-col>
            <a-col :span="8">
                <div class="cp-box">
                    <h3>
                        <icon-font type="icon-cup"/>
                        财务概览
                    </h3>
                    <div class="box-info">
                        <span class="finance-desc">
                            可用余额(元)
                        </span>
                        <span class="finance-amount">
                            0.00
                        </span>
                        <router-link :to="{name:'finance.charge'}" class="finance-charge">
                            充值
                        </router-link>
                        <router-link :to="{name:'finance.charge'}" class="finance-detail">
                            收支明细
                        </router-link>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>

</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import IconFont from '@/components/base/IconFont';
import { useStore } from '@/store';
import { get } from 'lodash-es';

export default defineComponent({
    name: 'CpHome',
    setup() {
        const store = useStore();
        const trans = reactive({
            user: computed(() => store.getters.user)
        })
        return {
            trans,
            get
        }
    },
    components: {
        IconFont
    }
})
</script>

<style scoped lang="less">
@import '../../assets/style/vars';

.cp-wrapper {
    padding: 25px 0 25px 25px;
    min-width: 1180px;
    box-sizing: border-box;
}

.cp-box {
    box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.20);
    background: #FFF;
    min-height: 380px;
    margin-right: 25px;
    box-sizing: border-box;
    position: relative;;
    h3 {
        line-height: 45px;
        padding: 20px;
        height: 45px;
        font-size: 20px;
        font-weight: bold;
        color: #A3B1CC;
        .anticon {
            margin-right: 5px;
        }
    }
    .box-info {
        height: 260px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
            font-weight: bold;
            font-size: 18px;
            margin: 0.6rem 0;
        }
        img {
            height: 80px;
            width: 80px;
        }
        .finance-desc {
            font-weight: bold;
            font-size: 16px;
        }
        .finance-amount {
            font-size: 32px;
            color: #FA0;
            font-weight: 700;
        }
        .finance-charge {
            background: #FA0;
            color: #FFF;
            font-size: 15px;
            font-weight: bold;
            padding: 6px 55px;
        }
        .finance-detail {
            line-height: 46px;
            height: 46px;
        }
    }
    .box-footer {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 0 40px;
        height: 80px;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-content: center;
        span {
            line-height: 80px;
        }
        border-top: 1px solid #EFEFEF;

    }
}

</style>
