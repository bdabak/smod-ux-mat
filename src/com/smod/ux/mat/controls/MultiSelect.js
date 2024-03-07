sap.ui.define(
  [
    "sap/ui/core/Control",
    "./Menu",
    "./MenuItem",
    "./CheckBox",
    "./ChipSet",
    "./Chip",
    "./Field",
    "sap/ui/model/json/JSONModel",
    "com/smod/ux/mat/enum/FieldVariant",
  ],
  function (
    Control,
    Menu,
    MenuItem,
    CheckBox,
    ChipSet,
    Chip,
    Field,
    JSONModel,
    FieldVariant
  ) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.MultiSelect", {
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
          valueSet: {
            type: "object",
            bindable: true,
          },
          selectedItems: {
            type: "object",
            bindable: true,
          },
          selectedKeys: {
            type: "object",
            bindable: false,
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
          keyField: {
            type: "string",
            bindable: true,
            defaultValue: "key",
          },
          valueField: {
            type: "string",
            bindable: true,
            defaultValue: "value",
          },
          _menuRendered: {
            type: "boolean",
            bindable: false,
            defaultValue: false,
          },
        },
        aggregations: {
          _menu: {
            type: "com.smod.ux.mat.controls.Menu",
            multiple: false,
          },
          _field: {
            type: "com.smod.ux.mat.controls.Field",
            multiple: false,
          },
        },
        events: {
          change: {},
        },
      },
      init: function () {
        const oModel = new JSONModel({
          valueSet: [],
          selectedItems: [],
        });
        this.setModel(oModel);

        //--Create menu
        const oCheckBox = new CheckBox({
          label: "{value}",
          checked: "{checked}",
        });
        oCheckBox.attachEvent("change", this.handleMenuItemChanged, this);

        const oMenuItemTemplate = new MenuItem({
          content: oCheckBox,
        });

        const oMenu = new Menu({
          positioning: "absolute",
          quick: true,
        }).addStyleClass("md-multi-select-menu");
        oMenu.attachEvent("opening", this.handleMenuVisibilityChanged, this);
        oMenu.attachEvent("closed", this.handleMenuVisibilityChanged, this);
        oMenu.setModel(oModel);

        oMenu.bindAggregation("items", {
          path: "/valueSet",
          template: oMenuItemTemplate,
          templateShareable: false,
        });

        this.setAggregation("_menu", oMenu);

        //--Field and chipset
        const oChipSet = new ChipSet().addStyleClass("sapUiTinyMarginTop");
        oChipSet.setModel(oModel);

        const oChipTemplate = new Chip({
          chipType: "input",
          label: "{value}",
          key: "{key}",
        });
        oChipTemplate.attachEvent("removed", this.handleChipRemoved, this);

        oChipSet.bindAggregation("chips", {
          path: "/selectedItems",
          template: oChipTemplate,
          templateShareable: false,
        });

        const oField = new Field({
          content: oChipSet,
          populated: "{= ${/selectedItems}.length> 0 }"
        });

        oField.setModel(oModel);
        this.setAggregation("_field", oField);
      },

      onAfterRendering: function () {
        //--Set web component
        const shadow = this.$()
          .find(".md-multi-select")[0]
          ?.attachShadow({ mode: "open" });
        if (shadow) {
          const oField = this.getAggregation("_field");
          shadow.appendChild(oField.getDomRef());
        }
      },

      renderer: function (oRM, oControl) {
        const aValues = oControl.getValueSet() || [];
        const aSelItems = oControl.arrangeSelectedItems(aValues);
        const bPopulated = aSelItems.length > 0;
        const bFocused = oControl.getFocused();
        const bVisible = oControl.getVisible();
        const sId = oControl.getId();
        const sAnchorId = `${sId}MultiSelect`;

        // const oIcon = oControl.getAggregation("_icon");
        const oMenu = oControl.getAggregation("_menu");
        const oField = oControl.getAggregation("_field");

        sAnchorId && !oMenu.getAnchor() ? oMenu.setAnchor(sAnchorId) : null;

        //--Set model values
        oControl.getModel().setProperty("/valueSet", aValues);
        oControl.getModel().setProperty("/selectedItems", aSelItems);

        oField.setVariant(oControl.getVariant());
        oField.setLabel(oControl.getLabel());
        oField.setError(oControl.getError());
        oField.setErrorText(oControl.getErrorText());
        oField.setRequired(oControl.getRequired());
        oField.setSupportingText(oControl.getSupportingText());
        oField.setPopulated(bPopulated);
        oField.setFocused(bFocused);

        oRM.openStart("div", oControl).style("position", "relative");
        if (!bVisible) oRM.style("display", "none");
        oRM
          .openEnd()
          .openStart("md-multi-select")
          .attr("id", `${sId}MultiSelect`)
          .class("md-multi-select")
          .openEnd()
          .renderControl(oField)
          .close("md-multi-select")
          .renderControl(oMenu)
          .close("div");
      },
      arrangeSelectedItems: function (aValues) {
        const aSelectedItems =
          aValues.filter((oValue) => {
            return oValue.checked;
          }) || [];
        this.setProperty("selectedItems", [...aSelectedItems]);
        return aSelectedItems;
      },
      ontap: function (oEvent) {
        if ($(oEvent.target).hasClass("md-multi-select")) {
          const oMenu = this.getAggregation("_menu");
          const sAnchorId = this.$().find(".md-multi-select").attr("id");
          // const oMenu = this.getDependents()[0];
          const bOpen = oMenu.getOpen();
          if (!bOpen) {
            if (oMenu.getAnchor()) {
              oMenu.open();
            } else if (sAnchorId) {
              oMenu.openBy(sAnchorId);
            }
          }
        }

        if (this.getError()) {
          this.setErrorText(null);
          this.setError(false);
        }
      },
      handleMenuVisibilityChanged: function () {
        const oMenu = this.getAggregation("_menu");
        const bOpen = oMenu.getOpen();

        const oField = this.getAggregation("_field");

        if (bOpen) {
          this.setProperty("focused", true);
          oField.setFocused(true);
        } else {
          this.setProperty("focused", false);
          oField.setFocused(false);
        }
      },
      handleMenuItemChanged: function () {
        const aValues = this.getProperty("valueSet");
        const oField = this.getAggregation("_field");
        const aSelectedItems =
          aValues.filter((oValue) => {
            return oValue.checked;
          }) || [];

        // this.setProperty("selectedItems", [...aSelectedItems]);
        this.setProperty("selectedItems", [...aSelectedItems]);
        // this.getModel().setProperty("/selectedItems", [...aSelectedItems]);
        if (aSelectedItems.length > 0) {
          this.setPopulated(true);
          oField.setPopulated(true);
        } else {
          this.setPopulated(false);
          oField.setPopulated(false);
        }

        // this.getModel().updateBindings(true);

        //--Adjust selected keys
        this._adjustSelectedKeys();

        this.fireChange();
      },
      handleChipRemoved: function (oEvent) {
        const oChip = oEvent.getSource();
        const aValues = [...this.getProperty("valueSet")] || [];
        const aSelectedItems = [...this.getProperty("selectedItems")] || [];
        const sKey = oChip.getKey();
        const oField = this.getAggregation("_field");

        const i = aSelectedItems.findIndex((oKey) => {
          return oKey.key === sKey;
        });
        if (i !== -1) {
          aSelectedItems.splice(i, 1);
        }

        const j = aValues.findIndex((oValue) => {
          return oValue.key === sKey;
        });
        if (j !== -1) {
          aValues[j].checked = false;
        }

        if (aSelectedItems.length > 0) {
          this.setPopulated(true);
          oField.setPopulated(true);
        } else {
          this.setPopulated(false);
          oField.setPopulated(true);
        }

        this.setProperty("selectedItems", aSelectedItems);
        // this.getModel().setProperty("/selectedItems", [...aSelectedItems]);
        this.setProperty("valueSet", aValues);
        // this.getModel().setProperty("/valueSet", aValues);
        // this._updateChipset();


        //--Adjust selected keys
        this._adjustSelectedKeys();

        this.fireChange();
      },
      _adjustSelectedKeys: function () {
        const aValues = this.getProperty("valueSet") || [];
        const aSelectedKeys = aValues
          .filter((oValue) => {
            return oValue.checked;
          })
          .map((oValue) => {
            return oValue.key;
          });

        this.setProperty("selectedKeys", [...aSelectedKeys]);
      },
      _updateChipset: function(){
        const oField = this.getAggregation("_field");
        oField.setRefreshToken(new Date().getTime());
        oField.getContent().chipStateChanged();
      }
    });
  }
);
