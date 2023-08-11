# wanted-pre-onboarding-backend-selection-assignment

- 지원자의 성명
  - 김연주
- 애플리케이션의 실행 방법 (엔드포인트 호출 방법 포함)
   - `docker compose up -d`: 도커 컨테이너들 백그라운드에서 실행
   - `curl localhost:8000`: 로컬호스트의 8000포트로 curl 요청으로 애플리케이션 실행 확인
    
| HTTP method | end point    | Description  |
|-------------|--------------|-------------|
| GET | `/api-docs` | API 문서 및 테스트 |
| POST | `/user/signUp` | 회원 가입        |
| POST | `/user/signIn` | 로그인          |
| POST | `/user/signOut` | 회원 탈퇴        |
| GET | `/board/all`  | 게시판 전체 조회    |
| GET | `/board/{id}` | 게시글 하나 조회    |
| POST | `/board/new` | 게시글 생성       |
| PATCH | `/board/{id}` | 게시글 수정       |
| DELETE | `/board/{id}` | 게시글 삭제       |

   - `docker compose down` : 애플리케이션 종료 및 컨테이너 삭제

    
- 데이터베이스 테이블 구조

<iframe width="560" height="315" src='https://dbdiagram.io/embed/64d60c8902bd1c4a5ea013ed'> </iframe>

- 구현한 API의 동작을 촬영한 데모 영상 링크
  ![ezgif com-video-to-gif](https://github.com/yeonjoo7/wanted-pre-onboarding-backend/assets/75323528/1cac8b9e-38d7-4c09-8adb-bf80407916ab)
  - Board Route: [유튜브 링크](https://youtu.be/ZAEbOmv2DAI)
  
  - User Route: [유튜브 링크](https://youtu.be/gXExZcO2Ub0)
  

- 구현 방법 및 이유에 대한 간략한 설명
  - docker compose 를 사용해서 nodejs(express) + mySQL 으로 환경을 구성했습니다.
  - DB Model과 공통으로 쓸 모듈을 관리하기 쉽게 common폴더에 배치했습니다. modelManager에서 DB Model이 추가될 때 파일 이름만 추가해서 관리하기 쉽게 구현했습니다.
  - DB 서버가 뜨고난 뒤에 APP 서버가 뜰 수 있도록 docker-compose 파일에서 depend_on을 설정해두고, APP 서버가 실행될 때 modelManager의 syncDB 메서드가 실행된 후 http 서버를 생성했습니다.
  - 커스텀 에러를 만들어서 파라미터가 전달되지 않은 에러, 유효하지 않은 입력값 에러 등을 구분해서 log를 남기고 response로 반환할 수 있도록 구현했습니다.
  - swagger API 문서로 통합 테스트를 할 수 있도록 만들었습니다.

- API 명세(request/response 포함)
  - [Postman 문서](https://documenter.getpostman.com/view/18087069/2s9Xy3tBUT)