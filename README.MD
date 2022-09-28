# Instaclone

Instaclone Backend

## setup
- [x] gitignore extentions
- [x] touch README.MD
- Apollo Server
    - [x] npm i apollo-server@2.25.2
    - [x] npm i graphql
    - [x] nodemon : 코드 수정할 때마다 서버 자동 재시작하기 위해 설치
- Babel 
    - javascript compilerf로, node.js의 버전에 제약받지 않고 최신 javascript의 기능들을 자유롭게 사용할 수 있도록 코드를 변환해주므로 설치
    - [x] babel.config.json 설정
    - production 단계에서는 babel을 사용하지 않음. 웹 사이트를 publish했을 때는 이미 바벨로 컴파일된 평번한 자바스크립트 코드를 사용함.
    - [x] npm i @babel/core @babel/node @babel/preset-env
    - [x] nodemon --exec babel-node server
- Prisma
    - Prisma는 ORM(Object Relational Mapper)으로, SQL 코드를 쓸 필요 없이 자바스크립트 코드를 작성하면 Prisma가 데이터베이스와 대신 대화함
    - [x] npm i @prisma/cli -D
    - [x] 프리즈마 초기화 : npx prisma init 
    - VSCODE Prisma extention
- PostgreSQL
    - [x] https://postgresapp.com/downloads.html
    - [x] create database
    - [x] .env
- Prisma Migrate
    - schema.prisma 파일의 데이터 모델을 쓰고 설명함
    - 실행하면 schema.prisma 파일를 바탕으로 데이터베이스에 스키마가 생성됨 : npx prisma migrate dev
        - dev 명령어와 함께 실행 시 prisma client 가 자동 생성됨
    - prisma schema를 변경할 때마다 migrate 해줘야 함: npm run migrate
- Prisma Client 
    - Client : 어떤 방식으로 데이터베이스와 상호작용하는가
- Prisma Studio
    - DBeaver 같이 브라우저에서 DB를 볼 수 있음
    - 실행: npx prisma studio
        - npx는 모듈을 로컬에 저장하지 않고, 매번 최신 버전의 파일만을 임시로 불러와 실행 시킨 후에, 다시 그 파일은 없어지는 방식으로 모듈이 돌아감
    - http://localhost:5555/
- optimaze the architecture
    - divide and conquer : 한 파일에서 한 가지 일만 하기!
    - domain 별로 type, query, mutation, model 관리
    - graphql-tools : 모든 모델 관련 파일을 가져옴
    - **: 모든 폴더, *: 모든 파일
     - npm i @graphql-tools/schema @graphql-tools/load-files @graphql-tools/merge
- typescript
    - npm i typescript ts-node --save-dev
    - ts-node : babel-node 같은건데 typescript를 위한 것
    - babel-node를 더 이상 쓰지 않으므로  babel.config.json 파일 삭제
    - tsconfig.json 설정
    - 모든 프로젝트 파일을 src 폴더 안으로 이동
    - 실행 스크립트 ts-node로 변경
        - "scripts": {
                "dev": "nodemon --exec ts-node src/server --ext ts,js",
                "migrate": "npx prisma migrate dev",
                "studio": "npx prisma studio"
            },
- GraphQL
    - Queries 
        - return 시 사용할 result를 가지지 않음
    - Mutataions
        - return 시 사용할 result를 가짐
        - 모든 mutation에 jwt을 보내는 것이 아니라 http.headers에 넣음
        - mutation의 세번째 인자 context에 무언가(오브젝트 or 함수)를 넣으면 그것은 모든 resolver에서 접근 가능함
    - Resolver
        - root, args, context, info 를 인자로 사용한다.
    - Protected Resolver
        - 로그인한 유저가 없을 수도 있기 때문에 jwt이 필요한 resolver를 보호해야 함 
        - wrap fucntion : create a resolver that wraps other resolvers
        - currying : 함수를 리턴하는 함수
