sap.ui.define([
	"sap/ui/core/mvc/Controller", "Acc/WBS/model/models", "sap/ui/model/json/JSONModel"
], function (Controller, models, JSONModel) {
	"use strict";

	return Controller.extend("Acc.WBS.controller.Home", {
		onInit: function () {
			var projectData = models.projectsData();
			for (var j = 0; j < projectData.length; j++) {
				var days = projectData[0].noOfDays;
				var indDays = [];
				var sIndex = days > 15 ? 16 : 1;
				for (var i = sIndex; i <= days; i++) {
					if (!projectData[j].daysObj) {
						projectData[j].daysObj = {};
						projectData[j]["daysObj"][i + projectData[0].month] = 0;
						projectData[j]["daysObj"][i + projectData[0].month + "Text"] = i + " " + projectData[0].month;
					} else {
						projectData[j]["daysObj"][i + projectData[0].month] = 0;
						projectData[j]["daysObj"][i + projectData[0].month + "Text"] = i + " " + projectData[0].month;
					}
				}
			}
			this.byId("tableId").setVisibleRowCount(parseInt(projectData.length));
			this.bindTable(projectData);
			this.byId("idVizFrame").setModel(new JSONModel(models.graphData()));
		},
		bindTable: function (projectData) {
			var wbsTable = this.byId("tableId");
			/*var template = new sap.ui.table.Column({}); 
			template.setLabel(new sap.m.Label({
				text: "Task"
			}));
			var text = new sap.m.Link({press:[this.onLinkPress,this]}).bindProperty('text',"Task");
			template.setTemplate(text);
			wbsTable.addColumn(template);*/
			wbsTable.setModel(new JSONModel(projectData));
		},
		onDaysPress: function (e) {
			debugger;
			var bObj = e.oSource.getBindingContext().getObject();
			if (!this.daysDialog) {
				this.daysDialog = sap.ui.xmlfragment("Acc.WBS.fragments.days", this);
				this.setVBoxTemplate(bObj);
			}
			sap.ui.getCore().byId("daysGridId").bindElement("/");
			this.daysDialog.setModel(new JSONModel(bObj.daysObj));
			this.daysDialog.open();
		},
		setVBoxTemplate: function (bObj) {
			//daysGridId
			//var wbsTable = this.byId("tableId");
			//var data = wbsTable.getModel().getData();
			var grid = sap.ui.getCore().byId("daysGridId");
			var keys = Object.keys(bObj.daysObj);
			for (var i = 0; i < keys.length; i++) {
				var vBox = new sap.m.VBox();
				if (keys[i].indexOf("Text") == -1) {
					var title = new sap.m.Text();
					title.bindProperty("text", "/" + keys[i] + "Text");

					var input = new sap.m.Input();
					input.bindProperty("value", "/" + keys[i]);

					vBox.addItem(title);
					vBox.addItem(input);
					grid.addContent(vBox);
				}
			}

		},
		onAdmin: function () {
			debugger;
		},
		onCloseDaysDialog: function () {
			this.daysDialog.close();
		}
	});
});