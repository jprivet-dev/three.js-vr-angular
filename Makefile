MAKE_S = $(MAKE) -s

USER_ID = $(shell id -u)
GROUP_ID = $(shell id -g)


NG_DEPLOY_BASE_HREF = /angular-threejs-earth/

## PROJECT

.PHONY: start
start: docker_start ## Start the current project.

start_one: docker_stop_all docker_start  ## Stop all projects running containers & Start current project.

.PHONY: stop
stop: docker_stop ## Stop the current project.

.PHONY: tests
tests: npm_test ## Launch all tests.

.PHONY: bash
bash: ## App bash access (current user).
	docker-compose exec --user $(USER_ID):$(GROUP_ID) node bash

bash@root: ## App bash access (root).
	docker-compose exec --user 0 node bash

deploy_current: ## Deploy current branch to GitHub pages (it will be automatically built in production mode).
	# !!! Use local node for the moment
	ng deploy --base-href=$(NG_DEPLOY_BASE_HREF)

deploy_main: ## Deploy main branch to GitHub pages (it will be automatically built in production mode).
	git checkout main
	git pull origin main
	# !!! Use local node for the moment
	ng deploy --base-href=$(NG_DEPLOY_BASE_HREF)

.PHONY: prod
prod: # Build the project (production build)
	ng build --prod

## NPM

npm_test: ## Execute the unit tests via Jest.
  # ERROR [launcher]: Chrome stderr: Failed to move to new namespace: PID namespaces supported, Network namespace supported, but failed: errno = Operation not permitted
	#docker-compose exec --user $(USER_ID):$(GROUP_ID) node npm test
	# !!! Use local node for the moment
	ng test

## DOCKER

# --remove-orphans: Remove containers for services not defined in the Compose file.
docker_start: ## Build, (re)create, start, and attache to containers for a service.
	docker-compose up --remove-orphans

# --remove-orphans: Remove containers for services not defined in the Compose file.
# -d: Detached mode: Run containers in the background, print new container names.
docker_start_d: ## Build, (re)create, start, and attache to containers for a service (detached mode).
	docker-compose up --remove-orphans -d

# --build: Build images before starting containers.
docker_build: ## Same `docker_start` command + Build images before starting containers.
	docker-compose up --build

# --build: Build images before starting containers.
# -d: Detached mode: Run containers in the background, print new container names.
docker_build_d: ## Same `docker_start` command + Build images before starting containers (detached mode).
	docker-compose up --build -d

docker_stop: ## Stop running containers without removing them.
	docker-compose stop

docker_stop_all: ## Stop all projects running containers without removing them.
	docker stop $$(docker ps -a -q)

# --remove-orphans: Remove containers for services not defined in the Compose file.
docker_down: ## Stop containers and remove containers, networks, volumes, and images created by up.
	docker-compose down --remove-orphans

## MAKEFILE

.DEFAULT_GOAL := help
.PHONY: help
help: ## Print self-documented Makefile.
	@echo "------------------------"
	@echo "SELF-DOCUMENTED MAKEFILE"
	@echo "------------------------"
	@grep -E '(^[.a-zA-Z_-]+[^:]+:.*##.*?$$)|(^#{2})' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = "## "}; \
		{ \
			split($$1, command, ":"); \
			target=command[1]; \
			description=$$2; \
			# --- space --- \
			if (target=="##") \
				printf "\033[33m%s\n", ""; \
			# --- title --- \
			else if (target=="" && description!="") \
				printf "\033[33m\n%s\n", description; \
			# --- command + description --- \
			else if (target!="" && description!="") \
				printf "\033[32m  %-30s \033[0m%s\n", target, description; \
			# --- do nothing --- \
			else \
				; \
		}'
	@echo
