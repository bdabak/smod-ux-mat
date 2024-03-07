sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.RadioGroup", {
    metadata: {
      properties: {
        orientation: {
          type: "string",
          bindable: true,
          defaultValue: "horizontal",
        },
        name: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
        value: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
      },
      aggregations: {
        items: {
          type: "com.smod.ux.mat.controls.Radio",
          multiple: true,
          singularName: "item",
        },
      },
      events: {
        change: {
          parameters: {
            value: { type: "string" },
          },
        },
      },
    },
    init: function () {},
    renderer: function (oRM, oControl) {
      //--Properties
      const sOrientation = oControl.getOrientation();
      const sName = oControl.getName();
      const sValue = oControl.getValue();
      const bVisible = oControl.getVisible();
      //--Aggregations
      const aRadio = oControl.getItems();
      oRM.openStart("div", oControl).class("md-radio-group-" + sOrientation);
      if (!bVisible) oRM.style("display", "none");
      oRM.openEnd();

      //--Radio
      aRadio.forEach((oRadio, i) => {
        oRadio.setProperty("checked", oRadio.getValue() === sValue, true);
        oRadio.setProperty("name", sName, true);
        oRM
          .openStart("div")
          .class("md-radio-group-item")
          .openEnd()
          .renderControl(oRadio)
          .close("div");
      });
      //--Radio

      //--Close
      oRM.close("div");
    },
    triggerChange: function (v) {
      this.setProperty("value", v, true);
      this.fireChange({
        value: v,
      });
    },
  });
});
