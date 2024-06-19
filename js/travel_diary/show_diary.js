const gridDiaryContainer = document.getElementsByClassName('grid-diary-container')[0];
const swiperWrapperDiv = document.getElementsByClassName('swiper-wrapper')[0];

function getAllDiaries() {
    axios.post("http://54.180.238.52:3000/user/getAllDiaries", {})
        .then((response) => {
            console.log('Successfully fetched diaries:', response.data.diaries);
            let diariesLen = response.data.diaries.length;
            for (let i = diariesLen -1; i >= diariesLen-4; i--) {
                if (response.data.diaries[i] == undefined) return;

                let resTitle = '제목이 없어요!';
                let resContent = '본문이 없어요!';
                let resImage = '../../Image/dukduk/nothing.svg';

                const diaryId = response.data.diaries[i].diaryId;

                for (let x of response.data.diaries[i].content) {
                    switch (x.contentType) {
                        case "title":
                            if (resTitle == '제목이 없어요!') resTitle = x.content;
                            break;
                        case "content":
                            if (resContent == '본문이 없어요!') resContent = x.content;
                            break;
                        case "image":
                            if (resImage == '../../Image/dukduk/nothing.svg') resImage = `http://54.180.238.52:3000${x.imageSrc}`;
                            break;
                    }
                }

                const gridItemDiv = document.createElement('div');
                gridItemDiv.classList.add('grid-item-diary-container');
                gridItemDiv.setAttribute('data-diary-id', diaryId);
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
                            <span>#가마쿠라</span>
                            <span>#요리도코로</span>
                            <span>#추천</span>
                            <span>#카페</span>
                        </div>
                    </div>`;

                gridItemDiv.addEventListener('click', () => {
                    localStorage.setItem('diaryId', diaryId);
                    location.href = '../travel_diary/travel_diary_content.html';
                });

                gridDiaryContainer.appendChild(gridItemDiv);
            }

        })
        .catch((error) => {
            console.error('Error fetching diaries:', error);
        });
}

function getUserDiary() {
    const userid = localStorage.getItem("userid");

    axios.post("http://54.180.238.52:3000/user/getUserDiary", { userid })
        .then((response) => {
            // console.log('User Diaries:', response.data.사용자의_일지);
            let userDiaryLen = response.data.사용자의_일지.length;
            for (let i = userDiaryLen - 1; i >= userDiaryLen - 2; i--) {
                if (response.data.사용자의_일지[i] == undefined) return;
                
                let resTitle = '제목이 없어요!';
                let resContent = '본문이 없어요!';
                let resImage = '../../Image/dukduk/nothing.svg';

                for (let x of response.data.사용자의_일지[i].contents) {
                    switch (x.contentType) {
                        case "title":
                            if (resTitle == '제목이 없어요!') resTitle = x.content;
                            break;
                        case "content":
                            if (resContent == '본문이 없어요!') resContent = x.content;
                            break;
                        case "image":
                            if (resImage == '../../Image/dukduk/nothing.svg') resImage = `http://54.180.238.52:3000${x.imageSrc}`;
                            break;
                    }
                }

                console.log(response.data.사용자의_일지[i])
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                swiperSlide.classList.add('place-container')
                swiperSlide.innerHTML = 
                            `<img class="place-img" src="${resImage}">
                            <div class="place-txt-container">
                                <div class="line-container">
                                    <div class="place-title">${resTitle}</div>
                                    <img class="map-icon" src="../../Image/icon/map.svg">
                                </div>
                                <div class="place-info">
                                    ${resContent}
                                </div>
                                <div class="hashtag-container place-tag">
                                    <span>#후쿠오카</span>
                                    <span>#트민수</span>
                                    <span>#오호리</span>
                                    <span>#아이돌</span>
                                </div>
                            </div>`;
                swiperWrapperDiv.appendChild(swiperSlide);
            }
            new Swiper('.diary-swiper', {
                slidesPerView: 1, // 한번에 보여줄 슬라이드 개수
                spaceBetween: 10, // 슬라이드 사이 여백
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                centeredSlides: true, // 1번 슬라이드가 가운데 보이기
            });
        })
        .catch((e) => {
            console.log("Error retrieving user diary:", e);
        });
}

getUserDiary();
getAllDiaries();
