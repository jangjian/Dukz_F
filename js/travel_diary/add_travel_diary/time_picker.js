const modal = document.getElementById("time-modal");
const span = document.getElementsByClassName("close")[1];
const saveBtn = document.getElementById("saveBtn");

timeTxtSpan.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const startHoursSelect = document.getElementsByClassName('hours')[0];
const startMinutesSelect = document.getElementsByClassName('minutes')[0];
const startAmPmSelect = document.getElementsByClassName('ampm')[0];

const endHoursSelect = document.getElementsByClassName('hours')[1];
const endMinutesSelect = document.getElementsByClassName('minutes')[1];
const endAmPmSelect = document.getElementsByClassName('ampm')[1];

for (let i = 1; i <= 12; i++) {
    let startOption = document.createElement('option');
    startOption.value = i;
    startOption.text = i;

    let endOption = document.createElement('option');
    endOption.value = i;
    endOption.text = i;

    startHoursSelect.appendChild(startOption);
    endHoursSelect.appendChild(endOption);
}
for (let i = 0; i < 60; i += 10) {
    let startOption = document.createElement('option');
    startOption.value = i < 10 ? '0' + i : i;
    startOption.text = i < 10 ? '0' + i : i;

    let endOption = document.createElement('option');
    endOption.value = i < 10 ? '0' + i : i;
    endOption.text = i < 10 ? '0' + i : i;

    startMinutesSelect.appendChild(startOption);
    endMinutesSelect.appendChild(endOption);
}

let HourStart;
let HourEnd;
let MinuteStart;
let MinuteEnd;
let AmpmStart;
let AmpmEnd;

saveBtn.onclick = () => {
    HourStart = parseInt(startHoursSelect.value);
    HourEnd = parseInt(endHoursSelect.value);
    MinuteStart = startMinutesSelect.value;
    MinuteEnd = endMinutesSelect.value;
    AmpmStart = startAmPmSelect.value;
    AmpmEnd = endAmPmSelect.value;

    if (AmpmStart == 'PM') HourStart += 12;
    if (AmpmEnd == 'PM') HourEnd += 12;
    if (HourStart.toString().length == 1) HourStart = `0${HourStart}`;
    if (HourEnd.toString().length == 1) HourEnd = `0${HourEnd}`;

    let startTotalMinutes = parseInt(HourStart) * 60 + parseInt(MinuteStart);
    let endTotalMinutes = parseInt(HourEnd) * 60 + parseInt(MinuteEnd);

    if (startTotalMinutes >= endTotalMinutes) {
        alert("시작 시간이 종료 시간보다 크거나 같을 수 없습니다.");
        return 0;
    }

    startHoursSelect.value = '1';
    startMinutesSelect.value = '00';
    endHoursSelect.value = '1';
    endMinutesSelect.value = '00';
    startAmPmSelect.value = 'AM';
    endAmPmSelect.value = 'AM';

    timeTxtSpan.innerHTML = `${HourStart}:${MinuteStart}~${HourEnd}:${MinuteEnd}`

    modal.style.display = 'none';

    timeImage.src = "../../../Image/icon/card_icon/time_20px.svg";
    timeTxtSpan.style.color = "black";

}