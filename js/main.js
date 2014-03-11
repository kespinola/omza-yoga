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

    function review_attr_html(type, id){
        return ''
        +'<div class="row review-section review-'+type+'">'
            +'<div class="row">'
                +'<div class="col-xs-4">'
                    +'<p class="review-tag">More</p>'
                    +'<div data-id="'+id+'" data-review="2" class="nob 2-'+type+'"></div>'
                +'</div>'
                +'<div class="col-xs-4">'
                    +'<p class="review-tag middle-tag">Accurate</p>'
                    +'<div data-id="'+id+'" data-review="1" class="nob 1-'+type+'"></div>'
                +'</div>'
                +'<div class="col-xs-4">'
                    +'<p class="review-tag">Less</p>'
                    +'<div data-id="'+id+'" data-review="0" class="nob 0-'+type+'"></div>'
                +'</div>'
            +'</div>'

            +'<div class="row">'
                +'<div class="review-btn button-'+type+'"><img class="review-img" src="./img/attr-'+type+'.png"></div>'
            +'</div>'
          +'<h3>'+type+'</h3>'
        +'</div>';
    }

	function load_filter(){
		$('.detail-nodes').css("display", "inline").removeClass('hidden');
		$('.time-btns').addClass('inline-block');
		$('.sliders').css('width','99%');
		$('.filter-btn').css('display','block');
		$('.btn-find').addClass('hidden');

	};

    function reset_filter(){
        $('.nodes, .week').css('width','100%');
        $('.sliders').css('width','90%');
        $('.filter-btn').css('display','none').removeClass('left-shift-filter');
        $('.sub-pane1').removeClass('hide-filter');
        $('.sliders, .nodes, .top-panel, .sliding-panel, .time-btns, .sliding-btn, .btn-find').removeClass('hidden');
        $('.time-btns').removeClass('inline-block');


    };

	function day_of_week(id){
		var days = [ "Monday","Tuesday","Wednesday","Thursday", "Friday","Saturday", "Sunday"];
		return days[id];
	};
	function day_node(id){
		var days = [ "Mon","Tues","Wed","Thu", "Fri","Sat", "Sun"];
		return days[id];
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







  $doc.on('click','.nob',function(){


    var $this = $(this),
    id = $this.data('id'),
    nob = $this.data('review'),
    cls = window.classes[id],
    nice_name = cls.class_name.replace(/[^a-zA-Z0-9\-]+/g,'-');



    $this.addClass('reviewed');

    var scores =[0,1,2];
    $.each(scores,function(w){
      var attr = ['flex','strength','tempo'],
        j = scores[w];


      $.each(attr, function(i,v){
        var k = $('.'+j+'-'+v);

        if(k.hasClass('reviewed')){

              ga('send','event',v,nice_name,j);
              k.addClass('active-nob');
              k.removeClass('reviewed');


          switch(j){
            case 1:
              $('.0-'+v).removeClass('nob');
              $('.2-'+v).removeClass('nob');
              break;
            case 2:
              $('.1-'+v).removeClass('nob');
              $('.0-'+v).removeClass('nob');
              break;
            default:
              $('.1-'+v).removeClass('nob');
              $('.2-'+v).removeClass('nob');

          }

          var $button = $('.button-'+v);


          switch(nob){
            case 0:
              $button.addClass('right-turn');
              $button.removeClass('button-'+v);
              break;

            case 2:
              $button.addClass('left-turn');
              $button.removeClass('button-'+v);
              break;
            default:
          }
        }
      });
    });



  });


//Autocomplete Search

function autoComp(){
	var searchArray = [
		"Divinitree",
		"Vinyasa",
		"Gyrokinesis/Yoga for Dancers",
		"Slow Motion",
		"Kundalini",
		"Lunch Break Power Flow",
		"Yoga",
		"Conscious Kick Boxing",
		"All Levels Power Vinyasa Yoga",
		"Vinyasa Flow",
		"Power Vinyasa Level 2/3",
		"Intro to Contact Improvisation",
		"Goddess Circle",
		"Soul Shine Yoga",
		"Kundalini Yoga",
		"FREQUENCYasa Yoga",
		"Yoga Flow",
		"Prana Flow",
		"Restorative & Yin Yoga",
		"AyurYoga Flow",
		"Pilates-Yoga Fusion, All Levels",
		"Partner Yoga & Flying",
		"Hathalini",
		"Good Morning Power Flow",
		"Vinyasa/Medical Chi Gong",
		"Gentle Basics",
		"Eclectic Flow",
		"Tiff",
		"Chyla",
		"Karen",
		"Kirtan",
		"Sarah",
		"Rachel Petkus",
		"Arianna",
		"Candice",
		"Aliza",
		"Rachel Wilkins",
		"Vikki",
		"Jenna",
		"Amanda",
		"Brettina",
		"Jennifer",
		"Asha",
		"Yoni",
		"Pixie",
		"Debora",
		"Nuria",
		"Rachel Meisler",
		"Miltsuko",
		"Siddhi",
		"Asha & Sean",
		"Brett",
		"Jacob",


	];
 	$('#search-bar').autocomplete({
 		source:searchArray,
 		messages: {         
 		noResults: '',         
 		results: function() {}
		}
 	});
 }

//Initialize Autocomplete
 autoComp();

//    Template for classes in list view

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
			+'<div class="btn btn-primary btn-schedule btn-small"><a href="http://sb.divinitree.com/schedule/register/#'+day_node(this.class_day)+'" target="_blank" onClick="ga("send", "event", "schedule", "view", "list view")>Schedule Class</a></div>'
			+	'<div class="class-left hook-teacher" data-id="'+this.class_id+'">'
			+		'<div class="class-icon" style="background-image:url('+image+')"></div>'
			+		'<div class="class-sub">'+this.teacher_name+'</div>'
			+	'<div class="class-rating hidden-xs hidden-sm"><div class="class-rating-i" style="width:'+this.omza_fit+'%"></div></div>'
			+	'</div>'
			+	'<div class="class-right">'
			+		'<h3>'+this.class_name+'</h3>'
			+	'</div>'

			+	'<div class="class-date day-'+this.class_day+'">'
			+		'<div class="class-day">'+day_of_week(this.class_day)+'</div>'
			+		'<div class="class-time">'+this.class_start+'</div>'
			+	'</div>'
			+'</li>';
			if (i >= 90) {
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
	 
		$(".filter-btn").removeClass('hidden');
	}

	function detail_opt(val, sub) {
		if (sub === 'Duration') {
			val = val + 'min';
		}
		return val ? '<div class="detail-opt">' + val + '<span>' + sub + '</span></div>' : '';
	}

    //Detailed view for classes
	function load_class(c) {
		var classList = $('.class-list').empty();
		var $detail = $('.detail').empty();
	    var classID= c.class_id;

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
		+	'</div>'
		+   '<div class="class-date day-'+c.class_day+'">'
		+		 '<div class="class-day">'+day_of_week(c.class_day)+'</div>'
		+		 '<div class="class-time">'+c.class_start+' - '+c.class_end+'</div>'
		+		 '<p class="room-name">'+c.room_name+'</p>'
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
		+'<div class="btn btn-primary btn-large btn-schedule"><a href="http://sb.divinitree.com/schedule/register/#'+day_of_week(c.class_day)+'" target="_blank" onClick="ga("send", "event", "schedule", "view", "detail view")>Schedule Class</a></div>'
		+'</div>'

		+'<div class="class-info">'+class_header+'</div>'
		+'<p class="class-describe">'+c.class_description+'</p>'

        +'<div class="row class-view-footer">'
          +'<div id="review-header" class="row">'
            +'<div class="col-sm-12">'
              +'<h2>Have you taken '+ c.class_name+' with '+ c.teacher_name+'?</h2></br></br>'
              +'<h3>Help your fellow yogis by adjusting our attribute scale.</h3>'
            +'</div>'
          +'</div>'

          +'<div class="col-sm-7">'

            +'<div class="row">'
               +'<div class="col-xs-6">'
                   +review_attr_html("flex",classID)
               +'</div>'
               +'<div class="col-xs-6">'
                  +review_attr_html("strength",classID)
               +'</div>'
            +'</div>'

            +'<div class="row">'
               +'<div class="col-xs-6">'
                  +review_attr_html("tempo",classID)
               +'</div>'
               +'<div class="col-sm-6">'
                  +'<h4>Is the Omza Fit accurate for this class?</h4>'
                  +'<div class="btns feedback-btn yes col-xs-5" onClick="ga("send", "event", "review" ,"yes", "'+c.class_name+'");">'
                    +'<i class="fa fa-thumbs-up"></i>'
                  +'</div>'
                  +'<div class="btns feedback-btn no col-xs-5" onClick="ga("send", "event", "review" ,"no", "'+c.class_name+'");">'
                    +'<i class="fa fa-thumbs-down"></i>'
                  +'</div>'
               +'</div>'
            +'</div>'
          +'</div>'

            +'<form id="review-form" class="contact-form">'

                +'<p class="contact-message">'
                +'<textarea id="contact_message" placeholder="Your Message" name="message" rows="10" cols="20"></textarea>'
                +'</p>'
                +'<p class="contact-submit">'
                +'<a id="submit-review" data-id="'+classID+'"class="submit btn btn-primary btn-large"><i class="fa fa-envelope"></i> Send Message</a>'
                +'</p>'
                +'<div id="review-response"></div>'
            +'</form>'

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

		var results = [], fit_diff = {}, fit_avg = {}, fit_list = {}, attrs = {}, nodes = {}, days ={}, num = 0, attr_length = 0;
		// Get slider settings
		$.each(['strength','spirit','flex','balance','tempo'], function(i,e,j){
			j = $('.pane1 .slider-'+e);
			if (j.hasClass('on')) {
				attrs[e] = Math.round(+j.find('.slider-i').data('pct'));
				attr_length++;
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


		//Default Sort to Current Date

		$.each(classes, function(i){
			this.class_id = i;
			var attr_sum=0,
			 	attr_fit = {},
			 	omza_fit = 0,
			 	fit_score = "";

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
					var diff = Math.abs((+attrs[k]) - 10*this['attr_'+k]),
						fit_sum = attrs[k] + 10*this['attr_'+k],
						fit_avg = fit_sum/2;
						attr_fit[k] = diff/fit_avg;
					if (diff > 10) {
						return;
					}
				}

			 }

			//Determine Omza Fit for Attributes Entered
			for (k in attr_fit){
				if(attr_fit.hasOwnProperty(k)){
					attr_sum = attr_sum + attr_fit[k];
				}
			}

		//Set list with fit score for class
		var avg_attr_fit = attr_sum/attr_length,
				omza_fit = Math.abs(100*(1 - avg_attr_fit));
				this['omza_fit'] = omza_fit;

			results.push(this)
			num++;
			if (num >= 73) {

				return false;
			}

		});

		//Order results by fit score
		results.sort(function(a,b){
			return b.omza_fit - a.omza_fit;
		});

		//Normalize fit score
		$.each(results, function(i){
			var max = results[(results.length - 1)].omza_fit,
			min = results[0].omza_fit,
			norm_diff = max - min,
			num_diff = this.omza_fit - min;

			this.omza_fit = 100*(1-(num_diff / norm_diff));

			
		});

		load_classes(results);
	}


//    App event listeners
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

	$doc.on('click', '.sliding-btn', function(){
		$('.top-panel').toggleClass('shift-down')
	});


	$doc.on('mouseleave', '.sliding-panel', function(){
		$('.top-panel').removeClass('shift-down')
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
		ga('send', 'event', 'class', 'view', nice_name);
    ga('send','pageview',{
      'title':nice_name,
      'page': window.location
    });
		switch_mode();
	});



	$doc.on('click', '.hook-studio', function(){
		var 
		$this = $(this),
		id = +$this.data('id'),
		cls = classes[id];

		var nice_name = cls.studio_name.replace(/[^a-zA-Z0-9\-]+/g,'-');

        e.stopPropagation();
		window.location.hash = '#s/'+id+'/'+nice_name;
		ga('send', 'event', 'studio', 'view', nice_name);
    ga('send','pageview',{
      'title':nice_name,
      'page': window.location
    });
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
		ga('send', 'event', 'teacher', 'view', nice_name);
    ga('send','pageview',{
      'title':nice_name,
      'page': window.location
    });

		switch_mode();
	});

	$doc.on('click', '.btn-detail-reg', function () {
		var s = $(this).hasClass('btn-success');
		$(this).toggleClass('btn-primary btn-success').find('.text').text(s ? 'Register for class' : 'Registered');
	});

  $doc.on('click','.feedback-btn',function(){
      var $this = $(this);

    if($this.hasClass('yes')){
      $('.no').remove();
    }else{
      $('.yes').remove();
    }

  });
	

	$doc.on('click', '.btn-find', function () {
		window.location.hash = '#p/Santa-Barbara';
		$('.sub-pane2').removeClass('no-shift-right');
	});

	$doc.on('click', '.filter-btn',function(){
		$('.sub-pane1').toggleClass('hide-filter');
		$('.sliders, .nodes, .time-btns, .sliding-panel, .sliding-btn, .top-panel, .sliding-btn-desc').toggleClass('hidden');
		$('.filter-btn').toggleClass('left-shift-filter');
		$('.sub-pane2').toggleClass('no-shift-right');
		ga('send','page section', 'click','filter button')
		
		if($(window).width() < 768){
			$('.sub-pane2').toggleClass('mid-size-panel');
		}


	});

	$doc.on('click', '.help-tab', function(){
		if($('.help-section').is(":hidden")){
			$('.help-section').slideDown("slow");
		}else{
			$('.help-section').slideUp("slow");
		}
	});

		$doc.on('click touchend', '.feedback-btn', function(){
			$(this).toggleClass('visible');
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

$doc.on('click','#submit-review',function(){
  $review_form = $('#review-form');

  var fields = $review_form.serialize(),
    $this = $(this),
    classId = $this.data('id'),
    reviewed = window.classes[classId];

console.log(fields);
  var info = {
    teacher: reviewed.teacher_name,
    class: reviewed.class_name
  };


  var serialInfo = $.param(info),
    amp = '&';

  amp = amp.concat(serialInfo);

  fields = fields.concat(amp);
  console.log(fields);

  $.ajax({
    type: "POST",
    url: "./php/review-submit.php",
    data: fields,
    dataType: 'json',
    success: function(response) {

      if(response.status){
        $('#contact-form input').val('');
        $('#contact-form textarea').val('');
      }

      $('#review-response').empty().html(response.html);
    }
  });
  return false;
});


	$win.resize(function(){
		var
		$panes = $('.pane, .sub-pane'),
		top = $panes.first().offset().top;

		$panes.css('height', $win.height() - top);
	});

	window.onhashchange = switch_mode;

	init();

	setTimeout(function(){
		$('.content-inner').addClass('t10');
	},200);

// Search and return classes

$('#search-btn').click(function(classes){
	event.preventDefault();
	var $query = $('.search-bar').val();
	var split = $query.split(' ');

        //iterate through each of the "words" and capitalize them
        for (var i = 0, len = split.length; i < len; i++) {
            split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1).toLowerCase();
        }

        //re-join the string and set the value of the element
        $query = split.join(' ');


	ga('send', 'event', 'search', 'click', $query);

	var results = _.filter(window.classes, function(item){

		if(item.class_name == $query || item.teacher_name == $query || item.studio_name == $query){
			return item;
		}
	});


	load_classes(results);
});



})(window, jQuery);