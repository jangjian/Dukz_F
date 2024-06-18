new Swiper('.diary-swiper', {
    slidesPerView: 1, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
});

new Swiper('.card-img-swiper', {
    slidesPerView: 1, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
});

function getAllDiaries() {
    axios.post("http://54.180.238.52:3000/user/getAllDiaries", {})
        .then((response) => {
            console.log('Successfully fetched diaries:', response.data.diaries);
        })
        .catch((error) => {
            console.error('Error fetching diaries:', error);
        });
}

function getDiaryId(diaryId) {
    localStorage.setItem('diaryId', diaryId);
}

getAllDiaries();