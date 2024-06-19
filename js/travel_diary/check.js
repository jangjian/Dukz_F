function chkBookMark(event, obj) {
    event.stopPropagation()
    if (obj.src.includes('white')) {
        obj.src = '../../Image/icon/bookmark/fill.svg';
    } else {
        obj.src = '../../Image/icon/bookmark/white.svg';
    }
}
function chkHeart(event, obj) {
    event.stopPropagation()
    if (obj.src.includes('white')) {
        obj.src = '../../Image/icon/heart/fill.svg';
    } else {
        obj.src = '../../Image/icon/heart/white.svg';
    }
}

function chkBookMarkFill(event, obj) {
    event.stopPropagation()
    if (obj.src.includes('un_fill')) {
        obj.src = '../../Image/icon/bookmark/fill.svg';
    } else {
        obj.src = '../../Image/icon/bookmark/un_fill.svg';
    }
}
function chkHeartFill(event, obj) {
    event.stopPropagation()
    if (obj.src.includes('un_fill')) {
        obj.src = '../../Image/icon/heart/fill.svg';
    } else {
        obj.src = '../../Image/icon/heart/un_fill.svg';
    }
}