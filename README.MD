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
- [ ] Edit Profile
- [ ] Change Avatar (Image Upload)
- [ ] Follow User
- [ ] Unfollow User
- [ ] See Followers w/ Pagination
- [ ] See Following w/ Pagination
- [ ] Computed Fields
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
