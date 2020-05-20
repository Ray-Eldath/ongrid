const state = {
    userModel: undefined,
    userModelInitialized: false
};

const mutations = {
    setUserModel(state, userModel) {
        state.userModel = userModel;
        state.userModelInitialized = true;
    },
    clearMeta(state) {
        state.userModel = undefined;
        state.userModelInitialized = false;
    }
};

const actions = {};

export default {
    state,
    mutations,
    actions
};
