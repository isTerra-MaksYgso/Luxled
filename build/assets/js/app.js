;
$(document).ready(function() {
    // $('.mainContent').css('min-height', ($(window).outerHeight() - $(".footer").outerHeight()) - $(".header").outerHeight());
    catalogFilters();
    headerMenuItemHover();
    catalogCheckBox();
    catalogAccordion();
    catalogSorting();
    productPhotoGalery();
    productMoreTableRowColor();
    productMoreTab();
    orderForm();
    footerMenu();
    $('img').on('mousedown', function(e) { e.preventDefault(); });
    hScroll($('.header__catalogItem'), $('.header__catalog'));
    hScroll($('.portfolio__item'), $('.portfolio__itemBox'));
    hScroll($('.productMore__galeryPictureOtherCase '), $('.productMore__galeryPictureOtherBox'));

    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));

    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    var mySwiper = new Swiper('.swiper2', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationElement: 'li'
    });
    catalogFilterBox();
    catalogOptionRange(0, 500, 100, 200);
});

$(window).resize(function() {
    mediaCenter(5, $('.whyWe__belief'), $('.whyWe__beliefs'), $('.totalWidth'));
    mediaCenter(3, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection'));
    mediaCenter(4, $('.catalog__item'), $('.catalog__items'), $('.catalog__mainSection--full'));
    if ($(window).outerWidth() <= 1023) {
        mediaCenter(8, $('.footer__paymentLink'), $('.footer__paymentLinks'));
    }
    productMoreTableRowColor();
});

var catalogFilterBox = function() {
    $('.catalog__optionsItem').on('click', function() {
        var top = $(this).offset().top - $('.catalog__optionItems').offset().top;
        $('.catalog__optionFindProductBox').addClass('catalog__optionFindProductBox--active').css('top', top);
    });
    $('.catalog__optionsTitleBox').on('click', function() {
        if (!($(this).children('.accordionIcon').hasClass('accordionIcon--active'))) {
            $('.catalog__optionFindProductBox').removeClass('catalog__optionFindProductBox--active');
        }
    });
};

var catalogOptionRange = function(start, end, currMin, currMax) {
    var min = start;
    var max = end;
    var minField = $('.catalog__optionsMinVal');
    var maxField = $('.catalog__optionsMaxVal');

    // var blurFunc = function(minV, maxV) {
    //     maxField.blur(function(minV, maxV) {
    //         currVal = parseInt($(this).val());
    //         $("#slider-range").slider({
    //             range: true,
    //             min: min,
    //             max: max,
    //             values: [minV, currVal],
    //             slide: function(event, ui) {
    //                 minField.val(ui.values[0]);
    //                 maxField.val(ui.values[1]);
    //             }
    //         });
    //     });

    //     minField.blur(function(minV, maxV) {
    //         currVal = parseInt($(this).val());
    //         $("#slider-range").slider({
    //             range: true,
    //             min: min,
    //             max: max,
    //             values: [currVal, maxV],
    //             slide: function(event, ui) {
    //                 minField.val(ui.values[0]);
    //                 maxField.val(ui.values[1]);
    //             }
    //         });
    //     });
    // };

    if (currMin && currMax) {
        minField.val(currMin);
        maxField.val(currMax);
        $("#slider-range").slider({
            range: true,
            min: min,
            max: max,
            values: [currMin, currMax],
            slide: function(event, ui) {
                minField.val(ui.values[0]);
                maxField.val(ui.values[1]);
            }
        });
        // blurFunc(currMin, currMax);
    } else {
        minField.val(min);
        maxField.val(max);
        $("#slider-range").slider({
            range: true,
            min: min,
            max: max,
            values: [min, max],
            slide: function(event, ui) {
                minField.val(ui.values[0]);
                maxField.val(ui.values[1]);
            }
        });
        // blurFunc(min, max);
    }
};

var mediaCenter = function(count, elem, box, boxControlSize) {
    var size;
    if (elem.length < count) {
        for (var i = 1; i <= elem.length + 1; i++) {
            if (boxControlSize) {
                size = boxControlSize.width();
            } else {
                size = box.width();
            }
            if (i == elem.length + 1) {
                if (i == 1) {
                    box.css('max-width', elem.outerWidth(true) * i);
                } else {
                    box.css('max-width', elem.outerWidth(true) * (i - 1));
                }
                break
            }
            if (size < elem.outerWidth(true) * i) {
                if (i == 1) {
                    box.css('max-width', elem.outerWidth(true) * i);
                } else {
                    box.css('max-width', elem.outerWidth(true) * (i - 1));
                }
                break
            }
        }
    } else {
        for (var i = 1; i <= count + 1; i++) {
            if (boxControlSize) {
                size = boxControlSize.width();
            } else {
                size = box.width();
            }
            if (size < elem.outerWidth(true) * i) {
                if (i == 1) {
                    box.css('max-width', elem.outerWidth(true) * i);
                } else {
                    box.css('max-width', elem.outerWidth(true) * (i - 1));
                }
                break
            }
        }
    }
};

var hScroll = function(el, elB) {
    el.on('mousedown', function(e) {
        e.preventDefault();
        var x = e.pageX - $(this).offset().left;
        $(this).on('mousemove', function(e) {
            $(this).on('click', function(e) {
                e.preventDefault();
            });
            var xx = e.pageX - $(this).offset().left;
            if (xx < x) {
                var curTr = elB.scrollLeft() + (x - xx);
                elB.scrollLeft(curTr);
            }
            if (xx > x) {
                var curTr = elB.scrollLeft() - (xx - x);
                elB.scrollLeft(curTr);
            }
        });
        elB.on('mouseup', function() {
            el.unbind('mousemove');
            setTimeout(function() {
                el.unbind('click');
            }, 1);
        });
        elB.on('mouseleave', function() {
            el.unbind('mousemove');
        });
    });
};

var productPhotoGalery = function() {
    var firstSrc = $('.productMore__galeryPictureOther').eq(0).attr('src');
    $('.productMore__galeryPictureMain').attr('src', firstSrc);
    $('.productMore__galeryPictureOtherCase').eq(0).addClass('productMore__galeryPictureOtherCase--active');
    $('.productMore__galeryPictureOther').on('click', function() {

        var needSrc = $(this).attr('src');
        $('.productMore__galeryPictureMain').attr('src', needSrc);

        $('.productMore__galeryPictureOtherCase--active').removeClass('productMore__galeryPictureOtherCase--active');

        $(this).closest('.productMore__galeryPictureOtherCase').addClass('productMore__galeryPictureOtherCase--active');

    });
};

var productMoreTableRowColor = function() {
    var rows = $('.productMore__infoCharacteristicsTableRow');
    var firstColor = '#f4f4f4';
    var secondColor = '#ffffff';
    var transparent = 'transparent';
    if ($(window).outerWidth() >= 600) {
        for (var i = 0; i < rows.length; i++) {
            if (i % 2 == 0) {
                rows.eq(i).css('background-color', firstColor);
            } else {
                rows.eq(i).css('background-color', secondColor);
            }
        }
    } else {
        rows.css('background-color', transparent);
        for (var i = 0; i < rows.length; i++) {
            if (i === 0) {
                rows.eq(i).find('.productMore__infoCharacteristicsTableColl').css('background-color', firstColor);
            } else {
                rows.eq(i).find('.productMore__infoCharacteristicsTableColl').eq(0).css('background-color', secondColor);
                rows.eq(i).find('.productMore__infoCharacteristicsTableColl').eq(1).css('background-color', firstColor);
            }
        }
    }
};

var productMoreTab = function() {
    var tabs = $('.productMore__infoTab');
    var links = $('.productMore__infoMenuLink');

    links.on('click', function(e) {
        e.preventDefault();
        $('.productMore__infoMenuLink--active').removeClass('productMore__infoMenuLink--active')
        $(this).addClass('productMore__infoMenuLink--active');
        var path = $(this).attr('href');
        tabs.each(function(index) {
            if (tabs.eq(index).attr('id') === path) {
                tabs.css('display', 'none');
                $(this).css('display', 'block');
            }
        });
    });

    tabs.eq(0).css('display', 'block');
    var tabId0 = tabs.eq(0).attr('id');

    $('.productMore__infoMenuLink').each(function(index) {
        if (links.eq(index).attr('href') === tabId0) {
            $(this).addClass('productMore__infoMenuLink--active');
        }
    });
};

var catalogCheckBox = function() {
    $('.catalog__optionsItem').on('click', function() {
        if ($(this).find('input').prop('checked') == true) {
            $(this).addClass('catalog__optionsItem--checked');
        } else {
            $(this).removeClass('catalog__optionsItem--checked');
        }
    });
};

var catalogAccordion = function() {
    $('.catalog__optionsTitleBox').on('click', function() {
        $(this).find('.accordionIcon').toggleClass('accordionIcon--active');
        $(this).next('.catalog__optionsItemList').toggleClass('catalog__optionsItemList--active');
    });
};

var catalogSorting = function() {
    $('.catalog__sortingTitleBox').on('click', function() {
        $(this).find('.accordionIcon').toggleClass('accordionIcon--active');
        $(this).next().toggleClass('catalog__sortingList--active');
    });
};

var orderForm = function() {
    var phone = $('.orders__form').find('input[name="phone"]');
    phone.mask("+7(999) 999-99-99");

    var form = $('.orders__form');
    var titleError = $('.orders__formErrorTitle');
    var visionTitleError = titleError.css('display');

    if (visionTitleError === 'block') {
        form.css('margin-top', '55px');
    }

    var inputRequire = $('.orders__formItem--require > input');

};
var headerMenuItemHover = function() {
    var needTopLenght;
    $('.header__catalogBtn').on('click', function() {
        if ($('.header__catalogBtnText').css('display') === 'none') {
            $('.header__menuList').toggleClass('header__menuList--full');
        } else {
            $('.header__menuList').toggleClass('header__menuList--active');
        }
        if ($('.header__menuList').hasClass('header__menuList--active')) {
            needTopLenght = $('.header__menuList--active').offset().top + $('.header__menuList--active').height();
        }
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() > needTopLenght) {
            $('.header__menuList').removeClass('header__menuList--full header__menuList--active');
        }
    });

    $('.header__menuItem').on('mouseover', function() {
        if ($('.header__menuList').hasClass('header__menuList--active')) {
            $(this).find('.header__menuItemAfter').css('display', 'block');
            var index = $(this).index();
            var top;
            if (index != 0) {
                top = (-50 * index) + 49;
            } else {
                top = -1;
            }
            $(this).find('.header__subMenu').css({
                'display': 'flex',
                'top': top
            });
        }
    });
    $('.header__menuItem').on('mouseout', function() {
        $(this).find('.header__menuItemAfter').css('display', 'none');
        $(this).find('.header__subMenu').css('display', 'none');
    });
};

