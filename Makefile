
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

bootstrap: ##@global lerna bootstrap
	@$(NODE_MODULES_BIN)/lerna bootstrap

link: ##@global symlink packages
	@$(NODE_MODULES_BIN)/lerna link

changed: ##@global symlink packages
	@$(NODE_MODULES_BIN)/lerna changed

lint: ##@global lint all packages
	@echo "$(YELLOW)running linter on packages: $(WHITE)$(PACKAGES)$(RESET)"
	@$(NODE_MODULES_BIN)/eslint \
        "packages/**/*.js"
	@echo "$(GREEN)✔ well done!${RESET}"
	@echo ""

fmt: ##@global format code using prettier
	@echo "$(YELLOW)formatting packages: $(WHITE)$(PACKAGES)$(RESET)"
	@$(NODE_MODULES_BIN)/prettier --color --write \
        "packages/**/*.{js,ts}"

fmt-check: ##@global check if files were all formatted using prettier
	@echo "$(YELLOW)checking formatting on packages: $(WHITE)$(PACKAGES)$(RESET)"
	@$(NODE_MODULES_BIN)/prettier --list-different \
        "packages/**/*.{js,ts}"
	@echo "$(GREEN)✔ well done!${RESET}"
	@echo ""

ls: ##@global list packages
	@echo "$(YELLOW)Available packages:$(RESET)"
	@$(NODE_MODULES_BIN)/lerna ls

clean: ##@global uninstall node modules, remove transpiled code & lock files
	@rm -rf node_modules
	@rm -rf package-lock.json
	@$(foreach pkg,$(PACKAGES),$(call clean_dir_all,packages/$(pkg)))

define clean_dir_all
	rm -rf $(1)/node_modules
	rm -rf $(1)/package-lock.json
endef

ok: ##@global run linters formatting check and test on all packages
	@$(MAKE) fmt-check
	@$(MAKE) lint
	@echo "$(GREEN)✔ everything's fine!${RESET}"

dev: ##@global start dev mode
	@$(MAKE) MAKEFLAGS="-j 2" ui-start server-start

########################################################################################################################
#
# UI
#
########################################################################################################################

ui-start: ##@ui start UI react app
	@echo "$(YELLOW)starting UI dev mode$(RESET)"
	@cd packages/ui && yarn start

########################################################################################################################
#
# Server
#
########################################################################################################################

server-start: ##@server start node server
	@echo "$(YELLOW)starting node server$(RESET)"
	@cd packages/server && node app.js
