function getName() {
    const userid = localStorage.getItem("userid");
    const usernick = document.getElementsByClassName('user-nick');
  
    axios
      .post("http://54.180.238.52:3000/user/getName", {
        userid
      })
      .then((response) => {
        const name = response.data.name;
  
        for (let i in usernick) {
          usernick[i].innerHTML = name;
        }
  
        console.log("User name retrieved:", name);
      })
      .catch((e) => {
        console.log("Error retrieving user name:", e);
      });
  }
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateObject = new Date(dateString);
  
    const formattedDate = dateObject.toLocaleDateString('ko-KR', options)
      .split('.').join('.');
  
    return formattedDate;
  }
  
  let firstCardNews;
  let secondCardNews;
  let thirdCardNews;
  
  function getCardNews() {
    
  
    let profileImage1 = document.getElementById("profileImage1");
    let nickname1 = document.getElementById("nickname1");
    let cardNewsTitle1 = document.getElementById("cardNewsTitle1");
    let cardNewsDate1 = document.getElementById("cardNewsDate1");
    let cardNewsImage1 = document.getElementById("cardNewsImage1");
    let cardNewsLocation1 = document.getElementById("cardNewsLocation1");
    let cardNewsTime1 = document.getElementById("cardNewsTime1");
    let cardNewsPrice1 = document.getElementById("cardNewsPrice1");
  
    let profileImage2 = document.getElementById("profileImage2");
    let nickname2 = document.getElementById("nickname2");
    let cardNewsTitle2 = document.getElementById("cardNewsTitle2");
    let cardNewsDate2 = document.getElementById("cardNewsDate2");
    let cardNewsImage2 = document.getElementById("cardNewsImage2");
    let cardNewsLocation2 = document.getElementById("cardNewsLocation2");
    let cardNewsTime2 = document.getElementById("cardNewsTime2");
    let cardNewsPrice2 = document.getElementById("cardNewsPrice2");
  
    let profileImage3 = document.getElementById("profileImage3");
    let nickname3 = document.getElementById("nickname3");
    let cardNewsTitle3 = document.getElementById("cardNewsTitle3");
    let cardNewsDate3 = document.getElementById("cardNewsDate3");
    let cardNewsImage3 = document.getElementById("cardNewsImage3");
    let cardNewsLocation3 = document.getElementById("cardNewsLocation3");
    let cardNewsTime3 = document.getElementById("cardNewsTime3");
    let cardNewsPrice3 = document.getElementById("cardNewsPrice3");
  
    axios
      .get("http://54.180.238.52:3000/user/getCardNews")
      .then((response) => {
        firstCardNews = response.data[0];
        secondCardNews = response.data[1];
        thirdCardNews = response.data[2];
  
        // console.log("First Card News:", firstCardNews);
        // console.log("Second Card News:", secondCardNews);
        // console.log("Third Card News:", thirdCardNews);
  
        const hashtagContainer = document.querySelector(".hashtag-container");
        hashtagContainer.innerHTML = "";
        firstCardNews.hashtags.forEach((tag) => {
          const spanTag = document.createElement("span");
          spanTag.textContent = `#${tag}`;
          hashtagContainer.appendChild(spanTag);
        });
  
        const hashtagContainer2 = document.querySelector(".hashtag-container-2");
        hashtagContainer2.innerHTML = "";
        secondCardNews.hashtags.forEach((tag) => {
          const spanTag = document.createElement("span");
          spanTag.textContent = `#${tag}`;
          hashtagContainer2.appendChild(spanTag);
        });
  
        const hashtagContainer3 = document.querySelector(".hashtag-container-3");
        hashtagContainer3.innerHTML = "";
        thirdCardNews.hashtags.forEach((tag) => {
          const spanTag = document.createElement("span");
          spanTag.textContent = `#${tag}`;
          hashtagContainer3.appendChild(spanTag);
        });
  
        profileImage1.src = `http://54.180.238.52:3000${firstCardNews.userInfo.profileImage}`;
        nickname1.textContent = firstCardNews.userInfo.nickname;
        cardNewsTitle1.textContent = firstCardNews.cardNews.title;
        cardNewsDate1.textContent = formatDate(firstCardNews.cardNews.createDate);
        cardNewsImage1.src = `http://54.180.238.52:3000${firstCardNews.cardNews.image_url}`;
        cardNewsLocation1.textContent = firstCardNews.cardNews.place;
        cardNewsTime1.textContent = `${firstCardNews.cardNews.open_time} ~ ${firstCardNews.cardNews.close_time}`;
        cardNewsPrice1.textContent = `${firstCardNews.cardNews.price}円`;
  
        profileImage2.src = `http://54.180.238.52:3000${secondCardNews.userInfo.profileImage}`;
        nickname2.textContent = secondCardNews.userInfo.nickname;
        cardNewsTitle2.textContent = secondCardNews.cardNews.title;
        cardNewsDate2.textContent = formatDate(secondCardNews.cardNews.createDate);
        cardNewsImage2.src = `http://54.180.238.52:3000${secondCardNews.cardNews.image_url}`;
        cardNewsLocation2.textContent = secondCardNews.cardNews.place;
        cardNewsTime2.textContent = `${secondCardNews.cardNews.open_time} ~ ${secondCardNews.cardNews.close_time}`;
        cardNewsPrice2.textContent = `${secondCardNews.cardNews.price}円`;
  
        profileImage3.src = `http://54.180.238.52:3000${thirdCardNews.userInfo.profileImage}`;
        nickname3.textContent = thirdCardNews.userInfo.nickname;
        cardNewsTitle3.textContent = thirdCardNews.cardNews.title;
        cardNewsDate3.textContent = formatDate(thirdCardNews.cardNews.createDate);
        cardNewsImage3.src = `http://54.180.238.52:3000${thirdCardNews.cardNews.image_url}`;
        cardNewsLocation3.textContent = thirdCardNews.cardNews.place;
        cardNewsTime3.textContent = `${thirdCardNews.cardNews.open_time} ~ ${thirdCardNews.cardNews.close_time}`;
        cardNewsPrice3.textContent = `${thirdCardNews.cardNews.price}円`;
  
      })
      .catch((error) => {
        console.error("Error retrieving card news:", error);
      });
  }
  
  function getDiary() {
    const userid = localStorage.getItem("userid");
  
    axios
      .post("http://54.180.238.52:3000/user/getRecommendedDiaries", {
        userid: userid
      })
      .then((response) => {
        const recommendedDiaries = response.data.recommendedDiaries;
  
        console.log("Recommended Diaries:", recommendedDiaries);

        const placeSecondDiv = document.getElementsByClassName('place-second')[0];
        const placeThirdDiv = document.getElementsByClassName('place-third')[0];
        // const placeMoreDiv = document.getElementsByClassName('place-more')[0];

        switch (recommendedDiaries.length) {
          case 1: 
            placeSecondDiv.style.display = 'none'; 
            placeThirdDiv.style.display = 'none'; 
            // placeMoreDiv.style.display = 'none';
          break;
          case 2: 
          placeThirdDiv.style.display = 'none'; 
          // placeMoreDiv.style.display = 'none';
          break;
        }
  
        if (Array.isArray(recommendedDiaries)) {
          recommendedDiaries.forEach((diaryGroup, index) => {
            const placeContainerClass = `.place-container.place-${["first", "second", "third"][index]}`;

            console.log(diaryGroup)
  
            const titleContent = diaryGroup.contents.find(diary => diary.contentType === 'title');
            const firstContent = diaryGroup.contents.find(diary => diary.contentType === 'content');
            const firstImage = diaryGroup.contents.find(diary => diary.contentType === 'image');
            const diaryId = diaryGroup.contents[0].diaryId; // Assuming diaryId is available in each group
  
            if (titleContent) {
              const titleElement = document.querySelector(`${placeContainerClass} .place-title`);
              if (titleElement) {
                titleElement.textContent = titleContent.content;
              }
              console.log(titleElement)
            }
  
            if (firstContent) {
              const infoElement = document.querySelector(`${placeContainerClass} .place-info`);
              if (infoElement) {
                infoElement.textContent = firstContent.content;
              }
            }
  
            if (firstImage) {
              const imgElement = document.querySelector(`${placeContainerClass} .place-img`);
              if (imgElement) {
                imgElement.src = `http://54.180.238.52:3000${firstImage.imageSrc}`;
              }
            }

            const placeTagDiv = document.getElementsByClassName('place-tag')[index];
            for (let i = 0; i < diaryGroup.genres.length; i++) {
              const hashSpan = document.createElement('span');
              hashSpan.innerHTML = `#${diaryGroup.genres[i]}`;
              placeTagDiv.appendChild(hashSpan);
            }
            const regionHashSpan = document.createElement('span');
            regionHashSpan.innerHTML = `#${diaryGroup.region}`;
            placeTagDiv.appendChild(regionHashSpan);
  
            // Update onclick handler to include diaryId
            const placeContainer = document.querySelector(placeContainerClass);
            if (placeContainer) {
              placeContainer.setAttribute('onclick', `getDiaryId('${diaryId}'); location.href='../travel_diary/travel_diary_content.html'`);
            }
          });
        } else {
          console.log("추천 일지 데이터가 올바르지 않습니다.");
        }
      })
      .catch((e) => {
        console.log("Error retrieving recommended diaries:", e);
      });
  }
  
  function getDiaryId(diaryId) {
    localStorage.setItem('diaryId', diaryId);
  }
  
  getDiary();
  getName();
  getCardNews();
  