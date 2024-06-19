const codeChkBtn = document.getElementsByClassName('code-chk-btn')[0];

function chkTxt() {
    if (chkTxtDiv.value.length > 0) {
        codeChkBtn.removeAttribute("disabled");
        codeChkBtn.classList.remove('disabled');
    } else {
        codeChkBtn.setAttribute("disabled", "disabled");
        codeChkBtn.classList.add('disabled');
    }
}
function chktoCanEdit() {
    if (hiddenDiv.classList.contains('hidden')) {
        // 비밀번호 입력 전
        removeHidden(hiddenDiv);
        addDisabled(editBtn);
    } else { // 입력 후
        removeHidden(editComplite);
    }
}
function chktoDouble() {
    // 중복된 이메일이 없으면
    editComplite.innerHTML = '중복 확인 완료. 이메일이 변경되었습니다';
    editComplite.style.color = '#5C5C5C';
    addDisabled(editBtn);
    addDisabled(inputTxt);
    // else
    // editComplite.innerHTML = '이미 사용 중인 이메일입니다';
}

function chkEmailCode() {
    // if (인증번호가 맞으면) 
    editChkTxt.style.color = '#5C5C5C';
    editChkTxt.innerHTML = '올바른 인증번호입니다';
    removeDisabled(editBtn);
    removeDisabled(inputTxt);
    addDisabled(chkTxtDiv);
    addDisabled(codeChkBtn);
    editBtn.innerHTML = '중복 확인';
    editComplite.innerHTML = '이메일 작성 후 중복 확인을 해주세요';
    editComplite.style.color = '#FF4B4B';
    editBtn.onclick = chktoDouble;
    // else 
    // editChkTxt.innerHTML = '인증번호가 맞지 않습니다';

}

function fetchAndLogUserInfo() {
    const userid = localStorage.getItem('userid'); 
    
    axios.post('http://54.180.238.52:3000/user/getUserInfo', {
      userid : userid
    })
    .then(response => {
        const userInfo = response.data;
        console.log('사용자 정보:', userInfo);
    })
    .catch(error => {
        console.error('사용자 정보 불러오기 실패:', error);
    });
  }
  
  fetchAndLogUserInfo();