var catalogFilters = function() {
    $('.filtersBtn').on('click', function() {
        $('.catalog__options').toggleClass('catalog__options--active');
    });
};

var footerMenu = function() {
    $('.footer__menuTitle').on('click', function() {
        var i = $('.footer__menu--active').index();
        var j = $(this).closest('.footer__menu').index();
        if (j === i) {
            $(this).closest('.footer__menu').toggleClass('footer__menu--active');
        } else {
            $('.footer__menu--active').removeClass('footer__menu--active');
            $(this).closest('.footer__menu').toggleClass('footer__menu--active');
        }

    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjtcclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAkKCcubWFpbkNvbnRlbnQnKS5jc3MoJ21pbi1oZWlnaHQnLCAoJCh3aW5kb3cpLm91dGVySGVpZ2h0KCkgLSAkKFwiLmZvb3RlclwiKS5vdXRlckhlaWdodCgpKSAtICQoXCIuaGVhZGVyXCIpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgY2F0YWxvZ0ZpbHRlcnMoKTtcclxuICAgIGhlYWRlck1lbnVJdGVtSG92ZXIoKTtcclxuICAgIGNhdGFsb2dDaGVja0JveCgpO1xyXG4gICAgY2F0YWxvZ0FjY29yZGlvbigpO1xyXG4gICAgY2F0YWxvZ1NvcnRpbmcoKTtcclxuICAgIHByb2R1Y3RQaG90b0dhbGVyeSgpO1xyXG4gICAgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yKCk7XHJcbiAgICBwcm9kdWN0TW9yZVRhYigpO1xyXG4gICAgb3JkZXJGb3JtKCk7XHJcbiAgICBmb290ZXJNZW51KCk7XHJcbiAgICAkKCdpbWcnKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0pO1xyXG4gICAgaFNjcm9sbCgkKCcuaGVhZGVyX19jYXRhbG9nSXRlbScpLCAkKCcuaGVhZGVyX19jYXRhbG9nJykpO1xyXG4gICAgaFNjcm9sbCgkKCcucG9ydGZvbGlvX19pdGVtJyksICQoJy5wb3J0Zm9saW9fX2l0ZW1Cb3gnKSk7XHJcbiAgICBoU2Nyb2xsKCQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZSAnKSwgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJCb3gnKSk7XHJcblxyXG4gICAgbWVkaWFDZW50ZXIoNSwgJCgnLndoeVdlX19iZWxpZWYnKSwgJCgnLndoeVdlX19iZWxpZWZzJyksICQoJy50b3RhbFdpZHRoJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoMywgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbicpKTtcclxuICAgIG1lZGlhQ2VudGVyKDQsICQoJy5jYXRhbG9nX19pdGVtJyksICQoJy5jYXRhbG9nX19pdGVtcycpLCAkKCcuY2F0YWxvZ19fbWFpblNlY3Rpb24tLWZ1bGwnKSk7XHJcblxyXG4gICAgaWYgKCQod2luZG93KS5vdXRlcldpZHRoKCkgPD0gMTAyMykge1xyXG4gICAgICAgIG1lZGlhQ2VudGVyKDgsICQoJy5mb290ZXJfX3BheW1lbnRMaW5rJyksICQoJy5mb290ZXJfX3BheW1lbnRMaW5rcycpKTtcclxuICAgIH1cclxuICAgIHZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXIyJywge1xyXG4gICAgICAgIHBhZ2luYXRpb246ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgIHBhZ2luYXRpb25DbGlja2FibGU6IHRydWUsXHJcbiAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQ6ICdsaSdcclxuICAgIH0pO1xyXG4gICAgY2F0YWxvZ0ZpbHRlckJveCgpO1xyXG4gICAgY2F0YWxvZ09wdGlvblJhbmdlKDAsIDUwMCwgMTAwLCAyMDApO1xyXG59KTtcclxuXHJcbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICBtZWRpYUNlbnRlcig1LCAkKCcud2h5V2VfX2JlbGllZicpLCAkKCcud2h5V2VfX2JlbGllZnMnKSwgJCgnLnRvdGFsV2lkdGgnKSk7XHJcbiAgICBtZWRpYUNlbnRlcigzLCAkKCcuY2F0YWxvZ19faXRlbScpLCAkKCcuY2F0YWxvZ19faXRlbXMnKSwgJCgnLmNhdGFsb2dfX21haW5TZWN0aW9uJykpO1xyXG4gICAgbWVkaWFDZW50ZXIoNCwgJCgnLmNhdGFsb2dfX2l0ZW0nKSwgJCgnLmNhdGFsb2dfX2l0ZW1zJyksICQoJy5jYXRhbG9nX19tYWluU2VjdGlvbi0tZnVsbCcpKTtcclxuICAgIGlmICgkKHdpbmRvdykub3V0ZXJXaWR0aCgpIDw9IDEwMjMpIHtcclxuICAgICAgICBtZWRpYUNlbnRlcig4LCAkKCcuZm9vdGVyX19wYXltZW50TGluaycpLCAkKCcuZm9vdGVyX19wYXltZW50TGlua3MnKSk7XHJcbiAgICB9XHJcbiAgICBwcm9kdWN0TW9yZVRhYmxlUm93Q29sb3IoKTtcclxufSk7XHJcblxyXG52YXIgY2F0YWxvZ0ZpbHRlckJveCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gJCgnLmNhdGFsb2dfX29wdGlvbkl0ZW1zJykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveCcpLmFkZENsYXNzKCdjYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveC0tYWN0aXZlJykuY3NzKCd0b3AnLCB0b3ApO1xyXG4gICAgfSk7XHJcbiAgICAkKCcuY2F0YWxvZ19fb3B0aW9uc1RpdGxlQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCEoJCh0aGlzKS5jaGlsZHJlbignLmFjY29yZGlvbkljb24nKS5oYXNDbGFzcygnYWNjb3JkaW9uSWNvbi0tYWN0aXZlJykpKSB7XHJcbiAgICAgICAgICAgICQoJy5jYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveCcpLnJlbW92ZUNsYXNzKCdjYXRhbG9nX19vcHRpb25GaW5kUHJvZHVjdEJveC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ09wdGlvblJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCwgY3Vyck1pbiwgY3Vyck1heCkge1xyXG4gICAgdmFyIG1pbiA9IHN0YXJ0O1xyXG4gICAgdmFyIG1heCA9IGVuZDtcclxuICAgIHZhciBtaW5GaWVsZCA9ICQoJy5jYXRhbG9nX19vcHRpb25zTWluVmFsJyk7XHJcbiAgICB2YXIgbWF4RmllbGQgPSAkKCcuY2F0YWxvZ19fb3B0aW9uc01heFZhbCcpO1xyXG5cclxuICAgIC8vIHZhciBibHVyRnVuYyA9IGZ1bmN0aW9uKG1pblYsIG1heFYpIHtcclxuICAgIC8vICAgICBtYXhGaWVsZC5ibHVyKGZ1bmN0aW9uKG1pblYsIG1heFYpIHtcclxuICAgIC8vICAgICAgICAgY3VyclZhbCA9IHBhcnNlSW50KCQodGhpcykudmFsKCkpO1xyXG4gICAgLy8gICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICBtaW46IG1pbixcclxuICAgIC8vICAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgLy8gICAgICAgICAgICAgdmFsdWVzOiBbbWluViwgY3VyclZhbF0sXHJcbiAgICAvLyAgICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWluRmllbGQudmFsKHVpLnZhbHVlc1swXSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKHVpLnZhbHVlc1sxXSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICBtaW5GaWVsZC5ibHVyKGZ1bmN0aW9uKG1pblYsIG1heFYpIHtcclxuICAgIC8vICAgICAgICAgY3VyclZhbCA9IHBhcnNlSW50KCQodGhpcykudmFsKCkpO1xyXG4gICAgLy8gICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZ2U6IHRydWUsXHJcbiAgICAvLyAgICAgICAgICAgICBtaW46IG1pbixcclxuICAgIC8vICAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgLy8gICAgICAgICAgICAgdmFsdWVzOiBbY3VyclZhbCwgbWF4Vl0sXHJcbiAgICAvLyAgICAgICAgICAgICBzbGlkZTogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWluRmllbGQudmFsKHVpLnZhbHVlc1swXSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKHVpLnZhbHVlc1sxXSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfTtcclxuXHJcbiAgICBpZiAoY3Vyck1pbiAmJiBjdXJyTWF4KSB7XHJcbiAgICAgICAgbWluRmllbGQudmFsKGN1cnJNaW4pO1xyXG4gICAgICAgIG1heEZpZWxkLnZhbChjdXJyTWF4KTtcclxuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICB2YWx1ZXM6IFtjdXJyTWluLCBjdXJyTWF4XSxcclxuICAgICAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgbWluRmllbGQudmFsKHVpLnZhbHVlc1swXSk7XHJcbiAgICAgICAgICAgICAgICBtYXhGaWVsZC52YWwodWkudmFsdWVzWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGJsdXJGdW5jKGN1cnJNaW4sIGN1cnJNYXgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtaW5GaWVsZC52YWwobWluKTtcclxuICAgICAgICBtYXhGaWVsZC52YWwobWF4KTtcclxuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xyXG4gICAgICAgICAgICByYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICB2YWx1ZXM6IFttaW4sIG1heF0sXHJcbiAgICAgICAgICAgIHNsaWRlOiBmdW5jdGlvbihldmVudCwgdWkpIHtcclxuICAgICAgICAgICAgICAgIG1pbkZpZWxkLnZhbCh1aS52YWx1ZXNbMF0pO1xyXG4gICAgICAgICAgICAgICAgbWF4RmllbGQudmFsKHVpLnZhbHVlc1sxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBibHVyRnVuYyhtaW4sIG1heCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgbWVkaWFDZW50ZXIgPSBmdW5jdGlvbihjb3VudCwgZWxlbSwgYm94LCBib3hDb250cm9sU2l6ZSkge1xyXG4gICAgdmFyIHNpemU7XHJcbiAgICBpZiAoZWxlbS5sZW5ndGggPCBjb3VudCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGVsZW0ubGVuZ3RoICsgMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChib3hDb250cm9sU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveENvbnRyb2xTaXplLndpZHRoKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gYm94LndpZHRoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGkgPT0gZWxlbS5sZW5ndGggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIChpIC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2l6ZSA8IGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiBpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmNzcygnbWF4LXdpZHRoJywgZWxlbS5vdXRlcldpZHRoKHRydWUpICogKGkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBjb3VudCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYm94Q29udHJvbFNpemUpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBib3hDb250cm9sU2l6ZS53aWR0aCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGJveC53aWR0aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaXplIDwgZWxlbS5vdXRlcldpZHRoKHRydWUpICogaSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jc3MoJ21heC13aWR0aCcsIGVsZW0ub3V0ZXJXaWR0aCh0cnVlKSAqIGkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guY3NzKCdtYXgtd2lkdGgnLCBlbGVtLm91dGVyV2lkdGgodHJ1ZSkgKiAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgaFNjcm9sbCA9IGZ1bmN0aW9uKGVsLCBlbEIpIHtcclxuICAgIGVsLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciB4ID0gZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAkKHRoaXMpLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHh4ID0gZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICAgICAgaWYgKHh4IDwgeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1clRyID0gZWxCLnNjcm9sbExlZnQoKSArICh4IC0geHgpO1xyXG4gICAgICAgICAgICAgICAgZWxCLnNjcm9sbExlZnQoY3VyVHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4eCA+IHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJUciA9IGVsQi5zY3JvbGxMZWZ0KCkgLSAoeHggLSB4KTtcclxuICAgICAgICAgICAgICAgIGVsQi5zY3JvbGxMZWZ0KGN1clRyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsQi5vbignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBlbC51bmJpbmQoJ21vdXNlbW92ZScpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZWwudW5iaW5kKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9LCAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbEIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZWwudW5iaW5kKCdtb3VzZW1vdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIHByb2R1Y3RQaG90b0dhbGVyeSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZpcnN0U3JjID0gJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXInKS5lcSgwKS5hdHRyKCdzcmMnKTtcclxuICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW4nKS5hdHRyKCdzcmMnLCBmaXJzdFNyYyk7XHJcbiAgICAkKCcucHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UnKS5lcSgwKS5hZGRDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIG5lZWRTcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU1haW4nKS5hdHRyKCdzcmMnLCBuZWVkU3JjKTtcclxuXHJcbiAgICAgICAgJCgnLnByb2R1Y3RNb3JlX19nYWxlcnlQaWN0dXJlT3RoZXJDYXNlLS1hY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvZHVjdE1vcmVfX2dhbGVyeVBpY3R1cmVPdGhlckNhc2UtLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5wcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZScpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9fZ2FsZXJ5UGljdHVyZU90aGVyQ2FzZS0tYWN0aXZlJyk7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgcHJvZHVjdE1vcmVUYWJsZVJvd0NvbG9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcm93cyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlUm93Jyk7XHJcbiAgICB2YXIgZmlyc3RDb2xvciA9ICcjZjRmNGY0JztcclxuICAgIHZhciBzZWNvbmRDb2xvciA9ICcjZmZmZmZmJztcclxuICAgIHZhciB0cmFuc3BhcmVudCA9ICd0cmFuc3BhcmVudCc7XHJcbiAgICBpZiAoJCh3aW5kb3cpLm91dGVyV2lkdGgoKSA+PSA2MDApIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZXEoaSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgZmlyc3RDb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIHNlY29uZENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcm93cy5jc3MoJ2JhY2tncm91bmQtY29sb3InLCB0cmFuc3BhcmVudCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmZpbmQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlQ29sbCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGZpcnN0Q29sb3IpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm93cy5lcShpKS5maW5kKCcucHJvZHVjdE1vcmVfX2luZm9DaGFyYWN0ZXJpc3RpY3NUYWJsZUNvbGwnKS5lcSgwKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBzZWNvbmRDb2xvcik7XHJcbiAgICAgICAgICAgICAgICByb3dzLmVxKGkpLmZpbmQoJy5wcm9kdWN0TW9yZV9faW5mb0NoYXJhY3RlcmlzdGljc1RhYmxlQ29sbCcpLmVxKDEpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGZpcnN0Q29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIHByb2R1Y3RNb3JlVGFiID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGFicyA9ICQoJy5wcm9kdWN0TW9yZV9faW5mb1RhYicpO1xyXG4gICAgdmFyIGxpbmtzID0gJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmsnKTtcclxuXHJcbiAgICBsaW5rcy5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQoJy5wcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvZHVjdE1vcmVfX2luZm9NZW51TGluay0tYWN0aXZlJylcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKTtcclxuICAgICAgICB2YXIgcGF0aCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgIHRhYnMuZWFjaChmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGFicy5lcShpbmRleCkuYXR0cignaWQnKSA9PT0gcGF0aCkge1xyXG4gICAgICAgICAgICAgICAgdGFicy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGFicy5lcSgwKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIHZhciB0YWJJZDAgPSB0YWJzLmVxKDApLmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgJCgnLnByb2R1Y3RNb3JlX19pbmZvTWVudUxpbmsnKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGxpbmtzLmVxKGluZGV4KS5hdHRyKCdocmVmJykgPT09IHRhYklkMCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdwcm9kdWN0TW9yZV9faW5mb01lbnVMaW5rLS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nQ2hlY2tCb3ggPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zSXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpID09IHRydWUpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnY2F0YWxvZ19fb3B0aW9uc0l0ZW0tLWNoZWNrZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbS0tY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNhdGFsb2dBY2NvcmRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19vcHRpb25zVGl0bGVCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5hY2NvcmRpb25JY29uJykudG9nZ2xlQ2xhc3MoJ2FjY29yZGlvbkljb24tLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgnLmNhdGFsb2dfX29wdGlvbnNJdGVtTGlzdCcpLnRvZ2dsZUNsYXNzKCdjYXRhbG9nX19vcHRpb25zSXRlbUxpc3QtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY2F0YWxvZ1NvcnRpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5jYXRhbG9nX19zb3J0aW5nVGl0bGVCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5hY2NvcmRpb25JY29uJykudG9nZ2xlQ2xhc3MoJ2FjY29yZGlvbkljb24tLWFjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykubmV4dCgpLnRvZ2dsZUNsYXNzKCdjYXRhbG9nX19zb3J0aW5nTGlzdC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBvcmRlckZvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwaG9uZSA9ICQoJy5vcmRlcnNfX2Zvcm0nKS5maW5kKCdpbnB1dFtuYW1lPVwicGhvbmVcIl0nKTtcclxuICAgIHBob25lLm1hc2soXCIrNyg5OTkpIDk5OS05OS05OVwiKTtcclxuXHJcbiAgICB2YXIgZm9ybSA9ICQoJy5vcmRlcnNfX2Zvcm0nKTtcclxuICAgIHZhciB0aXRsZUVycm9yID0gJCgnLm9yZGVyc19fZm9ybUVycm9yVGl0bGUnKTtcclxuICAgIHZhciB2aXNpb25UaXRsZUVycm9yID0gdGl0bGVFcnJvci5jc3MoJ2Rpc3BsYXknKTtcclxuXHJcbiAgICBpZiAodmlzaW9uVGl0bGVFcnJvciA9PT0gJ2Jsb2NrJykge1xyXG4gICAgICAgIGZvcm0uY3NzKCdtYXJnaW4tdG9wJywgJzU1cHgnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaW5wdXRSZXF1aXJlID0gJCgnLm9yZGVyc19fZm9ybUl0ZW0tLXJlcXVpcmUgPiBpbnB1dCcpO1xyXG5cclxufTtcclxudmFyIGhlYWRlck1lbnVJdGVtSG92ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBuZWVkVG9wTGVuZ2h0O1xyXG4gICAgJCgnLmhlYWRlcl9fY2F0YWxvZ0J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKCcuaGVhZGVyX19jYXRhbG9nQnRuVGV4dCcpLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbWVudUxpc3QnKS50b2dnbGVDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tZnVsbCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX21lbnVMaXN0JykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoJCgnLmhlYWRlcl9fbWVudUxpc3QnKS5oYXNDbGFzcygnaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgbmVlZFRvcExlbmdodCA9ICQoJy5oZWFkZXJfX21lbnVMaXN0LS1hY3RpdmUnKS5vZmZzZXQoKS50b3AgKyAkKCcuaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJykuaGVpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBuZWVkVG9wTGVuZ2h0KSB7XHJcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX21lbnVMaXN0JykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWZ1bGwgaGVhZGVyX19tZW51TGlzdC0tYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmhlYWRlcl9fbWVudUl0ZW0nKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJy5oZWFkZXJfX21lbnVMaXN0JykuaGFzQ2xhc3MoJ2hlYWRlcl9fbWVudUxpc3QtLWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fbWVudUl0ZW1BZnRlcicpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCk7XHJcbiAgICAgICAgICAgIHZhciB0b3A7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b3AgPSAoLTUwICogaW5kZXgpICsgNDk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0b3AgPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX3N1Yk1lbnUnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAndG9wJzogdG9wXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCgnLmhlYWRlcl9fbWVudUl0ZW0nKS5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5oZWFkZXJfX21lbnVJdGVtQWZ0ZXInKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLmhlYWRlcl9fc3ViTWVudScpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjYXRhbG9nRmlsdGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnLmZpbHRlcnNCdG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuY2F0YWxvZ19fb3B0aW9ucycpLnRvZ2dsZUNsYXNzKCdjYXRhbG9nX19vcHRpb25zLS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGZvb3Rlck1lbnUgPSBmdW5jdGlvbigpIHtcclxuICAgICQoJy5mb290ZXJfX21lbnVUaXRsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpID0gJCgnLmZvb3Rlcl9fbWVudS0tYWN0aXZlJykuaW5kZXgoKTtcclxuICAgICAgICB2YXIgaiA9ICQodGhpcykuY2xvc2VzdCgnLmZvb3Rlcl9fbWVudScpLmluZGV4KCk7XHJcbiAgICAgICAgaWYgKGogPT09IGkpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9vdGVyX19tZW51JykudG9nZ2xlQ2xhc3MoJ2Zvb3Rlcl9fbWVudS0tYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLmZvb3Rlcl9fbWVudS0tYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2Zvb3Rlcl9fbWVudS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvb3Rlcl9fbWVudScpLnRvZ2dsZUNsYXNzKCdmb290ZXJfX21lbnUtLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
