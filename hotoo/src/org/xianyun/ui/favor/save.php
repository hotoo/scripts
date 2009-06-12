<? header("content-Type: text/html; charset=utf-8");?>
<?php
//echo $_REQUEST["fav"];
//exit;
require_once("../../php/common.php");
$arg=q("fav"); //the format of $arg is like this:  favor://[......] 
if(mysql_query("update desk_item set arg='".$arg."' where id='".q("id")."'"))
{
echo "success";
}
else
{
	echo $error_str[mysql_errno()];
}
?>