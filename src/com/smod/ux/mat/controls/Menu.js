sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.ux.mat.controls.Menu", {
    metadata: {
      properties: {
        isOpen: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
        anchorCorner: {
          type: "string",
          bindable: true,
          defaultValue: "end-start",
        },
        menuCorner: {
          type: "string",
          bindable: true,
          defaultValue: "start-start",
        },
        anchor: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
        positioning: {
          type: "string",
          bindable: true,
          defaultValue: "popover",
        },
        defaultFocus: {
          type: "string",
          bindable: true,
          defaultValue: "none",
        },
        quick: {
          type: "boolean",
          bindable: true,
          defaultValue: false,
        },
        rerenderToken: {
          type: "string",
          bindable: true,
          defaultValue: null,
        },
        yOffset:{
          type: "int",
          bindable: true,
          defaultValue: null,
        },
        xOffset:{
          type: "int",
          bindable: true,
          defaultValue: null,
        }
      },
      aggregations: {
        items: {
          type: "sap.ui.core.Control",
          multiple: true,
          singularName: "item",
        },
      },
      events: {
        closed:{},
        opening:{},
        opened:{}
      },
    },
    init: function () {},
    /**
     * @override
     */
    onAfterRendering: function () {
      const sId = this.getId();
      const oEl = document.body.querySelector("#" + sId);

      oEl.addEventListener("closed", (e) => {
        this.fireClosed();
      });

      oEl.addEventListener("opening", (e) => {
        this.fireOpening();
      });

      oEl.addEventListener("opened", (e) => {
        this.fireOpened();
      });
    },
    renderer: function (oRM, oControl) {
      const aItems = oControl.getItems();
      const sAnchor = oControl.getAnchor() || null;
      const bOpen = oControl.getIsOpen();
      const bQuick = oControl.getQuick();
      const iYOffset = oControl.getYOffset();
      const iXOffset = oControl.getXOffset();
      oRM
        .openStart("md-menu", oControl)
        .attr("anchor-corner", oControl.getAnchorCorner())
        .attr("menu-corner", oControl.getMenuCorner())
        .attr("positioning", oControl.getPositioning())
        .attr("default-focus", oControl.getDefaultFocus());

      bOpen ? oRM.attr("open", true) : null;
      bQuick ? oRM.attr("quick", true) : null;
      sAnchor ? oRM.attr("anchor", sAnchor) : null;

      iYOffset ? oRM.attr("y-offset", iYOffset) : null;
      iXOffset ? oRM.attr("x-offset", iXOffset) : null;

      //--To sync the sizes
      if (sAnchor) {
        const sWidth = $("#" + sAnchor)?.width() || null;
        sWidth ? oRM.style("min-width", `${sWidth}px`) : null;
      }

      oRM.openEnd();

      //--Items
      aItems.forEach((oItem) => {
        oRM.renderControl(oItem);
      });
      //--Items

      oRM.close("md-menu");
    },

    openBy: function (sId) {
      this.getDomRef().anchor = sId;
      this.getDomRef().open = true;
      this.setProperty("isOpen", true);
    },
    open: function () {
      this.getDomRef().open = true;
      this.setProperty("isOpen", true);
    },
    getOpen: function () {
      if (this.getDomRef() && this.getDomRef().open !== this.getIsOpen()) {
        this.setIsOpen(this.getDomRef()?.open);
      }
      return this.getDomRef() ? this.getDomRef().open : false;
    },
    close: function () {
      this.getDomRef().open = false;
      this.setProperty("isOpen", false);
    },
  });
});
