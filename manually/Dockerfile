# Utiliser l'image Ubuntu comme base
FROM ubuntu:22.04

# Mainteneur de l'image (optionnel)
LABEL maintainer="alban.personnaz@gmail.com"

# Installation et configuration du routage avec FRRouting
RUN apt-get update && apt-get install -y curl gnupg2 lsb-release \
    && curl -s https://deb.frrouting.org/frr/keys.asc | apt-key add - \
    && echo deb https://deb.frrouting.org/frr $(lsb_release -s -c) frr-stable | tee -a /etc/apt/sources.list.d/frr.list \
    && apt-get update && apt-get install -y frr frr-pythontools \
    && apt install iproute2 \
    && apt install iputils-ping \
    && sysctl -w net.ipv4.ip_forward=1 \
    && sysctl -w net.ipv6.conf.all.forwarding=1

# Exposer les ports pour les protocoles courants (modifie selon tes besoins)
EXPOSE 179 2601 2605 2604 2602 2608

# Copier le script d'entrée dans le conteneur
COPY entrypoint.sh /entrypoint.sh

# Donner les droits d'exécution au script
RUN chmod +x /entrypoint.sh

# Utiliser le script comme point d'entrée
ENTRYPOINT ["/entrypoint.sh"]


