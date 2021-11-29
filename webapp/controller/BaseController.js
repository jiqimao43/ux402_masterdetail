sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ux402_masterdetail.controller.BaseController", {
		
		getRouter: function(){
			return this.getOwnerComponent().getRouter();
		},
		
		getListSelector: function(){
			return this.getOwnerComponent().oListSelector;                         
		}

	});
});