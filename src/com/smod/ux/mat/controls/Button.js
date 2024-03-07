sap.ui.define(
  ["sap/ui/core/Control", "com/smod/ux/mat/enum/ButtonVariant"],
  function (Control, ButtonVariant) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.Button", {
      metadata: {
        properties: {
          variant: {
            type: "com.smod.ux.mat.enum.ButtonVariant",
            bindable: true,
            defaultValue: ButtonVariant.Filled,
            enumerable: true,
            group: "Appearance",
          },
          text: {
            type: "string",
            bindable: true,
          },
          enabled: {
            type: "boolean",
            bindable: true,
            defaultValue: true,
          },
          width: {
            type: "sap.ui.core.CSSSize",
            bindable: true,
            defaultValue: null,
          }
        },
        aggregations: {
          leadingIcon: {
            type: "com.smod.ux.mat.controls.Icon",
            multiple: false,
          },
          trailingIcon: {
            type: "com.smod.ux.mat.controls.Icon",
            multiple: false,
          },
        },
        events: {
          press: {},
        },
      },
      init: function () {},
      renderer: function (oRM, oControl) {
        //--Properties
        const bEnabled = oControl.getEnabled();
        const bVisible = oControl.getVisible();
        const sWidth = oControl.getWidth();

        //--Variant
        const e = `md-${oControl.getVariant()}-button`;

        //--Aggregations
        let oLeadingIcon = oControl.getLeadingIcon();
        let oTrailingIcon = oControl.getTrailingIcon();

        oRM.openStart(e, oControl);
        //--Visibility
        if (!bVisible) oRM.style("display", "none");
        //--Disabled
        if (!bEnabled) oRM.attr("disabled");

        
        //--Leading icon prop
        if (oLeadingIcon) {
          oLeadingIcon.setProperty("slot", "icon");
          oRM.attr("leading-icon", true);
        }
        //--Leading icon prop
        //--Trailing icon prop
        if (oTrailingIcon) {
          oTrailingIcon.setProperty("slot", "icon");
          oRM.attr("trailing-icon", true);
        }
        //--Trailing icon prop
        
        if(sWidth) oRM.style("width", sWidth);

        oRM.openEnd();

        oRM.text(oControl.getText());

        //--Render Leading icon
        if (oLeadingIcon) {
          oRM.renderControl(oLeadingIcon);
        }
        //--Render Leading icon
        //--Render Trailing icon
        if (oTrailingIcon) {
          oRM.renderControl(oTrailingIcon);
        }
        //--Render Trailing icon

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
