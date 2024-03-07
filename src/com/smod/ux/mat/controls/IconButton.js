sap.ui.define(
  ["sap/ui/core/Control", "com/smod/ux/mat/enum/ButtonVariant"],
  function (Control, ButtonVariant) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.IconButton", {
      metadata: {
        properties: {
          variant: {
            type: "com.smod.ux.mat.enum.ButtonVariant",
            bindable: true,
            defaultValue: ButtonVariant.Default,
            enumerable: true,
            group: "Appearance",
          },
          toggle: {
            type: "boolean",
            bindable: true,
            defaultValue: false,
          },
          enabled: {
            type: "boolean",
            bindable: true,
            defaultValue: true,
          },
          tooltip: {
            type: "string",
            bindable: true,
            defaultValue: null,
          },
          slot: {
            type: "string",
            bindable: true,
            defaultValue: null,
          },
        },
        aggregations: {
          icons: {
            type: "com.smod.ux.mat.controls.Icon",
            multiple: true,
            singularName: "icon",
          },
        },
        defaultAggregation: "icons",
        events: {
          press: {},
        },
      },
      init: function () {},
      renderer: function (oRM, oControl) {
        //--Properties
        const bEnabled = oControl.getEnabled();
        const bVisible = oControl.getVisible();
        const bToggle = oControl.getToggle();
        const sTooltip = oControl.getTooltip();
        const sSlot = oControl.getSlot();

        //--Variant
        const e = oControl.getVariant()
          ? `md-${oControl.getVariant()}-icon-button`
          : "md-icon-button";

        //--Aggregations
        const aIcons = oControl.getIcons();

        oRM.openStart(e, oControl);

        //--Visibility
        if (!bVisible) oRM.style("display", "none");
        //--Disabled
        if (!bEnabled) oRM.attr("disabled");
        if (bToggle) oRM.attr("toggle");
        if (sTooltip) oRM.attr("title", sTooltip);
        if (sSlot) oRM.attr("slot", sSlot);

        oRM.openEnd();

        //--Icons
        aIcons.forEach((oIcon, i) => {
          oRM.renderControl(oIcon);
        });
        //--Icons

        oRM.close(e);
      },
      ontap: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.firePress();
      },
    });
  }
);
