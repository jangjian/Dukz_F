function selectCheck(container) {
    var imgElement = container.querySelector('img');
    let genreName = container.querySelector('.genre-name').textContent;

    switch (genreName) {
        case "아이돌": genreName = "idol"; break;
        case "애니메이션": genreName = "anime"; break;
        case "배우": genreName = "actor"; break;
        case "보컬로이드": genreName = "vocaloid"; break;
        case "게임": genreName = "game"; break;
        case "영화": genreName = "movie"; break;
        case "음식": genreName = "food"; break;
        case "음악": genreName = "music"; break;
        case "패션": genreName = "fashion"; break;
    }


    if (imgElement.src.includes('un_selected')) {
        imgElement.src = `../../../Image/select_genre/selected/${genreName}.svg`;
    } else {
        imgElement.src = `../../../Image/select_genre/un_selected/${genreName}.svg`;
    }

}