## BUILD
### Build the image with the Dockerfile
``` docker build --no-cache -t <frr-image> . ```


### Otherwise pull the image on docker hub
``` docker pull crosskicker/frr_ubuntu:latest ```

## RUN
### Run the docker-compose file
``` docker-compose up -d ```

#### Run an other router container
``` docker run  --privileged -d --name <frr-container> --network <network_name> <frr-image> ```


## To interact with the container
``` docker exec -it <container_name> /bin/bash ``` 
### Config the router
``` vtysh ```
### To exit 
```exit ```








# Old version


### Si impossible il faut démarrer le service
/usr/lib/frr/frrinit.sh start

