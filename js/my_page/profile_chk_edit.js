function useDefaultEdit() {
    profileImg.src = "../../Image/profile/profile_img_default.svg";
}

const defaultName = document.getElementsByClassName('input-name')[0].value;
const defaultImg = document.getElementById('profile-img').src;

function chkToEdit() {
    let nowName = document.getElementsByClassName('input-name')[0].value;
    let nowImg = document.getElementById('profile-img').src;

    if (defaultName !== nowName || defaultImg !== nowImg) {
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