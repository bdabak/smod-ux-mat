/**
 * Initialization Code and shared classes of library com.smod.ux.mat
 */
sap.ui.define(
  ["./lib/material"], // library dependency
  function (MaterialJS) {
    "use strict";

    /**
     * SMOD UX library
     *
     * @namespace
     * @name com.smod.ux.mat
     * @author SAP SE
     * @version 1.1.0
     * @public
     */

    // delegate further initialization of this library to the Core
    sap.ui.getCore().initLibrary({
      name: "com.smod.ux.mat",
      version: "1.1.0",
      dependencies: ["sap.ui.core"],
      types: [
        "com.smod.ux.mat.enum.ButtonVariant",
        "com.smod.ux.mat.enum.FieldVariant",
        "com.smod.ux.mat.enum.TabVariant",
        "com.smod.ux.mat.enum.TextVariant",
      ],
      interfaces: [],
      controls: [
        "com.smod.ux.mat.controls.Button",
        "com.smod.ux.mat.controls.CheckBox",
        "com.smod.ux.mat.controls.Chip",
        "com.smod.ux.mat.controls.ChipSet",
        "com.smod.ux.mat.controls.Divider",
        "com.smod.ux.mat.controls.Field",
        "com.smod.ux.mat.controls.Icon",
        "com.smod.ux.mat.controls.IconButton",
        "com.smod.ux.mat.controls.Menu",
        "com.smod.ux.mat.controls.MenuItem",
        "com.smod.ux.mat.controls.MultiSelect",
        "com.smod.ux.mat.controls.RadioGroup",
        "com.smod.ux.mat.controls.Radio",
        "com.smod.ux.mat.controls.Select",
        "com.smod.ux.mat.controls.SelectList",
        "com.smod.ux.mat.controls.SelectOption",
        "com.smod.ux.mat.controls.Switch",
        "com.smod.ux.mat.controls.Tab",
        "com.smod.ux.mat.controls.TabContainer",
        "com.smod.ux.mat.controls.TabPanel",
        "com.smod.ux.mat.controls.TextField",
      ],
      elements: [],
    });

    /* eslint-disable no-undef */
    /**
     * The main UI5 control library, with responsive controls that can be used in touch devices as well as desktop browsers.
     *
     * @namespace
     * @alias  com.smod.ux.mat
     * @author SAP SE
     * @version ${version}
     * @public
     */
    var thisLib = com.smod.ux.mat;
    /* eslint-disable no-undef */

    /**
     * Available ButtonVariant.
     *
     * @enum {string}
     * @public
     * @ui5-metamodel This enumeration also will be described in the UI5 (legacy) designtime metamodel
     */
    thisLib.enum.ButtonVariant = {
      /**
       * A solid background color dependent on the theme.
       * @public
       */
      Default: "",
      Elevated: "elevated",
      Filled: "filled",
      FilledTonal: "filled-tonal",
      Outlined: "outlined",
      Text: "text",
    };

    /**
     * Available TextVariant.
     *
     * @enum {string}
     * @public
     * @ui5-metamodel This enumeration also will be described in the UI5 (legacy) designtime metamodel
     */
    thisLib.enum.TextVariant = {
      /**
       * A solid background color dependent on the theme.
       * @public
       */
      Text: "text",
      Email: "email",
      Number: "number",
      Password: "password",
      Search: "search",
      Tel: "tel",
      Url: "url",
      TextArea: "textarea",
      ComboBox: "combobox",
    };

    /**
     * Available TabVariant.
     *
     * @enum {string}
     * @public
     * @ui5-metamodel This enumeration also will be described in the UI5 (legacy) designtime metamodel
     */
    thisLib.enum.TabVariant = {
      /**
       * A solid background color dependent on the theme.
       * @public
       */
      Primary: "primary",
      Secondary: "secondary",
    };

    /**
     * Available TabVariant.
     *
     * @enum {string}
     * @public
     * @ui5-metamodel This enumeration also will be described in the UI5 (legacy) designtime metamodel
     */
    thisLib.enum.FieldVariant = {
      /**
       * A solid background color dependent on the theme.
       * @public
       */
      Filled: "filled",
      Outlined: "outlined",
    };

    return thisLib;
  }
);
