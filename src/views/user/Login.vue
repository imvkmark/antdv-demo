<template>
    <div class="login">
        <div class="px--container">
            <a-row>
                <a-col :span="14" class="login-desc">
                    <h2><icon-font type="icon-watch"></icon-font>网站介绍</h2>
                    <ul>
                        <li>
                            介绍1
                        </li>
                        <li>
                            介绍2
                        </li>
                        <li>
                            介绍3
                        </li>
                        <li>
                            介绍4
                        </li>
                    </ul>
                </a-col>
                <a-col :span="8" :offset="2">
                    <div class="form" id="form">
                        <a-tabs v-model:activeKey="trans.tab" class="px--login-tab">
                            <a-tab-pane key="pwd" tab="账号密码登录" class="form-pane px--form">
                                <h3>账号登录</h3>
                                <a-form :label-col="{span: 0}" :wrapper-col="{span:24}">
                                    <a-form-item label="" v-bind="validateInfos.passport">
                                        <a-input v-model:value="value.passport" class="form-with-icon"/>
                                        <icon-font type="icon-mobile" class="form-icon"/>
                                    </a-form-item>
                                    <a-form-item label="" v-bind="validateInfos.password">
                                        <a-input-password v-model:value="value.password" class="form-with-icon" autocomplete="off"/>
                                        <icon-font type="icon-lock" class="form-icon"/>
                                    </a-form-item>
                                    <a-form-item :wrapper-col="{ span: 24 }" style="padding-top:1rem;">
                                        <a-button type="primary" @click.prevent="onPwdSubmit" :loading="loading" size="large" block>登录
                                        </a-button>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>
                            <a-tab-pane key="captcha" tab="手机动态码登录" class="form-pane px--form">
                                <h3>账号登录</h3>
                                <a-form :label-col="{span: 0}" :wrapper-col="{span:24}">
                                    <a-form-item label="" v-bind="validateInfos.passport">
                                        <a-input v-model:value="value.passport" class="form-with-icon"/>
                                        <icon-font type="icon-mobile" class="form-icon"/>
                                    </a-form-item>
                                    <a-form-item label="" v-bind="validateInfos.captcha">
                                        <a-row>
                                            <a-col :span="11">
                                                <a-input v-model:value="value.captcha" class="form-with-icon"/>
                                                <icon-font type="icon-envelope" class="form-icon"/>
                                            </a-col>
                                            <a-col :span="12" :offset="1">
                                                <a-button type="primary" @click.prevent="onSendCaptcha" block
                                                    :disabled="trans.captchaDisabled">
                                                    {{ trans.captchaText }}
                                                </a-button>
                                            </a-col>
                                        </a-row>
                                    </a-form-item>
                                    <a-form-item :wrapper-col="{ span: 24 }" style="padding-top:1rem;">
                                        <a-button type="primary" @click.prevent="onLogin" :loading="loading" block>登录</a-button>
                                    </a-form-item>
                                </a-form>
                            </a-tab-pane>
                        </a-tabs>
                        <div class="account">
                            <div>还没有账号?立即
                                <router-link :to="{name: 'user.register'}">免费注册</router-link>
                            </div>
                            <div>
                                <router-link :to="{name: 'user.forgot_password'}">忘记密码?</router-link>
                            </div>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { CurrentTime, useCountDown } from '@vant/use';
