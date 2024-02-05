const mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng(37.55597032932879, 126.97209408428566), // 서울역 좌표
        level: 5
    };

const map = new kakao.maps.Map(mapContainer, mapOption);

// 내 위치 나타내는 버튼
const myGeoBtn = document.querySelector('#map button')

// 지도에 마커와 인포윈도우를 표시하는 함수
function displayMarker(locPosition, message) {

    // 마커를 생성
    const marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    const iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성
    const infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 인포윈도우를 마커 위에 표시
    infowindow.open(map, marker);
    
    // 지도 중심좌표를 접속위치로 변경
    map.setCenter(locPosition);      
}

// 내 위치 확인하는 함수
function myLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치 확인
    navigator.geolocation.getCurrentPosition(function(position) {
        
        const lat = position.coords.latitude,
            lon = position.coords.longitude; 
        
        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
            message = '<div style="padding:5px; text-align:center;">현재 위치'; // 인포윈도우에 표시될 내용
        
        // 마커와 인포윈도우를 표시
        displayMarker(locPosition, message);
            
      });
    
} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
    
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
        message = 'geolocation을 사용할수 없어요..'
        
    displayMarker(locPosition, message);
}
}

myGeoBtn.addEventListener('click', myLocation)