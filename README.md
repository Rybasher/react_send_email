# Send Emails

## How to run project

***We can run this project in one make command***

```make run-all```

## Using docker compose
- copy .example.env to .env
- run docker-compose up

## Without docker compose
***API***
- copy .example.env to .env
- pip install -r requirements.txt
- uvicorn app.main:app --reload

***FE***
- yarn install
- yarn start

