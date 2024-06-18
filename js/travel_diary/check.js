function chkBookMark(obj) {
    if (obj.src.includes('white')) {
        obj.src = '../../Image/icon/bookmark/fill.svg';
    } else {
        obj.src = '../../Image/icon/bookmark/white.svg';
    }
}
function chkHeart(obj) {
    if (obj.src.includes('white')) {
        obj.src = '../../Image/icon/heart/fill.svg';
    } else {
        obj.src = '../../Image/icon/heart/white.svg';
    }
}

function chkBookMarkFill(obj) {
    if (obj.src.includes('un_fill')) {
        obj.src = '../../Image/icon/bookmark/fill.svg';
    } else {
        obj.src = '../../Image/icon/bookmark/un_fill.svg';
    }
}
function chkHeartFill(obj) {
    if (obj.src.includes('un_fill')) {
        obj.src = '../../Image/icon/heart/fill.svg';
    } else {
        obj.src = '../../Image/icon/heart/un_fill.svg';
    }
}