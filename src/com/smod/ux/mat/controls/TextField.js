sap.ui.define(
  [
    "sap/ui/core/Control",
    "com/smod/ux/mat/enum/FieldVariant",
    "com/smod/ux/mat/enum/TextVariant",
  ],
  function (Control, FieldVariant, TextVariant) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.TextField", {
      metadata: {
        properties: {
          variant: {
            type: "com.smod.ux.mat.enum.FieldVariant",
            bindable: true,
            defaultValue: FieldVariant.Outlined,
            group: "Appearance",
          },
          label: {
            type: "string",
            bindable: true,
          },
          placeholder: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          type: {
            type: "com.smod.ux.mat.enum.TextVariant",
            bindable: true,
            defaultValue: TextVariant.Text,
          },
          rows: {
            type: "int",
            bindable: true,
            defaultValue: 2,
          },
          value: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          editable: {
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
          maxLength: {
            type: "int",
            bindable: true,
            defaultValue: -1,
          },
          min: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
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
          trailingIconButton: {
            type: "com.smod.ux.mat.controls.IconButton",
            multiple: false,
          },
        },
        events: {
          change: {},
        },
      },
      init: function () {},
      /**
       * @override
       */
      onAfterRendering: function () {
        if (this._bSetFocus) {
          setTimeout(() => {
            this.$().trigger("focus");
          }, 100);
          this._bSetFocus = false;
        }
      },
      renderer: function (oRM, oControl) {
        //--Properties
        const bEditable = oControl.getEditable();
        const bRequired = oControl.getRequired();
        const bVisible = oControl.getVisible();
        const bError = oControl.getError();
        const sSupportingText = oControl.getSupportingText();
        const sErrorText = oControl.getErrorText();
        const sType = oControl.getType();
        const sValue = oControl.getValue();
        const sPlaceholder = oControl.getPlaceholder();
        const sLabel = oControl.getLabel();
        const iRows = oControl.getRows();
        const iMaxLength = oControl.getMaxLength();
        const sWidth = oControl.getWidth();
        const sMin = oControl.getMin();

        //--Aggregations
        let oLeadingIcon = oControl.getLeadingIcon();
        let oTrailingIcon = oControl.getTrailingIcon();
        let oTrailingIconButton = oControl.getTrailingIconButton();

        //--
        const e = `md-${oControl.getVariant()}-text-field`;

        oRM
          .openStart(e, oControl)
          .attr("label", sLabel)
          .attr("placeholder", sPlaceholder)
          .attr("type", sType)
          .attr("value", sValue);

        //--Visibility
        if (!bVisible) oRM.style("display", "none");
        
        //--Min
        if (sMin !== "" && sType === "number") oRM.attr("min", sMin);
        //--Supporting text
        if (sSupportingText) oRM.attr("supporting-text", sSupportingText);

        //--Error
        if (bError) oRM.attr("error");
        if (sErrorText && bError) oRM.attr("error-text", sErrorText);

        //--Disabled
        if (!bEditable) oRM.attr("disabled");

        //--Required
        if (bRequired) oRM.attr("required");

        //--Max Length
        if (iMaxLength !== -1) oRM.attr("maxlength", iMaxLength);

        //--In case of textarea set rows
        if (sType === "textarea") oRM.attr("rows", iRows);
        //--In case of textarea set rows
        //--Set width
        if (sWidth) oRM.style("width", sWidth);

        //--Icons set
        if (oLeadingIcon) oRM.attr("has-leading-icon", true);
        if (oTrailingIcon || oTrailingIconButton) oRM.attr("has-trailing-icon", true);

        oRM.openEnd();

        //--Leading icon
        if (oLeadingIcon) {
          oLeadingIcon.setProperty("slot", "leading-icon");
          oRM.renderControl(oLeadingIcon);
        }
        //--Leading icon
        //--Trailing icon
        if (oTrailingIcon) {
          oTrailingIcon.setProperty("slot", "trailing-icon");
          oRM.renderControl(oTrailingIcon);
        }
        //--Trailing icon

        //--Trailing icon button
        if (oTrailingIconButton) {
          oTrailingIconButton.setProperty("slot", "trailing-icon");
          oRM.renderControl(oTrailingIconButton);
        }
        //--Trailing icon button
        oRM.close(e);
      },

      oninput: function (e) {
        this.setProperty("value", e.currentTarget.value, true);
        this.fireChange();
      },
      onkeydown: function () {
        if (this.getError()) {
          this.setProperty("errorText", null, true);
          this.setProperty("error", false, false);
          this._bSetFocus = true;
        }
      },
    });
  }
);
