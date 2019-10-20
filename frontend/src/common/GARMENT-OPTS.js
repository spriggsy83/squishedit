const LIMBS = ['arm', 'leg'];

const COMPRESSCLASS = ['class 1', 'class 2', 'class 3', 'class 4'];

const TYPES = [
	'sleeve without gauntlet',
	'sleeve with gauntlet',
	'gauntlet',
	'glove',
];

const MPOINTS = ['a', 'b', 'b1', 'c', 'c1', 'd', 'e', 'e1', 'f', 'g', 'y'];

const DEFAULTS = {
	name: '',
	limb: 'arm',
	type: 'sleeve with gauntlet',
	compressionLevel: 'class 1',
	brand: '',
	sizeLabel: '',
	lengths: '',
	notes: '',
	aMin: '',
	aMax: '',
	bMin: '',
	bMax: '',
	b1Min: '',
	b1Max: '',
	cMin: '',
	cMax: '',
	c1Min: '',
	c1Max: '',
	dMin: '',
	dMax: '',
	eMin: '',
	eMax: '',
	e1Min: '',
	e1Max: '',
	fMin: '',
	fMax: '',
	gMin: '',
	gMax: '',
	yMin: '',
	yMax: '',
};

export { LIMBS, TYPES, COMPRESSCLASS, MPOINTS, DEFAULTS };
