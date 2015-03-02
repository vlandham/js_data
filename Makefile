
all:
	docco -t assets/custom.jst --css=assets/custom.css ./src/*.js --output=./
	tools/make_gists.rb assets/gists.json
