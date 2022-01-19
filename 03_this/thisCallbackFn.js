setTimeout(function () { // (1) 전역객체 출력
    console.log(this);
}, 300);

[1, 2, 3, 4, 5,].forEach(function (x) { // (2) 전역객체와 배열의 각 요소가 총 5회 출력
    console.log(this, x);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a')
    // (3) click 이벤트가 발생할 때마다 그 이벤트 정보를 콜백 함수의 첫 번째 인자로 삼아 함수 실행
    // 버튼 클릭하면 앞서 지정한 엘리먼트와 클릭 이벤트에 관한 정보가 담긴 객체 출력
    // 메서드명의 점앞부분이 this
    .addEventListener('click', function (e) {
        console.log(this, e);
    });