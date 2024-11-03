# run.py
# This file permit to generate and run the docker-compose.yml
# from the configuration file confgi.json
import json
from ruamel.yaml import YAML
import os
import subprocess

# read_json
# permit to read the config.json file to give information on networks configuration  
# with the aim to generate the docker-compose
# output : dictionnary with name (str) and network list (str list)
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

# generate_yaml
# permit to generate the docker-compose.yml to build 
# our networks and create folders for volumes 
# input : dictionnary with networks information
def generate_yaml(dico):
    net_L = []
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

    # create list of all the networks
    unique_networks = list(dict.fromkeys([n for sublist in net_L for n in sublist]))
    for network in unique_networks:
        config["networks"][network] = {'driver': 'bridge'}

    # YAML configuration
    yaml = YAML()
    yaml.default_flow_style = False  
    yaml.explicit_start = False  

    # YAML file creation
    with open("docker-compose.yml", "w") as file:
        yaml.dump(config, file)

# terminal_run
# to run one terminal per router/container
# with xterm
# input : dictionnary of networks configuration
def terminal_run(dico):    
    for container in dico:
        # Run terminals
        full_command = f"xterm -hold  -fa 'Monospace' -fs 12 -e 'docker exec -it {container['name']} /bin/bash'"        # Run terminals
        subprocess.Popen(full_command, shell=True)

# main
# run all the fonctions and run the docker-compose.yml
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
