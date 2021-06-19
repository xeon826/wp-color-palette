document.addEventListener("DOMContentLoaded", function() {
  /**
   * All of the code for your admin-facing JavaScript source
   * should reside in this file.
   *
   * Note: It has been assumed you will write jQuery code here, so the
   * $ function reference has been prepared for usage within the scope
   * of this function.
   *
   * This enables you to define handlers, for when the DOM is ready:
   *
   * $(function() {
   *
   * });
   *
   * When the window is loaded:
   *
   * $( window ).load(function() {
   *
   * });
   *
   * ...and/or other possibilities.
   *
   * Ideally, it is not considered best practise to attach more than a
   * single DOM-ready or window-load handler for a particular page.
   * Although scripts in the WordPress core, Plugins and Themes may be
   * practising this, we should strive to set a better example in our own work.
   */
  var settings_input = document.getElementById('color_picker_setting'),
    color_picker = document.createElement('div');
  color_picker.classList.add('color-picker');
  insertAfter(color_picker, settings_input);
  const pickr = Pickr.create({

    // Selector or element which will be replaced with the actual color-picker.
    // Can be a HTMLElement.
    el: '.color-picker',

    // Where the pickr-app should be added as child.
    container: 'body',

    // Which theme you want to use. Can be 'classic', 'monolith' or 'nano'
    theme: 'classic',

    // Nested scrolling is currently not supported and as this would be really sophisticated to add this
    // it's easier to set this to true which will hide pickr if the user scrolls the area behind it.
    closeOnScroll: false,

    // Custom class which gets added to the pcr-app. Can be used to apply custom styles.
    appClass: 'custom-class',

    // Don't replace 'el' Element with the pickr-button, instead use 'el' as a button.
    // If true, appendToBody will also be automatically true.
    useAsButton: false,

    // Size of gap between pickr (widget) and the corresponding reference (button) in px
    padding: 8,

    // If true pickr won't be floating, and instead will append after the in el resolved element.
    // It's possible to hide it via .hide() anyway.
    inline: false,

    // If true, pickr will be repositioned automatically on page scroll or window resize.
    // Can be set to false to make custom positioning easier.
    autoReposition: true,

    // Defines the direction in which the knobs of hue and opacity can be moved.
    // 'v' => opacity- and hue-slider can both only moved vertically.
    // 'hv' => opacity-slider can be moved horizontally and hue-slider vertically.
    // Can be used to apply custom layouts
    sliders: 'v',

    // Start state. If true 'disabled' will be added to the button's classlist.
    disabled: false,

    // If true, the user won't be able to adjust any opacity.
    // Opacity will be locked at 1 and the opacity slider will be removed.
    // The HSVaColor object also doesn't contain an alpha, so the toString() methods just
    // print HSV, HSL, RGB, HEX, etc.
    lockOpacity: false,

    // Precision of output string (only effective if components.interaction.input is true)
    outputPrecision: 0,

    // If set to false it would directly apply the selected color on the button and preview.
    comparison: true,

    // Default color. If you're using a named color such as red, white ... set
    // a value for defaultRepresentation too as there is no button for named-colors.
    default: settings_input.value ? settings_input.value : '#000080',

    // Optional color swatches. When null, swatches are disabled.
    // Types are all those which can be produced by pickr e.g. hex(a), hsv(a), hsl(a), rgb(a), cmyk, and also CSS color names like 'magenta'.
    // Example: swatches: ['#F44336', '#E91E63', '#9C27B0', '#673AB7'],
    swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
    ],

    // Default color representation of the input/output textbox.
    // Valid options are `HEX`, `RGBA`, `HSVA`, `HSLA` and `CMYK`.
    defaultRepresentation: 'HEX',

    // Option to keep the color picker always visible.
    // You can still hide / show it via 'pickr.hide()' and 'pickr.show()'.
    // The save button keeps its functionality, so still fires the onSave event when clicked.
    showAlways: true,

    // Close pickr with a keypress.
    // Default is 'Escape'. Can be the event key or code.
    // (see: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
    closeWithKey: 'Escape',

    // Defines the position of the color-picker.
    // Any combinations of top, left, bottom or right with one of these optional modifiers: start, middle, end
    // Examples: top-start / right-end
    // If clipping occurs, the color picker will automatically choose its position.
    position: 'bottom-end',

    // Enables the ability to change numbers in an input field with the scroll-wheel.
    // To use it set the cursor on a position where a number is and scroll, use ctrl to make steps of five
    adjustableNumbers: true,

    // Show or hide specific components.
    // By default only the palette (and the save button) is visible.
    components: {

      // Defines if the palette itself should be visible.
      // Will be overwritten with true if preview, opacity or hue are true
      palette: true,

      preview: true, // Display comparison between previous state and new color
      opacity: true, // Display opacity slider
      hue: true, // Display hue slider

      // show or hide components on the bottom interaction bar.
      interaction: {

        // Buttons, if you disable one but use the format in default: or setColor() - set the representation-type too!
        hex: true, // Display 'input/output format as hex' button  (hexadecimal representation of the rgba value)
        rgba: true, // Display 'input/output format as rgba' button (red green blue and alpha)
        hsla: true, // Display 'input/output format as hsla' button (hue saturation lightness and alpha)
        hsva: true, // Display 'input/output format as hsva' button (hue saturation value and alpha)
        cmyk: true, // Display 'input/output format as cmyk' button (cyan mangenta yellow key )

        input: true, // Display input/output textbox which shows the selected color value.
        // the format of the input is determined by defaultRepresentation,
        // and can be changed by the user with the buttons set by hex, rgba, hsla, etc (above).
        cancel: false, // Display Cancel Button, resets the color to the previous state
        clear: false, // Display Clear Button; same as cancel, but keeps the window open
        save: false, // Display Save Button,
      },
    },

    // Button strings, brings the possibility to use a language other than English.
    strings: {
      // save: 'Save', // Default for save button
      // clear: 'Clear', // Default for clear button
      // cancel: 'Cancel' // Default for cancel button
    }
  });

  var color_picker_setting = document.getElementById('color_picker_setting'),
    pcr_button = document.querySelector('.pcr-button');
  pickr.on('change', (color, instance) => {
    settings_input.value = color.toRGBA().toString(3);
  })
  tippy('#color_picker_setting', {
    content: "Use the color palette below to select a value!",
  });

});

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
