sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.SelectOption", {
    metadata: {
      properties: {
        key: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
        value: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
        noValue: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
        selected: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
      },
      events: {
        change: {},
      },
    },
    init: function () {},
    renderer: function (oRM, oControl) {
      const sKey = oControl.getKey();
      const bSelected = oControl.getSelected();
      const bInitial = oControl.getNoValue();
      const bVisible = oControl.getVisible();

      let sValue = oControl.getValue();

      oRM.openStart("md-select-option", oControl);

      //--Visibility
      if (!bVisible) oRM.style("display", "none");

      //--No value
      if (bInitial) {
        if (sValue === null || sValue === undefined) sValue = "";
        oRM.attr("aria-label", "blank").attr("value", sValue).openEnd();
      } else {
        oRM.attr("key", sKey).attr("value", sValue);

        //--Selected
        if (bSelected) oRM.attr("selected");

        oRM
          .openEnd()
          .openStart("div")
          .attr("slot", "headline")
          .openEnd()
          .text(sValue)
          .close("div");
      }

      oRM.close("md-select-option");
    },
    oninput: function (e) {
      this.fireChange();
    },
  });
});
