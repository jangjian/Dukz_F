const placeInput = document.getElementsByClassName('place')[0];
const pinImage = document.getElementById('pin-image');

const yenImage = document.getElementById('yen-image');
const yenInput = document.getElementById('yen-input');
const yenTxt = document.getElementById('yen-txt');

const reviewInput = document.getElementById('review');

const CardNewsmodal = document.getElementById('card-news-modal');
const closeModal = document.getElementById('card-close');

const openCardModal = (num) => {
    let nowCardNews;
    switch (num) {
        case "1": nowCardNews = firstCardNews; break;
        case "2": nowCardNews = secondCardNews; break;
        case "3": nowCardNews = thirdCardNews; break;
    }

    document.getElementById('card-image').src = `http://54.180.238.52:3000${nowCardNews.cardNews.image_url}`;
    document.getElementsByClassName('modal-info-txt')[0].innerHTML = nowCardNews.cardNews.place;
    document.getElementById('modal-time').innerHTML = `${nowCardNews.cardNews.open_time} ~ ${nowCardNews.cardNews.close_time}`;
    document.getElementById('modal-yen').innerHTML = `${nowCardNews.cardNews.price}円`;
    document.getElementById('review-span').innerHTML = nowCardNews.cardNews.card_review;

    for (let i = 1; i <= nowCardNews.cardNews.star; i++ ) {
        document.getElementById(`star${i}`).src = "../../../Image/icon/star/fill.svg"
    }
 
    let hashtagContainer = document.querySelector(".modal-hashtag-container");
    hashtagContainer.innerHTML = "";
    nowCardNews.hashtags.forEach((tag) => {
        const spanTag = document.createElement("span");
        spanTag.textContent = `#${tag}`;
        hashtagContainer.appendChild(spanTag);
    });

    
    CardNewsmodal.style.display = "block";
}

closeModal.onclick = () => {
    CardNewsmodal.style.display = "none";
    for (let i = 1; i <= 5; i++ ) {
        document.getElementById(`star${i}`).src = "../../../Image/icon/star/un_fill.svg"
    }
}