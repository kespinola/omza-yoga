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
		} 
		// Studio
		else if (/s\//.test(path)) {
			mode = ROUTE_STUDIO;
			$('.studio-img').css('backgroundImage', 'url(img/'+arg.toLowerCase()+'.jpg)');
			$('.studio-head h3').text(arg);
			filterData();
		}
		// Teacher
		else if (/t\//.test(path)) {
			mode = ROUTE_TEACHER;
			var cls = classes[+arg];
			var img = cls.teacher_image ? 'img/t/'+cls.teacher_image : 'img/divinitree.jpg';
			$('.studio-img').css('backgroundImage', 'url('+img+')');
			$('.studio-head h3').text(cls.teacher_name);
			filterData();
		}
		// Place
		else if (/p\//.test(path)) {
			mode = ROUTE_PLACE;
			$('.studio-head h3').text('All Classes');
			filterData();
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
		+			'<div class="slider-l">'+label+'</div>'
		+		'</div>'
		+	'</div>'
		+'</div>';
	}

	function node_html (on, type, label) {
		return ''
		+'<div class="node node-'+ type + (on ? ' on' : '') + '">'
		+'<span>'+label+'</span>'
		+'</div>';
	}

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
			image = this.teacher_image ? 'img/t/'+this.teacher_image : 'img/divinitree.jpg';
			html += ''
			+'<li class="class-li hook-class" data-id="'+this.class_id+'">'
			+	'<div class="class-left hook-teacher" data-id="'+this.class_id+'">'
			+		'<div class="class-icon" style="background-image:url('+image+')"></div>'
			+		'<div class="class-sub">'+this.teacher_name+'</div>'
			+	'</div>'
			+	'<div class="class-right">'
			+		'<h3>'+this.class_name+'</h3>'
			+		'<div class="class-rating" data-rating="'+((Math.random()*2)+3)+'"><div class="class-rating-i"></div></div>'
			+		'<button type="button" class="btn btn-primary btn-class-details">See Class Details</button>'
			+	'</div>'
			+	'<div class="class-date">'
			+		'<div class="class-day">'+this.class_day+'</div>'
			+		'<div class="class-time">'+this.class_time+'</div>'
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
	}

	function detail_opt(val, sub) {
		if (sub === 'Duration') {
			val = val + 'min';
		}
		return val ? '<div class="detail-opt">' + val + '<span>' + sub + '</span></div>' : '';
	}

	function load_class(c) {
		var $detail = $('.detail').empty();
		var image = this.teacher_image ? 'img/t/'+this.teacher_image : 'img/divinitree.jpg';
		var html = ''
		+'<h1 class="detail-title">'+c.class_name+'</h1>'
		+'<div class="detail-wrap">'
		+'<div class="detail-clear">'
		+'<div class="detail-left">'
		+	slider_html(c.attr_strength*10, 'strength', 'Strength')
		+	slider_html(c.attr_spirit*10, 'spirit', 'Spirtuality')
		+	slider_html(c.attr_flex*10, 'flex', 'Flexibility')
		+	slider_html(c.attr_balance*10, 'balance', 'Balance')
		+	slider_html(c.attr_tempo*10, 'tempo', 'Tempo')
		+'</div>'
		+'<div class="detail-right">'
		+	'<div class="detail-teacher">'
		+		detail_opt(c.teacher_name, 'Teacher')
		+		'<div class="detail-icon" style="background-image:url('+image+')"></div>'
		+	'</div>'
		+	detail_opt(c.class_day, 'Day')
		+	detail_opt(c.class_time, 'Time')
		+	detail_opt(c.class_duration, 'Duration')
		+	detail_opt(c.studio_name, 'Studio')
		+	detail_opt(c.room_name, 'Room')
		+'</div>'
		+'</div>'
		+'<div class="detail-nodes nodes">'
		+	node_html(c.node_meditation, 'meditation', 'Meditation')
		+	node_html(c.node_chanting, 'chanting', 'Chanting')
		+	node_html(c.node_heated, 'heated', 'Heated')
		+	node_html(c.node_healing, 'healing', 'Injuries')
		+	node_html(c.node_music, 'music', 'Live Music')
		+	node_html(c.node_stand, 'stand', 'Inversions')
		+'</div>'
		+'<div class="detail-reg">'
		+	'<button type="button" class="btn btn-primary btn-detail-reg btn-large t02">'
		+		'<span class="glyphicon glyphicon-ok t02"></span><span class="text">Register for class</span>'
		+	'</button>'
		+'</div>'
		+'</div>';
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
		$.each(['meditation','chanting','heated','healing','stand'], function(i,e,j){
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