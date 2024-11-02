# run.py
# This file permit to generate and run the docker-compose.yml
# from the configuration file confgi.json
import json
from ruamel.yaml import YAML
import os
import subprocess

def read_json():
    try:
        with open("config.json", "r") as file:
            config = json.load(file)
    except FileNotFoundError:
        print("Erreur : File doesn't exist.")
    except IOError:
        print("Erreur : Can't read the file.")
        return {}

    return config.get("routers", [])

def generate_yaml(dico):
    net_L = []
    # Initialiser le dictionnaire dans l'ordre voulu sans OrderedDict
    config = {
        "version": "3",
        "services": {},
        "networks": {}
    }

    # Create section 'services'
    for elem in dico:
        # Create folders for volume binding
        try:
            subprocess.run(["mkdir", "-p", f"./volumes/{elem["name"]}"], check=True)
            subprocess.run(f"cp ./volumes/save/* ./volumes/{elem['name']}", shell=True, check=True)
        except subprocess.CalledProcessError as e:
            print("Error during volumes folders creation : ", e)

        net_L.append(elem["connected"])
        service_name = elem["name"]
        config['services'][service_name] = {
            'image': 'crosskicker/frr-image-c:latest',
            'container_name': service_name,
            'hostname': elem["name"],
            'privileged': True,
            'networks': elem["connected"],
            'volumes': [f'./volumes/{elem["name"]}:/etc/frr']
        }

    # Construire la section 'networks' sans doublons
    unique_networks = list(dict.fromkeys([n for sublist in net_L for n in sublist]))
    for network in unique_networks:
        config["networks"][network] = {'driver': 'bridge'}

    # Écrire dans le fichier YAML avec l'ordre garanti
    yaml = YAML()
    yaml.default_flow_style = False  # Désactive le style de flux compact
    yaml.explicit_start = False  # Pas de document start "---"

    with open("docker-compose.yml", "w") as file:
        yaml.dump(config, file)
    
def terminal_run(dico):    
    #TODO
    # rename shell for every container....
    for container in dico:
        # Construire la commande complète pour chaque terminal
        full_command = f"xterm -hold  -fa 'Monospace' -fs 12 -e 'docker exec -it {container['name']} /bin/bash'"        # Run terminals
        subprocess.Popen(full_command, shell=True)


if __name__ == "__main__":
    dico_routers = read_json()
    generate_yaml(dico_routers)
    try:
        result = subprocess.run(["docker-compose", "up", "-d"], check=True, capture_output=True, text=True)
        print("Docker Compose launched successfully.")
        terminal_run(dico_routers)
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error during docker-compose processing:")
        print(e.stderr)
