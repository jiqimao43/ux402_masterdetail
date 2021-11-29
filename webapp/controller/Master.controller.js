sap.ui.define([
	"ux402_masterdetail/controller/BaseController",
	"sap/ui/Device"
], function(Controller, Device) {
	"use strict";

	return Controller.extend("ux402_masterdetail.controller.Master", {

		
			onInit: function () {
			},
            
            onAfterRendering: function() {
                var oList = this.byId("list");
			    this._oList = oList;
			    this.getListSelector().setBoundMasterList(oList);
			    this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			    this.getRouter().attachBypassed(this.onBypassed, this);
            },
            
		    _navigateToCarrierDetails : function(sCarrierId,bReplace) {
				this.getRouter().navTo("carrierdetails", {
                    objectId: sCarrierId
				}, bReplace);
            },
            
            _showDetail: function(oItem) {
			    var bReplace = !Device.system.phone;
			    var sCarrierId = oItem.getBindingContext().getProperty("AirLineID");
			    this._navigateToCarrierDetails(sCarrierId,bReplace);
            },
            
            onSelect: function(oEvent) {
			    this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		    },

		    /**
		    * Event handler for the bypassed event, which is fired when no routing pattern matched.
		    * If there was an object selected in the master list, that selection is removed.
		    */
		    onBypassed: function() {
			    this._oList.removeSelections(true);
		    },

		    /**
		    * If the master route was hit (empty hash) we have to set
		    * the hash to to the first item in the list as soon as the
		    * listLoading is done and the first item in the list is known
		    */
		    _onMasterMatched: function() {
			    this.getListSelector().oWhenListLoadingIsDone.then(
				    function(mParams) {
					    if (mParams.list.getMode() === "None") {
						    return;
					    }
					    var sObjectId = mParams.firstListitem.getBindingContext().getProperty("AirLineID");
					    this._navigateToCarrierDetails(sObjectId,true);
				    }.bind(this)
			    );
		    }

	});

});