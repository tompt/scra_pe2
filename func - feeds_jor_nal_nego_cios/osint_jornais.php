<?php
require "/home/cripto/testar_autenticacao3.php";

$zona="operacoes";
$titulo="OSINT - Jornal de Negócios";
$ficheiro="";
$footer="includes/footer.htm";

/*
$count_my_page = ("visitantes.txt");
$hits = file($count_my_page);
$hits[0] ++;
$fp = fopen($count_my_page , "w");
fputs($fp , "$hits[0]");
fclose($fp);
$visitantes = $hits[0];
*/
?>
<!doctype html>
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="pt" class="no-js"> <!--<![endif]-->
<head>
	<title>iKNOW, OSINT</title>

	<meta content="pt" http-equiv="Content-Language" />
	<meta charset="UTF-8">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="author" content="">
	<meta name="robots" content="index, follow">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<!-- Icons -->
	<link rel="shortcut icon" href="img/favicons/favicon.ico">
	<link rel="apple-touch-icon" href="img/favicons/favicon.ico">
	
	<!-- CSS Styles -->
	<link rel="stylesheet" href="css/screen.css">
	<link rel="stylesheet" href="css/colors.css">
	<link rel="stylesheet" href="css/jquery.tipsy.css">
	<link rel="stylesheet" href="css/jquery.wysiwyg.css">
	<link rel="stylesheet" href="css/jquery.datatables.css">
	<link rel="stylesheet" href="css/jquery.nyromodal.css">
	<link rel="stylesheet" href="css/jquery.datepicker.css">
	<link rel="stylesheet" href="css/jquery.fileinput.css">
	<link rel="stylesheet" href="css/jquery.fullcalendar.css">
	<link rel="stylesheet" href="css/jquery.visualize.css">
	<link rel="stylesheet" href="css/jquery.snippet.css">
	
	<!-- Google WebFonts -->
	<!--link href='http://fonts.googleapis.com/css?family=Droid+Sans+Mono|Open+Sans:400,400italic,700,700italic&amp;v2' rel='stylesheet' type='text/css'-->
	
	<!-- Modernizr adds classes to the <html> element which allow you to target specific browser functionality in your stylesheet -->
	<script src="js/libs/modernizr-1.7.min.js"></script>
