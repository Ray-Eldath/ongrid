const state = {
    permissions: undefined,
    roles: undefined,
    permissionsInitialized: false,
    rolesInitialized: false
};

const mutations = {
    setPermissions(state, { permissions }) {
        state.permissions = permissions || state.permissions;
        state.permissionsInitialized = true;
    },
    setRoles(state, { roles }) {
        state.roles = roles || state.roles;
        state.rolesInitialized = true;
    },
    clearMeta(state) {
        state.permissions = undefined;
        state.permissionsInitialized = false;

        state.roles = undefined;
        state.rolesInitialized = false;
    }
};

const actions = {};

export default {
    state,
    mutations,
    actions
};
