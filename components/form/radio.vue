<template>
	<title-item :title="title">
		<radio-group @change="radioChange" :class="{'form-radio-group-dire': dire}">
			<label class="form-radio-label" v-for="(item, index) in items" :key="index" >
				<view>
					<radio :value="item.value" :checked="item.value === defaultValue" />
				</view>
				<view>{{item.name}}</view>
			</label>
		</radio-group>
	</title-item>
</template>

<script>
import titleItem from './titleItem.vue'

export default {
	components: {
		titleItem
	},
	props: {
		title: {
			type: String
		},
		items: {
			type: Array,
			require: true
		},
		defaultValue: {
			type: String
		},
		dire: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
		}
	},
	methods: {
		radioChange(e) {
			for (let i = 0; i < this.items.length; i++) {
				if (String(this.items[i].value) === e.target.value) {				
					this.$emit('change', {value: this.items[i].value, index: i})
					break;
				}
			}
		}
	}
}
</script>

<style>
.form-radio-label {
	display: flex;
	flex-direction: row;
	margin-bottom: 20upx;
	margin-right: 30upx;
}

.form-radio-label radio {
	margin-right: 20upx;
}

.form-radio-group-dire {
	display: flex;
	flex-direction: row;
}
</style>
