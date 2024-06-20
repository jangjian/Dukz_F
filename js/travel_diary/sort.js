const modalContainer = document.getElementsByClassName('modal-container')[0];
function modalVisible() {
    if (modalContainer.style.visibility == 'visible') {
        modalContainer.style.visibility = 'hidden';
    } else {
        modalContainer.style.visibility = 'visible';
    }
}

const recentSort = () => {
    diaryArr.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    renderDiaries(diaryArr);
    modalVisible();
}

const oldSort = () => {
    diaryArr.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
    renderDiaries(diaryArr);
    modalVisible();
}
