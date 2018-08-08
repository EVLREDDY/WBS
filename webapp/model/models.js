sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		projectsData: function () {
			var data = [{
				Task: "WM Replacement",
				hoursCharged: 0,
				noOfDays: 31,
				month: "Aug 2018"
			}, {
				Task: "Walkie Talkie",
				hoursCharged: 0,
				noOfDays: 31,
				month: "Aug 2018"
			}];
			return data;
		},
		graphData: function () {
			return [{
				Budget: 210000,
				Cost: 230000,
				Cost1: 24800.63,
				Cost2: 205199.37,
				Revenue: 431000.22,
				Target: 500000,
				Week: "Week 1 - 4"
			}, {
				Budget: 210000,
				Cost: 230000,
				Cost1: 24800.63,
				Cost2: 205199.37,
				Revenue: 431000.22,
				Target: 500000,
				Week: "Week 4 - 7"
			}, {
				Budget: 210000,
				Cost: 230000,
				Cost1: 24800.63,
				Cost2: 205199.37,
				Revenue: 431000.22,
				Target: 500000,
				Week: "Week 8 - 10"
			}];
		}

	};
});