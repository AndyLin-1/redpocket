# dev
dev:
	docker compose -f docker-compose.yml up -d --build --remove-orphans
dev-down:
	docker compose -f docker-compose.yml down
