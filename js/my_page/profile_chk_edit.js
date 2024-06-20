function useDefaultEdit() {
    profileImg.src = "../../Image/profile/profile_img_default.svg";
}

const nameInput = document.getElementsByClassName('input-name')[0];
const imgContainer = document.getElementById('profile-img');
let defaultName;
let defaultImg;

function chkToEdit() {
    let nowName = nameInput.value;
    let nowImage = imgContainer.src;

    if (defaultName !== nowName || defaultImg !== nowImage) {
        nextBtn.removeAttribute("disabled");
        nextBtn.classList.remove('disabled');
    } else {
        nextBtn.setAttribute("disabled", "disabled");
        nextBtn.classList.add('disabled');
    }
}

var img = document.querySelector("#profile-img"),
observer = new MutationObserver((changes) => {
  changes.forEach(change => {
      if(change.attributeName.includes('src')){
        chkToEdit();
      }
  });
});
observer.observe(img, {attributes : true});

function fetchAndLogUserInfo() {
    const userid = localStorage.getItem('userid'); 
    
    axios.post('http://54.180.238.52:3000/user/getUserInfo', {
      userid : userid
    })
    .then(response => {
        const userInfo = response.data;
        console.log('사용자 정보:', userInfo);
        defaultName = userInfo.name;
        nameInput.value = defaultName;

        const imageUrl = response.data.imageUrl;
        console.log(imageUrl);
        if (!imageUrl || imageUrl.trim() === "" || imageUrl === "/default-profile-image.jpg") {
          useDefaultEdit();
        } else {
            imgContainer.src = `http://54.180.238.52:3000${imageUrl}`;
        }
    })
    .catch(error => {
        console.error('사용자 정보 불러오기 실패:', error);
    });
  }
  
  fetchAndLogUserInfo();

function uploadMyPageImage() {
    const formData = new FormData();
    const fileInput = document.getElementById('gallery-picker');
    const file = fileInput.files[0];
    const userid = localStorage.getItem('userid');
    
    formData.append('userid', userid); 
    formData.append('images', file); 

    axios.post('http://54.180.238.52:3000/user/changeUserImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(response => {
        console.log('Image upload response:', response.data);

        if (response.data.success) {
            const imageUrls = response.data.image_urls;
            console.log('Image URLs:', imageUrls);
            window.history.back();
        } else {
            console.error('Image upload failed:', response.data.message);
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
}
