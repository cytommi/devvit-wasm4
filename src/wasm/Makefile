WEBROOT="../../webroot"
all: 
	@mkdir -p build
	GOOS=js GOARCH=wasm tinygo build -o ./build/lib.wasm .
	cp build/lib.wasm $(WEBROOT)
	cp $$(tinygo env TINYGOROOT)/targets/wasm_exec.js $(WEBROOT)



