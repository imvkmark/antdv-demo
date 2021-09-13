import { Module } from 'vuex'
import { RootStateTypes, UserTypes } from '@/store/types'
import { apiPySystemAuthAccess } from '@/services/poppy';

// Create a new store Modules.
const user: Module<UserTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        user: {}
    },
    actions: {
        Fetch({ state }) {
            apiPySystemAuthAccess().then(({ success, data }) => {
                if (success) {
                    state.user = data;
                }
            })
        }
    }
}

export default user
