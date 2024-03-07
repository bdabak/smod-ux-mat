sap.ui.define(
  ["sap/ui/core/Control", "com/smod/ux/mat/enum/FieldVariant"],
  function (Control, FieldVariant) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.Select", {
      metadata: {
        properties: {
          variant: {
            type: "com.smod.ux.mat.enum.FieldVariant",
            bindable: true,
            defaultValue: FieldVariant.Outlined,
          },
          selectedKey: {
            type: "string",
            bindable: true,
            defaultValue: null,
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
          width: {
            type: "sap.ui.core.CSSSize",
            bindable: true,
            defaultValue: null,
          },
        },
        aggregations: {
          options: {
            type: "com.smod.ux.mat.controls.SelectOption",
            multiple: true,
            singularName: "option",
          },
        },
        defaultAggregation: "options",
        events: {
          change: {
            parameters: {
              selectedKey: { type: "string" },
              selectedOption: { type: "com.smod.ux.mat.controls.SelectOption" },
            },
          },
        },
      },
      init: function () {},
      renderer: function (oRM, oControl) {
        //--Properties
        const bEnabled = oControl.getEnabled();
        const bRequired = oControl.getRequired();
        const bVisible = oControl.getVisible();
        const bError = oControl.getError();
        const sErrorText = oControl.getErrorText();
        const sSupportingText = oControl.getSupportingText();
        const sWidth = oControl.getWidth();

        //--Set variant
        const e = `md-${oControl.getVariant()}-select`;

        //--Aggregations
        const aOptions = oControl.getOptions();

        oRM.openStart(e, oControl).attr("label", oControl.getLabel());

        //--Visibility
        if (!bVisible) oRM.style("display", "none");

        //--Supporting text
        if (sSupportingText) oRM.attr("supporting-text", sSupportingText);

        //--Error
        if (bError) oRM.attr("error", true);
        if (sErrorText && bError) oRM.attr("error-text", sErrorText);
        //--Disabled
        if (!bEnabled) oRM.attr("disabled");

        //--Required
        if (bRequired) oRM.attr("required", true);

        //--Set width
        if (sWidth) oRM.style("width", sWidth);

        oRM.openEnd();

        //--Options
        aOptions.forEach((oOpt) => {
          if (oOpt.getKey() === oControl.getSelectedKey()) {
            oOpt.setSelected(true);
          } else {
            oOpt.setSelected(false);
          }
          oRM.renderControl(oOpt);
        });
        //--Options

        oRM.close(e);
      },
      oninput: function (e) {
        try {
          const oOpt =
            this.getOptions()[parseInt(e.currentTarget.selectedIndex, 10)];
          this.setProperty("selectedKey", oOpt.getKey(), true);
          this.fireChange({
            selectedKey: oOpt.getKey(),
            selectedOption: oOpt,
          });
          if (this.getError()) {
            this.setProperty("errorText", null, true);
            this.setProperty("error", false);
          }
        } catch (e) {
          //--Error
        }
      },
    });
  }
);
