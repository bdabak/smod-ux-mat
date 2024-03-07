sap.ui.define([
  "sap/ui/core/Control"
], function (
  Control
) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.TabPanel", {
    metadata: {
      properties: {
        tabIndex: {
          type: "int",
          bindable: true,
          defaultValue: null
        },
        tabElementId: {
          type: "string",
          bindable: true,
          defaultValue: null
        },
        hidden:{
          type: "boolean",
          bindable: true,
          defaultValue: true
        }
      },
      aggregations: {
        content: {
          type: "sap.ui.core.Control",
          multiple: false
        },
      },
      defaultAggregation: "content",
      events: {},
    },
    init: function () { },
    renderer: function (oRM, oControl) {
      //--Properties
      const iTabIndex = oControl.getTabIndex();
      const sTabId = oControl.getTabElementId();
      const bHidden = oControl.getHidden();

      oRM
        .openStart("div", oControl)
        .class("md-tab-panel");
      

      //--role
      oRM.attr("role", "tabpanel");
      oRM.attr("tabIndex", iTabIndex);
      oRM.attr("aria-labelledby", sTabId);

      if(bHidden) oRM.attr("hidden", true);

      oRM.openEnd();

      //--Icon
      oRM.renderControl(oControl.getContent());
      //--Icon

      oRM.close("div");
    }
   
  });
});