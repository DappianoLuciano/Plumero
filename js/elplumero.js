/* El Plumero — flipbook JS */

// 20 fotos en orden. El 41.jpg no existe.
var _photos = [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,42,43,44,45];

// ─── Dimensiones ──────────────────────────────────────────────────────────────
// Página: 720 × 960
// Área de foto por página: 670 × 860  (margen 50px exterior/arriba/abajo, 0 en lomo)
// Imagen en spread: 1340px de ancho  (2 × 670)

var IMG_W    = 898;   // ancho total de la imagen en el spread  (1340 × 0.67)
var HALF_W   = 449;   // ancho visible por página              (670  × 0.67)
var WRAP_H   = 576;   // alto del contenedor de foto           (860  × 0.67)

// ─── HTML de la media foto ────────────────────────────────────────────────────

function makePhotoHtml(photoNum, side) {
	var isLeft   = (side === 'left');
	var margin   = isLeft
		? 'margin:34px 0 34px 34px;'
		: 'margin:34px 34px 34px 0;';
	var imgShift = isLeft ? '' : 'margin-left:-' + HALF_W + 'px;';
	var shadow   = isLeft
		? 'box-shadow:inset -8px 0 14px -8px rgba(0,0,0,0.20);'
		: 'box-shadow:inset  8px 0 14px -8px rgba(0,0,0,0.20);';

	return '<div class="photo-half" style="'
		+ margin
		+ 'width:' + HALF_W + 'px;height:' + WRAP_H + 'px;'
		+ 'overflow:hidden;display:flex;align-items:center;'
		+ shadow + '">'
		+ '<img src="pics/' + photoNum + '.jpg" '
		+ 'style="display:block;width:' + IMG_W + 'px;flex-shrink:0;' + imgShift + '">'
		+ '</div>';
}

// ─── Constructores de página ──────────────────────────────────────────────────

function makePhotoPage(photoNum, side) {
	var div = document.createElement('div');
	div.className = 'own-size';
	div.innerHTML = makePhotoHtml(photoNum, side);
	return div;
}

function makeBlankPage() {
	var div = document.createElement('div');
	div.className = 'own-size';
	// Completar innerHTML para agregar texto u otro contenido.
	return div;
}

// ─── Construcción del libro ───────────────────────────────────────────────────
// p1      = portada     (hard cover-front)  → vista 1: sola
// p2-p41  = 20 fotos × 2 páginas           (inner)
// p42     = contratapa  (hard back-cover)   → vista 22: sola

function buildInnerPages() {
	var book         = document.querySelector('.sj-book');
	var insertBefore = book.querySelector('.back-cover');

	for (var i = 0; i < _photos.length; i++) {
		var n = _photos[i];
		book.insertBefore(makePhotoPage(n, 'left'),  insertBefore);
		book.insertBefore(makePhotoPage(n, 'right'), insertBefore);
	}
}

function addPage(page, book) {
	// fallback por si turn.js pide páginas no generadas
}

function isChrome() {
	return navigator.userAgent.indexOf('Chrome') !== -1;
}
