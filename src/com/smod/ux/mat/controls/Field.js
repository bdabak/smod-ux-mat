sap.ui.define(
  ["sap/ui/core/Control", "./Icon", "com/smod/ux/mat/enum/FieldVariant"],
  function (Control, Icon, FieldVariant) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.Field", {
      metadata: {
        properties: {
          variant: {
            type: "com.smod.ux.mat.enum.FieldVariant",
            bindable: true,
            defaultValue: FieldVariant.Outlined,
          },
          label: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          enabled: {
            type: "boolean",
            bindable: true,
            defaultValue: true,
          },
          required: {
            type: "boolean",
            bindable: true,
            defaultValue: false,
          },
          error: {
            type: "boolean",
            bindable: true,
            defaultValue: false,
          },
          errorText: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          supportingText: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          focused: {
            type: "boolean",
            bindable: false,
            defaultValue: false,
          },
          populated: {
            type: "boolean",
            bindable: false,
            defaultValue: false,
          },
          refreshToken:{
            type: "string",
            bindable: false,
            defaultValue: null,
          }
        },
        aggregations: {
          content: {
            type: "sap.ui.core.Control",
            multiple: false,
          },
          _icon: {
            type: "com.smod.ux.mat.controls.Icon",
            multiple: false,
          },
        },
        events: {
          update: {},
        },
      },
      init: function () {
        //--Create icon
        const oIcon = new Icon({
          slot: "end",
          icon: "arrow_drop_down",
        });
        this.setAggregation("_icon", oIcon);
      },

      onAfterRendering: function () {},

      renderer: function (oRM, oControl) {
        const bPopulated = oControl.getPopulated() || false;
        const bFocused = oControl.getFocused() || false;
        const sVariant = oControl.getVariant();
        const bError = oControl.getError();
        const bRequired = oControl.getRequired();
        const bVisible = oControl.getVisible();
        const sErrorText = oControl.getErrorText();
        const sSupportingText = oControl.getSupportingText();

        const oIcon = oControl.getAggregation("_icon");
        //--Set focused icon
        oIcon.setIcon(bFocused ? "arrow_drop_up" : "arrow_drop_down");
        oRM.openStart(`md-${sVariant}-field`, oControl).class("field");

        //--Visibility
        if (!bVisible) oRM.style("display", "none");
        oRM
          .attr("part", `${sVariant}-field`)
          .attr("label", oControl.getLabel())
          .attr("aria-haspopup", "listbox")
          .attr("aria-controls", "listbox")
          .attr("role", "combobox");

        bFocused ? oRM.attr("focused", true) : null;
        bPopulated ? oRM.attr("populated", true) : null;
        bRequired ? oRM.attr("required", true) : null;
        //--Supporting text
        if (sSupportingText) oRM.attr("supporting-text", sSupportingText);
        //--Error
        if (bError) oRM.attr("error");
        if (sErrorText && bError) oRM.attr("error-text", sErrorText);
        oRM
          .openEnd()
          .openStart("div")
          .attr("id", "label")
          .openEnd()
          .openStart("slot")
          .attr("name", "content")
          .openEnd()
          .renderControl(oControl.getContent())
          .close("slot")
          .close("div")
          .renderControl(oIcon)
          .close(`md-${sVariant}-field`);
      },
    });
  }
);
