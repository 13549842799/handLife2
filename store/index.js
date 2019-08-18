import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/article/finalReport'
import center from './modules/center'
import diary from './modules/article/diary.js'
import novel from './modules/article/novel.js'
import dataUtil from './../common/dataUtil.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: true,
        hasLogin: false,
        accountName: '',
		nikename: '',
		avatar: '/static/logo.png',
		bindPhone: ''
    },
    mutations: {
        login(state, session) {
			state.accountName = session.name
            state.nikename = session.nikename || session.name;
			state.avatar = session.avatar || state.avatar
			state.bindPhone = session.bindPhone
            state.hasLogin = true;
			console.log('登录后...')
        },
        logout(state) {
            state.nikename = '';
			state.accountName = ''
			state.avatar  = '/static/logo.png'
			state.bindPhone = ''
            state.hasLogin = false;
        },
		alterCache (state, sess) {
			console.log(sess)
			sess.forEach((val, key) => {
				state[key] = val
			})
		}
    },
	getters: {
		encryptionPhone: state =>  {
			return dataUtil.encryption(state.bindPhone, 3, 4) // 因为这里起始从0开始，所以是3
		}
	},
	actions: {
		loginValid () {
			
		}
	},
	modules: {
		login,
		center,
		diary,
		novel
	}
})

export default store
