(function(){
	//localStorge 储存调用
				
				var Util=(function(){
					var StorgeGetter=function(key){
           
						return localStorage.getItem(prefix + key);


					}
					var StorgeSetter=function(key,val){
						return localStorage.setItem(prefix + key,val);

					}
					var getBSONP=function(url,callback){
						return $.jsonp({
							url:url,
							cathe:true,
							callback:'duokan_fiction_chapter',
							success:function(result){
							decodeURICompomentdddd
								var data=$.base64.decode(result);								
								var json=decodeURICompoment(escape(data));
								callback(data);
							}

						})

					}
					
					return {
						getBSONP:getBSONP,
						StorgeGetter:StorgeGetter,
						StorgeSetter:StorgeSetter
					}

				})();
			
				var prefix='html_reader_';
				var Dom={
					"top_nav":$("#top-nav"),
					"bottom":$("#m-button-menu"),
					"night_day_switch":$('.day-night-swtich'),
					"m_read_container":$('.m-read-container'),					
					'nav_pannel_zone':$('.nav-pannel_zone')				
							
				};				
			var Win=$(window);
			var Doc=$(document);
			var default_fontsize=Util.StorgeGetter('font_size');		
			default_fontsize=parseInt(default_fontsize);
			if(!default_fontsize){
				default_fontsize=14;
			}
			$('#fiction_container').css('font-size',default_fontsize);

			var background_color=Util.StorgeGetter('background_color');			
			if (!background_color) {
				background_color=$('.bk-container').css('background');
			}
			
			$('body').css('background',background_color);


			function ReaderModel(){
				var Chapter_id;
				var init= function(){
					getFictionInfo(function(){
						getCurrentChapter(Chapter_id,function(){

						});
					})
				}
					//跟服务器端的交互
					var getFictionInfo=function(callback){
					$.get('data/chapter.json', function(data){
						Chapter_id=data.chapters[1].chapter_id;
						callback&& callback();
					}, 'json');
					}
					var getCurrentChapter =function(chapter_id,data){
						$.get('data/data'+chapter_id+'.json',function(data){
							if(data.result ==0){
								var url=data.jsonp;
								Util.getBSONP(url,function(data){
									callback && callback(data);
								});

							}
						},'json')
					}
					return {
						init:init
					}

				}
				function ReaderFrame(){
					// TODO 渲染结构


				}
				function EventHandler(){						

					//绑定事件
					$('#js-article-action').click(function(){
						
						if (Dom.top_nav.css('display') =='none') {
							Dom.top_nav.show();
							Dom.bottom.show();

					}else{
						Dom.top_nav.hide();
						Dom.bottom.hide();
						Dom.nav_pannel_zone.hide();
						$('.icon-font-yellow').hide();
						$('.icon-font').show();
						}
					});
					$('#m-dayandnigtht').click(function(){
						//切换夜间和白天模式

						if ($('.m-day').css('display')=='none') {
							$('.m-night').hide();
							background_color='black';
							$('body').css('background',background_color);
							$('.m-day').show();
            			    Util.StorgeSetter('background_color',background_color);
						}
						else {
								$('.m-night').show();
								$('body').css('background',"#e9dfc7");
								$('.m-day').hide();
								background_color="#e9dfc7";
								Util.StorgeSetter('background_color',background_color);
						}		


					});
					$('#m_font').click(function(){
						//唤出字体图标面板，改变图标
						
						if(Dom.nav_pannel_zone.css('display')=='none'){
							Dom.nav_pannel_zone.show();
							$('.icon-font-yellow').show();
							$('.icon-font').hide();


						}
						else{
							Dom.nav_pannel_zone.hide();
							$('.icon-font-yellow').hide();
							$('.icon-font').show();
						}

					});


			$('#large_font').click(function(){
				//字体放大
				if(default_fontsize > 20){
					return;
				}				
				default_fontsize+=1;
				$('#fiction_container').css('font-size',default_fontsize);
				Util.StorgeSetter('font_size',default_fontsize);
			});


			$('#small_font').click(function(){
				//字体变小
				
				if(default_fontsize<12){
					return;
				}
				default_fontsize-=1;
				$('#fiction_container').css('font-size',default_fontsize);
				Util.StorgeSetter('font_size',default_fontsize);
			});

			$('.bk-container:nth-child(2)').click(function(){
				background_color='#f7eee5';
				$('body').css('background',background_color);
				Util.StorgeSetter('background_color',background_color);

			});
			$('.bk-container:nth-child(3)').click(function(){
				background_color='#e9dfc7';
				$('body').css('background',background_color);
				Util.StorgeSetter('background_color',background_color);

			});
			$('.bk-container:nth-child(4)').click(function(){
				background_color='#a4a4a4';
				$('body').css('background',background_color);
				Util.StorgeSetter('background_color',background_color);

			});
			$('.bk-container:nth-child(5)').click(function(){
				background_color='#cdefce';
				$('body').css('background',background_color);
				Util.StorgeSetter('background_color',background_color);

			});
			$('.bk-container:nth-child(6)').click(function(){
				background_color='rgba(255,255,255,0.7)';
				$('body').css('background',background_color);
				Util.StorgeSetter('background_color',background_color);

			});
			$('.bk-container:nth-child(7)').click(function(){
				background_color='#000';
				console.log(background_color);
				$('body').css('background',background_color);
				Util.StorgeSetter('background_color',background_color);

			});
					
					Win.scroll(function(){
						
						Dom.top_nav.hide();
						Dom.bottom.hide();
					});
				}
			function main(){
				//整个项目的入口函数
				var readerModel = ReaderModel();
				readerModel.init();
				EventHandler();
				alert(11);
				
			}
			main();
			})();