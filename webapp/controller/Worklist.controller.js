sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator"
], (Controller,formatter,Filter,FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.project3.controller.Worklist", {
         formatter: formatter,
        onInit() {
        },
        


        onPress: function(oEvent){

            // const oRouter = this.getRouter()
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.navTo("Worklistdetail",{

             ProductID: oEvent.getSource().getBindingContext().getProperty("ProductID")
             

            })

        },

          onSelectFilter(oEvent) {
            var oBinding = this.getView().byId("table").getBinding("items")
            var sSelectedKey = oEvent.getParameter("key")
            var aFilter = []

            // Create filters
            switch (sSelectedKey) {
                case "available":
                    aFilter.push(new Filter("UnitsInStock", FilterOperator.GE, 20))
                    break;
                case "lowOnStock":
                    aFilter.push(new Filter("UnitsInStock", FilterOperator.BT, 1, 19))
                    break;
                case "unavailable":
                    aFilter.push(new Filter("UnitsInStock", FilterOperator.LT, 1))
                    break;
                default:
                    break;
            }

            oBinding.filter(aFilter)
        },



    });
});


