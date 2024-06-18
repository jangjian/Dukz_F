let profileImg = document.getElementById('profile-img');
let nextBtn = document.getElementsByClassName('next-btn')[0];

function useDefault() {
    profileImg.src = "../../../Image/profile/profile_img_default.svg";
}

function modalVisible() {
    document.getElementsByClassName('modal-container')[0].style.visibility = 'visible';
}

function chkToNext() {
    nextBtn.removeAttribute("disabled");
    nextBtn.classList.remove('disabled');
}

function displayUploadedImage(imageUrl) {
    profileImg.src = `http://54.180.238.52:3000${imageUrl}`;
}

function uploadImage() {
    const formData = new FormData();
    const email = localStorage.getItem('email');
    const fileInput = document.getElementById('gallery-picker');
    const file = fileInput.files[0];
    
    formData.append('email', email);
    formData.append('images', file);

    axios.post('http://54.180.238.52:3000/user/signup5', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then(response => {
        console.log('Image upload response:', response.data);
        const resultElement = document.getElementById('result');

        if (response.data.success) {
            const imageUrl = response.data.image_url;
            console.log('Image URL:', imageUrl);
            resultElement.innerHTML = 'Image uploaded successfully. Image URL: ' + imageUrl;
            location.href = './input_birth.html';
        } else {
            console.error('Image upload failed:', response.data.message);
            resultElement.innerHTML = 'Image upload failed: ' + response.data.message;
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        document.getElementById('result').innerHTML = 'Error uploading image: ' + error.message;
    });
}


function showSelectedImage() {
    const input = document.getElementById('gallery-picker');
    const img = document.getElementById('profile-img');

    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

var img = document.querySelector("#profile-img"),
observer = new MutationObserver((changes) => {
  changes.forEach(change => {
      if(change.attributeName.includes('src')){
        chkToNext();
      }
  });
});
observer.observe(img, {attributes : true});