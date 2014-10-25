<?php

$host="localhost";// Host name
$username_db="root";// Mysql username
$password_db="";// Mysql password
$db_name="registration";// Database name
$tbl_name="registration";// Table name
$tbl_name2="sapphire_master";//Table name 2
$login_table="login";//Login table name
$tbl_counter="counter";//visitor counter table
//Connect to server and select databse.
mysql_connect("$host", "$username_db", "$password_db")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");
?>