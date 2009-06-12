/**
 * gethostbyname (PHP 3, PHP 4, PHP 5) 
 * gethostbyname -- 获取指定机器名的IP地址 
 * 函数格式说明： 
 * string gethostbyname ( string hostname ) 
 * 返回 hostname 的IP地址 
 * <?php 
 * $ip = gethostbyname('www.example.com'); 
 *
 * echo $ip; 
 * ?>
 */
var Inet4Address = {
	getAddress : function(){throw new NotImplementedException("Inet4Address");}
};
