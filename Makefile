
build: index.js template.js components
	@component build --dev

template.js: template.html
	@component convert $<

components:
	@component proxy-install  --dev

clean:
	rm -fr build components

.PHONY: clean
