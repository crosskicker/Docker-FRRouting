import subprocess

# Commande pour arrêter tous les conteneurs en cours d'exécution
try:
    subprocess.run("docker stop $(docker ps -q)", shell=True, check=True)
    print("Tous les conteneurs en cours d'exécution ont été arrêtés.")
except subprocess.CalledProcessError:
    print("Aucun conteneur à arrêter ou erreur lors de l'arrêt.")

# Commande pour supprimer tous les conteneurs arrêtés
try:
    subprocess.run("docker rm $(docker ps -a -q -f status=exited)", shell=True, check=True)
    print("Tous les conteneurs arrêtés ont été supprimés.")
except subprocess.CalledProcessError:
    print("Aucun conteneur arrêté à supprimer ou erreur lors de la suppression.")

try:
    subprocess.run("pkill xterm", shell=True, check=True)
except subprocess.CalledProcessError:
    print("Impossible to kill xterm process")
try:
    subprocess.run("rm -r ./volumes/r* ", shell=True, check=True)
except subprocess.CalledProcessError:
    print("Impossible to erase volumes children folders")