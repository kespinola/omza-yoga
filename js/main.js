(function(window, $){

	var 
	$doc = $(document),
	$body = $('body'),
	$win = $(window),
	classes = window.classes,
	arg = '',
	ROUTE_HOME = 1,
	ROUTE_STUDIO = 2,
	ROUTE_TEACHER = 3,
	ROUTE_PLACE = 4,
	ROUTE_CLASS = 5,
	mode = ROUTE_HOME;

	function init() {
		switch_mode();
		$('.filter-btn').css('hidden');
	}

	function switch_mode() {
		var path = window.location.hash;
		arg = path.split('/');
		if (arg.length > 1) {
			arg = arg[1].replace('-',' ');
		}
		if (mode) {
			$body.removeClass('mode-'+mode);
		}
		if (!path || path === '/') {
			
			mode = ROUTE_HOME;
			reset_filter();

		} 
		// Studio
		else if (/s\//.test(path)) {
			mode = ROUTE_STUDIO;
			var cls = classes[+arg];
			$('.studio-img').css('backgroundImage', 'url(./img/studio-'+cls.studio_id+'.png)');
			$('.studio-head h3').text(cls.studio_name+' Yoga Studio');
			load_filter();
			filterData();
			
		}
		// Teacher
		else if (/t\//.test(path)) {
			mode = ROUTE_TEACHER;
			var cls = classes[+arg];
			var img = cls.teacher_image ? './img/t/'+cls.teacher_image+'.jpg' : 'img/omza-thumbnail.png';
			$('.studio-img').css('backgroundImage', 'url('+img+')');
			$('.studio-head h3').text(cls.teacher_name);
			load_filter();
			filterData();
		}
		// Place
		else if (/p\//.test(path)) {
			mode = ROUTE_PLACE;
			$('.studio-head h3').text('Santa Barbara Yoga');
			load_filter();
			filterData();
			$('.studio-img').css('backgroundImage', 'url(img/omza-icon.png)');
		}
		// Class
		else if (/c\//.test(path)) {
			mode = ROUTE_CLASS;
			var c = classes[+arg];
			load_class(c);
			
		}
		else {
			filterData();
		}
		$('.class-wrap').scrollTop(0);
		$body.addClass('mode-'+mode);
		$('.js-slider').slider();
	}

	
	function slider_html (val, type, label) {
		return ''
		+'<div class="js-slider on slider nosel slider-'+type+'" data-pct="'+val+'">'
		+	'<div class="slider-img"></div>'
		+	'<div class="slider-bg">'
		+		'<div class="slider-l">'+label+'</div>'
		+		'<div class="slider-i t02">'
		+		'<div class="slider-l">'+label+'</div>'
		+		'</div>'
		+	'</div>'
		+'</div>';
	}

	function load_filter(){
		$('.detail-nodes').css("display", "inline").removeClass('hidden');
		$('.time-btns').addClass('inline-block');
		$('.sliders').css('width','260px');
		$('.filter-btn').css('display','block');

	};
	function day_of_week(id){
		var days = [ "Monday","Tuesday","Wednesday","Thursday", "Friday","Saturday", "Sunday"];
		return days[id];
	};
	function day_node(id){
		var days = [ "Mon","Tues","Wed","Thu", "Fri","Sat", "Sun"];
		return days[id];
	};

	function reset_filter(){
		$('.nodes, .week').css('width','100%');
		$('.sliders').css('width','75%');
		$('.filter-btn').css('display','none').removeClass('left-shift-filter');
		$('.sub-pane1').removeClass('hide-filter');
		$('.sliders, .nodes, .class-features, .calendar-wrapper, .time-btns, .calendar-btn').removeClass('hidden');
		$('.time-btns').removeClass('inline-block');
		$('.detail-nodes').addClass('hidden');

	};
	function node_html (on, type, label) {
		return ''
		+'<div class="node node-'+ type + (on ? ' on' : ' off') + '">'
		+'<span>'+label+'</span>'
		+'</div>';
	};
	function clear_times(){
		$.each(['morning','afternoon','night'], function(i,e,j){
			j = $('.node-'+e);
			j.removeClass('on');

		})

	};

	function clear_days(){
		for(var i=0;i<7;i++){
			$('.day-'+i).removeClass('on');
		}
	};

	function reset () {
		$('.pane1 .node').removeClass('on');
		clear_times();
		clear_days();
		var $sliders = $('.pane1 .js-slider');
		$sliders.find('.slider-i').data('pct',50);
		$sliders.find('.slider-bg').click();
		$sliders.removeClass('on');
		filterData();
	}
	$doc.on('click', '.reset', function(){
		reset();
	});

	function load_classes (classes) {
		var classList = $('.class-list').empty();
		var html = '',image, studio_image;
		$.each(classes, function(i){
			image = this.teacher_image ? 'img/t/'+this.teacher_image+'.jpg' : 'img/omza-thumbnail.png';
			studio_image = this.studio_id ? 'img/studio-'+this.studio_id+'.png' : 'img/omza-thumbnail.png';
			html += ''
			+'<li class="class-li hook-class" data-id="'+this.class_id+'">'
			+	'<div class="hook-studio" data-id="'+this.class_id+'">'
			+		'<div class="studio-border t02"><div class="studio-thumb" style="background-image:url('+studio_image+')"></div></div>'
			+		'<div class="studio-name"><p>'+this.studio_name+'</p></div>'
			+	'</div>'
			+'<hr class="divide-class t02">'
			+'<div class="btn btn-primary btn-schedule btn-small"><a href="http://sb.divinitree.com/schedule/register/#'+day_node(this.class_day)+'" tagrget="_blank" onClick="_gaq.push([‘_trackEvent’, ‘Links’,’Schedule’, ’Class list view’,'0'])">Schedule Class</a></div>'
			+	'<div class="class-left hook-teacher" data-id="'+this.class_id+'">'
			+		'<div class="class-icon" style="background-image:url('+image+')"></div>'
			+		'<div class="class-sub">'+this.teacher_name+'</div>'
			//+	'<div class="class-rating" data-rating="'+((Math.random()*2)+3)+'"><div class="class-rating-i"></div></div>'
			+	'</div>'
			+	'<div class="class-right">'
			+		'<h3>'+this.class_name+'</h3>'
			+	'</div>'

			+	'<div class="class-date day-'+this.class_day+'">'
			+		'<div class="class-day">'+day_of_week(this.class_day)+'</div>'
			+		'<div class="class-time">'+this.class_start+'</div>'
			+	'</div>'
			+'</li>';
			if (i >= 35) {
				return false;
			}
		});
		if (!html) {
			html = ''
			+'<div class="no-results">'
			+	'<h3>No classes matched your preferences</h3>'
			+	'<h4 class="reset">Reset</h4>'
			+'</div>';
		}
		classList.html(html);
		classList.find('.class-rating').each(ratings);
		$(".filter-btn").removeClass('hidden');
	}

	function detail_opt(val, sub) {
		if (sub === 'Duration') {
			val = val + 'min';
		}
		return val ? '<div class="detail-opt">' + val + '<span>' + sub + '</span></div>' : '';
	}

	function load_class(c) {
		var classList = $('.class-list').empty();
		var $detail = $('.detail').empty();
	
		image = c.teacher_image ? 'img/t/'+c.teacher_image+'.jpg' : 'img/omza-thumbnail.png';
		class_header = c.class_description ? '<h3 class="description-head"><i class="fa fa-book"></i><span class="description-title">Class Description</span><i class="fa fa-caret-left label-end"></i></h3>' : '';
		var html = ''
	
		+'<div class="detail-wrap">'
		+'<div class="detail-clear">'

		+'<div class="detail-top">'
		+	'<div class="header-info">'

		+		'<i class="fa fa-chevron-left back-btn" onCLick="history.back()"></i>'
		+		'<h1 class="detail-title">'+c.class_name+'</h1>'
		+		'<div class="hook-teacher" data-id="'+c.class_id+'"><div class="teacher-img t02" style="background-image:url('+image+')"></div></div>'
		+		'<div class="teacher-name"><span class="sub-title">with </span><h3 class="hook-teacher" data-id="'+c.class_id+'">'+c.teacher_name+'</h3></div>'
		//+		'<div class="class-rating omza-fit-detail" data-rating="'+((Math.random()*2)+3)+'"><div class="class-rating-i"></div></div>'

		+	'</div>'
				+	'<div class="class-date day-'+c.class_day+'">'
		+		'<div class="class-day">'+day_of_week(c.class_day)+'</div>'
		+		'<div class="class-time">'+c.class_start+' - '+c.class_end+'</div>'
		+		'<p class="room-name">'+c.room_name+'</p>'
		+	'</div>'
		+'</div>'
		+'<div class="omza-stats">'
		+'<div class="detail-left">'
		+	slider_html(c.attr_flex*10, 'flex', 'Flexibility')
		+	slider_html(c.attr_strength*10, 'strength', 'Strength')
		+	slider_html(c.attr_tempo*10, 'tempo', 'Tempo')
		+'</div>'
		+'<div class="nodes">'
		+	node_html(c.node_stand, 'beginner', 'Beginner')
		+	node_html(c.node_heated, 'heated', 'Heated')
		+	node_html(c.node_injuries, 'injuries', 'Injuries')
		+	node_html(c.node_spirit, 'spirit', 'Spirituality')
		+	node_html(c.node_meditation, 'meditation', 'Meditation')
		+	node_html(c.node_chanting, 'chanting', 'Chanting')
		+	node_html(c.node_music, 'music', 'Live Music')
		+	node_html(c.node_core, 'core', 'Core')
		+	node_html(c.node_stand, 'stand', 'Inversions')
		+'</div>'
		+'</div>'
		+'<div class="btn btn-primary btn-large btn-schedule"><a href="http://sb.divinitree.com/schedule/register/#'+day_of_week(c.class_day)+'" target="_blank" onClick="_gaq.push([‘_trackEvent’, ‘Links’,’Schedule’, ’Class detail view’,'0'])">Schedule Class</a></div>'
		+'</div>'

		+'<div class="detail-reg">'
		// +	'<button type="button" class="btn btn-primary btn-detail-reg btn-large t02">'
		// +		'<span class="glyphicon glyphicon-ok t02"></span><span class="text">Register for class</span>'
		// +	'</button>'
		+'</div>'
		+'<div class="class-info">'+class_header+'</div>'
		+'<p class="class-describe">'+c.class_description+'</p>';
		+'<i class="fa fa-chevron-left"></i>'
		+'</div>'
		;
		$('.studio-head h3').css('display','none');
		$(".teacher-img").css('background-image','url('+image+')');
		$(".studio-img").css('background-image','url(img/studio-'+c.studio_id+'.png)');
		$(".class-rating-i").css('width','30%');
		$(".filter-btn").addClass('hidden');
		$detail.html(html);
	}

	function filterData () {
		var results = [], attrs = {}, nodes = {}, days ={}, num = 0;

		// Get slider settings
		$.each(['strength','spirit','flex','balance','tempo'], function(i,e,j){
			j = $('.pane1 .slider-'+e);
			if (j.hasClass('on')) {
				attrs[e] = Math.round(+j.find('.slider-i').data('pct'));
			}
		});

		// Get node values
		$.each(['meditation','chanting','heated','injuries','stand','core','spirit','beginner','morning','afternoon','night'], function(i,e,j){
			j = $('.pane1 .node-'+e);
			if (j.hasClass('on')) nodes[e] = 1;
		});

		$.each(['0','1','2','3','4','5','6'], function(i,e,j){
			j = $('.pane1 .day-'+e);
			if (j.hasClass('on')) days[e] = 1;
		});

		$.each(classes, function(i){
			this.class_id = i;

			// Filter resutls based on hash
			if (arg) {
				if (mode === ROUTE_STUDIO && this.studio_name !== classes[+arg].studio_name) {
					return;
				}
				if (mode === ROUTE_TEACHER && this.teacher_name !== classes[+arg].teacher_name) {
					return;
				}
			}
			//Filter by multiple Days

			for(k in days){
					if(!this['day_'+k] ){
						return;
					}
				}


			// Filter results based on nodes
			for (var k in nodes) {
				if (!this['node_'+k]) {
					return;
				}
			}
			
			// Filter results based on sliders
			for (k in attrs) {
				if (attrs.hasOwnProperty(k)) {
					var diff = Math.abs((+attrs[k]) - 10*this['attr_'+k]);
					if (diff > 20) {
						return;
					}
				}

			// //Filter by day of week
			// for (k in days){
			// 	if (!this)
			// }
			}

			results.push(this);
			num++;
			if (num >= 35) {
				return false;
			}
		});
		load_classes(results);
	}
	$doc.on('filter', window.debounce(function(){
		$body.removeClass('no-fil');
		filterData();
	}, 200));

	$doc.on('click', '.home-search-btn', function(){
		$body.addClass('mode-2');
	});

	$doc.on('click', '.node', function(){
		$(this).toggleClass('on');
		$doc.trigger('filter');
	});

	$doc.on('click touchend', '.time-btn', function(){
		clear_times();
		$(this).toggleClass('on');
		$doc.trigger('filter');
	});
	$doc.on('mouseenter mouseleave', '.hook-studio', function(){
		$(this).on('','.divide-class', function(){
			$(this).toggleClass('hover-divide');
		})
	});

	$doc.on('click', '.calendar-btn', function(){
		$('.class-features').toggleClass('shift-down')
	});


	$doc.on('mouseleave', '.calendar-wrapper', function(){
		$('.class-features').removeClass('shift-down')
	});	

	$doc.on('click', '.day-btn', function(){
		clear_days();
		$(this).toggleClass('on');
		$doc.trigger('filter');
	});
	$doc.on('click', '.hook-class', function(){
		var 
		$this = $(this),
		id = +$this.data('id'),
		cls = classes[id];

		var nice_name = cls.class_name.replace(/[^a-zA-Z0-9\-]+/g,'-');

		window.location.hash = '#c/'+id+'/'+nice_name;
		switch_mode();
	});

	$doc.on('click', '.hook-studio', function(){
		var 
		$this = $(this),
		id = +$this.data('id'),
		cls = classes[id];

		var nice_name = cls.studio_name.replace(/[^a-zA-Z0-9\-]+/g,'-');

		window.location.hash = '#s/'+id+'/'+nice_name;
		e.stopPropagation();
		switch_mode();
	});

	$doc.on('click', '.hook-teacher', function(e){
		var 
		$this = $(this),
		id = +$this.data('id'),
		cls = classes[id];

		var nice_name = cls.teacher_name.replace(/[^a-zA-Z0-9\-]+/g,'-');

		e.stopPropagation();
		window.location.hash = '#t/'+id+'/'+nice_name;
		switch_mode();
	});

	$doc.on('click', '.btn-detail-reg', function () {
		var s = $(this).hasClass('btn-success');
		$(this).toggleClass('btn-primary btn-success').find('.text').text(s ? 'Register for class' : 'Registered');
	});

	

	$doc.on('click', '.btn-find', function () {
		window.location.hash = '#p/Santa-Barbara';
		$('.sub-pane2').removeClass('no-shift-right');
	});

	$doc.on('click touchend', '.filter-btn, .hook-class',function(){
		$('.sub-pane1').toggleClass('hide-filter');
		$('.sliders, .nodes, .time-btns, .calendar-wrapper, .calendar-btn, .class-features').toggleClass('hidden');
		$('.filter-btn').toggleClass('left-shift-filter');
		$('.sub-pane2').toggleClass('no-shift-right');


	});

	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		
		var fields = $contact_form.serialize();
		
		$.ajax({
			type: "POST",
			url: "./php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
				}
				
				$('#response').empty().html(response.html);
			}
		});
		return false;
	});

	function ratings() {
		var 
		$this = $(this),
		rating = $this.data('rating'),
		bar = $this.find('.class-rating-i');
		bar.css('width', (100*rating/5)+'%');
	}

	$win.resize(function(){
		var 
		$panes = $('.pane, .sub-pane'),
		top = $panes.first().offset().top;

		$panes.css('height', $win.height() - top);
	}).resize();

	window.onhashchange = switch_mode;

	init();

	setTimeout(function(){
		$('.content-inner').addClass('t10');
	},200);

	/*$.each(window.classes, function(){
		var self = this;
		$.each(['strength','spirit','flex','balance','tempo'], function(i,e){
			self['attr_'+e] = Math.floor((Math.random()*11));
		});
		$.each(['meditation','chanting','heated','healing','stand'], function(i,e){
			self['node_'+e] = Math.floor((Math.random()*2));
		});
	});*/

})(window, jQuery);