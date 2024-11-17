const recordedDates = ['2024-01-01', '2025-05-15', '2026-10-10']; // 이미 기록된 날짜 예시
const records = {
    '2024-01-01': '',
    '2025-05-15': '',
    '2026-10-10': ''
};

function showYears() {
    const datePicker = document.getElementById('datePicker');
    const yearRecords = document.getElementById('yearRecords');

    if (datePicker.value) {
        yearRecords.style.display = 'block';
        checkRecordedDates(datePicker.value);
    } else {
        yearRecords.style.display = 'none';
    }
}

function checkRecordedDates(selectedDate) {
    const year = new Date(selectedDate).getFullYear();
    const icon = document.getElementById(`icon${year}`);

    if (recordedDates.includes(selectedDate)) {
        icon.style.display = 'inline'; // 아이콘 표시
        document.getElementById(`record${year}`).value = records[selectedDate]; // 기록 불러오기
    } else {
        icon.style.display = 'none'; // 아이콘 숨김
        document.getElementById(`record${year}`).value = ''; // 기록 초기화
    }
}

function saveRecord(year) {
    const datePicker = document.getElementById('datePicker');
    const selectedDate = datePicker.value;
    const record = document.getElementById(`record${year}`).value;

    if (selectedDate) {
        records[selectedDate] = record; // 기록 저장
        if (!recordedDates.includes(selectedDate)) {
            recordedDates.push(selectedDate); // 새로운 날짜 추가
        }
    }

    swal("저장되었습니다!", "", "success").then(() => {
        document.getElementById('yearRecords').style.display = 'none'; // 기록 화면 숨김
    });
}

function deleteRecord(year) {
    const datePicker = document.getElementById('datePicker');
    const selectedDate = datePicker.value;

    swal({
        title: "정말 삭제하시겠습니까?",
        text: "삭제된 기록은 복구할 수 없습니다!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
        closeOnConfirm: false
    }, function() {
        document.getElementById(`record${year}`).value = ""; // 기록 삭제
        document.getElementById(`icon${year}`).style.display = 'none'; // 아이콘 숨김
        records[selectedDate] = ""; // 기록 초기화
        recordedDates.splice(recordedDates.indexOf(selectedDate), 1); // 날짜 목록에서 삭제
        swal("삭제되었습니다!", "", "success").then(() => {
            document.getElementById('yearRecords').style.display = 'none'; // 기록 화면 숨김
        });
    });
}
