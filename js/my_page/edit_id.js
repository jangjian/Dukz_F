function chkTxt() {
  const userid = localStorage.getItem("userid");
  const pw = document.getElementById('pw').value;

  // 서버에 비밀번호 확인 요청 보내기
  axios.post("http://54.180.238.52:3000/user/passwordTest", { userid, pw })
    .then(response => {
      // 비밀번호가 일치하는 경우
      editChkTxt.style.color = '#5C5C5C';
      editChkTxt.innerHTML = '올바른 비밀번호입니다';
      removeDisabled(editBtn);
      removeDisabled(inputTxt);
      addDisabled(chkTxtDiv);
    })
    .catch(error => {
      // 비밀번호가 일치하지 않는 경우
      editChkTxt.style.color = '#FF4B4B';
      editChkTxt.innerHTML = '정확한 비밀번호를 입력해야 아이디를 수정할 수 있습니다';
    });
}
function chktoCanEdit() {
  const userid = localStorage.getItem("userid");
  const id = document.getElementById('id');

  if (hiddenDiv.classList.contains('hidden')) {
    // 비밀번호 입력 전
    removeHidden(hiddenDiv);
    addDisabled(editBtn);
  } else { // 입력 후
    axios
      .post("http://54.180.238.52:3000/user/checkDuplicate", { id })
      .then((response) => {
        if (response.data.isDuplicate) {
          editChkTxt.innerHTML = "이미 사용하고 있는 아이디입니다";
          editChkTxt.style.color = "#FF4B4B";
        } else {
          editChkTxt.innerHTML = "사용 가능한 아이디입니다";
          editChkTxt.style.color = "#5C5C5C";

          axios.post("http://54.180.238.52:3000/user/changeUserId", { userid, id })
            .then(response => {
              editComplite.innerHTML = '아이디가 성공적으로 수정되었습니다';
              editComplite.style.color = '#5C5C5C';
              removeHidden(editComplite);

            })
        }
      })
      .catch((e) => {
        console.error("Error during duplicate check:", e);
        alert("에러가 발생했습니다.");
      });
  }
}
