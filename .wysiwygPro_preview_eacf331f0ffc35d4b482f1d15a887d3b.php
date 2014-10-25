<?php
if ($_GET['randomId'] != "bLqRwfi7LtH4wh59PbYb_AGbYN8bxe4JUqJyhUMDIRqMQGnmUz_HaygYt43CDH7I") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
