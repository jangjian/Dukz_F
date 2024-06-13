const containerDiv = document.getElementsByClassName('right-container')[0];
let formData = new FormData(); // formData를 전역 변수로 정의합니다.

const textOnChange = () => {
    const subInputValue = document.querySelector('input[name="sub-input-text"]:checked').value;
    let txtDiv = document.createElement('textarea');

    switch(subInputValue) {
        case "title": 
            txtDiv.className = 'title-txt input-content'; 
            txtDiv.placeholder = '제목을 입력해주세요';
            break;
        case "sub-title": 
            txtDiv.className = 'sub-title-txt input-content'; 
            txtDiv.placeholder = '부제목을 입력해주세요';
            break;
        case "content": 
            txtDiv.className = 'content-txt input-content'; 
            txtDiv.placeholder = '본문을 입력해주세요';
            break;
    }

    containerDiv.appendChild(txtDiv);

    txtDiv.oninput = (event) => {
        const target = event.target;
        target.style.height = 0;
        target.style.height = target.scrollHeight + 'px';
    };

    alignOnChange();
};
document.querySelectorAll('.text-container > .size-group input').forEach(input => {
    input.addEventListener('click', function(event) {
        event.stopPropagation();
        textOnChange();
    });
});

const imageOnChange = (event) => {
    const reader = new FileReader();
    const image = document.createElement('img');
    reader.onload = function () {
        image.src = reader.result;
    }
    image.className = 'image-file input-content';  // input-content 클래스 추가
    containerDiv.appendChild(image);

    // formData에 이미지 추가
    formData.append('images', event.target.files[0]);

    reader.readAsDataURL(event.target.files[0]);
};


const alignOnChange = () => {
    const subInputValue = document.querySelector('input[name="sub-input-align"]:checked').value;
    const inputContainer = document.getElementsByClassName('input-content');
    switch(subInputValue) {
        case "left": 
            for (let x of inputContainer) {
                x.style.textAlign = "left"; 
            }
            break;
        case "center":
            for (let x of inputContainer) {
                x.style.textAlign = "center"; 
            }
            break;
        case "right": 
            for (let x of inputContainer) {
                x.style.textAlign = "right"; 
            }
            break;
    }
};

const saveDiary = async () => {
    const diaryId = localStorage.getItem('diaryId');
    const contents = [];

    const contentElements = document.querySelectorAll('.input-content');
    if (!contentElements || contentElements.length === 0) {
        console.error('No input content elements found.');
        return; 
    }

    contentElements.forEach(element => {
        let contentType;
        let contentText = '';

        if (element.classList.contains('title-txt')) {
            contentType = 'title';
            contentText = element.value;
        } else if (element.classList.contains('sub-title-txt')) {
            contentType = 'subtitle';
            contentText = element.value;
        } else if (element.classList.contains('content-txt')) {
            contentType = 'content';
            contentText = element.value;
        } else if (element.classList.contains('image-file')) {
            contentType = 'image';
        } else {
            contentType = 'unknown';
        }

        contents.push({
            contentType: contentType,
            contentText: contentText,
            align: element.style.textAlign || 'left'
        });
    });

    try {
        formData.append('diaryId', diaryId);
        formData.append('contents', JSON.stringify(contents));

        const response = await axios.post('http://localhost:3000/user/saveDiary', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.message) {
            const imageUrls = response.data.image_urls;
            console.log('Image URLs:', imageUrls);
            
            alert('일지가 성공적으로 저장되었습니다.');
            location.href='/trevel_diary/travel_diary.html'
        } else {
            console.error('Error saving diary:', response.data.message);
        }
    } catch (error) {
        console.error('Error saving diary:', error);
        alert('일지 저장 중 오류가 발생했습니다.');
    }
};


function displayUploadedImage(imageUrl) {
    const Img = document.createElement('img');
    Img.src = `http://localhost:3000${imageUrl}`;
    containerDiv.appendChild(Img); 
}

document.getElementById('upload').addEventListener('click', saveDiary);
