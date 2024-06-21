function bookmarkChk(event, obj, cardNewsId) {
    event.stopPropagation();
    
    const userid = localStorage.getItem('userid');

    if (obj.src.includes('un_fill')) {
        obj.src = "../../Image/icon/bookmark/fill.svg";
        // 카드뉴스를 북마크에 추가
        axios.post('http://54.180.238.52:3000/user/addBookmark', {
            userid: userid,
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
    } else {
        obj.src = "../../Image/icon/bookmark/un_fill.svg";
        // 카드뉴스를 북마크에서 해제
    }
}

let cardNewsIds = [];

const getCardNewsId = async () => {
    try {
        const response = await axios.get("http://54.180.238.52:3000/user/getCardNews");
        for (let i = 0; i < 3; i++) {
            cardNewsIds.push(response.data[i].cardNews.cardNewsId);
        }
    } catch (error) {
        console.error('카드 뉴스 ID 가져오기 실패:', error);
    }
};

async function getBookmark() {
    const userid = localStorage.getItem('userid');

    await getCardNewsId();

    axios.post('http://54.180.238.52:3000/user/getUserBookmarks', {
        userid: userid
    })
    .then(response => {
        const bookmarks = response.data.bookmarks;
        console.log(bookmarks);

        // cardNewsId 확인용 출력
        bookmarks.forEach(bookmark => {
            console.log('bookmark Card News ID:', bookmark.cardNewsId);
            // if () {
            //     obj.src = "../../Image/icon/bookmark/fill.svg"
            // }
        });

        console.log(cardNewsIds);

        for (let mark of bookmarks) {
            for (let cardId in cardNewsIds) {
                if (mark.cardNewsId == cardNewsIds[cardId]) {
                    document.getElementById(`${parseInt(cardId)+1}-bookmark`).src = "../../Image/icon/bookmark/fill.svg";
                }
            }
        }
    })
    .catch(error => {
        console.error('사용자 정보 불러오기 실패:', error);
    });
}

const asynchronousPromise = async () => {
    await Promise.all([getName(), getCardNews(), getDiary(), getBookmark()])
    .then(() => {
        setTimeout(() => {
            hideLoadingBar();
        }, 300);
    });
};
asynchronousPromise().then(() => { });
