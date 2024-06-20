function bookmarkChk(event, obj) {
    event.stopPropagation();
    if (obj.src.includes('un_fill')) {
        obj.src = "../../Image/icon/bookmark/fill.svg";
        // 카드뉴스를 북마크에 추가
    } else {
        obj.src = "../../Image/icon/bookmark/un_fill.svg";
        // 카드뉴스를 북마크에서 해제
    }

    const userid = localStorage.getItem('userid');
    const cardNewsId = obj.getAttribute(''); 

    console.log(userid, cardNewsId);

    axios.post('http://54.180.238.52:3000/user/bookmarkCardNews', {
        userid : userid,
        cardNewsId: cardNewsId,
    })
    .then((response) => {
        if (response.data.success) {
            if (isBookmarked) {
                console.log('북마크 해제됨');
            } else {
                element.classList.add('bookmarked');
                console.log('북마크 추가됨');
            }
        } else {
            console.error('북마크 업데이트에 실패했습니다.');
        }
    })
    .catch((error) => {
        console.error('북마크 업데이트 요청 중 오류 발생:', error);
    });
}