this.Technicians = new Meteor.Collection("technicians");

this.Technicians.userCanInsert = function(userId, doc) {
	return true;
}

this.Technicians.userCanUpdate = function(userId, doc) {
	return true;
}

this.Technicians.userCanRemove = function(userId, doc) {
	return true;
}
