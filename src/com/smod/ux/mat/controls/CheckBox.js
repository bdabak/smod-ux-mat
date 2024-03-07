sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.CheckBox", {
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
        checked: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
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
      const bChecked = oControl.getChecked();
      const sLabel = oControl.getLabel();
      const bVisible = oControl.getVisible();

      if (sLabel) {
        oRM.openStart("label", oControl);
        //--Visibility
        if (!bVisible) {
          oRM.style("display", "none");
        } else {
          oRM
            .style("display", "inline-flex")
            .style("flex-direction", "row")
            .style("align-items", "center");
        }

        oRM.openEnd().openStart("md-checkbox").attr("aria-label", sLabel);
      } else {
        oRM.openStart("md-checkbox", oControl);
        if (!bVisible) oRM.style("display", "none");
      }

      //--Disabled
      if (!bEnabled) oRM.attr("disabled");
      if (bChecked) oRM.attr("checked");
      if (sLabel) oRM.attr("touch-target", "wrapper");

      oRM.openEnd().close("md-checkbox");

      if (sLabel) {
        oRM.text(sLabel).close("label");
      }
    },
    ontap: function () {
      const bChecked = this.getChecked();
      this.setProperty("checked", !bChecked, true);
      this.fireChange();
    },
  });
});
