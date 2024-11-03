
## Running method manually 
More dofficult method  
To have the network configuration you need to change manually the docker-compose.yml,  
### Exemple of configuration
... todo ...  
### Run the docker-compose file

``` docker-compose up -d ```

### To add routers
change the docker-compose.yml

#### Run an other router container
``` docker run  --privileged -d --name <frr-n°> --network <network_name> frr-image-c:latest ```


## To interact with the container (for configuration)
``` docker exec -it <container_name> /bin/bash ``` 
### Config the router
``` vtysh ```
### To exit 
```exit ```

### Run the routing service
By default it is started automatically  
``` /etc/init.d/frr restart ``` 




## Pull image or Build (Optionnal)
### Pull from my Docker Hub
``` docker pull crosskicker/frr-image-c:latest ```

### Build the image with the Dockerfile
``` docker build --no-cache -t frr-image-c . ```
