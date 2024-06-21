function getName() {
    const userid = localStorage.getItem("userid");
    const usernick = document.getElementsByClassName('writer-nick');

    axios
        .post("http://54.180.238.52:3000/user/getName", {
            userid: userid
        })
        .then((response) => {
            const name = response.data.name;

            for (let i in usernick) {
                usernick[i].innerHTML = name;
            }
        })
        .catch((e) => {
            console.log(e);
        }).finally(() => {
            hideLoadingBar();
        });
}

const writeDiv = document.getElementsByClassName('write-container')[0];
const diaryId = localStorage.getItem("diaryId");

function getDiary() {
    const diaryId = localStorage.getItem("diaryId");
    const usernick = document.getElementsByClassName('writer-nick');

    axios
        .post("http://54.180.238.52:3000/user/getDiary", {
            diaryId: diaryId
        })
        .then((response) => {
            const { recommendedDiaries, name, createDate } = response.data;

            for (let i in usernick) {
                usernick[i].innerHTML = name;
            }

            // console.log("Recommended Diaries:", recommendedDiaries);
            for (let x of recommendedDiaries) {
                for (let con of x) {
                    // console.log(con)
                    switch (con.contentType) {
                        case "title": addTitle(con.content); break;
                        case "subtitle": addSubTitle(con.content); break;
                        case "content": addContent(con.content); break;
                        case "image": addImage(con.imageSrc); break;
                        case "cardNews": addCardNews(con.cardNews); break;
                    }
                }
            }
            writeDiv.style.textAlign = recommendedDiaries[0][0].align;
            
            document.getElementsByClassName('date-container')[0].innerHTML = createDate.split(' ')[0];
            console.log("User Name:", name);
            console.log("Create Date:", createDate); // createDate 콘솔 출력 추가
        })
        .catch((e) => {
            console.log(e);
        });

    const addTitle = (titleTxt) => {
        document.getElementsByClassName('title')[0].innerHTML = titleTxt;
    }
    const addSubTitle = (subTitleTxt) => {
        let subTitleDiv = document.createElement('div');
        subTitleDiv.classList += 'sub-title-txt';
        subTitleDiv.innerHTML = subTitleTxt;
        writeDiv.appendChild(subTitleDiv);
    }
    const addContent = (contentTxt) => {
        let contentDiv = document.createElement('div');
        contentDiv.classList += 'content-txt';
        contentDiv.innerHTML = contentTxt;
        writeDiv.appendChild(contentDiv);
    }
    const addImage = (imageSrc) => {
        let imageDiv = document.createElement('img');
        imageDiv.classList += 'content-img';
        imageDiv.src = `http://54.180.238.52:3000${imageSrc}`;
        writeDiv.appendChild(imageDiv);
    }
    const addCardNews = (cardNews) => {
        console.log(cardNews)
        let cardDiv = document.createElement('div');
        cardDiv.classList += 'card-container';

        let starArr = []
        for (let i = 1; i <= 5; i++ ) {
            if (i <= cardNews.star) {
                starArr.push('fill')
            } else {
                starArr.push('un_fill')
            }
        }

        cardDiv.innerHTML = `
                <div class="place-title-container">
                    <div class="place-title">
                        <div class="place-name">${cardNews.title}</div>
                    </div>
                    <img class="bookmark-img" src="../../Image/icon/bookmark/un_fill.svg" onclick="chkBookMarkFill(this)">
                </div>
                <div class="tempDiv">
                    <img class="tempImg" src="http://54.180.238.52:3000${cardNews.image_url}">
                </div>
                <div class="info-container">
                    <div class="line-container">
                        <div class="info-sub-container category-container">
                            <img class="info-img place-img" src="../../Image/icon/card_icon/pin_20px.svg">
                            <div class="info-txt">${cardNews.place}</div>
                        </div>
                        <div class="star-rating">
                            <img class="star" src="../../Image/icon/star/${starArr[0]}.svg">
                            <img class="star" src="../../Image/icon/star/${starArr[1]}.svg">
                            <img class="star" src="../../Image/icon/star/${starArr[2]}.svg">
                            <img class="star" src="../../Image/icon/star/${starArr[3]}.svg">
                            <img class="star" src="../../Image/icon/star/${starArr[4]}.svg">
                        </div>
                    </div>
                    <div class="info-sub-container">
                        <img class="info-img time-img" src="../../Image/icon/card_icon/time_20px.svg">
                        <span class="info-txt time">${cardNews.open_time}~${cardNews.close_time}</span>
                    </div>
                    <div class="info-sub-container">
                        <img class="info-img time-img" src="../../Image/icon/card_icon/yen_20px.svg">
                        <span class="info-txt yen">${cardNews.price}円</span>
                    </div>

                    <div class="review-container">
                        후기: ${cardNews.card_review}
                    </div>
                </div>`;
        writeDiv.appendChild(cardDiv)
    }
}
getName()
getDiary()