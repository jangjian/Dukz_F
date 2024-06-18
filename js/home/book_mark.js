function bookmarkChk(event, obj) {
    event.stopPropagation();
    if (obj.src.includes('un_fill')) {
        obj.src = "../../Image/icon/bookmark/fill.svg";
        // 카드뉴스를 북마크에 추가
    } else {
        obj.src = "../../Image/icon/bookmark/un_fill.svg";
        // 카드뉴스를 북마크에서 해제
    }
}