##Construire l'image avec le Dockerfile
docker build --no-cache -t frr-image .

###Sinon pull l'image sur docker hub
docker pull crosskicker/frr_ubuntu:v1

##Lancer le container 
docker run -it --privileged --name frr-container <frr-image> /bin/bash

##Configurer le routeur
vtysh
###Si impossible il faut démarrer le service
/usr/lib/frr/frrinit.sh start

