sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.Switch", {
    metadata: {
      properties: {
        label: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
        enabled: {
          type: "boolean",
          bindable: true,
          defaultValue: true,
        },
        selected: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
        tooltip:{
          type: "string",
          bindable: true,
          defaultValue: null,
        }
      },
      aggregations: {},
      events: {
        change: {},
      },
    },
    init: function () {},
    renderer: function (oRM, oControl) {
      //--Properties
      const bEnabled = oControl.getEnabled();
      const bSelected = oControl.getSelected();
      const bVisible = oControl.getVisible();
      const sLabel = oControl.getLabel();
      const sTooltip = oControl.getTooltip() || '';
      if (sLabel) {
        oRM.openStart("label", oControl);

        //--Visibility
        if (!bVisible) {
          oRM.style("display", "none");
        } else {
          oRM
            .style("display", "inline-flex")
            .style("flex-direction", "row")
            .style("gap", "0.3rem")
            .style("font-size", "14px")
            .style("align-items", "center");
            //--Tooltip
            if(sTooltip.length>0) oRM.attr("title", sTooltip);
        }

        oRM
          .openEnd()
          // .text(sLabel)
          .openStart("md-switch")
          .attr("aria-label", sLabel);
      } else {
        oRM.openStart("md-switch", oControl);
        if (!bVisible) oRM.style("display", "none");
      }

      //--Disabled
      if (!bEnabled) oRM.attr("disabled", true);
      //--Selected
      if (bSelected) oRM.attr("selected", true);

      //--Tooltip
      if(sTooltip.length>0) oRM.attr("title", sTooltip);
      oRM.attr("icons", true);

      oRM.openEnd().close("md-switch");

      if (sLabel) {
        oRM.text(sLabel).close("label");
      }
    },
    ontap: function () {
      const bSelected = this.getSelected();
      this.setProperty("selected", !bSelected, true);
      this.fireChange();
    },
  });
});
