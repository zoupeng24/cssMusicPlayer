(function(){
	var Tap = function(songs){
		this.songs = songs;
	};
	var Reader = function(tap){
		this.statusList = ['stop', 'playing', 'paused', 'switching'];
		this.status = this.statusList[0];
		this.flag = 0;
		this.tap = tap;
		this.songsnNum = this.tap.length;
		this.buttonSound = null;
	};
	Reader.prototype.stop = function(){
		this.pause();
		this.tap.songs[this.flag].currentTime = 0;
	};
	Reader.prototype.play = function(){
		this.tap.songs[this.flag].play();
		this.status = this.statusList[1];
		this.render();
	};
	Reader.prototype.pause = function(){
		this.tap.songs[this.flag].pause();
		this.status = this.statusList[2];
		this.render();
	};
	Reader.prototype.prev = function(){
		if(this.flag > 0){
			if(this.status === this.statusList[1]){
				this.pause();
				this.flag--;
				this.play();
			} else {
				this.flag--;
			}
		}
	};
	Reader.prototype.next = function(){
		if(this.flag < this.tap.songs.length){
			if(this.status === this.statusList[1]){
				this.pause();
				this.flag++;
				this.play();
			}
		}		
	};
	Reader.prototype.render = function(){
		if(this.status === this.statusList[1]) {
			$('.rotatable').addClass('rotating');
		} else {
			$('.rotatable').removeClass('rotating');
		}
	};
	
	var bindEvents = function(reader){
		$('.clickable').on('mouseup',function(){
			$(this).removeClass('pressed');
		});
		$('.pressable,.clickable').on("mousedown",function(){
			var me = $(this);
			if(!me.hasClass('pressed')) {
				me.addClass('pressed');
				//TODO:switch instead of this part.
				if(!me.hasClass('clickable')){
					me.siblings('.pressable').removeClass('pressed');
				}				
				if(me.hasClass("start_btn")){
					reader.play();
				}
				if(me.hasClass("pause_btn")){
					reader.pause();
				}
				if(me.hasClass("next_btn")){
					reader.next();
				}
				if(me.hasClass("prev_btn")){
					reader.prev();
				}
				if(me.hasClass("stop_btn")){
					reader.stop();
				}
			}
		});
	}
	var init = function(){
		var tap = new Tap(new Array());
		tap.buttonSound = document.getElementById('btnSound');
		for(var i=0; i<$('.songs').length; i++){
			tap.songs[i] = document.getElementById('tap1_'+ (i+1));	
		}
		var reader = new Reader(tap);
		bindEvents(reader);
	};
	$(document).ready(function(){
		init();
	})
})();