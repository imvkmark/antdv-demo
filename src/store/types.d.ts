export interface RootStateTypes {
    text: string
}

export interface PoppyTypes {
    loading: boolean,
    appId: string,
    core: object,
    token: string,
}

export interface UserTypes {
    user: object,
}

export interface AllStateTypes extends RootStateTypes {
    poppy: PoppyTypes,
    user: UserTypes
}


