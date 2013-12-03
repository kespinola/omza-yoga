((window, $) ->
  init = ->
    switch_mode()
  switch_mode = ->
    path = window.location.hash
    arg = path.split("/")
    arg = arg[1].replace("-", " ")  if arg.length > 1
    $body.removeClass "mode-" + mode  if mode
    if not path or path is "/"
      mode = ROUTE_HOME
    
    # Studio
    else if /s\//.test(path)
      mode = ROUTE_STUDIO
      $(".studio-img").css "backgroundImage", "url(img/" + arg.toLowerCase() + ".jpg)"
      $(".studio-head h3").text arg
      filterData()
    
    # Teacher
    else if /t\//.test(path)
      mode = ROUTE_TEACHER
      cls = classes[+arg]
      img = (if cls.teacher_image then "img/t/" + cls.teacher_image + ".jpg" else "img/omza-thumbnail.jpg")
      $(".studio-img").css "backgroundImage", "url(" + img + ")"
      $(".studio-head h3").text cls.teacher_name
      filterData()
    
    # Place
    else if /p\//.test(path)
      mode = ROUTE_PLACE
      $(".studio-head h3").text "All Classes"
      filterData()
    
    # Class
    else if /c\//.test(path)
      mode = ROUTE_CLASS
      c = classes[+arg]
      load_class c
    else
      filterData()
    $(".class-wrap").scrollTop 0
    $body.addClass "mode-" + mode
    $(".js-slider").slider()
  slider_html = (val, type, label) ->
    "" + "<div class=\"js-slider on slider nosel slider-" + type + "\" data-pct=\"" + val + "\">" + "<div class=\"slider-img\"></div>" + "<div class=\"slider-bg\">" + "<div class=\"slider-l\">" + label + "</div>" + "<div class=\"slider-i t02\">" + "<div class=\"slider-l\">" + label + "</div>" + "</div>" + "</div>" + "</div>"
  node_html = (on_, type, label) ->
    "" + "<div class=\"node node-" + type + ((if on_ then " on" else " off")) + "\">" + "<span>" + label + "</span>" + "</div>"
  reset = ->
    $(".pane1 .node").removeClass "on"
    $sliders = $(".pane1 .js-slider")
    $sliders.find(".slider-i").data "pct", 50
    $sliders.find(".slider-bg").click()
    $sliders.removeClass "on"
    filterData()
  load_classes = (classes) ->
    classList = $(".class-list").empty()
    html = ""
    image = undefined
    $.each classes, (i) ->
      image = (if @teacher_image then "img/t/" + @teacher_image + ".jpg" else "img/omza-thumbnail.png")
      html += "" + "<li class=\"class-li hook-class\" data-id=\"" + @class_id + "\">" + "<div class=\"class-left hook-teacher\" data-id=\"" + @class_id + "\">" + "<div class=\"class-icon\" style=\"background-image:url(" + image + ")\"></div>" + "<div class=\"class-sub\">" + @teacher_name + "</div>" + "</div>" + "<div class=\"class-right\">" + "<h3>" + @class_name + "</h3>" + "<div class=\"class-rating\" data-rating=\"" + ((Math.random() * 2) + 3) + "\"><div class=\"class-rating-i\"></div></div>" + "</div>" + "<div class=\"class-date\">" + "<div class=\"class-day\">" + @class_day + "</div>" + "<div class=\"class-time\">" + @class_time + "</div>" + "</div>" + "</li>"
      false  if i >= 35

    html = "" + "<div class=\"no-results\">" + "<h3>No classes matched your preferences</h3>" + "<h4 class=\"reset\">Reset</h4>" + "</div>"  unless html
    classList.html html
    classList.find(".class-rating").each ratings
  detail_opt = (val, sub) ->
    val = val + "min"  if sub is "Duration"
    (if val then "<div class=\"detail-opt\">" + val + "<span>" + sub + "</span></div>" else "")
  load_class = (c) ->
    $detail = $(".detail").empty()
    image = (if @teacher_image then "img/t/" + @teacher_image else "img/omza-thumbnail.jpg")
    html = "" + "<h1 class=\"detail-title\">" + c.class_name + "</h1>" + "<div class=\"detail-wrap\">" + "<div class=\"detail-clear\">" + "<div class=\"detail-left\">" + slider_html(c.attr_spirit * 10, "spirit", "Spirtuality") + slider_html(c.attr_flex * 10, "flex", "Flexibility") + slider_html(c.attr_strength * 10, "strength", "Strength") + slider_html(c.attr_tempo * 10, "tempo", "Tempo") + "</div>" + "<div class=\"detail-right\">" + "<div class=\"detail-teacher\">" + detail_opt(c.teacher_name, "Teacher") + "<div class=\"detail-icon\" style=\"background-image:url(" + image + ")\"></div>" + "</div>" + detail_opt(c.class_day, "Day") + detail_opt(c.class_time, "Time") + detail_opt(c.class_duration, "Duration") + detail_opt(c.studio_name, "Studio") + detail_opt(c.room_name, "Room") + "</div>" + "</div>" + "<div class=\"detail-nodes nodes\">" + node_html(c.node_meditation, "meditation", "Meditation") + node_html(c.node_chanting, "chanting", "Chanting") + node_html(c.node_heated, "heated", "Heated") + node_html(c.node_healing, "healing", "Injuries") + node_html(c.node_music, "music", "Live Music") + node_html(c.node_stand, "stand", "Inversions") + "</div>" + "<div class=\"detail-reg\">" + "<button type=\"button\" class=\"btn btn-primary btn-detail-reg btn-large t02\">" + "<span class=\"glyphicon glyphicon-ok t02\"></span><span class=\"text\">Register for class</span>" + "</button>" + "</div>" + "</div>"
    $detail.html html
  filterData = ->
    results = []
    attrs = {}
    nodes = {}
    num = 0
    
    # Get slider settings
    $.each ["strength", "spirit", "flex", "balance", "tempo"], (i, e, j) ->
      j = $(".pane1 .slider-" + e)
      attrs[e] = Math.round(+j.find(".slider-i").data("pct"))  if j.hasClass("on")

    
    # Get node values
    $.each ["meditation", "chanting", "heated", "healing", "stand"], (i, e, j) ->
      j = $(".pane1 .node-" + e)
      nodes[e] = 1  if j.hasClass("on")

    $.each classes, (i) ->
      @class_id = i
      
      # Filter resutls based on hash
      if arg
        return  if mode is ROUTE_STUDIO and @studio_name isnt arg
        return  if mode is ROUTE_TEACHER and @teacher_name isnt classes[+arg].teacher_name
      
      # Filter results based on nodes
      for k of nodes
        return  unless this["node_" + k]
      
      # Filter results based on sliders
      for k of attrs
        if attrs.hasOwnProperty(k)
          diff = Math.abs((+attrs[k]) - 10 * this["attr_" + k])
          return  if diff > 20
      results.push this
      num++
      false  if num >= 35

    load_classes results
  ratings = ->
    $this = $(this)
    rating = $this.data("rating")
    bar = $this.find(".class-rating-i")
    bar.css "width", (100 * rating / 5) + "%"
  $doc = $(document)
  $body = $("body")
  $win = $(window)
  classes = window.classes
  arg = ""
  ROUTE_HOME = 1
  ROUTE_STUDIO = 2
  ROUTE_TEACHER = 3
  ROUTE_PLACE = 4
  ROUTE_CLASS = 5
  mode = ROUTE_HOME
  $doc.on "click", ".reset", ->
    reset()

  $doc.on "filter", window.debounce(->
    $body.removeClass "no-fil"
    filterData()
  , 200)
  $doc.on "click", ".home-search-btn", ->
    $body.addClass "mode-2"

  $doc.on "click", ".node", ->
    $(this).toggleClass "on"
    $doc.trigger "filter"

  $doc.on "click", ".hook-class", ->
    $this = $(this)
    id = +$this.data("id")
    cls = classes[id]
    nice_name = cls.class_name.replace(/[^a-zA-Z0-9\-]+/g, "-")
    window.location.hash = "#c/" + id + "/" + nice_name
    switch_mode()

  $doc.on "click", ".hook-teacher", (e) ->
    $this = $(this)
    id = +$this.data("id")
    cls = classes[id]
    nice_name = cls.teacher_name.replace(/[^a-zA-Z0-9\-]+/g, "-")
    e.stopPropagation()
    window.location.hash = "#t/" + id + "/" + nice_name
    switch_mode()

  $doc.on "click", ".btn-detail-reg", ->
    s = $(this).hasClass("btn-success")
    $(this).toggleClass("btn-primary btn-success").find(".text").text (if s then "Register for class" else "Registered")

  $doc.on "click", ".subhead-i", ->
    window.history.back()

  $doc.on "click", ".btn-find", ->
    window.location.hash = "#p/Santa-Barbara"

  $win.resize(->
    $panes = $(".pane, .sub-pane")
    top = $panes.first().offset().top
    $panes.css "height", $win.height() - top
  ).resize()
  window.onhashchange = switch_mode
  init()
  setTimeout (->
    $(".content-inner").addClass "t10"
  ), 200

#$.each(window.classes, function(){
#   var self = this;
#   $.each(['strength','spirit','flex','balance','tempo'], function(i,e){
#     self['attr_'+e] = Math.floor((Math.random()*11));
#   });
#   $.each(['meditation','chanting','heated','healing','stand'], function(i,e){
#     self['node_'+e] = Math.floor((Math.random()*2));
#   });
# });
) window, jQuery