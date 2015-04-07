var pageSession = new ReactiveDict();

Template.TechniciansEdit.rendered = function() {
	
};

Template.TechniciansEdit.events({
	
});

Template.TechniciansEdit.helpers({
	
});

Template.TechniciansEditEditForm.rendered = function() {
	

	pageSession.set("techniciansEditEditFormInfoMessage", "");
	pageSession.set("techniciansEditEditFormErrorMessage", "");

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

	$('#tagsinput').tagsInput({'removeWithBackspace' : true,'defaultText':'Tags',delimiter: [',']});

	$("input[autofocus]").focus();
};

Template.TechniciansEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("techniciansEditEditFormInfoMessage", "");
		pageSession.set("techniciansEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction(msg) {
			if(!t.find("#form-cancel-button")) {
				var message = msg || "Saved.";
				pageSession.set("techniciansEditEditFormInfoMessage", message);
			}

			Router.go("technicians", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("techniciansEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Technicians.update({ _id: t.data.technician._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.TechniciansEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("techniciansEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("techniciansEditEditFormErrorMessage");
	}
	
});
