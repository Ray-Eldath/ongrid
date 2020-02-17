const state = {
    treePermissions: undefined,
    flattenPermissions: undefined,
    roles: undefined,
    permissionsInitialized: false,
    rolesInitialized: false
};

const mutations = {
    setPermissions(state, { treePermissions, flattenPermissions }) {
        state.treePermissions = treePermissions || state.treePermissions;
        state.flattenPermissions =
            flattenPermissions || state.flattenPermissions;
        state.permissionsInitialized = true;
    },
    setRoles(state, { roles }) {
        state.roles = roles || state.roles;
        state.rolesInitialized = true;
    },
    clearMeta(state) {
        state.treePermissions = undefined;
        state.flattenPermissions = undefined;
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
