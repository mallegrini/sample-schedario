Meteor.publish("technicians", function() {
	return Technicians.find({}, {});
});

Meteor.publish("technicians_empty", function() {
	return Technicians.find({_id:null}, {});
});

Meteor.publish("technician", function(technicianId) {
	return Technicians.find({_id:technicianId}, {});
});

