const modal = document.querySelector(".modal");
const registerBtn = document.querySelector(".registerBtn");
const closeButton = document.querySelector(".close-button");

const marker = new kakao.maps.Marker({ 
    position: map.getCenter() 
}); 
const geocoder = new kakao.maps.services.Geocoder();

const onMapClick = function (mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            let detailAddr = !!result[0].road_address ? '<div>주소 : ' + result[0].road_address.address_name + '</div>' : '<div>주소 : ' + result[0].address.address_name + '</div>';
            
            let content = '<div class="bAddr">' +
                            detailAddr + 
                '</div>';
            
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }   
    });

        const latlng = mouseEvent.latLng;

        marker.setPosition(latlng);

        modal.style.display = "block";

        kakao.maps.event.removeListener(map, 'click', onMapClick);
    }

registerBtn.addEventListener("click", () => {
    map.setCursor("url('../imgs/mouseCursor.png'), default");
    kakao.maps.event.addListener(map, 'click', onMapClick);
});

function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    map.setCursor('');
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        map.setCursor('');
    }
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const courtName = document.getElementById("courtName").value;
    const lat = marker.getPosition().getLat();
    const lng = marker.getPosition().getLng();

    // 데이터를 서버로 전송하는 로직 구현
    // 예: AJAX 요청 사용
});
