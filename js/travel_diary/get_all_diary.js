const allDiaryDiv = document.getElementsByClassName('diary-container')[0];

let diaryArr = [];

function getAllDiaries() {
    axios.post("http://54.180.238.52:3000/user/getAllDiaries", {})
        .then((response) => {
            console.log('Successfully fetched diaries:', response.data.diaries);
            const diaries = response.data.diaries;
            diaryArr = diaries;
            renderDiaries(diaryArr);
        })
        .catch((error) => {
            console.error('Error fetching diaries:', error);
        });
}

function renderDiaries(diaries) {
    allDiaryDiv.innerHTML = '';  // Clear existing diaries
    for (let i in diaries) {
        let resImageSrc = '';
        let resTitle = '';
        let resContent = '';

        for (let con of diaries[i].contents) {
            switch (con.contentType) {
                case "title": resTitle = con.content; break;
                case "image": resImageSrc = `http://54.180.238.52:3000${con.imageSrc}`; break;
                case "content": resContent = con.content; break;
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
                </div>
            </div>
        `;

        placeDiv.addEventListener('click', () => {
            getDiaryId(diaries[i].diaryId);
            location.href = '../travel_diary/travel_diary_content.html';
        });

        allDiaryDiv.append(placeDiv);

        const hashTagContainer = document.getElementsByClassName('place-tag')[i];
        
        for (let j = 0; j < diaries[i].genres.length; j++) {
            const hashtagDiv = document.createElement('span');
            hashtagDiv.innerHTML = `#${diaries[i].genres[j]}`;
            hashTagContainer.appendChild(hashtagDiv);
        }
        const regionHash = document.createElement('span');
        regionHash.innerHTML = `#${diaries[i].region}`;
        hashTagContainer.appendChild(regionHash);
    }
}

function getDiaryId(diaryId) {
    localStorage.setItem('diaryId', diaryId);
}

getAllDiaries();