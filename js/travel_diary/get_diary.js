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
        });
}

const writeDiv = document.getElementsByClassName('write-container')[0];

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
                    switch (con.contentType) {
                        case "title": addTitle(con.content); break;
                        case "subtitle": addSubTitle(con.content); break;
                        case "content": addContent(con.content); break;
                        case "image": addImage(con.imageSrc); break;
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
}

getDiary();