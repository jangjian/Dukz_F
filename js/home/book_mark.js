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
    axios.post('http://54.180.238.52:3000/user/addBookmark', {
        userid : userid,
        cardNewsId: cardNewsId,
    })
    .then((response) => {
        console.log("북마크 저장 성공");
    })
    .catch((error) => {
        if (error.response && error.response.status === 400) {
            alert('이미 저장한 카드뉴스입니다.');
        } else {
            console.error('북마크 업데이트 요청 중 오류 발생:', error);
        }
    });
}

function getBookmark() {
    const userid = localStorage.getItem('userid');

    axios.post('http://54.180.238.52:3000/user/getUserBookmarks', {
        userid: userid
    })
    .then(response => {
        const bookmarks = response.data.bookmarks;
        console.log(bookmarks);

        // cardNewsId 확인용 출력
        bookmarks.forEach(bookmark => {
            console.log('bookmark Card News ID:', bookmark.cardNewsId);
        });
    })
    .catch(error => {
        if (error.response && error.response.status === 400) {
            console.error('이미 저장한 카드뉴스입니다.');
        } else {
            console.error('사용자 정보 불러오기 실패:', error);
        }
    });
}

getBookmark();

