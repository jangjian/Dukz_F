function bookmarkChk(event, obj, cardNewsId) {
    event.stopPropagation();
    if (obj.src.includes('un_fill')) {
        obj.src = "../../Image/icon/bookmark/fill.svg";
        // 카드뉴스를 북마크에 추가
    } else {
        obj.src = "../../Image/icon/bookmark/un_fill.svg";
        // 카드뉴스를 북마크에서 해제
    }

    const userid = localStorage.getItem('userid');

    console.log(userid, cardNewsId);

    axios.post('http://54.180.238.52:3000/user/addBookmark', {
        userid : userid,
        cardNewsId: cardNewsId,
    })
    .then((response) => {
        console.log("북마크 저장 성공");
    })
    .catch((error) => {
        console.error('북마크 업데이트 요청 중 오류 발생:', error);
    });
}