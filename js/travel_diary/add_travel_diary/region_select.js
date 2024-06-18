function saveRegion() {
    const regionName = document.getElementById('region-select').value; 
    const userid = localStorage.getItem('userid'); 

    if (regionName =="") {
        alert("지역을 입력해주세요")
        return;
    }
    axios
    .post("http://54.180.238.52:3000/user/saveRegion", { 
        regionName: regionName,
        userid: userid
      })
    .then((response) => {
        console.log("Region save response:", response.data);
        if (response.data.message === "Region information saved successfully") {
            localStorage.setItem('diaryId', response.data.diaryId);
            location.href='step2_genre.html';
        }
    })
    .catch((error) => {
        console.error("Error saving region:", error);
        alert("지역 정보를 저장하는 중에 오류가 발생했습니다.");
    });
}
