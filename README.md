# Seller Product Service


## 기술 스택

- Framework: `NestJS`
- Database: `RDS - mysql`
- ORM: `TypeORM`


# 요구사항 분석

## 1. 회원가입 및 로그인
  - 회원 가입을 합니다.
  - 가입된 회원 정보로 로그인을 진행 합니다.
  - 회원 가입시 seller 권한이 있습니다.
   
## 2. 마켓 등록
  - seller는 자신의 마켓을 등록할 수 있습니다.
  
  
## 3. 마켓 삭제
  - 마켓을 삭제합니다.
  - seller가 자신의 마켓을 삭제 합니다.
  
## 4. 상품 등록
  - 마켓에 상품을 등록 합니다.
  - 이름, 가격, 배송비 등의 정보를 가지고 있습니다.

## 5. 상품 조회
  - 상품에 상세 정보를 가져 옵니다.

## 6. 상품 리스트
  - 최신순으로 상품을 보여줍니다.
  - 상품의 이름이나 seller의 국가로 검색을 합니다.

## 7. 상품 수정
  - 상품의 내용을 수정 합니다.
  
## 8. 상품 삭세
  - 상품을 삭제 합니다.


## API
- 회원 가입

| Method | URL | Request Body | Response |
| --- | --- | --- | --- |
| POST | /api/user | email : emai<br>password : 암호화 패스워드<br>role : 권한| statusCode : 201 |

- 로그인

| Method | URL | Request Parameter | Response |
| --- | --- | --- | --- |
| POST | /api/user/login | email과 password 로 로그인 진행 | statusCode : 200|

- 마켓 등록

| Method | URL | Request Body | Response |
| --- | --- | --- | --- |
| POST | /api/market | user : seller<br>marketName : 마켓 이름<br>phone : 전화번호<br>country : 나라 | statusCode : 201 |

- 마켓 삭제

| Method | URL | Request Path | Request Body | Response |
| --- | --- | --- | --- | --- |
| DELETE | /api/market/:marketdId | marketdId : 마켓 id | statusCode : 200 |

- 상품 등록

| Method | URL | Request Body | Response |
| --- | --- | --- | --- |
| POST | /api/product | market : seller의 마켓<br>productName :상품 이름<br>price : 상품 가격<br>deliverPrice : 배송비<br>content: 설명 | statusCode : 201 |

- 상품 개별 조회

| Method | URL | Request Path |  Response |
| --- | --- | --- | --- | --- |
| GET | /api/product/:productId | productId : 상품 id | statusCode : 200 |

- 상품 전체 조회

| Method | URL | Request Path |  Response |
| --- | --- | --- | --- |
| GET | /api/product | statusCode : 200 |

- 상품 검색 조회

| Method | URL | Response |
| --- | --- | --- | --- |
| GET | /api/product?search=' ' |statusCode : 200 |

- 상품 수정

| Method | URL | Request Path | Response |
| --- | --- | --- | --- |
| PUT | /api/product/:productId| productId : 상품 id | statusCode : 200 |

- 상품 삭제

| Method | URL | Request Path | Response |
| --- | --- | --- | --- |
| DELETE | /api/product/:productId| productId : 상품 id | statusCode : 200 |
