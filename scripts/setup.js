var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var ESCAPE = 27;

var images = [
    "images/cat1.jpg",
    "images/cat2.jpg",
    "images/cat3.jpg",
    "images/cat4.jpg",
    "images/cat5.jpg"
];

class Gallery {
    constructor(galleryEl) {
        this.$gallery = galleryEl;
        this.$area = document.querySelector('#slider');
        this.$sliderHolder = document.querySelector('#sliderHolder');
        this.$close = document.querySelector('#closeBtn');
        this.$content = document.querySelector('#content');
        this.$leftArrow = document.querySelector('#leftJump');
        this.$rightArrow = document.querySelector('#rightJump');
        this.$list = document.querySelector('#list');

        this._setupEvents();
        this._closeSlider();

        createList(images).map((value) => {
            this.$list.appendChild(value);
        });
    }

    _setupEvents() {
        this.$content.addEventListener('click', this._onImgClick.bind(this));
        this.$close.addEventListener('click', this._closeSlider.bind(this));
        this.$leftArrow.addEventListener('click', this._leftMove.bind(this));
        this.$rightArrow.addEventListener('click', this._rightMove.bind(this));
        document.addEventListener('keydown', this._keys.bind(this));
    }

    _closeSlider() {
        this.$area.style.display = "none";
    }

    _onImgClick(evt) {
        let $clickedElementSrc = buildImage(evt.target.src);
        this.$current = event.target;
        this.$sliderHolder.innerHTML = "";
        this.$area.style.display = "block";
        this.$sliderHolder.appendChild($clickedElementSrc);
    }

    _leftMove() {
        let move = this.$current.getAttribute('data-index');
        move--;
        if (move < 0)
            move = images.length - 1;
        this._setImageByIndex(move);
    }

    _rightMove() {
        let move = this.$current.getAttribute('data-index');
        move++;
        if (move > images.length - 1)
            move = 0;
        this._setImageByIndex(move);
    }

    _setImageByIndex(index) {
        let src = images[index];
        let image = buildImage(src);
        image.setAttribute('data-index', index);
        this.$current = image;
        this.$sliderHolder.innerHTML = "";
        this.$sliderHolder.appendChild(image);
    }

    _keys(e) {
        switch (e.keyCode) {
            case LEFT_ARROW:
                this._leftMove();
                break;
            case RIGHT_ARROW:
                this._rightMove();
                break;
            case ESCAPE:
                this._closeSlider();
                break;
        }
    }
}

function buildImage(url) {
    let $image = document.createElement('img');
    $image.setAttribute('src', url);
    return $image;
}

function createList(arr) {
    return arr.map(function(src, index) {
        let $listElement = document.createElement('li');
        let $smallImage = buildImage(arr[index]);
        $smallImage.setAttribute('class', 'sliderHolder');
        $smallImage.setAttribute('data-index', index);
        $smallImage.setAttribute('src', src);
        $listElement.appendChild($smallImage);
        return $listElement;
    })

};

window.addEventListener('DOMContentLoaded', function() {
    let galleryElement = document.querySelector('#gallery');
    new Gallery(galleryElement);
});
