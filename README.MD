## Pull image or Build
### Pull from my Docker Hub
``̀  docker pull crosskicker/frr-image-c:latest ```

### Build the image with the Dockerfile
``` docker build --no-cache -t frr-image-c . ```


### Otherwise pull the image on docker hub
``` docker pull crosskicker/frr_ubuntu:latest ```

## RUN
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

### Demarrer le service de routing
/etc/init.d/frr restart







# Old version


### Si impossible il faut démarrer le service
/usr/lib/frr/frrinit.sh start

### Debug
Dans Docker les réseaux sont donnés par defaut  (regarder pour les changer manuellement)
