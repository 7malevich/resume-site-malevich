"use strict";

var _swiper = require("swiper");

var _gsap = require("gsap");

var _micromodal = _interopRequireDefault(require("micromodal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_swiper.Swiper.use([_swiper.Parallax, _swiper.Mousewheel, _swiper.Controller, _swiper.Pagination, _swiper.Scrollbar, _swiper.Navigation]);

document.addEventListener('DOMContentLoaded', function () {
  // Modal
  _micromodal["default"].init({
    openTrigger: 'data-micromodal-open',
    closeTrigger: 'data-micromodal-close',
    disableFocus: true,
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
  }); // Swiper


  var swiperIMG = new _swiper.Swiper('.slider-img', {
    loop: false,
    speed: 2400,
    parallax: true,
    pagination: {
      el: '.slider-pagination-count .total',
      type: 'custom',
      renderCustom: function renderCustom(swiper, current, total) {
        var totalRes = total >= 10 ? total : "0".concat(total);
        return totalRes;
      }
    }
  });
  var swiperText = new _swiper.Swiper('.slider-text', {
    loop: false,
    speed: 2400,
    mousewheel: {
      invert: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    }
  });
  swiperIMG.controller.control = swiperText;
  swiperText.controller.control = swiperIMG; // Gear

  var gear = document.querySelector('.slider-gear');
  swiperText.on('slideNextTransitionStart', function () {
    _gsap.gsap.to(gear, 2.8, {
      rotation: '+=40',
      ease: _gsap.Power2.easeOut
    });
  });
  swiperText.on('slidePrevTransitionStart', function () {
    _gsap.gsap.to(gear, 2.8, {
      rotation: '-=40',
      ease: _gsap.Power2.easeOut
    });
  }); // Slide Change

  var curnum = document.querySelector('.slider-pagination-count .current'),
      pagcur = document.querySelector('.slider-pagination-current__num');
  swiperText.on('slideChange', function () {
    var ind = swiperText.realIndex + 1,
        indRes = ind >= 10 ? ind : "0".concat(ind);

    _gsap.gsap.to(curnum, .2, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: _gsap.Power2.easeOut,
      onComplete: function onComplete() {
        _gsap.gsap.to(curnum, .1, {
          force3D: true,
          y: 10
        });

        curnum.innerHTML = indRes;
        pagcur.innerHTML = indRes;
      }
    });

    _gsap.gsap.to(curnum, .2, {
      force3D: true,
      y: 0,
      opacity: 1,
      ease: _gsap.Power2.easeOut,
      delay: .3
    });
  }); // Cursor
  //const body   = document.querySelector('body'),
  //			cursor = document.getElementById('cursor'),
  //			links  = document.getElementsByTagName('a')
  //let mouseX = 0, mouseY = 0, posX = 0, posY = 0
  //function mouseCoords(e) {
  //	mouseX = e.pageX
  //	mouseY = e.pageY
  //}
  //gsap.to({}, .01, {
  //	repeat: -1,
  //	onRepeat: () => {
  //		posX += (mouseX - posX) / 6
  //		posY += (mouseY - posY) / 6
  //		gsap.set(cursor, {
  //			css: {
  //				left: posX,
  //				top: posY
  //			}
  //		})
  //	}
  //})
  //for(let i = 0; i < links.length; i++) {
  //	links[i].addEventListener('mouseover', () => {
  //		cursor.classList.add('active')
  //	})
  //	links[i].addEventListener('mouseout', () => {
  //		cursor.classList.remove('active')
  //	})
  //}
  //body.addEventListener('mousemove', e => {
  //	mouseCoords(e)
  //	cursor.classList.remove('hidden')
  //})
  //body.addEventListener('mouseout', e => {
  //	cursor.classList.add('hidden')
  //})
});