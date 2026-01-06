FROM mcr.microsoft.com/playwright:v1.48.2-jammy

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx playwright install

CMD ["npm", "test"]
