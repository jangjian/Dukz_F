const hiddenDiv = document.getElementsByClassName('hidden')[0];
const editBtn = document.getElementsByClassName('edit-btn')[0];
const inputTxt = document.getElementsByClassName('input-txt')[0];
const chkTxtDiv = document.getElementsByClassName('chk-txt')[0];

const editChkTxt = document.getElementsByClassName('edit-chk-txt')[0];
const editComplite = document.getElementsByClassName('edit-complite')[0];


function removeHidden(obj) {
    obj.classList.remove('hidden');
}

let userInfo;

function removeDisabled(obj) {
    obj.removeAttribute("disabled");
    obj.classList.remove('disabled');
}
function addDisabled(obj) {
    obj.setAttribute("disabled", "disabled");
    obj.classList.add('disabled');
}
function fetchAndLogUserInfo() {
    const userid = localStorage.getItem('userid');

    axios.post('http://54.180.238.52:3000/user/getUserInfo', {
        userid: userid
    })
        .then(response => {
            userInfo = response.data;
            if (document.getElementById('userIdInput')) {
                document.getElementById('userIdInput').value = userInfo.userid
            }
            console.log('사용자 정보:', userInfo);
        })
        .catch(error => {
            console.error('사용자 정보 불러오기 실패:', error);
        });
}

fetchAndLogUserInfo();