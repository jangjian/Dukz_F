const gridDiaryContainer = document.getElementsByClassName('grid-diary-container')[0];
function getAllDiaries() {
    axios.post("http://54.180.238.52:3000/user/getAllDiaries", {})
        .then((response) => {
            console.log('Successfully fetched diaries:', response.data.diaries);
            for (let i = 0; i < 4; i++ ) {
                if (response.data.diaries[i] == undefined) return;

                let resTitle = '제목이 없어요!';
                let resContent = '본문이 없어요!';
                let resImage = '../../Image/dukduk/nothing.svg';
                let resHash = '';
                
                // console.log(response.data.diaries[i].content);
                for (let x of response.data.diaries[i].content) {
                    console.log(x);
                    switch (x.contentType) {
                        case "title": resTitle = x.content; break;
                        case "content": resContent = x.content; break;
                        case "image": resImage = `http://54.180.238.52:3000${x.imageSrc}`; break;
                    }

                }

                const gridItemDiv = document.createElement('div')
                gridItemDiv.classList.add('grid-item-diary-container');
                gridItemDiv.innerHTML = `
                    <div class="absolute-container">
                        <div class="check-container">
                            <img class="heart-btn" src="../../Image/icon/heart/white.svg" onclick="chkHeart(this)">
                            <img class="bookmark-btn" src="../../Image/icon/bookmark/white.svg" onclick="chkBookMark(this)">
                        </div>
                        <img class="grid-place-img" src="${resImage}">
                    </div>
                    <div class="grid-txt-container">
                        <div class="diary-title">${resTitle}</div>
                        <div class="diary-content">${resContent}</div>
                        <div class="hashtag-container grid-place-tag">
                            <!-- 임시 -->
                            <span>#가마쿠라</span>
                            <span>#요리도코로</span>
                            <span>#추천</span>
                            <span>#카페</span>
                        </div>
                    </div>`;
                gridDiaryContainer.appendChild(gridItemDiv);
            }

        })
        .catch((error) => {
            console.error('Error fetching diaries:', error);
        });
}

function getDiaryId(diaryId) {
    localStorage.setItem('diaryId', diaryId);
}

getAllDiaries();