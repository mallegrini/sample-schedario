this.TechniciansDetailsController = RouteController.extend({
	template: "TechniciansDetails",

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("technician", this.params.technicianId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			technician: Technicians.findOne({_id:this.params.technicianId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});