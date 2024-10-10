# Utiliser l'image Ubuntu comme base
FROM ubuntu:22.04

# Mainteneur de l'image (optionnel)
LABEL maintainer="alban.personnaz@gmail.com"

#Installation et configuration du routage avec FRRouting
RUN apt-get update && apt-get install -y curl gnupg2 lsb-release \
    && curl -s https://deb.frrouting.org/frr/keys.asc | apt-key add - \
    && echo deb https://deb.frrouting.org/frr $(lsb_release -s -c) frr-stable | tee -a /etc/apt/sources.list.d/frr.list \
    && apt-get update && apt-get install -y frr frr-pythontools \
    && sed -i 's/=no/=yes/g' /etc/frr/daemons \
    && sysctl -w net.ipv4.ip_forward=1 \
    && sysctl -w net.ipv6.conf.all.forwarding=1

# Exposer les ports pour les protocoles courants (modifie selon tes besoins)
EXPOSE 179 2601 2604

# Commande par défaut pour démarrer FRRouting
CMD ["/usr/lib/frr/frrinit.sh", "start"]