</head>
<body class="fixed">

	<!-- Header -->
	<header id="navigation">

		<!-- Navigation Container -->
		<div class="navigation-wrapper">
		
			<!-- logotipo tem de ser mudado -->
			<a id="logo" href="index.php" title="Página inicial">Página Inicial</a>
			
			<!-- Main Nav Container -->
			<nav id="nav-main">
			
				<!-- Main Navigation -->
				<ul id="nav-main-navigation">
					<li><a href="dashboard.php" title="">Dashboard</a></li>
					<li><a href="#submenu-1" title="" class="nav-main-subnav">Navegação</a></li>
					<li><a href="#submenu-2" title="" class="nav-main-subnav">Operações</a><span class="small-notification">1</span></li>
					<li><a href="#submenu-3" title="" class="nav-main-subnav">Tickets</a></li>
					<li><a href="#submenu-4" title="" class="nav-main-subnav">Login</a></li>
				</ul>
				<!-- /Main Navigation -->
				
				<!-- caixa sup direito user -->
				<ul id="nav-main-user">
					<li>Bem-vindo, <a href="utilizador.php?id=<?php echo $_SESSION['user_id'];?>" title=""><?php echo $_SESSION['nome'];?></a></li>
					<li><a href="notas.php" title="Notas" class="actions"><img alt="Notas" src="img/icons/icon_user_message.png"></a></li>
					<li><a href="areapessoal.php" title="Área pessoal" class="actions"><img alt="Definições" src="img/icons/icon_user_settings.png"></a></li>
					<li><a href="logout.php" title="Logout" class="actions"><img alt="Sair/Logout" src="img/icons/icon_user_logout.png"></a></li>
				</ul>
				<!-- /caixa sup direito user -->
				
			</nav>
			<!-- /Main Nav Container -->
			
			<!-- Sub Nav Container -->
								<!-- tomas teste de insert -->
					<?php include('a-menutopo.php');?>
					<!-- fim teste-->
			
		</div>
	</header>
	<!-- /Header -->
	
	<!-- Main Content -->
	<section role="main" class="page-wrapper">
	
		<!-- Dashboard -->
		<section id="dashboard">
			<h1>iKNOW, OSINT!</h1>
			
			<!-- Breadcumbs -->
			<ul id="breadcrumbs">
				<li><a href="index.php" title="Inicio">Página Inicial</a></li>
				<li>OSINT</li>
			</ul>
			<!-- /Breadcumbs -->
			
			<!-- Nav Shortcuts -->
					<!-- tomas teste de insert -->
					<?php include('a-menugeral.php');?>
					<!-- fim teste-->			
			<!-- /Nav Shortcuts -->
			<!-- Nav atalhos 2-->
			<ul class="shortcuts">				
					<?php #include($zona);?>
			<!--zona dos menus-->
			<ul class="shortcuts">				
			<?php //listagem dos titulos vem da BD
			#$zona="areapessoal";
			$result = mysqli_query($mysqli, "SELECT * FROM menus where zona = '".$zona."'"); 
							while($row = mysqli_fetch_array($result)) 
							{
								$texto=$row['texto'];
								$categoria=$row['categoria'];
								$link=$row['link'];
								
								echo '<li class="'.$categoria.'"><a href="'.$link.'" title="">'.$texto.'</a></li>';
							}
			?>				
			</ul>
			<!-- /Nav atalhos 2-->
		</section>
		<!-- /Dashboard -->

		<!-- Full width content box -->
		<article class="content-box minimizer">
			<header>
				<h2><?php print $titulo;?></h2>				
			</header>
			
			
			<section>

				<div class="tab default-tab" id="tab4">
					<h3><?php print $titulo;?></h3>
					<?php
						header('Content-Type: text/html; charset=utf-8');
						$log = file_get_contents("osint_jornal_negocios.htm");
						echo utf8_encode($log);
						#include "euroMostWanted.htm";
					?>
				</div>
			
			</section>
			
			<footer>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet nisi ac risus tincidunt gravida. Cras imperdiet mattis nisl et suscipit.</footer>
		</article>

		<div class="clearfix"></div> <!-- We're really sorry for this, but because of IE7 we still need separated div with clearfix -->
		
	</section>
	<!-- /Main Content -->
	
	<!-- Main Footer -->
	<footer id="footer">
	<?php include ($footer);?>
	</footer>
	<!-- /Main Footer -->
		
	<!-- Sample Modal Window -->
	<div id="sample" class="modal-content">
		<h1>nyroModal</h1>
		<p>Ajax Call, Ajax Call with targeting content, Single Image, Images Gallery with arrow navigating, Gallery with any kind of content, Form, Form in iframe, Form with targeting content, Form with file upload, Form with file upload with targeting content, Dom Element, Manual Call, Iframe, Stacked Modals, Many embed element through Embed.ly API, Error handling, Modal will never goes outside the view port, Esc key to close the window, Customizable animation, Customizable look, Modal title.</p>
		<a href="http://nyromodal.nyrodev.com/" class="outside">http://nyromodal.nyrodev.com</a>
	</div>
	<!-- /Sample Modal Window -->

	<!-- JavaScript at the bottom for faster page loading -->
	<script src="js/jquery.min.js"></script>
	<script>!window.jQuery && document.write(unescape('%3Cscript src="js/libs/jquery-1.5.1.min.js"%3E%3C/script%3E'))</script>
	<!--[if IE]><script src="js/jquery/excanvas.js"></script><![endif]--><!-- IE Canvas Fix for Visualize Charts -->
	<script src="js/libs/selectivizr.js"></script>
	<script src="js/jquery/jquery.visualize.js"></script>
	<script src="js/jquery/jquery.adminmenu.js"></script>
	<script src="js/jquery/jquery.visualize.tooltip.js"></script>
	<script src="js/jquery/jquery.tipsy.js"></script>
	<script src="js/jquery/jquery.nyromodal.min.js"></script>
	<script src="js/jquery/jquery.wysiwyg.js"></script>
	<script src="js/jquery/jquery.datatables.js"></script>
	<script src="js/jquery/jquery.datepicker.js"></script>
	<script src="js/jquery/jquery.fileinput.js"></script>
	<script src="js/jquery/jquery.fullcalendar.min.js"></script>
	<script src="js/jquery/jquery.ui.totop.js"></script>
	<script src="js/jquery/jquery.snippet.js"></script>
	<script src="js/script.js"></script>
	
 
</body>
</html>
