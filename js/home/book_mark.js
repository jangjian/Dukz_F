function bookmarkChk(event, obj, cardNewsId) {
    event.stopPropagation();
    if (obj.src.includes('un_fill')) {
        obj.src = "../../Image/icon/bookmark/fill.svg";
        // 카드뉴스를 북마크에 추가
    } else {
        obj.src = "../../Image/icon/bookmark/un_fill.svg";
        // 카드뉴스를 북마크에서 해제
    }


    // 모든 bookmark-img-tag 클래스를 가진 요소들을 가져옵니다.
    // const elements = document.querySelectorAll('.bookmark-img-tag');

    // // 요소들이 존재하는지 확인한 후 마지막 요소를 가져옵니다.
    // if (elements.length > 0) {
    //     const lastElement = elements[elements.length - 1];
    //     console.log(lastElement); // 마지막 요소를 출력하거나 원하는 작업을 수행합니다.
    // }


    // console.log(obj)

    const userid = localStorage.getItem('userid');

    console.log(userid, cardNewsId);

    axios.post('http://54.180.238.52:3000/user/bookmarkCardNews', {
        userid : userid,
        cardNewsId: cardNewsId,
    })
    .then((response) => {
        // if (response.data.success) {
        //     if (isBookmarked) {
        //         console.log('북마크 해제됨');
        //     } else {
        //         element.classList.add('bookmarked');
        //         console.log('북마크 추가됨');
        //     }
        // } else {
        //     console.error('북마크 업데이트에 실패했습니다.');
        // }
    })
    .catch((error) => {
        console.error('북마크 업데이트 요청 중 오류 발생:', error);
    });
}