import api from '../api';
//import router from '../router';

const state = {
    //token: localStorage.getItem('token') || '',
    token: '',
    user: {},
    status: '',
    error: null
};

const getters = {
    // isLoggedIn: function (state) {
    //     if (state.token != '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};

const actions = {
    // Login Action
    async login({
        commit
    }, user) {
        commit('auth_request');
        try {
            let res = await api().post('/users/login', user)
            console.log(res)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                // Set the api defaults
                api().defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            //console.log(err)
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await api().post('/users/register', userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // Get the user Profile
    async getProfile({
        commit
    }) {
        commit('profile_request');
        let res = await api().get('/users/profile')
        commit('user_profile', res.data.user)
        return res;
    },
    // Logout the user
    async logout({
        commit
    }) {
        //await localStorage.removeItem('token');
        //await this.$auth.logout
        
        commit('logout');
        delete api().defaults.headers.common['Authorization'];
        this.$router.push('/login');
        return
    }
};

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        console.log("Inside login success mutation")
        console.log(state)
        state.token = token
        console.log(state)
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};