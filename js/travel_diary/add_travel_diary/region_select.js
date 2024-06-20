function saveRegion() {
    const regionName = document.getElementById('region-select').value; 

    if (regionName =="") {
        alert("지역을 입력해주세요")
        return;
    }
    localStorage.setItem('regionName', regionName);
    window.location.href='step2_genre.html';

}
