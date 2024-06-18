const placeInput = document.getElementsByClassName('place')[0];
const pinImage = document.getElementById('pin-image');

const yenImage = document.getElementById('yen-image');
const yenInput = document.getElementById('yen-input');
const yenTxt = document.getElementById('yen-txt');

const reviewInput = document.getElementById('review');

document.addEventListener('DOMContentLoaded', () => {

    placeInput.addEventListener('input', () => {
        if (placeInput.value.length > 0) {
            pinImage.src = "../../Image/icon/card_icon/pin_20px.svg";
        } else {
            pinImage.src = "../../Image/icon/card_icon/pin_uninput.svg";
        }
    })

    yenInput.addEventListener('input', () => {
        if (yenInput.value.length > 0) {
            yenTxt.style.display = 'block';
            yenImage.src = "../../Image/icon/card_icon/yen_20px.svg";
        } else {
            yenImage.src = "../../Image/icon/card_icon/yen_uninput.svg";
            yenTxt.style.display = 'none';
        }
    })

});

const CardNewsmodal = document.getElementById("card-news-modal");
const closeModal = document.getElementsByClassName("close")[1];
const openBtn = document.getElementById("open-card-modal");
const timeTxtSpan = document.getElementById("time");

// 이미지 선택 및 표시
const addImage = document.querySelector('.card-image-container');
const imageInput = document.getElementById('image-input');

addImage.addEventListener('click', () => {
    imageInput.click();
});

let cardNewsImgSrc;
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const cardNewsImg = document.createElement('img');
            cardNewsImgSrc = e.target.result;
            cardNewsImg.src = e.target.result;
            cardNewsImg.classList.add('selected-image');
            addImage.appendChild(cardNewsImg);
        };
        reader.readAsDataURL(file);
    }
});

openBtn.onclick = () => {
    if (nowPage.querySelectorAll('.time-text').length === 0) {
        alert("시간을 먼저 입력해 주세요")
        return;
    }
    var timeTexts = nowPage.querySelectorAll('.time-text');
    var lastTimeText = timeTexts[timeTexts.length - 1].textContent;
    timeTxtSpan.innerHTML = lastTimeText;

    CardNewsmodal.style.display = "block";
}

closeModal.onclick = () => {
    CardNewsmodal.style.display = "none";
}

const startController = (starNum) => {
    starNum = Number(starNum.match(/\d+/)[0]);
    for (let i = 1; i <= starNum; i++) {
        document.getElementById(`star${i}`).src = "../../Image/icon/star/fill.svg"
    }
    for (let i = 5; i > starNum; i--) {
        document.getElementById(`star${i}`).src = "../../Image/icon/star/un_fill.svg"
    }
}

const inputHash = document.querySelector('input[name=basic]');
let tagify = new Tagify(inputHash);

tagify.on('add', function () {
    const lastTag = tagify.value[tagify.value.length - 1];

    // if (lastTag && lastTag.value.length > 5) {
    //     alert("태그는 5글자 이하로 입력해주세요");
    //     tagify.removeTag(lastTag.value);
    // } 
    if (tagify.value.length > 3) {
        alert("태그는 3개까지 입력할 수 있습니다");
        tagify.removeTag(lastTag.value);
    }
});

const cardSaveBtn = document.getElementById('cardSaveBtn');
const firstStarImg = document.getElementById('star1');
cardSaveBtn.onclick = () => {
    // 유효성 검사
    if (addImage.children.length <= 2) {
        alert("이미지를 입력해주세요");
        return;
    } else if (!placeInput.value.length > 0) {
        alert("장소를 입력해주세요");
        return;
    } else if (firstStarImg.src.includes('un')) {
        alert("별점을 입력해주세요");
        return;
    } else if (!yenInput.value.length > 0) {
        alert("금액을 입력해주세요");
        return;
    } else if (!reviewInput.value.length > 0) {
        alert("후기를 입력해주세요")
        return;
    } else if (!tagify.value.length > 0) {
        alert("해시태그를 하나 이상 입력해주세요")
        return;
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-news-div');

    const placeContainer = document.createElement('div');
    placeContainer.classList.add('card-news-place-container');

    const placeText = document.createElement('div');
    placeText.classList.add('card-news-place-txt');
    placeText.textContent = placeInput.value;

    const placeIcon = document.createElement('img');
    placeIcon.classList.add('card-news-place-icon');
    placeIcon.src = '../../Image/icon/map.svg';

    placeContainer.appendChild(placeText);
    placeContainer.appendChild(placeIcon);

    const placeImg = document.createElement('img');
    placeImg.classList.add('card-news-place-img');
    placeImg.src = cardNewsImgSrc;

    cardDiv.appendChild(placeContainer);
    cardDiv.appendChild(placeImg);

    nowPage.appendChild(cardDiv);

    CardNewsmodal.style.display = 'none';
}

cardSaveBtn.onclick = () => {
    // 필드에서 사용자 입력 가져오기
    const place = document.querySelector('.place').value.trim();
    const openTime = document.getElementById('time').textContent.trim();
    const price = document.getElementById('yen-input').value.trim();
    const review = document.getElementById('review').value.trim();
    const tags = tagify.value.map(tag => tag.value.trim()).join(','); // 태그는 콤마로 구분하여 문자열로 변환

    // 이미지 파일 가져오기
    const imageInput = document.getElementById('image-input');
    const imageFile = imageInput.files[0];

    // 필수 입력 체크
    if (!place || !openTime || !price || !review || !tags || !imageFile) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('place', place);
    formData.append('open_time', openTime);
    formData.append('price', price);
    formData.append('review', review);
    formData.append('tags', tags);
    formData.append('image', imageFile);

    // 서버로 데이터 전송
    fetch('/saveCardNews', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('카드 뉴스 저장 성공:', data);
        // alert('카드 뉴스가 성공적으로 저장되었습니다.');
        // 필요한 추가 작업 수행 (예: 화면 갱신 등)
    })
    .catch(error => {
        console.error('카드 뉴스 저장 오류:', error);
        alert('카드 뉴스 저장 중 오류가 발생했습니다.');
    });
};