import { apiPySystemAuthLogin, apiPySystemCaptchaSend } from '@/services/poppy';
import { isMobile } from '@popjs/util';
import { useRouter } from 'vue-router';
import { useForm } from 'ant-design-vue/es/form';
import IconFont from '@/components/base/IconFont';
import { pcToast } from '@/utils/pc';
import useUserUtil from '@/composables/useUserUtil';
import PxSpin from '@/components/pc/PxSpin.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    setup() {
        const trans = reactive({
            tab: 'pwd',
            captchaText: '发送验证码',
            captchaDisabled: false
        });
        const value = reactive({
            passport: '',
            password: '',
            captcha: ''
        })

        const rules = {
            passport: [
                {
                    required: true,
                    message: '请输入手机号'
                },
                {
                    validator(rule: any, val: string) {
                        if (!val) {
                            return Promise.resolve('')
                        }
                        if (!isMobile(val)) {
                            return Promise.reject('请输入正确的手机号')
                        }
                        return Promise.resolve('')
                    },
                    trigger: 'blur'
                }
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码'
                }
            ],
            captcha: [
                {
                    required: true,
                    message: '请输入验证码'
                }
            ]
        }

        const ruleRef: any = reactive({
            passport: [],
            password: [],
            captcha: []
        });

        const { validate, validateInfos, clearValidate } = useForm(value, ruleRef);

        const router = useRouter();
        const captchaFinish = () => {
            trans.captchaDisabled = false;
            trans.captchaText = '发送验证码'
        }
        const countDown = useCountDown({
            time: 60 * 1000,
            onChange: function (current: CurrentTime) {
                if (current.seconds === 0) {
                    captchaFinish()
                } else {
                    trans.captchaText = `${current.seconds}秒后重发`
                }
            },
            onFinish: captchaFinish
        });

        const { userLogin } = useUserUtil();

        watch(
            () => trans.tab,
            () => {
                clearValidate();
            }
        )

        return {
            trans, value, router,
            countDown, rules,
            ruleRef, validate, validateInfos, clearValidate,
            userLogin
        }
    },
    components: {
        PxSpin,
        IconFont
    },
    computed: {
        ...mapGetters([
            'loading'
        ])
    },
    methods: {
        onSendCaptcha: function () {
            this.clearValidate();
            this.ruleRef.passport = this.rules.passport;
            this.ruleRef.captcha = [];
            this.ruleRef.password = [];
            this.validate().then(() => {
                apiPySystemCaptchaSend({
                    passport: this.value.passport
                }).then(({ message, success }) => {
                    pcToast(message, success)
                    if (success) {
                        this.trans.captchaDisabled = true;
                        this.countDown.reset();
                        this.countDown.start();
                    }
                })
            }).catch(() => {
            })
        },
        onPwdSubmit: function () {
            this.ruleRef.passport = this.rules.passport;
            this.ruleRef.password = this.rules.password
            this.ruleRef.captcha = [];
            this.validate().then(() => {
                this.$store.dispatch('poppy/Loading').then()
                apiPySystemAuthLogin({
                    passport: this.value.passport,
                    password: this.value.password
                }).then(({ message, success, data }) => {
                    pcToast(message, success)
                    if (success) {
                        this.trans.captchaDisabled = true;
                        this.countDown.reset();
                        this.countDown.start();
                        this.userLogin(data);
                    }
                })
            }).catch(() => {
            })

        },
        // 这里进行多页加载
        onLogin: function () {
            this.ruleRef.passport = this.rules.passport;
            this.ruleRef.captcha = this.rules.captcha;
            this.ruleRef.password = []

            this.validate().then(() => {
                this.$store.dispatch('poppy/Loading').then()
                apiPySystemAuthLogin({
                    passport: this.value.passport,
                    captcha: this.value.captcha
                }).then(({ success, message, data }) => {
                    pcToast(message, success)
                    if (success) {
                        this.userLogin(data);
                    }
                })
            }).catch(() => {
            })
        }
    }
})
</script>

<style scoped lang="less">
@import '../../assets/style/vars';

.login {
    min-height: calc(100vh - 164px);
    padding-top: 145px;
    padding-bottom: 145px;
    background: #EAEEF5;
    background-size: cover;
    .login-desc {
        h2 {
            font-size: 60px;
            font-weight: bold;
            height: 84px;
            line-height: 84px;
            padding-top: 55px;
        }
        ul {
            padding-top: 42px;
            li {
                font-size: 22px;
                height: 85px;
                line-height: 85px;
                img {
                    height: 45px;
                    margin-right: 22px;
                }
            }
        }
    }
}

.form {
    background: #FFF;
    .account {
        color: @textColor;
        padding: 1rem 37px 35px;
        display: flex;
        justify-content: space-between;
    }
}

.form-pane {
    padding: 20px 37px 0;
    min-height: 380px;
    h3 {
        font-size: 22px;
        text-align: center;
        margin-bottom: 30px;
    }

}

</style>
