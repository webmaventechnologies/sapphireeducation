<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sapphire Institute of Distance & Online Studies</title>
<style type="text/css">
<!--
body,td,th {
	font-family: Trebuchet MS, Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: #333;
}
body {
	margin-left: 0px;
	margin-top: 20px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.maindiv{ width:1200px; margin:0 auto;}
.textbox{ padding:2px 4px; width:200px;}
.submit{ border:solid 1px #008000; background:#008000; color:#FFF; font-weight:bold;}
-->
</style>
<script>
function AskAndSubmit(t)
{
  var s_id = t;
  var answer = confirm("Are you sure delete "+s_id+" student Permanently ?");
  if (answer)
  {
  //return true;
  location='delete_student.php?s_id='+s_id;
  }
	//t.form.reset();
  return false;
}
function Location()
{
location='login_success.php';
}
</script>

</head>
<body>
<?php
ob_start(); 

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

session_start();

include"db_conn.php";

if(isset($_SESSION['sessionid'])){
$user = $_SESSION['username'];
$role = $_SESSION['role'];

if($role == '1'){

$sql1="select * from $tbl_name";

$data=mysql_query($sql1);

Print"<div class='maindiv'>";
print"<center><img src='wp-content/uploads/2012/12/sapphire_logo.png' width='800px' height='100px'/></center>";
print"<table align='center' width='100%' border='0'cellpadding='2' cellspacing='2'>";
print"<tr valign='middle' bgcolor='#008000'>";
print"<td colspan='3' align='center'><div style='margin:0px 10px; font-weight:bold; color:#FFF; font-size:16px;'>WELCOME : $user</td>
<td colspan='4'align='center'><font face =''color='white'><b>SAPPHIRE INSTITUTE OF DISTANCE AND ONLINE STUDIES </font></b></font></td> 
<td colspan='2' align='center'><a href='add_new.php'><font face =''color='white'><b> ADD NEW STUDENT  </b></a></td>
<td align='center'><a href='logout.php'><font face =''color='white'><b>LOGOUT</b></a></div></td>";
print"</tr>";
print"<tr bgcolor='lightgreen'><td colspan='10'><form method='post'action='add_notice.php'><input type='text' size='154' name='notice' id='notice'/><input type='submit' name='submit' value='Add Common Notice for all Students'/></form></td></tr>";
print"<tr align = 'center' bgcolor = 'lightgreen'>";
print"<td valign='middle'><strong>SR NO </strong></td>";
print"<td valign='middle'><strong>FIRST NAME </strong></td>";
print"<td valign='middle'><strong>LAST NAME </strong></td>";
print"<td valign='middle'><strong>STUDENT ID </strong></td>";
print"<td valign='middle'><strong>MOBILE </strong></td>";
print"<td valign='middle'><strong>EMAIL ID </strong></td>";
print"<td valign='middle'><strong>COURSE</strong></td>";
print"<td valign='middle'><strong>UNIVERSITY</strong></td>";
print"<td valign='middle'><strong>DETAILS</strong></td>";
print"<td valign='middle'><strong>DELETE</strong></td>";
print"</tr>";
$count = 1;
while($info = mysql_fetch_array($data)) 
{
if(($count % 2) == 0)
{
Print "<tr align ='center' bgcolor = 'lightblue'>";
}
else{
Print "<tr align ='center' bgcolor = 'lightblue'>";
}Print "<td>".$count."</td>"; 
Print "<td>".$info['first_name']."</td>"; 
Print "<td>".$info['last_name']."</td>";
Print "<td>".$info['s_id']."</td>"; 
$test = $info['s_id'];
Print "<td>".$info['mobile_1']."</td>";
Print "<td>".$info['email']."</td>";
Print "<td>".$info['course_name']."</td>";
Print "<td>".$info['institute_name']."</td>";
Print "<td><a href ='view_details.php?s_id=$test'><font face =''color='black'>VIEW/UPDATE</a></td>";
Print "<td><img src='delete-icon.gif' width='15%' height='15%' id='$test' title='Delete student' onClick='return AskAndSubmit(this.id);'/></a></td>";
Print "</tr>";
$count++;
} 
Print "</table>";
}
else{
print"<div style='color:#008000; font-weight:bold; text-align:center;'><h2>Invalid User!!</h2></div>";
echo "<META HTTP-EQUIV='Refresh' CONTENT='0; URL=~si-admin.php'>";
}
}
else
{
echo"<script>location='~si-admin.php'</script>";
}
?>
