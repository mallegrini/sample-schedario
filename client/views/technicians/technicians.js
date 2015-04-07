var pageSession = new ReactiveDict();

Template.Technicians.rendered = function() {
	
};

Template.Technicians.events({
	
});

Template.Technicians.helpers({
	
});

var TechniciansViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TechniciansViewSearchString");
	var sortBy = pageSession.get("TechniciansViewSortBy");
	var sortAscending = pageSession.get("TechniciansViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "surname", "birthdate", "note"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TechniciansViewExport = function(cursor, fileType) {
	var data = TechniciansViewItems(cursor);
	var exportFields = ["name", "surname", "birthdate", "note"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TechniciansView.rendered = function() {
	pageSession.set("TechniciansViewStyle", "table");
	
};

Template.TechniciansView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TechniciansViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TechniciansViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TechniciansViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("technicians.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TechniciansViewExport(this.technicians, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TechniciansViewExport(this.technicians, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TechniciansViewExport(this.technicians, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TechniciansViewExport(this.technicians, "json");
	}

	
});

Template.TechniciansView.helpers({

	

	"isEmpty": function() {
		return !this.technicians || this.technicians.count() == 0;
	},
	"isNotEmpty": function() {
		return this.technicians && this.technicians.count() > 0;
	},
	"isNotFound": function() {
		return this.technicians && pageSession.get("TechniciansViewSearchString") && TechniciansViewItems(this.technicians).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TechniciansViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TechniciansViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TechniciansViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TechniciansViewStyle") == "gallery";
	}

	
});


Template.TechniciansViewTable.rendered = function() {
	
};

Template.TechniciansViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TechniciansViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TechniciansViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TechniciansViewSortAscending") || false;
			pageSession.set("TechniciansViewSortAscending", !sortAscending);
		} else {
			pageSession.set("TechniciansViewSortAscending", true);
		}
	}
});

Template.TechniciansViewTable.helpers({
	"tableItems": function() {
		return TechniciansViewItems(this.technicians);
	}
});


Template.TechniciansViewTableItems.rendered = function() {
	
};

Template.TechniciansViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("technicians.details", {technicianId: this._id});
		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Technicians.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("technicians.edit", {technicianId: this._id});
		return false;
	}
});

Template.TechniciansViewTableItems.helpers({
	

	
});
