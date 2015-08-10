(function () {
    'use strict';

    window.ImageGallery = function (args) {
        var imageGallery = this;

        imageGallery.params = {
            descriptions: false,
            hoverControls: false
        }

        for (var arg in args) {
            if (imageGallery.params[arg]) {
                imageGallery.params[arg] = args[arg];
            }
        }

        imageGallery.writeError = function (gallery, errorString) {
            var span = document.createElement('span');
            span.classList.add('error-msg');
            gallery.appendChild(span).innerHTML = errorString;
            return;
        };

        imageGallery.removeArrows = function (gallery) {
            var leftArrow = gallery.getElementsByClassName('arrow-left')[0];
            var rightArrow = gallery.getElementsByClassName('arrow-right')[0];

            if (leftArrow)
                gallery.removeChild(leftArrow);
            if (rightArrow)
                gallery.removeChild(rightArrow);
            return;
        };

        imageGallery.addArrows = function (gallery) {
            var leftArrow = document.createElement('button');
            leftArrow.className = 'arrow';
            leftArrow.className += ' arrow-left';
            if (imageGallery.params.hoverControls) leftArrow.className += ' hovercontrols';

            var leftInnerArrow = document.createElement('span');
            leftArrow.appendChild(leftInnerArrow);

            var rightArrow = document.createElement('button');
            rightArrow.className = 'arrow';
            rightArrow.className += ' arrow-right';
            if (imageGallery.params.hoverControls) rightArrow.className += ' hovercontrols';
            var rightInnerArrow = document.createElement('span');
            rightArrow.appendChild(rightInnerArrow);

            gallery.appendChild(leftArrow);
            gallery.appendChild(rightArrow);
            return;
        };

        imageGallery.addArrowListeners = function (images, activeIndex) {
            var leftArrow = document.getElementsByClassName('arrow-left')[0];
            var rightArrow = document.getElementsByClassName('arrow-right')[0];

            var oldActive;
            var leftImageIndex = images[activeIndex].getAttribute('data-pre-left-img');
            var rightImageIndex = images[activeIndex].getAttribute('data-pre-right-img');
            if (leftArrow) {
                leftArrow.addEventListener('click', function () {
                    imageGallery.removeArrows(leftArrow.parentNode);
                    images[rightImageIndex].classList.remove('pre-right-img');
                    images[activeIndex].classList.add('post-left-img');
                    images[leftImageIndex].classList.add('active');
                    images[leftImageIndex].classList.remove('pre-left-img');
                    images[activeIndex].classList.remove('active');
                    window.setTimeout(function () {
                        images[activeIndex].classList.remove('post-left-img');
                    }, 500);
                    imageGallery.setActiveImage(images, leftImageIndex, true);
                }, false);
            }

            if (rightArrow) {
                rightArrow.addEventListener('click', function () {
                    imageGallery.removeArrows(leftArrow.parentNode);
                    images[leftImageIndex].classList.remove('pre-left-img');
                    images[activeIndex].classList.add('post-right-img');
                    images[rightImageIndex].classList.add('active');
                    images[rightImageIndex].classList.remove('pre-right-img');
                    images[activeIndex].classList.remove('active');
                    window.setTimeout(function () {
                        images[activeIndex].classList.remove('post-right-img');
                    }, 500);
                    imageGallery.setActiveImage(images, rightImageIndex, true);
                }, false);
            }
            return;
        };

        imageGallery.setActiveImage = function (images, activeIndex, isGallery) {
            var image = images[activeIndex];
            image.classList.add('active');

            if (isGallery) {
                this.addArrows(images[0].parentNode);
                var prevImage = images[image.getAttribute('data-pre-left-img')];
                prevImage.classList.add('pre-left-img');

                var nextImage = images[image.getAttribute('data-pre-right-img')];
                nextImage.classList.add('pre-right-img');

                this.addArrowListeners(images, activeIndex);
            }
            return;
        };

        imageGallery.setupImages = function (images) {
            var trueLength = images.length,
                adjustedLength = trueLength - 1;
            var activeIndex = -1, prevIndex, nextIndex;
            for (var i = 0; i < trueLength; i++) {
                if (images[i].classList.contains('active')) {
                    activeIndex = i;
                }

                if (i === 0) {
                    prevIndex = adjustedLength;
                    nextIndex = (i + 1);
                } else if (i === adjustedLength) {
                    prevIndex = (i - 1);
                    nextIndex = 0;
                } else {
                    prevIndex = (i - 1);
                    nextIndex = (i + 1);
                }

                images[i].setAttribute('data-pre-left-img', prevIndex);
                images[i].setAttribute('data-pre-right-img', nextIndex);
            }

            if (activeIndex === -1)
                activeIndex = 0;

            this.setActiveImage(images, activeIndex, true);
            return;
        };

        imageGallery.setupGallery = function (gallery) {
            // Setup images
            var images = gallery.getElementsByTagName('img');

            if (images.length > 1) {
                //this.addArrows(gallery);
                this.setupImages(images);
            } else if (images.length === 1) {
                this.setActiveImage(images, 0, false);
            } else {
                var errorString = 'An error occurred while loading the images.';
                this.writeError(gallery, errorString);
                this.removeArrows(gallery);
            }
            return;
        };

        imageGallery.init = function () {
            var galleries = document.getElementsByClassName('image-gallery');
            if (galleries) {
                for (var i = 0; i < galleries.length; i++) {
                    this.setupGallery(galleries[i]);
                }
            }
            return;
        };

        this.init();
    };
})();