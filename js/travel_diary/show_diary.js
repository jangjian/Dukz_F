const gridDiaryContainer = document.getElementsByClassName('grid-diary-container')[0];
const swiperWrapperDiv = document.getElementsByClassName('swiper-wrapper')[0];

function getAllDiaries() {
    axios.post("http://54.180.238.52:3000/user/getAllDiaries", {})
    .then((response) => {
        console.log('Successfully fetched diaries:', response.data.diaries);
        const diaries = response.data.diaries;
        let diariesLen = diaries.length;
        for (let i = diariesLen - 1; i >= diariesLen - 4; i--) {
            if (diaries[i] == undefined) return;
    
            let resTitle = '제목이 없어요!';
            let resContent = '본문이 없어요!';
            let resImage = '../../Image/dukduk/nothing.svg';
    
            const diaryId = diaries[i].diaryId;
    
            for (let x of diaries[i].contents) {
                console.log(x)
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
            // let resTitle = diaries[i].contents.find(diary => diary.contentType == 'title')
            // if (resTitle == undefined) resTitle = '제목이 없어요!';
            // else resTitle = resTitle.content;

            // let resContent = diaries[i].contents.find(diary => diary.contentType == 'content');
            // if (resContent == undefined) resContent = '본문이 없어요!';
            // else resContent = resContent.content;
            
            // let resImage = diaries[i].contents.find(diary => diary.contentType == 'image');
            // if (resImage == undefined) resImage = '../../Image/dukduk/nothing.svg';
            // else resImage = `http://54.180.238.52:3000${resImage.imageSrc}`;
    
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
                    </div>
                </div>`;
    
            gridItemDiv.addEventListener('click', () => {
                localStorage.setItem('diaryId', diaryId);
                location.href = '../travel_diary/travel_diary_content.html';
            });
    
            gridDiaryContainer.appendChild(gridItemDiv);
    
            const lastGridPlaceTag = document.querySelectorAll('.grid-place-tag');
            const currentGridPlaceTag = lastGridPlaceTag[lastGridPlaceTag.length - 1];
    
            for (let j = 0; j < diaries[i].genres.length; j++) {
                const hashtagDiv = document.createElement('span');
                hashtagDiv.innerHTML = `#${diaries[i].genres[j]}`;
                currentGridPlaceTag.appendChild(hashtagDiv);
            }
            const regionHash = document.createElement('span');
            regionHash.innerHTML = `#${diaries[i].region}`;
            currentGridPlaceTag.appendChild(regionHash);
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
        console.log('Successfully fetched 사용자의 일지:', response.data.사용자의_일지);
        
        const diaries = response.data.사용자의_일지;
        let userDiaryLen = response.data.사용자의_일지.length;
        for (let i = userDiaryLen - 1; i >= userDiaryLen - 2; i--) {
            if (diaries[i] == undefined) return;
            
            let resTitle = '제목이 없어요!';
            let resContent = '본문이 없어요!';
            let resImage = '../../Image/dukduk/nothing.svg';
    
            for (let x of diaries[i].contents) {
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
    
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');
            swiperSlide.classList.add('place-container');
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
                            </div>
                        </div>`;
            document.querySelector('.swiper-wrapper').appendChild(swiperSlide);
    
            const lastPlaceTag = swiperSlide.querySelector('.hashtag-container.place-tag');
        
            for (let j = 0; j < diaries[i].genres.length; j++) {
                const hashtagDiv = document.createElement('span');
                hashtagDiv.innerHTML = `#${diaries[i].genres[j]}`;
                lastPlaceTag.appendChild(hashtagDiv);
            }
            const regionHash = document.createElement('span');
            regionHash.innerHTML = `#${diaries[i].region}`;
            lastPlaceTag.appendChild(regionHash);

            new Swiper('.diary-swiper', {
                slidesPerView: 1, // Number of slides visible at the same time
                spaceBetween: 10, // Space between slides
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                centeredSlides: true, // Center the active slide
            });
        }

    })
    
        .catch((e) => {
            console.log("Error retrieving user diary:", e);
        });
}

getUserDiary();
getAllDiaries();

