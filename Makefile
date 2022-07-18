run-all:
	cp .example.env .env
	docker-compose up --build
