// 모달 요소와 버튼 요소를 찾기
const modal = document.querySelector(".modal");
const registerBtn = document.querySelector(".registerBtn");
const closeButton = document.querySelector(".close-button");

// 지도를 클릭한 위치에 표출할 마커입니다
const marker = new kakao.maps.Marker({ 
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter() 
}); 
// 주소-좌표 변환 객체를 생성합니다
const geocoder = new kakao.maps.services.Geocoder();

// 버튼 클릭 이벤트 리스너
registerBtn.addEventListener("click", () => {
    // 지도에 마우스 커서 변경
    map.setCursor('crosshair');

    // 지도 클릭 이벤트 리스너 추가
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
            var content = '<div class="bAddr">' +
                            '<span class="title">법정동 주소정보</span>' + 
                            detailAddr + 
                        '</div>';

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }   
    });
        // 클릭한 위치의 위도, 경도 정보를 가져옵니다 
        const latlng = mouseEvent.latLng;
        console.log(latlng)

        // 마커를 클릭한 위치로 이동시킵니다
        marker.setPosition(latlng);

        // 모달 표시
        modal.style.display = "block";

        // 지도 클릭 이벤트 리스너 제거
        kakao.maps.event.removeListener(map, 'click');
    });
});

// 지도 클릭 이벤트 리스너
function onMapClick(mouseEvent) {
    // 클릭한 위치의 위도, 경도 정보를 가져옵니다 
    const latlng = mouseEvent.latLng;

    // 마커를 클릭한 위치로 이동시킵니다
    marker.setPosition(latlng);

    // 모달 표시
    modal.style.display = "block";

    // 지도 클릭 이벤트 리스너 제거
    kakao.maps.event.removeListener(map, 'click');
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 닫기 버튼 클릭 이벤트 리스너
closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // 모달 숨김
    map.setCursor(''); // 마우스 커서 원래대로 복구
});


// 모달 외부 클릭 시 모달 닫기
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 폼 기본 제출 방지

    // 폼 데이터 수집
    const courtName = document.getElementById("courtName").value;
    const lat = marker.getPosition().getLat(); // 마커의 위도
    const lng = marker.getPosition().getLng(); // 마커의 경도

    // 데이터를 서버로 전송하는 로직 구현
    // 예: AJAX 요청 사용
});
