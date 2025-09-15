sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator"
], (BaseController,JSONModel,formatter,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("ui5.project3.controller.Worklist", {
         formatter: formatter,
        onInit() {
        },
               /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            var oViewModel;

            // keeps the search state
            this._aTableSearchState = [];

            // Model used to manipulate control states
            oViewModel = new JSONModel({
                worklistTableTitle : this.getResourceBundle().getText("worklistTableTitle"),
                shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                tableNoDataText : this.getResourceBundle().getText("tableNoDataText")
            });
            this.setModel(oViewModel, "worklistView");



            
            // Set icon tab counts
            this._setIconFilterCounts();

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



           _setIconFilterCounts: function() {
            var oModel = this.getOwnerComponent().getModel();

            oModel.read("/Products/$count", {
                success: function(iCount) {
                    this.getModel("worklistView").setProperty("/countAll", iCount)
                }.bind(this)
            })


            oModel.read("/Products/$count", {
                filters: [ new Filter("UnitsInStock", FilterOperator.GE, 20) ],
                success: function(iCount) {
                    this.getModel("worklistView").setProperty("/countAvailable", iCount)
                }.bind(this)
            })

            oModel.read("/Products/$count", {
                filters: [ new Filter("UnitsInStock", FilterOperator.BT, 1, 19) ],
                success: function(iCount) {
                    this.getModel("worklistView").setProperty("/countLowOnStock", iCount)
                }.bind(this)
            })

            oModel.read("/Products/$count", {
                filters: [ new Filter("UnitsInStock", FilterOperator.LT, 1) ],
                success: function(iCount) {
                    this.getModel("worklistView").setProperty("/countUnavailable", iCount)
                }.bind(this)

        })

    }



    });
});


