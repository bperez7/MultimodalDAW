


var overlappingtest1 = (parseInt($('.handle1').css('right')) < parseInt($('.cursor').css('left')))



function rotateImage(degree, imageName) {
    $(imageName).animate({
        transform: degree,
        fill: 'forward'
    }, {
        step: function(now, fx) {
            $(this).css({
                '-webkit-transform': 'rotate(' + now + 'deg)',
                '-moz-transform': 'rotate(' + now + 'deg)',
                'transform': 'rotate(' + now + 'deg)',

            });
        }
    });
}


function isOverlap(idOne,idTwo){
    var objOne=$(idOne),
        objTwo=$(idTwo),
        offsetOne = objOne.offset(),
        offsetTwo = objTwo.offset(),
        topOne=offsetOne.top,
        topTwo=offsetTwo.top,
        leftOne=offsetOne.left,
        leftTwo=offsetTwo.left,
        widthOne = objOne.width(),
        widthTwo = objTwo.width(),
        heightOne = objOne.height(),
        heightTwo = objTwo.height();
    var leftTop = leftTwo > leftOne && leftTwo < leftOne+widthOne
        && topTwo > topOne && topTwo < topOne+heightOne,
        rightTop = leftTwo+widthTwo > leftOne && leftTwo+widthTwo < leftOne+widthOne
            && topTwo > topOne && topTwo < topOne+heightOne,             leftBottom = leftTwo > leftOne && leftTwo < leftOne+widthOne
        && topTwo+heightTwo > topOne && topTwo+heightTwo < topOne+heightOne,

        rightBottom = leftTwo+widthTwo > leftOne && leftTwo+widthTwo < leftOne+widthOne
            && topTwo+heightTwo > topOne && topTwo+heightTwo < topOne+heightOne;
    return leftTop || rightTop || leftBottom || rightBottom;
}

function overlapSlider1() { var overlap = !((parseInt($('.handle1').css('left')) + parseInt($('.handle1').css('width'))) < parseInt($('.cursor').css('left')) ||
    parseInt($('.handle1').css('left')) > parseInt($('.cursor').css('left')) + parseInt($('.cursor').css('width')) ||
    (parseInt($('.handle1').css('top') + parseInt($('.handle1').css('height')))) < parseInt($('.cursor').css('top')) ||
    parseInt($('.handle1').css('top')) > parseInt($('.cursor').css('top')) + parseInt($('.handle1').css('height')))
    return overlap
}


function overlap(ob1, ob2) {
    var overlapping = !((parseInt($(ob1).css('left')) + parseInt($(ob1).css('width'))) < parseInt($(ob2).css('left')) ||
        parseInt($(ob1).css('left')) > parseInt($(ob2).css('left')) + parseInt($(ob2).css('width')) ||
        (parseInt($(ob1).css('top') + parseInt($(ob1).css('height')))) < parseInt($(ob2).css('top')) ||
        parseInt($(ob1).css('top')) > parseInt($(ob2).css('top')) + parseInt($(ob2).css('height')))
    return overlapping

}