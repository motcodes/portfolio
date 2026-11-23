// shows the transition result with the hover mosaic on top
uniform sampler2D uComposite;
uniform sampler2D uDataTexture;
// fit of the image being shown; mosaic offsets are in image uv
uniform vec2 uFrameScale;

varying vec2 vUv;

const vec4 background = vec4(vec3(13.0 / 255.0), 1.0);

void main()	{
	vec2 at = vUv - 0.02 * texture2D(uDataTexture, vUv).rg / uFrameScale;
	if (any(lessThan(at, vec2(0.0))) || any(greaterThan(at, vec2(1.0)))) gl_FragColor = background;
	else gl_FragColor = texture2D(uComposite, at);
}
