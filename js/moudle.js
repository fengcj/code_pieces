var global = {};

function Ticker() {
	throw new Error("Ticker can not be instantiated");
}

Ticker.addLog = function(log) {
	console.log("Ticker log: " + log);
}

global.Ticker = Ticker;


global.Ticker.addLog("can be success?");



(function() {
	console.log("can be execute?");
})();

(function() {
	console.log("can be execute?");
}());


/*Ticker._addEventListener = Ticker.addEventListener;
Ticker.addEventListener = function(){
	console.log("what's this?");
	Array.prototype.slice.apply({
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    length: 5
});
	return Ticker._addEventListener.apply(Ticker,arguments);
}

global.Ticker.addEventListener();*/


var jsonStr = '{
	"frames": {

		"chaingun.png": {
			"frame": {
				"x": 1766,
				"y": 202,
				"w": 42,
				"h": 34
			},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {
				"x": 38,
				"y": 32,
				"w": 42,
				"h": 34
			},
			"sourceSize": {
				"w": 128,
				"h": 128
			}
		},
		"chaingun_impact.png": {
			"frame": {
				"x": 1162,
				"y": 322,
				"w": 38,
				"h": 34
			},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {
				"x": 110,
				"y": 111,
				"w": 38,
				"h": 34
			},
			"sourceSize": {
				"w": 256,
				"h": 256
			}
		},
		"chaingun_impact_0000.png": {
			"frame": {
				"x": 494,
				"y": 260,
				"w": 22,
				"h": 22
			},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {
				"x": 113,
				"y": 108,
				"w": 22,
				"h": 22
			},
			"sourceSize": {
				"w": 256,
				"h": 256
			}
		},
		"chaingun_impact_0001.png": {
			"frame": {
				"x": 1500,
				"y": 1904,
				"w": 34,
				"h": 30
			},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {
				"x": 104,
				"y": 104,
				"w": 34,
				"h": 30
			},
			"sourceSize": {
				"w": 256,
				"h": 256
			}
		},
		"chaingun_impact_0002.png": {
			"frame": {
				"x": 888,
				"y": 366,
				"w": 38,
				"h": 32
			},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {
				"x": 106,
				"y": 105,
				"w": 38,
				"h": 32
			},
			"sourceSize": {
				"w": 256,
				"h": 256
			}
		},
		"chaingun_impact_0003.png": {
			"frame": {
				"x": 990,
				"y": 84,
				"w": 32,
				"h": 28
			},
			"rotated": false,
			"trimmed": true,
			"spriteSourceSize": {
				"x": 113,
				"y": 109,
				"w": 32,
				"h": 28
			},
			"sourceSize": {
				"w": 256,
				"h": 256
			}
		}
	},
	"meta": {
		"app": "http://www.texturepacker.com",
		"version": "1.0",
		"image": "grits_effects.png",
		"format": "RGBA8888",
		"size": {
			"w": 2048,
			"h": 2048
		},
		"scale": "1",
		"smartupdate": "$TexturePacker:SmartUpdate:a5e0b1932a348d048c58a625408c4276$"
	}
}';

console.log(jsonStr);