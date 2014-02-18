 <div class="content">
    <?php
    include_once('search.php');
    ?> 
    <div class="content-inner">
                <!-- Wizard -->
                <div class="pane pane1">   
                    <div class="sub-pane sub-pane1 t03">
                            <div class="filter-btn t03">
                                <i class="fa fa-cogs"></i>
                            </div>
                            <div class="pane1-head">
                                <h1>find your yoga class:</h1>
                            </div>
                        <button type="button" class="btn btn-default large-round-btn sliding-btn t03"><i class="fa fa-leaf"></i></button>
                        <span class="sliding-btn-desc">Class Features</span>
                        <div class="sliding-panel t03">
                            <i class="fa fa-caret-up calander-caret"></i>
                            <div class="sliding-panel-inner">    
                                <div class="node t02 js-node node-beginner" onClick="ga('send', 'event', 'node', 'click','Beginner');">
                                        <span>Beginner</span>
                                </div>
                                <div class="node t02 js-node node-heated" onClick="ga('send', 'event','node', 'click','Heated');">
                                    <span>Heated</span>
                                </div>
                                <div class="node t02 js-node node-injuries" onClick="ga('send', 'event','node', 'click','Injuries');">
                                    <span>Injuries</span>
                                </div>

                                <div class="node t02 js-node node-spirit" onClick="ga('send', 'event','node', 'click', 'Spirit');">
                                    <span>Spirituality</span>
                                </div>                                
                                <div class="node t02 js-node node-core" onClick="ga('send', 'event', 'node', 'click','Core');">
                                    <span>Core</span>
                                </div>
                                <div class="node t02 js-node node-meditation" onClick="ga('send', 'event','node', 'click', 'Meditate');">
                                    <span>Meditation</span>
                                </div>
                                <div class="node t02 js-node node-music" onClick="ga('send', 'event','node', 'click', 'Live Music');">
                                    <span class="music-label">Live Music</span>
                                </div>
                                <div class="node t02 js-node node-stand" onClick="ga('send', 'event','node', 'click', 'Inversions');">
                                    <span>Inversions</span>
                                </div>
                                <div class="node t02 js-node node-chanting" onClick="ga('send', 'event', 'node', 'click', 'Chanting');">
                                    <span>Chanting</span>
                                </div>
                            </div>
                         </div>

                            <div class="top-panel t03 row">
                             <div class="week">
                                <div class="day-0 day-btn t03" onClick="ga('send', 'event', 'day', 'click', 'Monday');">
                                    <span>Mon</span>
                                </div>
                                <div class="day-1 day-btn t03" onClick="ga('send', 'event', 'day', 'click','Tuesday');">
                                    <span>Tues</span>
                                </div>
                                <div class="day-2 day-btn t03" onClick="ga('send', 'event', 'day' ,'click', 'Wednesday');">
                                    <span>Wed</span>
                                </div>
                                <div class="day-3 day-btn t03" onClick="ga('send', 'event', 'day' ,'click', 'Thursday');">
                                    <span>Thur</span>
                                </div>
                                <div class="day-4 day-btn t03" onClick="ga('send', 'event', 'day','click', 'Friday');">
                                    <span>Fri</span>
                                </div>
                                <div class="day-5 day-btn t03" onClick="ga('send', 'event', 'day','click', 'Saturday');">
                                    <span>Sat</span>
                                </div>
                                <div class="day-6 day-btn t03" onClick="ga('send', 'event', 'day','click', 'Sunday');">
                                    <span>Sun</span>
                                </div>
                                <div class="time-btns btn-group">
                                  <button type="button" class="time-btn node-morning btn btn-default" onClick="ga('send', 'event', 'time', 'click', 'Morning');">Morning</button>
                                  <button type="button" class="time-btn node-afternoon btn btn-default" onClick="ga('send', 'event', 'time', 'click', 'Afternoon');">Afternoon</button>
                                  <button type="button" class="time-btn node-night btn btn-default" onClick="ga('send', 'event','time', 'click', 'Night');">Night</button>
                                </div>
                
                             <div class="sliders">

                                    <div class="row hidden-xs">
                                        <div class="pull-left flex-header">
                                            <h5>Low Impact</h5>
                                        </div>
                                        <div class="pull-right">
                                            <h5>Deep Stretch</h5>
                                        </div>
                                    </div>
                                    <div class="js-slider slider nosel slider-flex">


                                        <div class="slider-img"></div>
                                        
                                        <div class="slider-bg t02">
                                            <div class="slider-l">Flexibility</div>
                                            <div class="slider-i t02">

                                                <div class="slider-l">Flexibility</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row hidden-xs">
                                        <div class="pull-left">
                                            <h5>Gentle</h5>
                                        </div>
                                        <div class="pull-right">
                                            <h5>Muscle Building</h5>
                                        </div>
                                    </div>
                                    <div class="js-slider slider nosel slider-strength">
                                        <div class="slider-img sprite"></div>
                                        
                                        <div class="slider-bg t02">
                                            <div class="slider-l">Strength</div>
                                            <div class="slider-i t02">
                                                <div class="slider-l">Strength</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row hidden-xs">
                                        <div class="pull-left">
                                            <h5>Seated</h5>
                                        </div>
                                        <div class="pull-right">
                                            <h5>Fast Pace</h5>
                                        </div>
                                    </div>
                                    <div class="js-slider slider nosel slider-tempo">
                                        <div class="slider-img"></div>
                                        
                                        <div class="slider-bg t02">
                                            <div class="slider-l">Tempo</div>
                                            <div class="slider-i t02">
                                                <div class="slider-l">Tempo</div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                  
                                  <button type="button" class="btn btn-primary btn-large btn-find">find your class</button> 
                              </div>
                            </div>
                        </div>

                    <!-- Class List -->
                    <div class="sub-pane sub-pane2 t03">
                        <div class="class-wrap">
                            <ul class="class-list">
                            </ul>
                        </div>
                    </div>

                </div>
                <!-- Class View -->
            <div class="pane pane2">
                <div class="detail">
                </div>
            </div>
        </div>
    </div>
</div>


