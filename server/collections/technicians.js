Technicians.allow({
	insert: function (userId, doc) {
		return Technicians.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Technicians.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Technicians.userCanRemove(userId, doc);
	}
});

Technicians.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;

	
});

Technicians.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Technicians.before.remove(function(userId, doc) {
	
});

Technicians.after.insert(function(userId, doc) {
	
});

Technicians.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Technicians.after.remove(function(userId, doc) {
	
});
