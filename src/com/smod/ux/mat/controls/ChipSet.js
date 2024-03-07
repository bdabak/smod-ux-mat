sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.ChipSet", {
    metadata: {
      properties: {
        selectedKeys:{
          type: "object",
          bindable: false
        }
      },
      aggregations: {
        chips: {
          type: "com.smod.ux.mat.controls.Chip",
          multiple: true,
          singularName: "chip",
        },
      },
      defaultAggregation: "chips",
      events:{},
    },
    init: function () {},
    renderer: function (oRM, oControl) {
      const bVisible = oControl.getVisible();
      const aChips = oControl.getChips();
      const aSelectedKeys = oControl.getSelectedKeys() || [];
      oRM.openStart("md-chip-set", oControl)
         //--Visibility
      if (!bVisible) oRM.style("display", "none");

      oRM.openEnd();
      //--Chips
      aChips.forEach((oChip) => {
        let iFound = aSelectedKeys.findIndex((k)=>{
          return k === oChip.getKey();
        });     

        if(iFound !== -1 && !oChip.getSelected()){
          oChip.setSelected(true);
        }else if(iFound === -1 && oChip.getSelected()){
          oChip.setSelected(false);
        }
        
        oRM.renderControl(oChip);
      });
      //--Chips
      oRM.close("md-chip-set");
    },
    chipStateChanged: function(){
        const aChips = this.getChips();
        let aSelectedKeys = [];
        aChips.forEach((oChip)=>{
          oChip.getSelected() ? aSelectedKeys.push(oChip.getKey()) : null;
        });
        this.setProperty("selectedKeys", aSelectedKeys, true);
    }
  });
});
