
NODE_MODULES     = ./node_modules
NODE_MODULES_BIN = $(NODE_MODULES)/.bin

PACKAGES = $(shell cd packages && find . -type d -maxdepth 1 -not -name '.' | sed -e 's/^\.\///')

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    = $(shell printf "\33[31m")
GREEN  = $(shell printf "\33[32m")
WHITE  = $(shell printf "\33[37m")
YELLOW = $(shell printf "\33[33m")
RESET  = $(shell printf "\33[0m")

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([a-zA-Z\-\%_]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

########################################################################################################################
#
# GLOBAL
#
########################################################################################################################

init: ##@global cleanup/install/bootstrap
	@$(MAKE) clean
    ifdef $(PURE)
		@yarn install --pure-lockfile
    else
		@yarn install
    endif
	@$(MAKE) bootstrap
	@$(MAKE) link
	@$(MAKE) bundle

ls: ##@global list packages
	@echo "$(YELLOW)Available packages:$(RESET)"
	@$(NODE_MODULES_BIN)/lerna ls

bootstrap:
	@$(NODE_MODULES_BIN)/lerna bootstrap

link:
	@$(NODE_MODULES_BIN)/lerna link

changed:
	@$(NODE_MODULES_BIN)/lerna changed

fmt: ##@global format code using prettier
	@echo "$(YELLOW)formatting packages: $(WHITE)$(PACKAGES)$(RESET)"
	@$(NODE_MODULES_BIN)/prettier --color --write \
        "packages/**/*.{js,ts}"

clean:
	@$(call clean_dir_all,.)
	@$(call clean_dir_all,examples/basic)
	@$(foreach pkg,$(PACKAGES),$(call clean_dir_all,packages/$(pkg)))

define clean_dir_all
	rm -rf $(1)/node_modules
	rm -rf $(1)/package-lock.json
endef

dev: ##@global start dev mode
	@$(MAKE) MAKEFLAGS="-j 2" ui-start example-start-dev-basic

bundle: ##@global bundle all
	@$(MAKE) ui-build
	@rm -rf packages/server/ui
	@cp -r packages/ui/build packages/server/ui

########################################################################################################################
#
# Check
#
########################################################################################################################

ok: ##@check run linters formatting check and test on all packages
	@$(MAKE) fmt-check
	@$(MAKE) lint
	@echo "$(GREEN)✔ everything's fine!${RESET}"

fmt-check: ##@check check if files were all formatted using prettier
	@echo "$(YELLOW)checking formatting on packages: $(WHITE)$(PACKAGES)$(RESET)"
	@$(NODE_MODULES_BIN)/prettier --list-different \
        "packages/**/*.{js,ts}"
	@echo "$(GREEN)✔ well done!${RESET}"
	@echo ""

lint: ##@check lint all packages
	@echo "$(YELLOW)running linter on packages: $(WHITE)$(PACKAGES)$(RESET)"
	@$(NODE_MODULES_BIN)/eslint \
        "packages/**/*.js"
	@echo "$(GREEN)✔ well done!${RESET}"
	@echo ""

########################################################################################################################
#
# UI
#
########################################################################################################################

ui-start: ##@ui start UI react app
	@echo "$(YELLOW)starting UI dev mode$(RESET)"
	@cd packages/ui && yarn run start

ui-build: ##@ui build UI
	@echo "$(YELLOW)building UI$(RESET)"
	@cd packages/ui && yarn run build

########################################################################################################################
#
# Examples
#
########################################################################################################################

example-start-dev-%: ##@examples start node server for given example in dev mode
	@echo "$(YELLOW)starting node server (watch mode) for example $(WHITE)$(*)$(RESET)"
	@$(NODE_MODULES_BIN)/nodemon examples/$(*)/run.js

example-start-%: ##@examples start node server for given example
	@echo "$(YELLOW)starting node server for example $(WHITE)$(*)$(RESET)"
	@cd examples/$(*) && node run.js

