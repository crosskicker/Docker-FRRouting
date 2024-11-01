
# Requisites
<b>Linux</b>:  
    Install Docker :  
    ``` wget -qO- https://get.docker.com/ | sh ```  
    Install xterm :  
    ``` apt install xterm ```    

<b>Windows</b>:  
    https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module  

 

# RUNNING PART
There are many differents methods to run this project and create your network.  

## Running method 1

Go to /automatic
``` cd automatic/ ```  

### Step 1  
Run the file "config.py"

ex : ``` python3 config.py -n 8 ``` 
In this exemple 8 is the number of routers in your network project.  

### Step 2  
Then a config.json file is generated and you have to add manually the connection between routers.  

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

#### Config the router  
``` vtysh ```
#### To exit  
```exit ```

## Running method 2 (manually change the docker-compose.yml)
More dofficult method  
To have the network configuration you need to change manually the docker-compose.yml,  

### Run the docker-compose file

``` docker-compose up -d ```

### To add routers
change the docker-compose.yml

#### Run an other router container
``` docker run  --privileged -d -v /etc/frr  --name <frr-n°> --network <network_name> frr-image-c:latest ```


## To interact with the container (for configuration)
``` docker exec -it <container_name> /bin/bash ``` 
### Config the router
``` vtysh ```
### To exit 
```exit ```

### Run the routing service
By default it is started automatically  
``` /etc/init.d/frr restart ``` 




## Pull image or Build
### Pull from my Docker Hub
``` docker pull crosskicker/frr-image-c:latest ```

### Build the image with the Dockerfile
``` docker build --no-cache -t frr-image-c . ```


### Otherwise pull the image on docker hub
``` docker pull crosskicker/frr_ubuntu:latest ```
