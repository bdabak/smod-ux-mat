sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.Icon", {
    metadata: {
      properties: {
        slot: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
        icon: {
          type: "string",
          bindable: true,
        },
        size: {
          type: "sap.ui.core.CSSSize",
          bindable: true,
          defaultValue: null,
        },
      },
      aggregations: {},
      events: {},
    },
    init: function () {},
    renderer: function (oRM, oControl) {
      //--Properties
      const sSlot = oControl.getSlot();
      const sIcon = oControl.getIcon();
      const sSize = oControl.getSize();
      const bVisible = oControl.getVisible();

      oRM.openStart("md-icon", oControl);
      //--Visibility
      if (!bVisible) oRM.style("display", "none");

      if (sSlot) oRM.attr("slot", sSlot);
      if (sSize) oRM.style("--md-icon-size", size);

      oRM.openEnd().text(sIcon).close("md-icon");
    },
  });
});
