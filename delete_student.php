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
body{
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
session_start();
include"db_conn.php";

if(isset($_SESSION['sessionid'])){
$user = $_SESSION['username'];
$s_id = $_GET['s_id'];
$role = $_SESSION['role'];
if($role == '1')
{
$query = mysql_query("DELETE FROM `$db_name`.`$tbl_name` WHERE `$tbl_name`.`s_id` = '".$s_id."'");

if($query)
{
print"<div style='color:#008000; font-weight:bold; text-align:center;'><h2>Student successfully Deleted..!!</h2></div>";
echo "<META HTTP-EQUIV='Refresh' CONTENT='0; URL=login_success.php'>";
}
else
{
print"<div style='color:#c24f00; font-weight:bold; text-align:center;'><h2>Unable to Delete !!</h2></div>";
print"<div style='color:#c24f00; font-weight:bold; text-align:center;'><h2><a href='login_success.php'>Go Back </a> </h2></div>";
}
}
}
?>
</div>
    </td>
    </tr>
</table>
</div>
</body>
</html>