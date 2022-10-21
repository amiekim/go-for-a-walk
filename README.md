### 프로젝트 
```
go-for-a-walk
나의 산책이야기
산책을 하고 난 후 남기는 기록
```

### 필요지식
```
1. React
2. React-router-dom
3. React Redux
4. bootstrap
5. firebase
6. cloudinary
7. HTML, CSS, JS
```

### 

### 설치
1. `.env 세팅`
2. `터미널에서 yarn 명령어로 설치`

### 현재 기능 및 이용방법
```
1. 첫 페이지는 하드코딩이 된 4개의 일기가 있습니다.
2. 상단에 로그인을 누르면 로그인 페이지로 갑니다.
3. 구글 로그인을 성공하면 첫페이지로 갑니다.
4. 상단에 글쓰기와 로그아웃으로 바뀐 것을 확인할 수 있습니다.
5. 하드코딩으로 되어있던 첫 페이지는 내 일기를 실시간 firebase db에 json을 불러와서 지금까지 작성했던 내 일기를 볼 수 있습니다. 
6. 글을 누르면 작성페이지로 가서 수정,삭제가 가능합니다.
└── 로그인이 안되어 있으면 글쓰기 혹은 수정 path로 들어가도 첫페이지로 돌아갑니다.
7. 상단에서 새 일기를 쓸 수 있습니다.
```

### 폴더 및 파일(파일은 상세 생략)구조
```
┌── node_modules
├── package.json
├── public
├── src
    ├── components
        ├── common
        ├── component
    ├── redux
        ├── reducers
            ├── index.js
            ├── loginReducer.js
            └── ...
        └── store.js
    ├── service
    └── util
        ├── data.js
        └── ...
└── README.md
```

### 향후 프로젝트 계획
```
추가하려고 하고 있는 계획들
★ 진행예정 / ○ 개발기술 탐색 후 진행

★ 일반 로그인, 회원가입, 비밀번호 찾기
★ 나의 정보란
★ 일기 공개 여부 버튼 추가, 첫페이지에서 다른 사람 일기도 볼 수 있도록 추가
★ 글을 쓸 때 지도에 선을 그리거나 또는 마커를 여러개 찍어서 산책경로를 저장.
 ○ 텍스트 에디터 적용(이미지 저장에 제한 없음).
 ○ 지도에 산책하면서 들렀던 특정장소 또는 가게에 대한 정보 마커생성.
 ○ 웹 만보기기능 추가해 오늘 산책에 대한 내용이 없을 경우 일기를 쓸 수 없도록 하기.
   └── 만보기 추가가 가능해지면 나의 정보란에 날짜별 걸음 수 그래프
```