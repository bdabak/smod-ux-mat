sap.ui.define(
  [
    "sap/ui/core/Control",
    "com/smod/ux/mat/enum/FieldVariant",
    "com/smod/ux/mat/controls/Menu",
    "com/smod/ux/mat/controls/MenuItem",
    "com/smod/ux/mat/controls/TextField",
    "com/smod/ux/mat/controls/Icon",
    "com/smod/ux/mat/controls/IconButton",
    "sap/ui/model/json/JSONModel",
  ],
  function (
    Control,
    FieldVariant,
    Menu,
    MenuItem,
    TextField,
    Icon,
    IconButton,
    JSONModel
  ) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.SelectList", {
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
          placeholder: {
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
            defaultValue: null,
          },
          supportingText: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          valueSet: {
            type: "object",
            bindable: true,
          },
          refValueSet:{
            type: "object",
            bindable: true,
          },
          width: {
            type: "sap.ui.core.CSSSize",
            bindable: true,
            defaultValue: null,
          },
        },
        aggregations: {
          _menu: {
            type: "com.smod.ux.mat.controls.Menu",
            multiple: false,
          },
          _search: {
            type: "com.smod.ux.mat.controls.TextField",
            multiple: false,
          },
        },
        events: {},
      },

      init: function () {
        const that = this;
        const oModel = new JSONModel({
          filteredValueSet: [],
          selectedKey: null,
          valid: false
        });

        const oTrailingIconButton = new IconButton({
          icons: [
            new Icon({
              icon: "clear",
            }),
          ],
          visible:
            "{= ${/valid} === true }",
        });
        oTrailingIconButton.setModel(oModel);
        oTrailingIconButton.attachEvent("press", this.clearSelectedItem, this);

        const oLeadingIcon = new Icon({
          icon: "search",
          visible:
            "{= ${/selectedKey} === null ||  ${/selectedKey} === undefined || ${/selectedKey} === '' }",
        });
        oLeadingIcon.setModel(oModel);
        const oSearchField = new TextField({
          type: "combobox",
          leadingIcon: oLeadingIcon,
          trailingIconButton: oTrailingIconButton,
          width: "100%",
        });

        //--Create menu
        const oMenu = new Menu({
          defaultFocus: "none",
          quick: true,
        }).addStyleClass("md-select-list-menu");
        oMenu.attachEvent("opened", this.menuOpened, this);
        oMenu.attachEvent("closed", this.menuClosed, this);
        oMenu.setModel(oModel);

        const oMenuItemTemplate = new MenuItem({
          value: "{value}",
          key: "{key}",
          keepOpen: true,
        });
        oMenuItemTemplate.attachEvent("confirm", this.menuItemSelected, this);

        oMenu.bindAggregation("items", {
          path: "/filteredValueSet",
          template: oMenuItemTemplate,
          templateShareable: false,
        });

        this.setAggregation("_menu", oMenu);

        oSearchField.addEventDelegate({
          onAfterRendering: () => {
            const oEl = document.body.querySelector("#" + oSearchField.getId());
            if (oEl) {
              oEl.addEventListener("focus", (e) => {
                that.setFilterValues(false);
              });

              oEl.addEventListener("input", (e) => {
                that.setFilterValues(false);
              });
            }
          },
        });

        this.setAggregation("_search", oSearchField);
      },

      renderer: function (oRM, oControl) {
        const oSearchField = oControl.getAggregation("_search");
        const oMenu = oControl.getAggregation("_menu");

        //--Get attributes
        const sVariant = oControl.getVariant();
        const sWidth = oControl.getWidth();
        const bError = oControl.getError();
        const sErrorText = oControl.getErrorText();
        const bEnabled = oControl.getEnabled();
        const bRequired = oControl.getRequired();
        const sSupportingText = oControl.getSupportingText();
        const sValue = oControl.getValueOfKey();
        const sLabel = oControl.getLabel();
        const sPlaceholder = oControl.getPlaceholder();

        //--Set field props before render
        oSearchField.setVariant(sVariant);
        oSearchField.setError(bError);
        oSearchField.setErrorText(sErrorText);
        oSearchField.setSupportingText(sSupportingText);
        oSearchField.setEditable(bEnabled);
        oSearchField.setRequired(bRequired);
        oSearchField.setLabel(sLabel);
        oSearchField.setValue(sValue);
        oSearchField.setPlaceholder(sPlaceholder);
        //--Set field props before render

        //--Set key state
        oControl.setSelectedKeyState();
        //--Set key state

        //--Set initial values
        oControl.setFilterValues(true);

        oRM.openStart("div", oControl).class("md-select-list");
        sWidth ? oRM.style("width", sWidth) : null;
        oRM
          .openEnd()
          .renderControl(oSearchField)
          .renderControl(oMenu)
          .close("div");
      },
      menuOpened: function (e) {
        const oSearchField = this.getAggregation("_search");
        const oMenu = this.getAggregation("_menu");
        oMenu.setProperty("isOpen", true);
        oSearchField.getDomRef()?.focus();
      },
      menuClosed: function (e) {
        const oSearchField = this.getAggregation("_search");
        const oMenu = this.getAggregation("_menu");
        oMenu.setProperty("isOpen", false);
        oSearchField.getDomRef()?.blur();
      },
      openMenu: function () {
        const oMenu = this.getAggregation("_menu");
        let bOpen = oMenu.getDomRef() ? oMenu.getDomRef().open : false;
        let bIsOpen = oMenu.getIsOpen();
        if (bOpen !== bIsOpen) {
          bIsOpen = false;
          oMenu.setProperty("isOpen", false);
        }
        const oSearchField = this.getAggregation("_search");
        if (!bIsOpen) {
          oMenu.setProperty("anchor", oSearchField.getId());
          oMenu.setProperty("isOpen", true);
          oMenu.setProperty("rerenderToken", new Date().getTime());
        }
      },
      closeMenu: function () {
        const oMenu = this.getAggregation("_menu");
        oMenu.setProperty("isOpen", false);
      },
      setFilterValues: function (bInit = false) {
        let aTempValueSet = this.getValueSet() || [];
        let aValueSet = [];
        const aRefValueSet = this.getRefValueSet() || [];
        const oSearchField = this.getAggregation("_search");
        const oMenu = this.getAggregation("_menu");

        const sQuery = oSearchField.getDomRef()?.value || null;
        let aFilteredValueSet = [];
        if(aRefValueSet.length > 0){
          aTempValueSet.forEach((oValue)=>{
            if(aRefValueSet.includes(oValue.key)){
              aValueSet.push(oValue);
            }
          });
        }else{
          aValueSet = [...aTempValueSet];
        }
       

        if (sQuery) {
          aFilteredValueSet = aValueSet.filter((oValue) => {
            return (
              oValue.key.includes(sQuery) ||
              oValue.value.includes(sQuery) ||
              oValue.key
                .toLocaleLowerCase("TR")
                .includes(sQuery.toLocaleLowerCase("TR")) ||
              oValue.value
                .toLowerCase()
                .includes(sQuery.toLocaleLowerCase("TR")) ||
              oValue.key
                .toLocaleUpperCase("TR")
                .includes(sQuery.toLocaleUpperCase("TR")) ||
              oValue.value
                .toUpperCase()
                .includes(sQuery.toLocaleUpperCase("TR")) ||
              oValue.key.toLowerCase().includes(sQuery.toLowerCase()) ||
              oValue.value.toLowerCase().includes(sQuery.toLowerCase()) ||
              oValue.key.toUpperCase().includes(sQuery.toUpperCase()) ||
              oValue.value.toUpperCase().includes(sQuery.toUpperCase())
            );
          });
        } else {
          aFilteredValueSet = [...aValueSet];
        }

        oMenu.getModel().setProperty("/filteredValueSet", aFilteredValueSet);

        if (aFilteredValueSet.length > 0 && !bInit) {
          this.openMenu();
        } else {
          this.closeMenu();
        }
      },
      menuItemSelected: function (e) {
        const oSearchField = this.getAggregation("_search");
        const oItem = e.getParameter("item");

        if (oItem && oItem.getKey() !== null) {
          this.setSelectedKey(oItem.getKey());
          oSearchField.setValue(oItem.getValue());
          this.closeMenu();

          //--Set key state
          this.setSelectedKeyState();
          //--Set key state
        }
      },
      clearSelectedItem: function () {
        const oSearchField = this.getAggregation("_search");

        //-Set selected key
        this.setSelectedKey(null);

        oSearchField.setValue(null);

        //--regenerate filters
        this.setFilterValues(false);

        //--Set key state
        this.setSelectedKeyState();
        //--Set key state
      },
      setSelectedKeyState: function () {
        const oMenu = this.getAggregation("_menu");
        if (oMenu) {
          const oModel = oMenu.getModel();
          if(oModel){
              const sValue = this.getValueOfKey(); 
              oModel.setProperty("/valid", sValue !== null );
              oModel.setProperty("/selectedKey", this.getSelectedKey());
            }

        }
      },
      getValueOfKey: function () {
        const aValueSet = this.getValueSet() || [];
        const sKey = this.getSelectedKey();

        if (!sKey) {
          //--Set the selected key initial
          this.setSelectedKey(null);
          return null;
        }

        const oVal = aValueSet.find((oValue) => {
          return oValue.key === sKey;
        });

        return oVal?.value ? oVal?.value : null;
      },
    });
  }
);
