<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sapphire Institute of Distance & Online Studies</title>
<style type="text/css">
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
  var answer = confirm("Are you sure you want to update the Details?");
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
// Check if session is not registered, redirect back to main page.
// Put this code in first line of web page.
header("Cache-Control: private, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: Fri, 4 Jun 2010 12:00:00 GMT");

session_start();

include "db_conn.php"; 

if(isset($_SESSION['sessionid'])){
$user = $_SESSION['username'];
$role = $_SESSION['role'];
$s_id = $_GET['s_id'];
if($role == '1')
{
$sql1="select * from $tbl_name where s_id = '$s_id'";
$data=mysql_query($sql1);
Print"<div class='maindiv'>";
print"<center><img src='wp-content/uploads/2012/12/sapphire_logo.png' width='850px' height='100px'/></center>";
print"<form method='post' action='update_details.php'>";
print"<table align='center' width='850px' border='0' cellpadding='2' cellspacing='2'>";
print"<tr valign='left' bgcolor='#008000'>";
print"<td colspan='2' align=''><div style='margin:0px 0px; font-weight:bold; color:#FFF; font-size:16px;'>WELCOME : $user || SAPPHIRE EDUCATION </td>
<td align='' colspan='2'>
<a href='add_new.php'><font face =''color='white'><b>ADD NEW STUDENT</b></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
<a href='logout.php'><font face =''color='white'><b>LOGOUT</b></a></div></td></tr>";
$info = mysql_fetch_assoc($data);
// 
print"
<tr>
    <td valign='middle'><strong>First Name :</strong></td>
    <td valign='middle'><label><input name='fname' type='text' class='textbox' id='fname' value='".$info['first_name']."'></label></td>
	<td valign='middle'><strong>Last Name :</strong></td>
    <td valign='middle'><label><input name='lname' type='text' class='textbox' id='lname' value='".$info['last_name']."'></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Student Id :</strong></td>  
	<td valign='middle'><label><input name='sid' type='text' class='textbox' id='sid' value='".$info['s_id']."'></label></td>
	<td  valign='middle'><strong>Date of Birth :</strong></td>
	<td  valign='middle'><label><input name='password' type='text' class='textbox' id='password' value='".$info['password']."'></label></td>
  </tr>
  <tr>
    <td valign='middle'><strong>Father's Name :</strong></td>  
    <td valign='middle'><label><input name='father' type='text' class='textbox' id='father' value='".$info['father_name']."'></label></td>
	<td	valign='middle'><strong>Email :</strong></td>
    <td valign='middle'><label><input name='email' type='text' class='textbox' id='email' value='".$info['email']."'></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Mobile No 1 :</strong></td>
	<td  valign='middle'><label><input name='mobile_1' type='text' class='textbox' id='mobile_1' value='".$info['mobile_1']."'></label></td>
	<td  valign='middle'><strong>Date of Joining :</strong></td>
    <td  valign='middle'><label><input name='doj' type='text' class='textbox' id='doj' value='".$info['date_of_joining']."'></label></td>
	<!--<td  valign='middle'><strong>Mobile No 2 :</strong></td>
    <td  valign='middle'><label><input name='mobile_2' type='text' class='textbox' id='mobile_2' value='".$info['mobile_2']."'></label></td>-->
  </tr>
  <tr>
    <td  valign='middle'><strong>Address :</strong></td>
	<td  valign='middle' colspan='3'><label><input name='address' type='text' class='textboxadd' id='address' value='".$info['address']."'></label></td>
	<!--<td  valign='middle'><strong>Street Name :</strong></td>
    <td  valign='middle'><label><input name='sname' type='text' class='textbox' id='sname' value='".$info['street_name']."'></label></td>-->
  </tr>
  <!--<tr>
    <td  valign='middle'><strong>City  :</strong></td>
    <td  valign='middle'><label><input name='city' type='text' class='textbox' id='city' value='".$info['city']."'></label></td>
	<td  valign='middle'><strong>State :</strong></td>
    <td  valign='middle'><label><input name='state' type='text' class='textbox' id='state' value='".$info['state']."'></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Pincode :</strong></td>
    <td  valign='middle'><label><input name='pincode' type='text' class='textbox' id='pincode' value='".$info['pincode']."'></label></td>
	<td  valign='middle'><strong>Country :</strong></td>
    <td  valign='middle'><label><input name='country' type='text' class='textbox' id='country' value='".$info['country']."'></label></td>
  </tr>-->
  <tr>
    <td  valign='middle'><strong>University Name :</strong></td>
    <td  valign='middle'><label><input name='iname' type='text' class='textbox' id='iname' value='".$info['institute_name']."'></label></td>
	<td  valign='middle'><strong>Course Name :</strong></td>
    <td  valign='middle'><label><input name='cname' type='text' class='textbox' id='cname' value='".$info['course_name']."'> </label></td>
  </tr>
  <!--<tr>
	<td  valign='middle'><strong>Course Duration :</strong></td>
    <td  valign='middle'><label><input name='cduration' type='text' class='textbox' id='cduration' value='".$info['course_duration']."'></label></td>
  </tr>-->
 <tr>
    <td  valign='middle'><strong>Total Fees :</strong></td>
    <td  valign='middle'><label><input name='tfees' type='text' class='textbox' id='tfees' value='".$info['total_fees']."'></label></td>
	<td  valign='middle'><strong>Fees Paid :</strong></td>
    <td  valign='middle'><label><input name='apaid' type='text' class='textbox' id='apaid' value='".$info['advance_paid']."'></label></td>
  </tr>
  <tr>
    <td  valign='middle'><strong>Comments :</strong></td>
    <td  colspan='3' valign='middle'><label><input name='comment' type='text' size='112' id='comment' value='".$info['comment']."'></label></td>
  </tr>
  <tr>
    <td  valign='middle'>&nbsp;</td>
    <td align='right' valign='middle'><label><input name='Confirm' type='submit' class='submit' value='Update Details' onClick='return AskAndSubmit(this);'/></label></td>
	<td align='left' valign='middle'><label><input name='cancel' type='button' class='submit' id='cancel' value='Go Back' onClick='Location();'></label></td>
    <td align='left' valign='middle'><label></label></td>
  </tr>
  </table>
  </form>";
}
 else
{
print"<div style='color:#008000; font-weight:bold; text-align:center;'><h2>Invalid Student..!!</h2></div>";
echo "<META HTTP-EQUIV='Refresh' CONTENT='0; URL=login_success.php'>";
}
}
else
{
echo"<script>location='~si-admin.php'</script>";
}
?>