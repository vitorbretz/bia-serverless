build-TarefasFunction:
	cp package-lambda.json $(ARTIFACTS_DIR)/package.json
	cp -f lambda.js $(ARTIFACTS_DIR)/lambda.js
	cp -r api $(ARTIFACTS_DIR)/
	cp -r config $(ARTIFACTS_DIR)/
	cp -r lib $(ARTIFACTS_DIR)/
	cd $(ARTIFACTS_DIR) && npm install --production --no-optional
