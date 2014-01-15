<?php
    include_once('head.php');
?>

<?php
    include_once('nav-header.php');
?>
<div class="container center-block studio-page extra-page">
	<div class="detail-wrap">
		<div class="header-info">
			<h1 class="info-header">Studios</h1>
		</div>


		<div class="row">
			<div class="col-md-8 col-md-offset-2 pic-border top-space">
				<img src="img/chrome-divinitree-bar.png" attr="chrome bar" style="width: 100%" class="img-responsive"></img>
				<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
					  <!-- Indicators -->
					  <ol class="carousel-indicators">
					    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
					    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
					    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
					    <li data-target="#carousel-example-generic" data-slide-to="3"></li>
					  </ol>

					  <!-- Wrapper for slides -->
					  <div class="carousel-inner">
					    <div class="item active">
					      <img src="img/divinitree-embed-1.png" alt="Divinitree Embed Main Page">
					      <div class="carousel-caption">
					        
					      </div>
					    </div>
					    
					    <div class="item">
					      <img src="img/divinitree-embed-2.png" alt="Divinitree Embed Page">
					      <div class="carousel-caption">
					        
					      </div>
					    </div>

					    <div class="item">
					      <img src="img/divinitree-embed-3.png" alt="Divinitree Embed Page">
					      <div class="carousel-caption">
					        
					      </div>
					    </div>

					    <div class="item">
					      <img src="img/divinitree-embed-4.png" alt="Divinitree Embed Main Page">
					      <div class="carousel-caption">
					        
					      </div>
					    </div>

					  </div>

					</div>
			</div>
		</div>

				<div class="row company-description">
			<div class="col-md-10 col-md-offset-1">
				<h2>Yoga studios see how we can help.</h2>
				<p class="extra-short-description">OMZA is teaming up with local Santa Barbara studios. <br>We create custom schedule widgets for your studio's website.</p>
				<a class="submit btn btn-primary btn-large" href="/contact"><i class="fa fa-envelope"></i> Contact Us</a>
			</div>
		</div>


		<div class="row" style="margin-top: 40px">
			<h2>Our Value</h2>
			<hr>

			<div class="col-md-4">
				<div class="circle-background">
					<i class="fa fa-mobile"></i>
				</div>
				<h3>Responsive Design</h3>
				<p>OMZA is computer, tablet, and smartphone friendly!</p>
				<p>The schedule widget responds to your studio website's layout ensuring students can access your schedule any time, from any device.</p>
			</div>

			<div class="col-md-4">
				<div class="circle-background">
					<i class="fa fa-tint"></i>
				</div>
				<h3>Custom Colors</h3>
				<p>OMZA colors change to match your site.</p>
				<p>The color scheme of your website is an important piece of your brand. Therefore, our design team alters the color properties of each widget to match perfectly with your site.</p>
			</div>

			<div class="col-md-4">
				<div class="circle-background">
					<i class="fa fa-tachometer"></i>
				</div>
				<h3>Student Analytics</h3>
				<p>OMZA sends you reports on user engagement.</p>
				<p>OMZA tracks the attributes, features, days, and classes people click. Our people team will send you a report of your student's interactions with your schedule widget each month.</p>
			</div> 
		</div>

	</div>
	</div>
</div> <!-- Close Container Div -->

</div> <!--close wrapper -->
 <?php include_once('script.php') ?>
    </body>
</html>

<script type="text/javascript">
	$('.studio-link').addClass('active');
	$('.carousel').carousel()
</script>