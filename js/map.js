const mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng(37.55597032932879, 126.97209408428566), // 서울역 좌표
        level: 5
    };

const map = new kakao.maps.Map(mapContainer, mapOption);
const myGeoBtn = document.querySelector('#map button')

function displayMarker(locPosition, message) {
    const marker = new kakao.maps.Marker({  
        map: map, 
        position: locPosition
    }); 
    
    const iwContent = message, 
        iwRemoveable = true;

    const infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    infowindow.open(map, marker);
    map.setCenter(locPosition);      
}

function myLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude,
            lon = position.coords.longitude; 
        
        const locPosition = new kakao.maps.LatLng(lat, lon), 
            message = '<div style="padding:5px; text-align:center;">현재 위치';
        
        displayMarker(locPosition, message);
      });
    
} else {    
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
        message = 'geolocation을 사용할수 없어요..'
        
    displayMarker(locPosition, message);
}
}

myGeoBtn.addEventListener('click', myLocation)