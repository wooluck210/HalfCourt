const markers = []; 
const ps = new kakao.maps.services.Places();  
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
const searchBtn = document.querySelector('.search button')

function searchPlaces(event) {
    event.preventDefault();
    const keyword = document.getElementById('keyword').value;
    console.log('키워드: ',keyword)

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    ps.keywordSearch( keyword, placesSearchCB); 
}

function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        for (let i=0; i<data.length; i++) {
            displayMarkerSearch(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        map.setBounds(bounds);
    } 
}

function displayMarkerSearch(place) {
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}

searchBtn.addEventListener('click', searchPlaces)