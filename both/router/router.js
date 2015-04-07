Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

if(Meteor.isClient) {
	Router.onBeforeAction(function() {
		// loading indicator here
		if(!this.ready()) {
			$("body").addClass("wait");
		} else {
			$("body").removeClass("wait");
			this.next();
		}
	});
}

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("technicians", {path: "/technicians", controller: "TechniciansController"});
	this.route("technicians.insert", {path: "/technicians/insert", controller: "TechniciansInsertController"});
	this.route("technicians.details", {path: "/technicians/details/:technicianId", controller: "TechniciansDetailsController"});
	this.route("technicians.edit", {path: "/technicians/edit/:technicianId", controller: "TechniciansEditController"});/*ROUTER_MAP*/
});
