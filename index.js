function getGradientFill() {
	const {value: fillColor1} = document.getElementById("bmfnt-gradient-fill-picker-1");
	const {value: fillColor2} = document.getElementById("bmfnt-gradient-fill-picker-2");
	const {value: range} = document.getElementById("bmfnt-gradient-fill-range");
	const {value: sharpness} = document.getElementById("bmfnt-gradient-fill-sharpness");
	const r = range / 100.0;
	const s = sharpness / 100.0;
	return {
		fillColor1,
		fillColor2,
		fillStop1: r - r*(1-s),
		fillStop2: r + (1-r)*(1-s)};
}

function getGradientStroke() {
	const {value: strokeColor1} = document.getElementById("bmfnt-gradient-stroke-picker-1");
	const {value: strokeColor2} = document.getElementById("bmfnt-gradient-stroke-picker-2");
	const {value: range} = document.getElementById("bmfnt-gradient-stroke-range");
	const {value: sharpness} = document.getElementById("bmfnt-gradient-stroke-sharpness");
	const r = range / 100.0;
	const s = sharpness / 100.0;
	return {
		strokeColor1,
		strokeColor2,
		strokeStop1: r - r*(1-s),
		strokeStop2: r + (1-r)*(1-s)};
}

function updateSampleText() {
	const {value: sample} = document.getElementById("bmfnt-sample-text");
	const ctx = document.getElementById("bmfnt-sample-canvas").getContext("2d");
	ctx.clearRect(0, 0, 1000, 1000);
	ctx.font = "40px Verdana";
	ctx.imageSmoothingEnabled = true;

	const {strokeColor1, strokeColor2, strokeStop1, strokeStop2} = getGradientStroke()
	const strokeGrad = ctx.createLinearGradient(0, 0, 0, 100);
	strokeGrad.addColorStop(strokeStop1, strokeColor1);
	strokeGrad.addColorStop(strokeStop2, strokeColor2);
	ctx.strokeStyle = strokeGrad;
	ctx.lineWidth = 10;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.strokeText(sample, 0, 50);

	const {fillColor1, fillColor2, fillStop1, fillStop2} = getGradientFill()
	const fillGrad = ctx.createLinearGradient(0, 0, 0, 100);
	fillGrad.addColorStop(fillStop1, fillColor1);
	fillGrad.addColorStop(fillStop2, fillColor2);
	ctx.fillStyle = fillGrad;
	ctx.fillText(sample, 0, 50);
}


global.changedSolidFill = function() {
	const {value: color} = document.getElementById("bmfnt-solid-fill-picker");
	const ctx = document.getElementById("bmfnt-solid-fill-canvas").getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 100, 32);
	updateSampleText();
}

global.changedGradientFill = function() {
	const {fillColor1, fillColor2, fillStop1, fillStop2} = getGradientFill()
	const ctx = document.getElementById("bmfnt-gradient-fill-canvas").getContext("2d");
	const grad = ctx.createLinearGradient(0, 0, 100, 0);
	grad.addColorStop(fillStop1, fillColor1);
	grad.addColorStop(fillStop2, fillColor2);
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, 100, 32);
	updateSampleText();
}

global.changedSolidStroke = function() {
	const {value: color} = document.getElementById("bmfnt-solid-stroke-picker");
	const ctx = document.getElementById("bmfnt-solid-stroke-canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.strokeRect(0, 0, 100, 32);
	updateSampleText();
}

global.changedGradientStroke = function() {
	const {strokeColor1, strokeColor2, strokeStop1, strokeStop2} = getGradientStroke()
	const ctx = document.getElementById("bmfnt-gradient-stroke-canvas").getContext("2d");
	const grad = ctx.createLinearGradient(0, 0, 100, 0);
	grad.addColorStop(strokeStop1, strokeColor1);
	grad.addColorStop(strokeStop2, strokeColor2);
	ctx.strokeStyle = grad;
	ctx.strokeRect(0, 0, 100, 32);
	updateSampleText();
}

global.openTab = function(clazz, id) {
	for (const el of document.getElementsByClassName(`bmfnt-tab-${clazz}`)) {
		el.style.display = (el.id === `bmfnt-tab-${clazz}-${id}`) ? "block" : "none";
	}
	for (const el of document.getElementsByClassName(`bmfnt-tablink-${clazz}`)) {
		el.className = el.className.replace(" w3-red", "");
	}
	document.getElementById(`bmfnt-tablink-${clazz}-${id}`).className += " w3-red";
}

global.init = function() {
	changedSolidFill();
	changedGradientFill();
	changedSolidStroke();
	changedGradientStroke();
}
