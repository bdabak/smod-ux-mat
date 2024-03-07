sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.Divider", {
    metadata: {
      properties: {
        role: {
          type: "string",
          bindable: true,
          defaultValue: null,
        }
      },
      aggregations: {
       
      },
      events: {},
    },
    init: function () {},
    
    renderer: function (oRM, oControl) {
      const sRole = oControl.getRole();
      const bVisible = oControl.getVisible();
     
      oRM
      .openStart("md-divider", oControl);

       //--Visibility
       if (!bVisible) oRM.style("display", "none");

      sRole ? oRM.attr("role", sRole) : null;
      
      oRM.openEnd();


      oRM.close("md-divider");
    },
  });
});
