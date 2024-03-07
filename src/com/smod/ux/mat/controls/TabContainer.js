sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.TabContainer", {
    metadata: {
      properties: {
        activeTabIndex: {
          type: "int",
          bindable: false,
          defaultValue: 0,
        },
      },
      aggregations: {
        tabs: {
          type: "com.smod.ux.mat.controls.Tab",
          multiple: true,
          singularName: "tab",
        },
        tabPanels: {
          type: "com.smod.ux.mat.controls.TabPanel",
          multiple: true,
          singularName: "tabPanel",
        },
      },
      defaultAggregation: "tabs",
      events: {
        change: {
          parameters: {
            selectedTab: { type: "com.smod.ux.mat.controls.Tab" },
          },
        },
      },
    },
    init: function () {},

    /**
     * @override
     */
    onAfterRendering: function () {
      var that = this;
      // if (!this._isRendered) {
      //   this._isRendered = true;
        const sId = this.getId();
        const oEl = document.body.querySelector("#" + sId);
        // oEl.addEventListener('input', (e) => { console.log("input", e); });
        oEl.addEventListener("change", (e) => {
          if (e?.target?.activeTabIndex >= 0) {
            this.selectionChanged(e.target.activeTabIndex, true);
          }
        });
      // }
    },

    renderer: function (oRM, oControl) {
      //--Aggregations
      const aTabs = oControl.getTabs();
      const aTabPanels = oControl.getTabPanels() || [];

      oRM.openStart("div", oControl).openEnd().openStart("md-tabs").openEnd();

      //--Tabs
      aTabs.forEach((oTab, i) => {
        oTab.setProperty("tabIndex", i, true);
        if (aTabPanels.length > 0)
          oTab.setProperty("panelElementId", aTabPanels[i].getId(), true);
        if (i === oControl.getActiveTabIndex()) {
          oTab.setActive(true);
        }
        oRM.renderControl(oTab);
      });
      //--Tabs

      oRM.close("md-tabs");

      //--Tab panels
      aTabPanels.forEach((oTabPanel, i) => {
        oTabPanel.setProperty("tabIndex", i, true);
        oTabPanel.setProperty("tabElementId", aTabs[i].getId(), true);

        if (i === oControl.getActiveTabIndex()) {
          oTabPanel.setHidden(false);
        } else {
          oTabPanel.setHidden(true);
        }
        // //--Set visibility
        // oTabPanel.setVisible(aTabs[i].getVisible());

        oRM.renderControl(oTabPanel);
      });
      //--Tab panels
      oRM.close("div");
    },
    // visibilityChanged: function(){
    //   const aTabPanels = this.getTabPanels() || [];
    //   const aTabs = this.getTabs() || [];
    //   aTabPanels.forEach((oTabPanel) => {
    //     aTabs.forEach((oTab)=>{
    //       if (oTabPanel.getTabIndex() === oTab.getTabIndex()) {
    //         oTabPanel.setVisible(oTab.getVisible());
    //       } 
    //     });
    //   });
    // },
    selectionChanged: function (i, bInvalidate) {
      var oTab = this.getTabs()[i];
      if (!oTab) {
        return;
      }
      if (oTab && this.getActiveTabIndex() !== oTab.getTabIndex()) {
        this.setProperty("activeTabIndex", oTab.getTabIndex(), bInvalidate);
        this.fireChange({
          selectedTab: oTab,
        });

        this._reRenderTabPanels();
      }
    },
    checkTabActivated: function(i){
      if(this.getActiveTabIndex() !== i){
        this.selectionChanged(i, false);
      }
    },
    _reRenderTabPanels: function () {
      const aTabPanels = this.getTabPanels() || [];
      const aTabs = this.getTabs() || [];
      aTabPanels.forEach((oTabPanel, i) => {
        if (oTabPanel.getTabIndex() === this.getActiveTabIndex()) {
          oTabPanel.setHidden(false);
        } else {
          oTabPanel.setHidden(true);
        }
      });

      aTabs.forEach((oTab, i) => {
        if (oTab.getTabIndex() === this.getActiveTabIndex()) {
          oTab.setActive(true);
        } else {
          oTab.setActive(false);
        }
      });
    },
  });
});
