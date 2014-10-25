<?php
ob_start();

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
include"db_conn.php";  

//username and password sent from form
$myusername=$_POST['myusername'];
$mypassword=$_POST['mypassword'];

//To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);

$sql="select * from $login_table where username like BINARY '$myusername' and password like BINARY '$mypassword'";
$result=mysql_query($sql);

//Mysql_num_row is counting table row
$count=mysql_num_rows($result);

//If result matched $myusername and $mypassword, table row must be 1 row
if($count==1){
$info = mysql_fetch_assoc($result);
$role = $info['role'];
session_start();
//Register $myusername, $mypassword and redirect to file "login_success.php"
$_SESSION['sessionid'] = session_id();
$_SESSION['username'] = $myusername;
$_SESSION['password'] = $mypassword;
$_SESSION['role'] = $role;

header("location:login_success.php");
}
else {
print"<lable><center><h1>Wrong Username or Password</h1></center></lable>";
print"<lable><center><h1>Try Again</h1></center></lable>";
header("refresh:1;url=~si-admin.php");
}
ob_end_flush();
?>