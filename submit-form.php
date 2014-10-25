<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sapphire Institute of Distance & Online Studies</title>
<style type="text/css">
<!--
body,td,th {
	font-family: Trebuchet MS, Arial, Helvetica, sans-serif;
	font-size: 12px;
	color: #333;
}
body {
	margin-left: 0px;
	margin-top: 30px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.maindiv{ width:690px; margin:0 auto;}
.textbox{ padding:2px 4px; width:200px;}
.submit{ border:solid 1px #008000; background:#008000; color:#FFF; font-weight:bold;}
-->
</style>
</head>
<body>
<div style="display:none;"><img src="ajax-loader.gif" /></div>
  
<div class="maindiv">
<form method="post">
<table width="100%" border="0" cellpadding="2" cellspacing="2">
  <tr>
    <td colspan="3" align="left" valign="middle" bgcolor="#008000"><div style="margin:0px 10px; font-weight:bold; color:#FFF; font-size:16px;">Sapphire Institute of Distance & Online Studies</div></td>
    </tr>
  <tr>
    <td colspan="3" align="left" valign="middle">
    <div id="message">
<?php
$fname=$_POST['fname'];
$lname=$_POST['lname'];
$sid=$_POST['sid'];
$password=$_POST['password'];
$father=$_POST['father'];
$email=$_POST['email'];
$mobile_1=$_POST['mobile_1'];
$hno=$_POST['address'];
$iname=$_POST['iname'];
$cname=$_POST['cname'];
$doj=$_POST['doj'];
$tfees=$_POST['tfees'];
$apaid=$_POST['apaid'];
$comment=$_POST['comment'];
$date=date('d-m-Y');
$ip=$_SERVER['REMOTE_ADDR'];


include "db_conn.php"; 

$query = mysql_query("INSERT INTO `$db_name`.`$tbl_name` (`first_name`, `last_name`, `s_id`, `father_name`, `date`, `email`, `password`, `mobile_1`, `address`, `institute_name`, `course_name`, `date_of_joining`, `total_fees`, `advance_paid`, `IP`,`comment`) VALUES ('".$fname."', '".$lname."', '".$sid."', '".$father."', '".$date."', '".$email."', '".$password."', '".$mobile_1."', '".$hno."', '".$iname."', '".$cname."', '".$doj."', '".$tfees."', '".$apaid."', '".$ip."','".$comment."')");

if($query == true)
{
?>
    <div style="color:#008000; font-weight:bold; text-align:center;"><h2>Registred successfully..!!</h2></div>
<?php
echo "<META HTTP-EQUIV='Refresh' CONTENT='0; URL=login_success.php'>";
}else
{
?>
<div style="color:#c24f00; font-weight:bold; text-align:center;"><h2>unable to registred !!</h2><h2><a href='add_new.php'>Go Back </a></h2></div>
<?php
}
?>
</div>
    </td>
    </tr>
</table>
</form>
</div>
</body>
</html>
