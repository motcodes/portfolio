// one circle push transition, rendered offscreen: the image below (uFrom, screen space)
// is pushed out cell by cell as a ring from the centre brings the new image (uTo) in
uniform sampler2D uFrom;
uniform sampler2D uTo;
// uv scale per texture: < 1 crops (cover), > 1 leaves a margin (contain)
uniform vec2 uToScale;
// image uv per output pixel; the shifted sample position jumps at every cell border, and
// mipmap selection from that jump drew 1-2px lines of the blurriest mip along cell borders
uniform vec2 uToTexel;
uniform float uProgress;
// per transition, varies the ring jitter
uniform float uSeed;
// viewport size in css pixels, for the cell shape
uniform vec2 uResolution;

varying vec2 vUv;

const vec4 background = vec4(vec3(13.0 / 255.0), 1.0);
// matches settings.grid in pixelDistortion.jsx
const float grid = 24.0;
// share of the transition one cell takes to push its new content in;
// the ring crosses in the rest, so the farthest cell finishes exactly at the end
const float resolve = 0.45;

vec4 incoming(vec2 at) {
	vec2 uv = (at - 0.5) * uToScale + 0.5;
	if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) return background;
	return texture2DGradEXT(uTo, uv, vec2(uToTexel.x, 0.0), vec2(0.0, uToTexel.y));
}

vec4 outgoing(vec2 at) {
	if (any(lessThan(at, vec2(0.0))) || any(greaterThan(at, vec2(1.0)))) return background;
	return texture2D(uFrom, at);
}

float hash(vec2 p) {
	p = fract(p * vec2(123.34, 456.21) + uSeed);
	p += dot(p, p + 45.32);
	return fract(p.x * p.y);
}

float easeOutCubic(float t) {
	return 1.0 - pow(1.0 - t, 3.0);
}

// progress at which easeOutCubic reaches x
float easeOutCubicInverse(float x) {
	return 1.0 - pow(1.0 - x, 1.0 / 3.0);
}

void main() {
	vec2 cellSize = uResolution / grid;
	vec2 px = vUv * uResolution;
	vec2 cell = floor(vUv * grid);
	vec2 centre = (cell + 0.5) * cellSize;
	vec2 fromMiddle = centre - 0.5 * uResolution;
	vec2 dir = length(fromMiddle) > 0.001 ? normalize(fromMiddle) : vec2(1.0, 0.0);
	float dist = length(fromMiddle) / length(0.5 * uResolution);

	// the ring's growth is eased, each cell then runs on the linear clock: easing the cell
	// time as well slowed the last few pixels of every push into a visible second clean-up pass
	float start = (1.0 - resolve) * easeOutCubicInverse(min(dist * 0.85 + hash(cell) * 0.15, 1.0));
	float local = (uProgress - start) / resolve;
	if (local <= 0.0) {
		gl_FragColor = outgoing(vUv);
		return;
	}

	float e = easeOutCubic(min(local, 1.0));
	// extent of the cell along dir, so diagonal pushes cross the whole cell too
	float span = abs(dir.x) * cellSize.x + abs(dir.y) * cellSize.y;
	// the last sub-pixel of the push would only flicker a 1px seam, finish the cell instead
	if ((1.0 - e) * span < 1.0) {
		gl_FragColor = incoming(vUv);
		return;
	}
	float u = dot(px - centre, dir) / span + 0.5;
	gl_FragColor = u < e
		? incoming((px + (1.0 - e) * span * dir) / uResolution)
		: outgoing((px - e * span * dir) / uResolution);
}
