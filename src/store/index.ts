import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { AllStateTypes, RootStateTypes } from './types'

import poppy from './modules/poppy'
import user from '@/store/modules/user';

export const store = createStore<RootStateTypes>({
    state: {
        text: 'This is Vuex Root.state.text'
    },
    getters: {
        loading(state: any) {
            return state.poppy.loading;
        },
        token(state: any) {
            return state.poppy.token
        },
        user(state: any) {
            return state.user.user
        }
    },
    mutations: {},
    actions: {},
    modules: {
        poppy,
        user
    }
})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store')

export function useStore<T = AllStateTypes>() {
    return baseUseStore<T>(key)
}
