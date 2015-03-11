(function() {

var UrlTexture = E2.plugins['url_texture_generator'] = function(core, node) {
	this.desc = 'Load a texture from a URL. JPEG and PNG supported. Hover over the Browse button to select an existing image from the library.'
	
	this.input_slots = []
	this.input_slots = [
		{ name: 'url', dt: core.datatypes.TEXT,
			desc: 'URL to fetch image from. The image width and height must be in powers of two, for example 256x512.',
			def: '' }
	]
	
	this.output_slots = [
		{ name: 'texture', dt: core.datatypes.TEXTURE, desc: 'The loaded texture.' }
	]
	
	this.state = { url: '' }
	this.gl = core.renderer.context
	this.core = core
	this.texture = null
	this.dirty = false
	this.thumbnail = null
}

UrlTexture.prototype.create_ui = function() {
	var container = make('div')
	var inp = makeButton('Browse', 'No texture selected.', 'url')
	var that = this

	this.thumbnail = make('div')
	
	this.thumbnail.css({
		'width': '71px',
		'height': '71px',
		'z-index': '3003',
		'border': '2px solid #8e8e8e',
		'border-radius': '5px',
		'background-image': 'url(\'images/no_texture.png\')',
		'background-size': 'cover',
		'margin-bottom': '3px'
	})

	inp.click(function() {
		FileSelectControl
			.createTextureSelector(that.state.url)
			.onChange(function(v) {
				that.state.url = v
				that.state_changed()
				that.updated = true
			})
	})

	container.append(this.thumbnail)
	container.append(inp)

	return container
}

UrlTexture.prototype.update_input = function(slot, data) {
	this.state.url = data
	this.state_changed()
}

UrlTexture.prototype.update_state = function() {
	if (!this.dirty)
		return

	this.texture = this.core.renderer.texture_cache.get(this.state.url)
	this.dirty = false
}

UrlTexture.prototype.update_output = function(slot) {
	return this.texture
}

UrlTexture.prototype.state_changed = function() {
	if (this.state.url !== '') {
		if (this.thumbnail) {
			this.thumbnail.css({ 'background-image': 'url(\'' + this.state.url + '\')' })
		} else
			this.dirty = true
	}
}

})()