exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'js/main.js': /^app/
        'js/vendor.js': /^(bower_components|vendor)/
    stylesheets:
      joinTo: 'css/main.css'
    templates:
      joinTo: 'app.js'
