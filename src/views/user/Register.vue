<template>
    <div class="register">
        <div class="px--container">
            <div class="px--user-box">
                <h3 class="clearfix">
                    账号注册
                    <span>已有账号 ? &nbsp;
                        <router-link :to="{name: 'user.login'}">去登录</router-link>
                    </span>
                </h3>
                <a-row>
                    <a-col :span="12" :offset="6">
                        <a-form :label-col="{span: 0}" :wrapper-col="{span:24}" class="px--form">
                            <a-form-item label="" v-bind="validateInfos.passport">
                                <a-input v-model:value="value.passport" class="form-with-icon" placeholder="登录手机号"/>
                                <icon-font type="icon-mobile" class="form-icon"/>
                            </a-form-item>
                            <a-form-item label="" v-bind="validateInfos.captcha">
                                <a-row>
                                    <a-col :span="15">
                                        <a-input v-model:value="value.captcha" class="form-with-icon" placeholder="短信验证码"/>
                                        <icon-font type="icon-envelope" class="form-icon"/>
                                    </a-col>
                                    <a-col :span="8" :offset="1">
                                        <a-button type="primary" @click.prevent="onSendCaptcha" block
                                            :disabled="trans.captchaDisabled">
                                            {{ trans.captchaText }}
                                        </a-button>
                                    </a-col>
                                </a-row>
                            </a-form-item>
                            <a-form-item label="" v-bind="validateInfos.password">
                                <a-input-password v-model:value="value.password" class="form-with-icon" autocomplete="off"
                                    placeholder="设置密码"/>
                                <icon-font type="icon-lock" class="form-icon"/>
                            </a-form-item>
                            <a-form-item label="" v-bind="validateInfos.password_confirmation">
                                <a-input-password v-model:value="value.password_confirmation" class="form-with-icon" autocomplete="off"
                                    placeholder="确认密码"/>
                                <icon-font type="icon-lock" class="form-icon"/>
                            </a-form-item>
                            <a-form-item label="" v-bind="validateInfos.agree">
                                <a-checkbox v-model:checked="value.agree">
                                    我已阅读并同意
                                </a-checkbox>
                                <a @click.prevent="trans.protocolVisible=true">《网站服务协议》</a>
                            </a-form-item>
                            <a-form-item :wrapper-col="{ span: 24 }" style="padding-top:1rem;">
                                <a-button type="primary" @click.prevent="onRegister" :loading="loading" size="large" block>注册</a-button>
                            </a-form-item>
                        </a-form>
                    </a-col>
                </a-row>
            </div>
        </div>
        <el-dialog
            title="网站服务协议"
            v-model="trans.protocolVisible"
            width="1000px"
            destroy-on-close
            center
            @close="trans.protocolVisible = false;">
            网站服务协议内容
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { CurrentTime, useCountDown } from '@vant/use';
import { apiPySystemCaptchaSend } from '@/services/poppy';
import { isMobile } from '@popjs/util';
import { useRouter } from 'vue-router';
import { useForm } from 'ant-design-vue/es/form';
import IconFont from '@/components/base/IconFont';
import { pcToast } from '@/utils/pc';
import useUserUtil from '@/composables/useUserUtil';
import { siteUrl } from '@/utils/conf';
import { Modal } from 'ant-design-vue';
import { ElDialog } from 'element-plus';
import { mapGetters } from 'vuex';

export default defineComponent({
    setup() {
        const trans = reactive({
            tab: 'pwd',
            captchaText: '发送验证码',
            captchaDisabled: false,
            protocolVisible: false
        });
        const value = reactive({
            passport: '',
            password: '',
            password_confirmation: '',
            captcha: '',
            agree: false
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
                },
                {
                    validator(rule: any, val: string) {
                        if (!val) {
                            return Promise.resolve('')
                        }
                        if (!/[a-zA-Z.*&^%$#@!(){}\[\]0-9]{6,12}/.test(value.password)) {
                            return Promise.reject('请输入6～12位字符，可包含数字/字母（区分大小写）')
                        }
                        return Promise.resolve('')
                    },
                    trigger: 'blur'
                }
            ],
            password_confirmation: [
                {
                    required: true,
                    message: '请确认密码'
                },
                {
                    validator(rule: any, val: string) {
                        if (!val) {
                            return Promise.resolve('')
                        }
                        if (value.password !== val) {
                            return Promise.reject('确保输入密码一致')
                        }
                        return Promise.resolve('')
                    },
                    trigger: 'blur'
                }
            ],
            captcha: [
                {
                    required: true,
                    message: '请输入验证码'
                }
            ],
            agree: [
                {
                    validator(rule: any, val: string) {
                        if (!val) {
                            return Promise.reject('你需要阅读并同意 《网站服务协议》')
                        }
                        return Promise.resolve('')
                    },
                    message: '阅读并同意 《网站服务协议》'
                }
            ]
        }

        const ruleRef: any = reactive({
            passport: [],
            agree: [],
            captcha: [],
            password: [],
            password_confirmation: []
        });

        const { validate, validateInfos } = useForm(value, ruleRef);

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
        return {
            trans, value, router, siteUrl,
            countDown, rules,
            ruleRef, validate, validateInfos,
            userLogin, Modal
        }
    },
    components: {
        IconFont, ElDialog
    },
    computed: {
        ...mapGetters([
            'loading'
        ])
    },
    methods: {
        onSendCaptcha: function () {
            this.ruleRef.passport = this.rules.passport;
            this.ruleRef.password = []
            this.ruleRef.captcha = [];
            this.ruleRef.password_confirmation = [];
            this.ruleRef.agree = [];
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
        onRegister: function () {
            this.ruleRef.passport = this.rules.passport;
            this.ruleRef.password = this.rules.password
            this.ruleRef.captcha = this.rules.captcha;
            this.ruleRef.password_confirmation = this.rules.password_confirmation;
            this.ruleRef.agree = this.rules.agree;
            this.validate().then(() => {
                this.$store.dispatch('poppy/Loading').then()
                pcToast('本项目不允许注册, 此仅仅为示例Demo', false)
            }).catch(() => {
            })

        }
    }
})
</script>

<style scoped lang="less">
@import '../../assets/style/vars';

.register {
    min-height: calc(100vh - 164px);
    padding-bottom: 50px;
    background: #EAEEF5;
    background-size: cover;
    padding-top: 50px;
}
</style>
