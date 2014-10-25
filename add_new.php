<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<title>Sapphire Institute of Distance & Online Studies</title>
<style type='text/css'>
<!--
body,td,th {
	font-family: Trebuchet MS, Arial, Helvetica, sans-serif;
	font-size: 15px;
	color: #333;
}
body {
	margin-left: 0px;
	margin-top: 30px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.maindiv{ width:1000px; margin:0 auto;}
.textbox{ padding:2px 4px; width:200px;}
.textboxadd{ padding:2px 4px; width:600px;}
.submit{ border:solid 1px #008000; background:#008000; color:#FFF; font-weight:bold;}
-->
</style>
<script>
function AskAndSubmit(t)
{
  var answer = confirm("Are you sure you want to Register the Student?");
  if (answer)
  {
    t.form.submit();
  }
	t.form.reset();
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

header("Cache-Control: private, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Fri, 4 Jun 2010 12:00:00 GMT");

session_start();

include "db_conn.php"; 

if(isset($_SESSION['sessionid'])){
$user = $_SESSION['username'];
$role = $_SESSION['role'];
if($role == '1'){
print"<div class='maindiv'>
<center><img src='wp-content/uploads/2012/12/sapphire_logo.png' width='800px' height='100px'/></center>
<form method='post' action='submit-form.php'>
<table align='center' width='80%' border='0' cellpadding='2' cellspacing='2'>
  <tr valign='middle' bgcolor='#008000'>
  <td colspan='2' valign='middle' bgcolor='#008000'><div style='margin:0px 10px; font-weight:bold; color:#FFF; font-size:16px;'>Sapphire Institute of Distance and Online Studies</td><td colspan='2' align='right'><div style='margin:0px 10px; font-weight:bold; color:#FFF; font-size:16px;'> Welcome : $user &nbsp;&nbsp;<a href='logout.php'>Logout</a></div></td>
    </tr>
  <tr>
    <td valign='middle'><strong>First Name :</strong></td>
    <td valign='middle'><label><input name='fname' type='text' class='textbox' id='fname' /></label></td>
	<td valign='middle'><strong>Last Name :</strong></td>
    <td valign='middle'><label><input name='lname' type='text' class='textbox' id='lname' /></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Student Id :</strong></td>  
	<td valign='middle'><label><input name='sid' type='text' class='textbox' id='sid' /></label></td>
	<td  valign='middle'><strong>Date Of Birth : </strong></td>
	<td  valign='middle'><label><input name='password' type='text' class='textbox' id='password' placeholder ='DD-MM-YY' /></label></td>
  </tr>
  <tr>
    <td valign='middle'><strong>Father's Name :</strong></td>  
    <td valign='middle'><label><input name='father' type='text' class='textbox' id='father' /></label></td>
	<td	valign='middle'><strong>Email :</strong></td>
    <td valign='middle'><label><input name='email' type='text' class='textbox' id='email' /></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Mobile No 1 :</strong></td>
	<td  valign='middle'><label><input name='mobile_1' type='text' class='textbox' id='mobile_1' /></label></td>
	<td  valign='middle'><strong>Date of Joining :</strong></td>
    <td  valign='middle'><label><input name='doj' type='text' class='textbox' id='doj' placeholder ='DD-MM-YY'/></label></td>
	<!--<td  valign='middle'><strong>Mobile No 2 :</strong></td>
    <td  valign='middle'><label><input name='mobile_2' type='text' class='textbox' id='mobile_2' /></label></td>-->
  </tr>
  <tr>
    <td  valign='middle'><strong>Address :</strong></td>
	<td  valign='middle' colspan='3'><label><input name='address' type='text' class='textboxadd' id='address' /></label></td>
	<!--<td  valign='middle'><strong>Street Name :</strong></td>
    <td  valign='middle'><label><input name='sname' type='text' class='textbox' id='sname' /></label></td>-->
  </tr>
  <!--<tr>
    <td  valign='middle'><strong>City  :</strong></td>
    <td  valign='middle'><label><input name='city' type='text' class='textbox' id='city' /></label></td>
	<td  valign='middle'><strong>State :</strong></td>
    <td  valign='middle'><label><input name='state' type='text' class='textbox' id='state' /></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Pincode :</strong></td>
    <td  valign='middle'><label><input name='pincode' type='text' class='textbox' id='pincode' /></label></td>
	<td  valign='middle'><strong>Country :</strong></td>
    <td  valign='middle'><label><input name='country' type='text' class='textbox' id='country' /></label></td>
  </tr>-->
  <tr>
    <td  valign='middle'><strong>University Name :</strong></td>
    <td  valign='middle'><label><input name='iname' type='text' class='textbox' id='iname' /></label></td>
	<td  valign='middle'><strong>Course Name :</strong></td>
    <td  valign='middle'><label><input name='cname' type='text' class='textbox' id='cname' /></label></td>
  </tr>
  <tr>
	<!--<td  valign='middle'><strong>Course Duration :</strong></td>
    <td  valign='middle'><label><input name='cduration' type='text' class='textbox' id='cduration' placeholder ='Enter Duration '/></label></td>-->
  </tr>
 <tr>
    <td  valign='middle'><strong>Total Fees :</strong></td>
    <td  valign='middle'><label><input name='tfees' type='text' class='textbox' id='tfees' /></label></td>
	<td  valign='middle'><strong>Advance Paid :</strong></td>
    <td  valign='middle'><label><input name='apaid' type='text' class='textbox' id='apaid' /></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Comment :</strong></td>
    <td  colspan='3' valign='middle'><label><input name='comment' type='text' size='103' id='comment' /></label></td>
  </tr>
  <tr>
    <td  valign='middle'>&nbsp;</td>
    <td align='right' valign='middle'><label><input name='register' type='submit' class='submit' id='register' value='Register' onClick='return AskAndSubmit(this);'></label></td>
	<td align='left' valign='middle'><label><input name='cancel' type='button' class='submit' id='cancel' value='Go Back' onClick='Location();'></label></td>
    <td align='left' valign='middle'><label></label></td>
  </tr>
</table>
</form>
</div>";
}else
{
print"<div style='color:#008000; font-weight:bold; text-align:center;'><h2>Restricted Access Rights!!</h2></div>";
echo "<META HTTP-EQUIV='Refresh' CONTENT='1; URL=~si-admin.php'>";
}
}else
{
print"<div style='color:#008000; font-weight:bold; text-align:center;'><h2>Login and Try Again..!!</h2></div>";
echo "<META HTTP-EQUIV='Refresh' CONTENT='1; URL=~si-admin.php'>";
}
?>
</body>
</html>