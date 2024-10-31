## Pull image or Build
### Pull from my Docker Hub
``` docker pull crosskicker/frr-image-c:latest ```

### Build the image with the Dockerfile
``` docker build --no-cache -t frr-image-c . ```


### Otherwise pull the image on docker hub
``` docker pull crosskicker/frr_ubuntu:latest ```

# RUNNING PART
There are many differents methods to run this project and create your network.  

## Running method 1

Go to /automatic  

### Step 1  
Run the file "gen_json_template.py"

ex : ``` python3 gen_json_template.py -n 8 ``` 
In this exemple 8 is the number of routers in your network project.  

### Step 2  
Then a config.json file is generated and you have to add manually the connection between routers.  

ex : {
            "name": "r1",  
            "connected": ["r1-r2","r1-r3"]  
        },  
        {
            "name": "r2",  
            "connected": ["r1-r2"]  
        },  
        {
            "name": "r3",  
            "connected": ["r1-r3"]  
        }  

You need speficy the connections, always put the lowest router number before.  
It will be usefull for the network creation in docker.  

### Step 3  

You can run your network project, it will start all the routers  

```python3 config-yaml.py ``` 

### Step 4  

#### To interact with the container (for configuration)  
``` docker exec -it <container_name> /bin/bash ```   
(info : container_name = r1 or r2 ... )  
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







# Old version


### Si impossible il faut démarrer le service
/usr/lib/frr/frrinit.sh start

### Debug
Dans Docker les réseaux sont donnés par defaut  (regarder pour les changer manuellement)
