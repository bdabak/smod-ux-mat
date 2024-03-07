sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.Chip", {
    metadata: {
      properties: {
        key: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
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
        selected: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
        elevated: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
        removable: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
        chipType: {
          type: "string",
          bindable: true,
          defaultValue: "filter",
        },
      },
      aggregations: {
        icon: {
          type: "com.smod.ux.controldev.ux.Icon",
          multiple: false,
        },
      },
      events: {
        changed: {},
        removed: {},
      },
    },
    init: function () {},
    /**
     * @override
     */
    onAfterRendering: function () {
      const sId = this.getId();
      const oEl = document.body.querySelector("#" + sId);

      oEl.addEventListener("remove", (e) => {
        this.fireRemoved();
      });
      oEl.addEventListener("click", (e) => {
        this.setProperty("selected", e.target.selected, true);
        this.fireChanged();
        if( typeof this.getParent()?.chipStateChanged === "function"){
          this.getParent().chipStateChanged();
        };
      });
    },
    renderer: function (oRM, oControl) {
      //--Properties
      const bEnabled = oControl.getEnabled();
      const bVisible = oControl.getVisible();
      const bSelected = oControl.getSelected();
      const bElevated = oControl.getElevated();
      const bRemovable = oControl.getRemovable();
      const sLabel = oControl.getLabel();
      const sChipType = oControl.getChipType();
      const oIcon = oControl.getIcon() || null;

      oRM.openStart(`md-${sChipType}-chip`, oControl);

       //--Visibility
       if (!bVisible) oRM.style("display", "none");
       
      //--Disabled
      if (!bEnabled) oRM.attr("disabled");

      //--Selected
      if (bSelected) oRM.attr("selected");

      //--Elevated
      if (bElevated) oRM.attr("elevated");

      //--Removable
      if (bRemovable) oRM.attr("removable");

      //--Label
      if (sLabel) oRM.attr("label", sLabel);

      oRM.openEnd();

      if (oIcon) {
        oIcon.setSlot("icon");
        oRM.renderControl(oIcon);
      }

      oRM.close(`md-${sChipType}-chip`);
    },
  });
});
