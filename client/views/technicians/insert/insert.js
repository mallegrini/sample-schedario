var pageSession = new ReactiveDict();

Template.TechniciansInsert.rendered = function() {
	
};

Template.TechniciansInsert.events({
	
});

Template.TechniciansInsert.helpers({
	
});

Template.TechniciansInsertInsertForm.rendered = function() {
	

	pageSession.set("techniciansInsertInsertFormInfoMessage", "");
	pageSession.set("techniciansInsertInsertFormErrorMessage", "");

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

Template.TechniciansInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("techniciansInsertInsertFormInfoMessage", "");
		pageSession.set("techniciansInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			if(!t.find("#form-cancel-button")) {
				var message = msg || "Saved.";
				pageSession.set("techniciansInsertInsertFormInfoMessage", message);
			}

			Router.go("technicians", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("techniciansInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Technicians.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("technicians", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.TechniciansInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("techniciansInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("techniciansInsertInsertFormErrorMessage");
	}
	
});
