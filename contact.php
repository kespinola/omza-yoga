<?php
    include_once('head.php');
?>

<?php
    include_once('nav-header.php');
?>
<div class="container center-block extra-page">
	<div class="detail-wrap">
		<div class="header-info">
			<h1 class="info-header">Contact Us</h1>
		</div>
		<div class="row">

			<div class="col-md-5">
				<img src="./img/chyla-kyle-photo.jpg" attr="Kyle and Chyla photo" class="pic-border img-responsive contact-img"></img>
				<h2>Drop us a line!<h2>
			</div>


			<div class="col-md-7 pull-left">
				<form id="contact-form" class="contact-form" action="#">
            	<p class="contact-name">
            		<input id="contact_name" type="text" placeholder="Full Name" value="" name="name" />
                </p>
                <p class="contact-email">
                	<input id="contact_email" type="text" placeholder="Email Address" value="" name="email" />
                </p>
                <p class="contact-message">
                	<textarea id="contact_message" placeholder="Your Message" name="message" rows="15" cols="40"></textarea>
                </p>
                <p class="contact-submit">
                	<a id="contact-submit" class="submit btn btn-primary btn-large" href="#"><i class="fa fa-envelope"></i> Send Message</a>
                </p>
                
                	<div id="response">
                
                	</div>
            	</form>
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
	$('.contact-link').addClass('active');
</script>