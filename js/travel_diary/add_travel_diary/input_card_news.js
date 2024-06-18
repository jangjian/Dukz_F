const placeInput = document.getElementsByClassName('place')[0];
const pinImage = document.getElementById('pin-image');
const timeImage = document.getElementById('time-image');
const yenImage = document.getElementById('yen-image');
const yenInput = document.getElementById('yen-input');
const yenTxt = document.getElementById('yen-txt');
const reviewInput = document.getElementById('review');

document.addEventListener('DOMContentLoaded', () => {
    placeInput.addEventListener('input', () => {
        if (placeInput.value.length > 0) {
            pinImage.src = "../../../Image/icon/card_icon/pin_20px.svg";
        } else {
            pinImage.src = "../../../Image/icon/card_icon/pin_uninput.svg";
        }
    });

    yenInput.addEventListener('input', () => {
        if (yenInput.value.length > 0) {
            yenTxt.style.display = 'block';
            yenImage.src = "../../../Image/icon/card_icon/yen_20px.svg";
        } else {
            yenImage.src = "../../../Image/icon/card_icon/yen_uninput.svg";
            yenTxt.style.display = 'none';
        }
    });
});

const CardNewsmodal = document.getElementById("card-news-modal");
const closeModal = document.getElementsByClassName("close")[0];
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

        formData.set('images', file);
    }
});

const cardOpen = () => {
    CardNewsmodal.style.display = "block";
}

closeModal.onclick = () => {
    CardNewsmodal.style.display = "none";
}

let starNumArr = [false, false, false, false, false];

// 별점 설정 함수
let selectedStarRating = 0;
function setStarRating(rating) {
    for (let i = 1; i <= 5; i++) {
        const starImg = document.getElementById(`star${i}`);
        starImg.src = "../../../Image/icon/star/un_fill.svg";
        starNumArr[i - 1] = false;
    }
    for (let i = 1; i <= rating; i++) {
        const starImg = document.getElementById(`star${i}`);
        starImg.src = "../../../Image/icon/star/fill.svg";
        starNumArr[i - 1] = true;
    }
    selectedStarRating = rating;
}

const inputHash = document.querySelector('input[name=basic]');
let tagify = new Tagify(inputHash);

tagify.on('add', function () {
    const lastTag = tagify.value[tagify.value.length - 1];

    if (tagify.value.length > 3) {
        alert("해시태그는 3개까지만 입력할 수 있습니다.");
        tagify.removeTag(lastTag.value);
    }
});

const cardSaveBtn = document.getElementById('cardSaveBtn');
const firstStarImg = document.getElementById('star1');
let starNumSrcArr = [];

cardSaveBtn.onclick = () => {
    // 유효성 검사
    if (addImage.children.length <= 2) {
        alert("이미지를 입력해주세요");
        return;
    } else if (!placeInput.value.length > 0) {
        alert("장소를 입력해주세요");
        return;
    } else if (timeTxtSpan.textContent == "시간을 입력해주세요") {
        alert("시간을 입력해주세요");
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

    for (let i of starNumArr) {
        if (i) {
            starNumSrcArr.push("../../../Image/icon/star/fill.svg")
        } else {
            starNumSrcArr.push("../../../Image/icon/star/un_fill.svg")
        }
    }

    CardNewsmodal.style.display = 'none';
}

const addCardNews = (cardNewsId) => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    cardContainer.setAttribute('data-card-news-id', cardNewsId);

    cardContainer.innerHTML = `
        <div class="place-title-container">
            <div class="place-title">
                <div class="place-name">${placeInput.value}</div>
            </div>
        </div>
        <div class="tempDiv">
            <img class="tempImg" src=${cardNewsImgSrc}>
        </div>
        <div class="info-container">
            <div class="line-container">
                <div class="info-sub-container category-container">
                    <img class="info-img place-img" src="../../../Image/icon/card_icon/pin_20px.svg">
                    <a href="#" class="info-txt">${placeInput.value}</a>
                </div>
                <div class="star-rating">
                    <img class="star" src=${starNumSrcArr[0]}>
                    <img class="star" src=${starNumSrcArr[1]}>
                    <img class="star" src=${starNumSrcArr[2]}>
                    <img class="star" src=${starNumSrcArr[3]}>
                    <img class="star" src=${starNumSrcArr[4]}>
                </div>
            </div>
            <div class="info-sub-container">
                <img class="info-img time-img" src="../../../Image/icon/card_icon/time_20px.svg">
                <span class="info-txt time">${timeTxtSpan.textContent}</span>
            </div>
            <div class="info-sub-container">
                <img class="info-img time-img" src="../../../Image/icon/card_icon/yen_20px.svg">
                <span class="info-txt yen">${yenInput.value}円</span>
            </div>
            <div class="review-container">
                ${reviewInput.value}
            </div>
        </div>
    `;

    containerDiv.appendChild(cardContainer);
}

// 시간 변환 함수 수정
function convertTimeToString(hours, minutes) {
    return `${hours}:${minutes}`;
}

// 카드 뉴스 저장 버튼 클릭 시 서버로 데이터 전송
function saveCardNews() {
    const place = document.getElementById("place").value;
    const price = document.getElementById("yen-input").value;
    const review = document.getElementById("review").value;
    const userid = localStorage.getItem("userid");
    const hashtags = tagify.value.map(tag => tag.value);

    let open_time = convertTimeToString(HourStart, MinuteStart);
    let close_time = convertTimeToString(HourEnd, MinuteEnd);

    formData.append('place', place);
    formData.append('open_time', open_time);
    formData.append('close_time', close_time);
    formData.append('price', price);
    formData.append('card_review', review);
    formData.append('userid', userid);
    formData.append('star', selectedStarRating);
    formData.append('hashtags', JSON.stringify(hashtags));

    axios.post("http://54.180.238.52:3000/user/saveCardNews", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
            console.log("Card news saved:", response.data);
            const cardNewsId = response.data.cardNewsId;

            // `localStorage`에 저장된 `cardNewsIds` 배열을 업데이트
            let cardNewsIds = JSON.parse(localStorage.getItem('cardNewsIds')) || [];
            cardNewsIds.push(cardNewsId);
            localStorage.setItem('cardNewsIds', JSON.stringify(cardNewsIds));

            addCardNews(cardNewsId);
            resetModalContent();
        })
        .catch((error) => {
            console.error("Error saving card news:", error);
            alert("카드 뉴스 저장 중 에러가 발생했습니다.");
        });
}

document.getElementById('cardSaveBtn').addEventListener('click', saveCardNews);

function resetModalContent() {
    placeInput.value = '';
    pinImage.src = "../../../Image/icon/card_icon/pin_uninput.svg";

    const selectedImages = document.querySelectorAll('.selected-image');
    selectedImages.forEach(image => image.remove());
    cardNewsImgSrc = null;

    timeTxtSpan.textContent = "시간을 입력해주세요";
    timeTxtSpan.style.color = 'var(--bs-black-34)';
    timeImage.src = "../../../Image/icon/card_icon/time_uninput.svg";

    yenInput.value = '';
    yenInput.style.width = '120px';
    yenTxt.style.display = 'none';
    yenImage.src = "../../../Image/icon/card_icon/yen_uninput.svg";

    reviewInput.value = '';

    for (let i = 1; i <= 5; i++) {
        document.getElementById(`star${i}`).src = "../../../Image/icon/star/un_fill.svg";
    }
    starNumArr = [false, false, false, false, false];

    tagify.removeAllTags();
}
