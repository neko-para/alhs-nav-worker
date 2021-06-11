function IsPC() {  
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
	var flag = true;
	Agents.forEach(function (a) {
		if (userAgentInfo.indexOf(a) > 0) {
			flag = false;
		}
	});
	return flag;
}
var img = new Image();
img.onload = function () {
	var atan = img.height / img.width;
	var mx = 0.5, my = 0.5;
	
	function update() {
		var ratan = window.innerHeight / window.innerWidth;
		let height, width;
		let ofsx, ofsy;
		if (atan >= ratan) {
			width = window.innerWidth;
			height = width * atan;
			ofsx = 0;
			ofsy = -(height - window.innerHeight) * my;
		} else {
			height = window.innerHeight;
			width = height / atan;
			ofsx = -(width - window.innerWidth) * mx;
			ofsy = 0;
		}
		img.setAttribute('style', 'top: ' + ofsy + 'px; left: ' + ofsx + 'px; width: ' + width + 'px; height: ' + height + 'px;')
	};
	window.onresize = update;
	document.body.onmousemove = function (e) {
		mx = e.clientX / window.innerWidth;
		my = e.clientY / window.innerHeight;
		update();
	};
	update();
	$('body').prepend(img);
};
if (IsPC()) {
	img.src = `${root}/BG.jpg`;
} else {
	img.src = `${root}/BG_mb.jpg`;
	document.body.setAttribute('class', 'mobile');
}
$(document).ready(function () {
	$('#black').click(function () {
		$('#black').attr('class', 'hide');
	});
	$('.title').text(info.title);
	[ 'dom', 'int', 'cdn'].forEach(t => {
		var desc = {
			normal: '正常',
			unstable: '不稳定',
			maintain: '维护中'
		}[info.state[t]];
		var item = $(`#state > .state_item[alt="${t}"]`);
		$('.state_circ', item).attr('alt', info.state[t]);
		$('.state_text', item).text(desc);
	});
	info.subt.forEach(function (str) {
		$('#inner').append($('<span />').text(str));
	});
	info.link.forEach(function (lk) {
		var lnk = $('<a target="_blank" />').attr('href', lk.target);
		if (IsPC()) {
			if (lk.name.indexOf('\n') === -1) {
				lnk.text(lk.name);
			} else {
				var sp = lk.name.split('\n');
				lnk.text(sp[0]);
				lnk.hover(function () {
					lnk.text(sp[1]);
				}, function () {
					lnk.text(sp[0]);
				})
			}
		} else {
			lnk.text(lk.name.replace('\n', ' '));
		}
		$('#link').append(lnk);
	});
	info.announce.forEach(function (obj) {
		var dt = obj.content.split('\n');
		var sp = $('<span />').text(obj.title).click(function () {
			$('#detail p').remove();
			dt.forEach(s => {
				$('#detail').append($('<p />').text(s));
			});
			$('#black').attr('class', 'show');
		});
		if (obj.important) {
			sp.attr('class', 'important');
		}
		$('#announce').append(sp);
	});
	$('#inner_wrap').attr('class', 'show');
	document.getElementById('inner_wrap').addEventListener('transitionend', function () {
		$('#padding').css('height', $('#board').height() + 50);
		$('#board').css('top', $('#content').position().top + $('#content').height() + 50).css('opacity', 1);
	}, false);
});