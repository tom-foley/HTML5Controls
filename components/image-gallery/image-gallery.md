## HTML5Controls ImageGallery

### Dependencies
``` 
image-gallery.min.css (or image-gallery.css)
image-gallery.min.js (or image-gallery.js)
```

### Usage
To use the image gallery, we just need two(2) wrapper elements, the image elements themselves, and the javascript initialization. 
-   The inner wrapper wrapper element which holds all image elements is required to be a `div.image-gallery`. This element will always have dimensions of `width: 100%; height: 100%`, so we need an outer wrapper to define a concrete height and width for the image gallery. 
-   The outer wrapper wrapper doesn't need to be the immediate parent of the `div.image-gallery` and can be of `width: 100%; height: 100%` as well, but somewhere up the line of parent containers you must define a height and width in pixels that is > 0.
-   Finally, we simply need to initialize the image-gallery slideshow features with `var imageGallery = new ImageGallery();`
    -   ** Note this must be called after the image-gallery element has loaded

#### Template
```
    <link rel="stylesheet" href="{{path-to-imagegallery-css}}"/>
    <style>
        div.image-gallery-container {
            width: 250px;
            height: 250px;
        }
    </style>

    ...
    ...

    <div class="image-gallery-container">
        <div class="image-gallery">
            <img src=" {{path-to-image-1}} " alt="Image 1" />
            <img src=" {{path-to-image-2}} " alt="Image 2" />
            <img src=" {{path-to-image-3}} " alt="Image 3" />
            <img src=" {{path-to-image-4}} " alt="Image 3" />
            etc...
        </div>
    </div>

    <script type="text/javascript" src="{{path-to-imagegallery-js}}"></script>
    <script type="text/javascript">
        var imageGallery = new ImageGallery();
    </script>
```



#### Example
```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link rel="stylesheet" href="../css/image-gallery.min.css"/>
</head>
<body>
    <div class="image-gallery-container">
        <div class="image-gallery">
            <img src="http://placehold.it/250x250/000000/7FFFD4" alt="" />
            <img src="http://placehold.it/250x250/7FFFD4/ffffff" alt="" />
            <img src="http://placehold.it/250x250/7FFFD4/000000" alt="" />
            <img src="http://placehold.it/250x250/ffffff/9ACD32" alt="" />
            <img src="http://placehold.it/250x250/000000/ffffff" alt="" />
            <img src="http://placehold.it/250x250/7FFF00/ffffff" alt="" />
        </div>
    </div>

    <script type="text/javascript" src="../js/image-gallery.min.js"></script>
    <script type="text/javascript">
        var imageGallery = new ImageGallery();
    </script>
</body>
</html>
```

### Options
-   The default(first) image can be set by adding class `active` to any of the image-gallery `img` elements. If no `img.active` is found when the gallery is initialized, it will just set the first `img` element as the first image to display.
-   The arrow controls can be set to only display on image hover by initializing the image gallery with option `hoverControls: true`, like so: 
    -   `var imageGallery = new ImageGallery({ hoverControls: true });`

### TODO
-   Add option for image descriptions