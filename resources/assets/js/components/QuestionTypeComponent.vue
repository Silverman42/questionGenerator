<template>
<div>
	<div class="form-group" style="font-size: 13px">
		<label for="input">Question Type</label>
		<select v-model='createQuestSelect' name="question_type" id="input" class="form-control qg-input" required="required">
			<option value="Theory">Theory</option>
			<option value="MC">MC</option>
		</select>
	</div>
	<div v-if="questionTypeCreate()" class="form-group" style="font-size: 13px">
		<label>Options</label>
		<div style="padding: 10px 0px">
			<button v-on:click.prevent="addOption()" class="btn btn-block qg-btn btn-green--transparent font-secondary">
			Add new option
			</button>
		</div>
		<div class="qg-flex" v-for="(option,index) in options">
			<div class="qg-col--xs--9" style="padding: 0px 4px">
				<input type="text" name="options[]" id="qg-landing-dp-name" class="form-control qg-input" value=""  placeholder="option" title="">
			</div>
			<div class="qg-col--xs--2">
				<button v-if="index > 0" v-on:click.prevent="removeOption(index)" class="btn btn-red--transparent font-secondary">
				<span class="glyphicon glyphicon-remove"></span>
				</button>
			</div>
		</div>
		<div class="qg-col--xs--10 font-primary" style="color: lightgrey">
			Select any of the radio inputs on the left of each option to chose an answer for the question
		</div>
	</div>
</div>
</template>
<script>
	export default {
		data(){
			return {
				createQuestSelect: '',
				options: [0]
			}
		},
		methods:{
			questionTypeCreate: function(){
				return this.createQuestSelect == 'MC' ? true : false ;
			},
			addOption: function () {
				return this.options.push(0);
			},
			removeOption:function (index) {
				return this.options.splice(index,1);
			}

		}
	}
</script>