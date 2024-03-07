sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.MenuItem", {
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
        itemType: {
          type: "string",
          bindable: true,
          defaultValue: "menuitem",
        },
        keepOpen: {
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
      aggregations: {
        content: {
          type: "sap.ui.core.Control",
          multiple: false,
        },
      },
      events: {
        confirm: {
          parameters: {
            item: {
              type: "com.smod.ux.controldev.ux.MenuItem",
            },
          },
        },
      },
    },
    init: function () {},
    renderer: function (oRM, oControl) {
      const sKey = oControl.getKey();
      const sValue = oControl.getValue();
      const sItemType = oControl.getItemType();
      const bKeepOpen = oControl.getKeepOpen();
      const bSelected = oControl.getSelected();
      const oContent = oControl.getContent() || null;

      oRM.openStart("md-menu-item", oControl);

      //--Item Type
      oRM.attr("type", sItemType);
      //--Selected
      bSelected ? oRM.attr("selected", bSelected) : null;
      //--Key
      sKey ? oRM.attr("data-item-key", sKey) : null;
      //--Keep Open
      oRM.attr("keep-open", bKeepOpen);

      oRM.openEnd();

      oContent ? oRM.renderControl(oContent) : oRM.text(sValue);

      oRM.close("md-menu-item");
    },
    ontap: function () {
      if (this.getValue() !== null || this.getValue() !== undefined ) {
        this.fireConfirm({
          item: this,
        });
      }
    },
  });
});
