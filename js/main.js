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
			$('.studio-img').css('backgroundImage', 'url(img/'+arg.toLowerCase()+'.jpg)');
			$('.studio-head h3').text(arg);
			load_filter();
			filterData();
			
		}
		// Teacher
		else if (/t\//.test(path)) {
			mode = ROUTE_TEACHER;
			var cls = classes[+arg];
			var img = cls.teacher_image ? 'img/t/'+cls.teacher_image+'.jpg' : 'img/omza-thumbnail.png';
			$('.studio-img').css('backgroundImage', 'url('+img+')');
			$('.studio-head h3').text(cls.teacher_name);
			load_filter();
			filterData();
		}
		// Place
		else if (/p\//.test(path)) {
			mode = ROUTE_PLACE;
			$('.studio-head h3').text('All Classes');
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
		$('.filter-btn').css('display','block');
		$('.detail-nodes').css("display", "inline");
		$('.sliders, .nodes').css('width','250px');
		$('.node').css('width','65px').css('height','65px');
	};

	function reset_filter(){
		$('.sliders, .nodes').css('width','100%');
		$('.filter-btn').css('display','none').removeClass('left-shift-filter');
		$('.sub-pane1').removeClass('hide-filter');
		$('.sliders, .nodes').removeClass('hidden');
	};
	function node_html (on, type, label) {
		return ''
		+'<div class="node node-'+ type + (on ? ' on' : ' off') + '">'
		+'<span>'+label+'</span>'
		+'</div>';
	};

	function reset () {
		$('.pane1 .node').removeClass('on');
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
		var html = '',image;
		$.each(classes, function(i){
			image = this.teacher_image ? 'img/t/'+this.teacher_image+'.jpg' : 'img/omza-thumbnail.png';
			html += ''
			+'<li class="class-li hook-class" data-id="'+this.class_id+'">'
			+	'<div class="class-left hook-teacher" data-id="'+this.class_id+'">'
			+		'<div class="class-icon" style="background-image:url('+image+')"></div>'
			+		'<div class="class-sub">'+this.teacher_name+'</div>'
			//+	'<div class="class-rating" data-rating="'+((Math.random()*2)+3)+'"><div class="class-rating-i"></div></div>'
			+	'</div>'
			+	'<div class="class-right">'
			+		'<h3>'+this.class_name+'</h3>'

			+	'</div>'
			+	'<div class="class-date">'
			+		'<div class="class-day">'+this.class_day+'</div>'
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
	
		image = c.teacher_image ? 'img/t/'+c.teacher_image+ '.jpg' : 'img/omza-thumbnail.png';
		class_header = c.class_description ? '<h3 class="description-head"><i class="fa fa-book"></i><span class="description-title">Class Description</span><i class="fa fa-caret-left label-end"></i></h3>' : '';
		var html = ''
	
		+'<div class="detail-wrap">'
		+'<div class="detail-clear">'
		+'<div class="detail-top">'
		+	'<div class="teacher-info">'

		+		'<i class="fa fa-chevron-left back-btn" onCLick="history.back()"></i>'
		+		'<h1 class="detail-title">'+c.class_name+'</h1>'
		+		'<div class="hook-teacher" data-id="'+c.class_id+'"><div class="teacher-img t02" style="background-image:url('+image+')"></div></div>'
		+		'<div class="teacher-name"><span class="sub-title">with </span><h3 class="hook-teacher" data-id="'+c.class_id+'">'+c.teacher_name+'</h3></div>'
		//+		'<div class="class-rating omza-fit-detail" data-rating="'+((Math.random()*2)+3)+'"><div class="class-rating-i"></div></div>'
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
			+	node_html(c.node_healing, 'injuries', 'Injuries')
			+	node_html(c.node_spirit, 'spirit', 'Spirituality')
		+	node_html(c.node_meditation, 'meditation', 'Meditation')
		+	node_html(c.node_chanting, 'chanting', 'Chanting')
		+	node_html(c.node_music, 'music', 'Live Music')
		+	node_html(c.node_core, 'core', 'Core')
		+	node_html(c.node_stand, 'stand', 'Inversions')
		+'</div>'
		+'</div>'
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
		var results = [], attrs = {}, nodes = {}, num = 0;

		// Get slider settings
		$.each(['strength','spirit','flex','balance','tempo'], function(i,e,j){
			j = $('.pane1 .slider-'+e);
			if (j.hasClass('on')) {
				attrs[e] = Math.round(+j.find('.slider-i').data('pct'));
			}
		});

		// Get node values
		$.each(['meditation','chanting','heated','injuries','stand','core','spirit','beginner'], function(i,e,j){
			j = $('.pane1 .node-'+e);
			if (j.hasClass('on')) nodes[e] = 1;
		});

		$.each(classes, function(i){
			this.class_id = i;

			// Filter resutls based on hash
			if (arg) {
				if (mode === ROUTE_STUDIO && this.studio_name !== arg) {
					return;
				}
				if (mode === ROUTE_TEACHER && this.teacher_name !== classes[+arg].teacher_name) {
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

	$doc.on('click', '.hook-class', function(){
		var 
		$this = $(this),
		id = +$this.data('id'),
		cls = classes[id];

		var nice_name = cls.class_name.replace(/[^a-zA-Z0-9\-]+/g,'-');

		window.location.hash = '#c/'+id+'/'+nice_name;
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

	$doc.on('click', '.subhead-i', function () {
		window.history.back();
	});

	$doc.on('click', '.btn-find', function () {
		window.location.hash = '#p/Santa-Barbara';
	});

	$doc.on('click', '.filter-btn',function(){
		$('.sub-pane1').toggleClass('hide-filter');
		$('.sliders, .nodes').toggleClass('hidden');
		$('.filter-btn').toggleClass('left-shift-filter');
		$('.sub-pane2').toggleClass('no-shift-right');


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