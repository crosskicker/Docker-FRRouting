info : if you are in conf mode into router configuration : add key word "<b>do</b>( to visualize configuration) in front of the command.  
ex :   ``` r1(config)#  do sh int ``` 


### Visualize router configuration
``` sh run```  

### Visualize network configuration
#### In Linux mode
``` ip a```  

#### In router mode 
``` sh int  ```  

### Change IP Address

In every routers (containers) we have an ip address configured by default by docker  
To remove it you can use the linux command :  
(in linux mode not router mode )  
```ip addr del <ip_addr>/<mask> dev <int_name>```   

Then you can add an ip addr with linux command or in router configuration :  
   
Enter in router configuration :  
``` vtysh ```  

Enter in config mode :  
``` conf t  ```  

Enter in interface configuration :  
``` int <int_name>```  

Give an IP address :  
``` ip address <ip_addr>/<mask>  ```   

Up the interface :  
``` no shutdown ``` 

Exit mode :  
``` exit```   