- 전 프로세스가 죽을 시간을 주기 위해서 2초간 딜레이를 줘서 nodemon이 2초 기다린 후에 서버를 재시작함. 
  - "scripts": {
    "dev": "nodemon --exec ts-node src/server --ext ts,js --delay 2s",
- Playground polling
    - polling: backend로 request를 전송하고 있음
    - production 일 때는 server를 cloud에 업로드하기 때문에 playground를 비활성화할 예정


## User:

- [x] Create Account (mutation)
    - password hashing : hashing은 단방향이므로 암호화된 문자열을 해독할 수 없다. 1234는 항상 같은 이상한 문자열을 반환함
    - npm i bcrypt
- [x] See Profile (query)
- [x] Login
    - Json Web Token
        - npm i jsonwebtoken
        - 유저가 Username을 보내면 거기에 서버의 서명을 한다 => 토큰 발급 => 유저에게 토큰 전달
        - 토큰은 web browser, desktop, mobile 어디든 저장할 수 있다.
        - 이후에는 유저가 토큰을 보내면 그 토큰이 갖고 있는 id를 확인하고, 토큰이 우리가 서명한 토큰인지 확인한다. 토큰은 서버가 프론트엔드에 연결되어 있지 않을 때 사용한다. 세션과 쿠키는 서버와 프론트엔드가 분리되어 있지 않을 때 적합하다.
        - 토큰에는 들어있는 정보는 모든 사람이 볼 수 있다. 따라서 비밀 정보(비밀번호 같은)를 넣으면 안됨. 비밀번호가 암호화되어 있다고 하더라도 개인정보는 넣지 않는다. 토큰의 목적은 우리가 싸인했던 토큰인지 유저가 누구인지 토큰 만료일이 언제인지 등을 확인하는 것이다.
        - private key는 공개하면 안됨
- [x] Edit Profile/Change Avatar (Image Upload)
    - Upload scalar type 추가 for avatar
    - graphql playground 에서는 파일업로드를 할 수 없어서 graphQL 클라이언트인 Altire 설치
    - Upload 타입으로 Altire에서 파일을 올리면 createReadStream이 보임. 
    - file system import from node.js : import fs from "fs";
    - readStream.pipe(writeStream);
    - Server 변경 : apllo-server -> express server (apollo-server-express)
        - apllo-server를 사용하면 graphql 서버를 구축할 수 있지만, graphql 외에 rest방식이나 내부 퍼블릭 파일에 접근하기 위해서는 express 서버를 사용해야한다.
        - apollo-server-express: express 기반의 서버에 apollo-server-express 미들웨어를 지원하는 방식으로 변경 /graphql path에서는 graphql playground를 띄우도록 한다!  
    - morgan 
        - npm i @types/morgan
        - logger임
        - logger는 applymiddelware 하기 전에 적어야 graphql log가 반영됨
    - uploads 폴더에 있는 파일에 접근하기 
        - app.use("/uploads", express.static("uploads"));
    - 저장할 파일명 중복 방지
        - process.cwd() + "/uploads/" + loggedInUser?.id + Date.now() + filename
- [x] Follow/Unfollow User
    - Followers/Following is self-referencing relationship
    - https://www.prisma.io/docs/concepts/components/prisma-schema/relations/self-relations
    - schema.prisma 에 Followers, Following 추가
    - npm run migrate
    - graphql typeDefs, resolvers 추가
    - @relations 관계이기 때문에 following만 핸들링하면 follower는 자동으로 반영됨 
- [ ] See Followers/Following with Pagination
    - resolver 에      
         include: {
          following: true,
          followers: true,
        },
        를 추가하면, 모든 following/followers 를 불러올 수 있다.
        그렇지만! 팔로워가 백만이 넘어간다면? 많은 데이터를 모두 불러오는 것은 데이터베이스 과부화를 유발할 수 있다. 따라서 기본적으로 Prisma에서는 include를 사용하지않으면 null로 가져오는 것이다. following/followers는 페이징으로 가져오자!
    - offset pagination
        전체 페이지 수에 따라서 몇 개의 페이지인지 나눠지고,
        2페이지를 보고있다가 5페이지로 바로 넘어가고 싶을 때 쓴다!
        User 유무 유효성 검사 시 user 존재 유무를 체크하는 것이므로 user의 모든 필드를 가져오지 말고, id만 가져오자
        장점 : 다른 페이지로 바로 점프할 수 있다
        단점 : 만약 총 20만개인데 마지막 페이지를 가져오려면 전 페이지까지의 데이터 수 즉, 약 20만개의 데이터를 스킵해야하므로 느려질 것이다. 이럴 때는 curor-based pagination을 쓰도록 하자.
    - curor-based pagination
        - https://www.prisma.io/docs/concepts/components/prisma-client/pagination
        - 우리가 본 마지막 결과물의 아이디 값이 무엇인지 알려줘야 함.
        - 우리가 본 마지막 결과물의 아이디 값을 넘겨주는데, 첫번째 페이지는 마지막결과물이 없으니 required로 만들면 안된다.
        - 예를 들면, 1,2,3,4,5,6,7,8,9,10 게시물 id가 이렇게 있다고 할 때, 마지막으로 페이지에서 본 게시물 아이디가 3이라면, 다음 요청에 3을 보내고, 3을 스킵하고 3 다음부터 보내줘 라고 요청하는 것이다.
        장점 : 데이터 수가 많아져도 과부하 안 걸림, 인피니티 스크롤에 주로 사용
        단점 : 특정 페이지로 점프 불가
- [ ] Computed Fields(계산된 필드들!!)
        - GraphQL Schema에는 있지만 데이터베이스에는 없는 것을 뜻함
        - request 할 때 마다 계산이 됨
        - user model에 추가 : totalFollowing: Int!  totalFollowers: Int!
        - users.resolvers.ts 에 리졸버를 만들어서 숫자를 계산함
        ** graphql type User에 있는 field의 resolver를 만드는 것
        - ** seeProfile을 리퀘스트하면 totalFollowing, totalFollowers 가 데이터베이스 필드에 없기 때문에 User의 리졸버를 찾아서 리졸버를 실행시킨다. 이 때 resolver의  root, args, context, info 인자 중 첫번째 인자인 root를 사용해서 요청한 username을 가져올 수 있다. root.username


- [ ] Search Users

## Photos

- [ ] Upload Photo (Parse #)
- [ ] See Photo
- [ ] See Hashtag
- [ ] Search Photos
- [ ] Edit Photo
- [ ] Like / Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed
- [ ] See Photo Comments
- [ ] Delete Photo

## Comments

- [ ] Comment on Photo
- [ ] Delete Comment
- [ ] Edit Comment

## Refactor

- [ ] Mutation Responses

## Extras

- [ ] S3 Image Upload

## DMs

- [ ] See Rooms
- [ ] Send Message (Create Room)
- [ ] See Room
- [ ] Computed Fields
- [ ] See (Read) Message
- [ ] Realtime Messages
