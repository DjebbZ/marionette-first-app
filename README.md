First Marionette Application
============================

I'm basically following this Marionette beginner's tutorial : http://davidsulc.com/blog/2012/04/15/a-simple-backbone-marionette-tutorial/

This app is using [Bower](http://bower.io/), [Pure.css](http://purecss.io/), [Marionette](http://marionettejs.com/) and [jQuery](http://jquery.com/). I also replaced the local cats images by cats placeholder images from [lorempixel](http://lorempixel.com/)

There are two implementations of the application using differents modules strategies :

- [no-module](tree/master/no-module) : everything in one file and in the global scope. Quick'n'dirty.
- [brunch](tree/master/brunch) : straight port using Brunch and the CommonJS module format. Much better.