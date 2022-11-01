var fishc = function(div) {
	var $obj = $("#" + div); //目标容器
	$obj.addClass("beijing") //给目标容器增加需要的样式
	$qipan = $("<table class='qipan'></table>") //渲染table表作为棋盘
	$qipan.appendTo($obj) //添加进目标容器
	for (var i = 0; i < 14; i++) { //绘制14×14的棋盘格子，并且把下标标进去以便后面有用
		var $row = $("<tr></tr>")
		for (var j = 0; j < 14; j++) {
			var $line = $("<td data-row='" + i + "' data-line='" + j + "'></td>")
			$line.appendTo($row);
		}
		$row.appendTo($qipan);
	}
	return {
		$obj: $obj, //缓存容器
		$arrs: [], //缓存棋子数据
		$qipan: $qipan, //缓存棋盘
		$action: true, //是否正在游戏中
		$now: 'white', //当前落子方
		load: function() {
			var that = this; //作用域
			var tdw = that.$obj.width() * 0.92 / 14; //每个格子边长
			that.$qipan.find("td").click(function(e) { //某个td被点击之后，判断点击的位置距离这个td的四个角哪个角最近然后就视为落子点，再进行落子操作
				var temp = Object.assign({}, $(this)[0].dataset) //获取
				var f1 = e.offsetX > tdw / 2;
				var f2 = e.offsetY > tdw / 2; //定位落子的位置是在四个角的哪一个
				var index = { //生成点击的坐标点
					x: f1 ? parseInt(temp.line) + 1 : parseInt(temp.line),
					y: f2 ? parseInt(temp.row) + 1 : parseInt(temp.row),
					c: that.$now
				}
				//把坐标点给到落子实现
				that.luozi(index);

			})
		},
		luozi: function(index) {
			var that = this;
			if (that.exist(index) && that.$action) {
				that.$arrs.push(index)
				var $qizi = $("<div class='" + index.c + "' data-row='" + index.y + "' data-line='" + index.x + "'></div>")
				if(index.x<14&&index.y<14){
					$qizi.appendTo($obj.find("td[data-row='" + index.y + "']td[data-line='" + index.x + "']"))
				}
				if(index.x==14&&index.y<14){
					$qizi.appendTo($obj.find("td[data-row='" + index.y + "']td[data-line='" + 13 + "']"))
					$qizi.css({"left":"50%"})
				}
				if(index.x<14&&index.y==14){
					$qizi.appendTo($obj.find("td[data-row='" + 13 + "']td[data-line='" + index.x + "']"))
					$qizi.css({"top":"50%"})
				}
				if(index.x==14&&index.y==14){
					$qizi.appendTo($obj.find("td[data-row='" + 13 + "']td[data-line='" + 13 + "']"))
					$qizi.css({"top":"50%","left":"50%"})
				}
				that.$now = that.$now == "white" ? "black" : "white";
			}
			//落子之后进入胜负检查
			that.check();
		},
		exist: function(t) { //检查该坐标是否可以落子
			var temp = this.$arrs.find(n=>n.x==t.x&&n.y==t.y);
			var flag = temp==undefined?true:false;
			return flag;
		},
		check:function(){//检查当前棋盘中是否有获胜的棋子出现，符合条件的话就进入结算界面
			var that =this;
			for(var i = 0;i<that.$arrs.length;i++){
				var t = that.$arrs[i];
				//检查横的→
				var t2 = that.$arrs.find(n=>n.x==t.x+1&&n.y==t.y&&n.c==t.c)
				var t3 = that.$arrs.find(n=>n.x==t.x+2&&n.y==t.y&&n.c==t.c)
				var t4 = that.$arrs.find(n=>n.x==t.x+3&&n.y==t.y&&n.c==t.c)
				var t5 = that.$arrs.find(n=>n.x==t.x+4&&n.y==t.y&&n.c==t.c)
				if(t2&&t3&&t4&&t5){
					that.end(t,t2,t3,t4,t5)
				}
				//检查竖的↓
				var t2 = that.$arrs.find(n=>n.x==t.x&&n.y==t.y+1&&n.c==t.c)
				var t3 = that.$arrs.find(n=>n.x==t.x&&n.y==t.y+2&&n.c==t.c)
				var t4 = that.$arrs.find(n=>n.x==t.x&&n.y==t.y+3&&n.c==t.c)
				var t5 = that.$arrs.find(n=>n.x==t.x&&n.y==t.y+4&&n.c==t.c)
				if(t2&&t3&&t4&&t5){
					that.end(t,t2,t3,t4,t5)
				}
				//检查斜的1↘
				var t2 = that.$arrs.find(n=>n.x==t.x+1&&n.y==t.y+1&&n.c==t.c)
				var t3 = that.$arrs.find(n=>n.x==t.x+2&&n.y==t.y+2&&n.c==t.c)
				var t4 = that.$arrs.find(n=>n.x==t.x+3&&n.y==t.y+3&&n.c==t.c)
				var t5 = that.$arrs.find(n=>n.x==t.x+4&&n.y==t.y+4&&n.c==t.c)
				if(t2&&t3&&t4&&t5){
					that.end(t,t2,t3,t4,t5)
				}
				//检查斜的2↙
				var t2 = that.$arrs.find(n=>n.x==t.x-1&&n.y==t.y+1&&n.c==t.c)
				var t3 = that.$arrs.find(n=>n.x==t.x-2&&n.y==t.y+2&&n.c==t.c)
				var t4 = that.$arrs.find(n=>n.x==t.x-3&&n.y==t.y+3&&n.c==t.c)
				var t5 = that.$arrs.find(n=>n.x==t.x-4&&n.y==t.y+4&&n.c==t.c)
				if(t2&&t3&&t4&&t5){
					that.end(t,t2,t3,t4,t5)
				}
			}
		},
		end:function(){//结算界面，展示所有棋子的状况，并且此时允许点击询问是否重开
			var that = this;
			if(that.$action){
				that.$action=false;
				//首先把所有棋子的先后顺序全部标出来
				for(var i = 0;i<that.$arrs.length;i++){
					var t = that.$arrs[i];
					that.$qipan.find("div[data-row='"+t.y+"']div[data-line='"+t.x+"']").html(i+1)
				}
				//然后把获胜的那五个棋子标记出来
				console.log(arguments)
				for(var i = 0;i<arguments.length;i++){
					var t = arguments[i];
					that.$qipan.find("div[data-row='"+t.y+"']div[data-line='"+t.x+"']").addClass("win")
				}
				that.$qipan.find("td").click(function(){
					if(that.$action==false&&confirm("鱼油是否重新开始？")){
						that.reload();
					}
				})
			}
		},
		reload:function(){//重开
			var that = this;
			that.$arrs=[];
			that.$qipan.find(".white,.black").remove();//把所有落子清空
			that.$now="white";
			that.$action=true;
		}
	}
}

