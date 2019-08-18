const state = {
	status: 0  // 0-没有修改日记 1-存在日记修改
}

const mutations = {
	alterStatus (state, status) {
		state.status = status
	}
}

const getters = {
	
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}