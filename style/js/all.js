(function(){
	(new PointClock('pointClock',100)).init();  // 钟表
})();

// 钟构造函数(画布id，钟表半径)
function PointClock(id,radius) {
	var c = document.getElementById(id);
	var ck = c.getContext('2d');
	var wid = Math.floor(radius*1.1);  // 画布半径
	c.width = 2*wid;
	c.height = 2*wid;
	var that = this;
	var bigRadius = Math.floor(radius*0.05),  // 大圆点半径
		smallRadius = Math.floor(radius*0.03),
		hLen= Math.floor(radius*0.6);  // 时针长度
		mLen= Math.floor(radius*0.8);
		sLen= Math.floor(radius*0.9);
		hWid= Math.floor(radius*0.03);  //时针宽度
		mWid= Math.floor(radius*0.02);
		sWid= Math.floor(radius*0.01);

	
	// 初始化
	this.init = function() {
		that.draw();
		setInterval(function(){
			that.draw();
		},1000);
	}

	// 重画整个钟表
	this.draw = function() {
		// 清空画布
		ck.clearRect(0,0,2*wid,2*wid);

		// 时刻度
		for (var i = 0; i < 12; i++) {
			ck.save();
			// 颜色
			ck.fillStyle = 'blue';
			// 改变原点位置
			ck.translate(wid,wid); 
			ck.rotate(i*30*Math.PI/180);
			ck.beginPath();
			if(i%3 === 0) {
				ck.fillStyle = 'red';
				ck.arc(0,radius,bigRadius,0,360,false);
			}else {
				ck.arc(0,radius,smallRadius,0,360,false);
			}
			ck.closePath();
			ck.fill();  // 填充圆点
			ck.restore();
		};

		
		// 获得时间
		var now = new Date();
		var h = now.getHours(),
			m = now.getMinutes(),
			s = now.getSeconds();
		// 转为12小时制
		h = h > 12? h-12 : h;
		h = h + m/60;

		// 时针
		ck.save();
		// 时针宽度
		ck.lineWidth = Math.floor(radius*0.03);
		// 时针颜色
		ck.strokeStyle = '#000';
		ck.translate(wid,wid);
		ck.rotate(h*30*Math.PI/180);
		ck.beginPath();
		ck.moveTo(0,Math.floor(radius*0.05));
		ck.lineTo(0,-hLen);
		ck.closePath();
		ck.stroke();
		ck.restore();

		// 分针
		ck.save();
		ck.lineWidth = Math.floor(radius*0.02);;
		ck.strokeStyle = '#333';
		ck.translate(wid,wid);
		ck.rotate(m*6*Math.PI/180);
		ck.beginPath();
		ck.moveTo(0,Math.floor(radius*0.07));
		ck.lineTo(0,-mLen);
		ck.closePath();
		ck.stroke();
		ck.restore();

		// 秒针
		ck.save();
		ck.lineWidth = Math.floor(radius*0.01);
		ck.strokeStyle = 'red';
		ck.translate(wid,wid);
		ck.rotate(s*6*Math.PI/180);
		ck.beginPath();
		ck.moveTo(0,Math.floor(radius*0.08));
		ck.lineTo(0,-sLen);
		ck.closePath();
		ck.stroke();
		// 中心小圆 
		ck.beginPath();
		ck.arc(0,0,Math.floor(radius*0.03),0,360);
		ck.closePath();
		ck.fillStyle = '#fff';
		ck.fill();

		ck.stroke();
		ck.restore();
	}
}