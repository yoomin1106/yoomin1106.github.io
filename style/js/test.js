var test = (function(mod){
	var str = '<input type="text" id="test" style="position:fixed;top:0;left:0;z-index:999999;width:130px;background:#fff;">';
	var div = document.createElement('div');
	div.innerHTML = str;
	document.getElementsByTagName('body').appendChild(div);
	var input = div.getElementById('test');

	mod.print = function(str,way){
		if(way === 'realTime') {
			mod.timer = setInterval(function(){
				input.value = str;
			},30);
		}else {
			input.value = str;
		}
	};
	return mod;
})({});