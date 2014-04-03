tooltip
=======

Component Tooltip

![Demo](https://raw.githubusercontent.com/redbadger/tooltip/master/tooltip-component-demo.gif)

Simple UI component to display tooltips next to the target element. Check the usage from `test/index.html`

##Params

* `target` - selector of the target element. First element in the list will be used to display tooltip.
* `content` - HTML content of your tooltip
* `type` - `error`, `error-2` or `info`. Effectively this is a class that will be attached to the tooltip, so you can use any other type here and define your CSS styles for the custom tooltip.
* `position` - `top` or `bottom`
* `overlay` - `true` or `false` -- meaning if the tooltip will be inserted between elements or overlayed on top of the page content
* `timeout` - in millseconds. When defined, tooltip will fade away after the timeout.
* `tip` - `true` or `false` - display or hide tip of the tooltip
* `tipPosition` - `left`, `center` or `right` - position of the tip
