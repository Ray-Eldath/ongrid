const state = {
    authToken: "",
    authExpire: -1,
    id: -1,
    username: "",
    email: "",
    role: {
        id: -1,
        name: ""
    },
    permissions: [],
    avatarUrl: "",
    authed: false
};

const mutations = {
    login(
        state,
        { token, expire, id, username, email, role, permissions, avatarUrl }
    ) {
        state.authToken = token;
        state.authExpire = expire;
        state.id = id || state.id;
        state.username = username || state.username;
        state.email = email || state.email;
        state.role = role || state.role;
        state.permissions = permissions || state.permissions;
        state.avatarUrl = avatarUrl || state.avatarUrl;
        state.authed = true;
    },
    logout(state) {
        state.authToken = "";
        state.authExpire = -1;
        state.id = -1;
        state.username = "";
        state.email = "";
        state.role.id = -1;
        state.role.name = "";
        state.permissions = [];
        state.avatarUrl = "";
        state.authed = false;
    }
};

const actions = {};

export default {
    state,
    mutations,
    actions
};
