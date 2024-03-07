sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.Radio", {
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
      aggregations: {},
      events: {},
    },
    init: function () {},
    exit: function () {
      const sId = this.getId();
      const oEl = document.body.querySelector("#" + sId);
      // oEl.addEventListener('input', (e) => { console.log("input", e); });
      oEl.removeEventListener("change", this._handleChange);
    },
    /**
     * @override
     */
    onAfterRendering: function (e) {
      const sId = this.getId();
      const oEl = document.body.querySelector("#" + sId);
      oEl.removeEventListener("change", this._handleChange);
      oEl.addEventListener("change", this._handleChange.bind(this));
    },

    renderer: function (oRM, oControl) {
      //--Properties
      const bEnabled = oControl.getEnabled();
      const bChecked = oControl.getChecked();
      const bVisible = oControl.getVisible();
      const sLabel = oControl.getLabel();
      const sName = oControl.getName();
      const sValue = oControl.getValue();
      const sId = oControl.getId();

      oRM.openStart("md-radio", oControl).attr("name", sName);

      if (!bVisible) oRM.style("display", "none");
      //Properties
      if (!bEnabled) oRM.attr("disabled");
      if (bChecked) oRM.attr("checked");
      if (sValue) oRM.attr("value", sValue);

      //--Close
      oRM.openEnd().close("md-radio");

      if (sLabel) {
        oRM
          .openStart("label", oControl)
          .attr("for", sId)
          .openEnd()
          .text(sLabel)
          .close("label");
      }
    },
    _handleChange: function (e) {
      this.setProperty("checked", e.target.checked, true);
      this.getParent().triggerChange(this.getValue());
    },
  });
});
