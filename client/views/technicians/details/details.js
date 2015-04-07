var pageSession = new ReactiveDict();

Template.TechniciansDetails.rendered = function() {
	
};

Template.TechniciansDetails.events({
	
});

Template.TechniciansDetails.helpers({
	
});

Template.TechniciansDetailsDetailsForm.rendered = function() {
	

	pageSession.set("techniciansDetailsDetailsFormInfoMessage", "");
	pageSession.set("techniciansDetailsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.TechniciansDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("techniciansDetailsDetailsFormInfoMessage", "");
		pageSession.set("techniciansDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			if(!t.find("#form-cancel-button")) {
				var message = msg || "Saved.";
				pageSession.set("techniciansDetailsDetailsFormInfoMessage", message);
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("techniciansDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("technicians", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("technicians", {});
	}

	
});

Template.TechniciansDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("techniciansDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("techniciansDetailsDetailsFormErrorMessage");
	}
	
});
