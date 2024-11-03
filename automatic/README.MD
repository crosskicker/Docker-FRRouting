## Requisites
Install xterm :  
    ``` pip3 install -r requirements.txt```  
    ``` apt install xterm ```   

## Running method "Automatic"

Go to /automatic  
``` cd automatic/ ```  

### Step 1  
Run the file "config.py"  

ex : ``` python3 config.py -n 8 ```  
In this exemple 8 is the number of routers in your network project.  

### Step 2  
Then a config.json file is generated and you have to add manually the connection (networks links) between routers.  

ex :  
    <b> Before </b>  
    ...  
     {
            "name": "r1",  
            "connected": []  
        },  
        {
            "name": "r2",  
            "connected": []  
        },  
        {
            "name": "r3",  
            "connected": []  
        }  
        ...  
   <b> After :  </b>   
    ...  
     {
            "name": "r1",  
            "connected": ["<b>r1-r2</b>","<b>r1-r3</b>"]  
        },  
        {
            "name": "r2",  
            "connected": ["<b>r1-r2</b>"]  
        },  
        {
            "name": "r3",  
            "connected": ["<b>r1-r3</b>"]  
        }  
        ...  

In this example router r1 is connected to router r2 and router r3, (so router r2 is connected to router r1 "<b>r1-r2</b>" and r3 is connected to r1 "<b>r1-r3</b>" )  
You need speficy the connections, always put the lowest router number before.  
It will be usefull for the network creation in docker.  

### Step 3  

You can run your network project, it will start all the routers  

```python3 run.py ``` 

### Step 4  
In every terminals you can configured a specific router.   
Info : By default Docker gives ip address for every network interface,  
it's usefull to save time but you can change ip addresses ( read "network_configuration" in Documentation folder)  

#### Config the router  
``` vtysh ```  
(configure your routers)  

Save configuration :  
```write memory ```  

#### To exit  
```exit ```

### Step 5 (Optionnal)

You can export your project :  
```python3 export.py [-o <project name>] ```  