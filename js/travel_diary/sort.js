const modalContainer = document.getElementsByClassName('modal-container')[0];
function modalVisible() {
    if (modalContainer.style.visibility == 'visible') {
        modalContainer.style.visibility = 'hidden';
    } else {
        modalContainer.style.visibility = 'visible';
    }
}

const allDiaryDiv = document.getElementsByClassName('diary-container')[0];

function getAllDiaries() {
    axios.post("http://54.180.238.52:3000/user/getAllDiaries", {})
        .then((response) => {
            console.log('Successfully fetched diaries:', response.data.diaries);
            for (let x of response.data.diaries) {
                let resImageSrc = '';
                let resTitle = '';
                let resContent = '';

                for (let con of x.content) {
                    console.log(con)
                    
                    switch (con.contentType) {
                        case "title": resTitle = con.content; break;
                        case "image": if (resImageSrc == '') resImageSrc = `http://54.180.238.52:3000${con.imageSrc}`; break;
                        case "content": if (resContent == '') resContent = con.content; break;
                    }
                }

                if (resTitle == '') resTitle = '제목이 없는 글이에요!';
                if (resImageSrc == '') resImageSrc = "../../Image/dukduk/nothing.svg";
                if (resContent == '') resContent = '내용이 없는 글이에요!';

                let placeDiv = document.createElement('div');
                placeDiv.classList.add('place-container');
                placeDiv.innerHTML = `
                    <img class="place-img" src="${resImageSrc}">
                    <div class="place-txt-container">
                        <div class="line-container">
                            <div class="place-title">${resTitle}</div>
                            <img class="map-icon" src="../../Image/icon/map.svg">
                        </div>
                        <div class="place-info">${resContent}</div>
                        <div class="hashtag-container place-tag">
                            <span>#트레저_월드맵</span>
                            <span>#트월맵</span>
                            <span>#오사카</span>
                        </div>
                    </div>
                `;

                // Add click event to save diaryId and navigate to detail page
                placeDiv.addEventListener('click', () => {
                    getDiaryId(x.diaryId);
                    location.href = '../travel_diary/travel_diary_content.html';
                });

                allDiaryDiv.append(placeDiv);
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