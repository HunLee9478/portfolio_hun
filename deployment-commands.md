# 배포 명령어 가이드

package.json을 직접 수정할 수 없어서 별도의 스크립트를 사용합니다.

## 개발 환경
```bash
# 개발 서버 시작 (현재 작동중)
npm run dev
```

## 프로덕션 배포

### 1. 빌드
```bash
# 기존 npm 스크립트 대신 사용
node build.js
```

### 2. 프로덕션 서버 시작
```bash
# 기존 npm start 대신 사용
node start.js
```

### 3. 배포 확인
```bash
# 배포 준비 상태 확인
node scripts/check-deployment.js

# 서버 상태 확인
node health-check.js
```

### 4. 플랫폼별 배포

#### Vercel
```bash
DEPLOYMENT_TYPE=vercel node deploy.js
```

#### Netlify
```bash
DEPLOYMENT_TYPE=netlify node deploy.js
```

#### GitHub Pages
```bash
DEPLOYMENT_TYPE=github-pages node deploy.js
```

#### 정적 호스팅
```bash
DEPLOYMENT_TYPE=static node deploy.js
```

## Docker 배포
```bash
# 이미지 빌드
docker build -t leeseunghun-portfolio .

# 컨테이너 실행
docker run -p 5000:5000 leeseunghun-portfolio

# 또는 Docker Compose 사용
docker-compose up -d
```

## PM2 배포
```bash
# PM2로 시작
pm2 start ecosystem.config.js --env production

# 모니터링
pm2 monit

# 로그 확인
pm2 logs
```

## 문제 해결

### 기존 npm 스크립트 문제점
- `npm run build`: 일부 플랫폼에서 실패할 수 있음
- `npm start`: 환경 변수 설정이 부족
- `npm run deploy`: 올바른 디렉토리를 배포하지 않음

### 우리 스크립트의 장점
- 완전한 에러 처리
- 플랫폼별 최적화
- 배포 전 검증
- 상세한 로그 출력
- 환경 변수 자동 설정

## 환경 변수 설정
```env
# .env 파일 생성
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
```

이렇게 하면 package.json의 문제점들을 우회해서 안정적으로 배포할 수 있습니다!