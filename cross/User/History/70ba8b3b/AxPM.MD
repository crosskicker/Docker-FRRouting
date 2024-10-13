## Construire l'image avec le Dockerfile
docker build --no-cache -t <frr-image> .


### Sinon pull l'image sur docker hub
docker pull crosskicker/frr_ubuntu:latest


## Lancer le container 
docker run  --privileged -d --name <frr-container> <frr-image> 


## To interact with the container
docker exec -it <container_name> /bin/bash
### To exit 
```exit ```








# Old version

## Configurer le routeur
vtysh
### Si impossible il faut démarrer le service
/usr/lib/frr/frrinit.sh start

