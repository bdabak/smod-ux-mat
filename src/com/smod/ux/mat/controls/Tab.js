sap.ui.define(
  ["sap/ui/core/Control", "com/smod/ux/mat/enum/TabVariant"],
  function (Control, TabVariant) {
    "use strict";

    return Control.extend("com.smod.ux.mat.controls.Tab", {
      metadata: {
        properties: {
          variant: {
            type: "com.smod.ux.mat.enum.TabVariant",
            bindable: true,
            defaultValue: TabVariant.Primary,
          },
          title: {
            type: "string",
            bindable: true,
            defaultValue: "",
          },
          tabIndex: {
            type: "int",
            bindable: true,
            defaultValue: null,
          },
          panelElementId: {
            type: "string",
            bindable: true,
          },
          inlineIcon: {
            type: "boolean",
            bindable: true,
            defaultValue: false,
          },
          isTab: {
            type: "boolean",
            bindable: true,
            defaultValue: true,
          },
          active: {
            type: "boolean",
            bindable: true,
            defaultValue: false,
          },
          iconOnly: {
            type: "boolean",
            bindable: true,
            defaultValue: false,
          },
        },
        aggregations: {
          icon: {
            type: "com.smod.ux.mat.controls.Icon",
            multiple: false,
          },
        },
        defaultAggregation: "icon",
        events: {
          select: {},
        },
      },
      init: function () {},

      // /**
      //  * @override
      //  */
      // onAfterRendering: function() {
      //   //--Test visibility change of panel
      //   this.setTabPanelVisibility();
      // },

      renderer: function (oRM, oControl) {
        //--Properties
        const bInlineIcon = oControl.getInlineIcon();
        const bIsTab = oControl.getIsTab();
        const iTabIndex = oControl.getTabIndex();
        const bActive = oControl.getActive();
        const oIcon = oControl.getAggregation("icon") || null;
        const bHasIcon = oIcon !== null;
        const bIconOnly = oControl.getIconOnly();
        const bVisible = oControl.getVisible();
        const sTitle = oControl.getTitle();
        const sPanelId = oControl.getPanelElementId();

       

        //--Set variant
        const e = `md-${oControl.getVariant()}-tab`;

        oRM.openStart(e, oControl);

        //--Visibility
        if (!bVisible) oRM.style("display", "none");

        //--Reference panel
        if (sPanelId) oRM.attr("aria-controls", sPanelId);

        //--InlineIcon
        if (bInlineIcon && oIcon) oRM.attr("inline-icon");

        //--IsTab
        if (bIsTab) oRM.attr("md-tab");

        //--Active
        if (bActive) oRM.attr("active");

        //--HasIcon
        if (bHasIcon) oRM.attr("has-icon");

        //--IconOnly
        if (bIconOnly) oRM.attr("icon-only");

        oRM.openEnd();

        //--Icon
        if (oIcon) oRM.renderControl(oIcon);
        //--Icon

        //--Title
        if (sTitle) oRM.text(sTitle);
        //--Title

        oRM.close(e);

        if (bActive) {
          oControl.getParent().checkTabActivated(iTabIndex);
        }
      },
      // setTabPanelVisibility: function () {
      //   const bVisible = this.getVisible();
      //   const iTabIndex = this.getTabIndex();

      //   const aTabPanels = this.getParent().getAggregation("tabPanels");

      //   aTabPanels.forEach((oTabPanel) => {
      //     if (
      //       parseInt(oTabPanel.getTabIndex(), 10) === parseInt(iTabIndex, 10)
      //     ) {
      //       oTabPanel.setVisible(bVisible);
      //     }
      //   });
      // },
      // ontap: function (e) {
      //   console.log(e);
      //   this.getParent().selectionChanged({
      //     sourceTab: this,
      //   });
      // },
    });
  }
);
