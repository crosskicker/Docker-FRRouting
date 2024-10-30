import json
import yaml 

# Return
# dico = {routeur_name1 : [...connection...],
#           ... }
def read_json():
    try:
        # Open template
        with open("config.json", "r") as file:
            config = json.load(file)
    except FileNotFoundError:
        print("Erreur : File doesn't exists.")
    except IOError:
        print("Erreur : Error : Can't read the file.")

    # To visualize data
    for elem in config["routers"]:
        #obj
        print(elem)
        #name
        print(elem["name"])
        #name list (connection)
        print(elem["connected"])
    return config["routers"]


def generate_yaml(dico):
    config = {"version": "3", "services": {}, "networks":{}}

    # Ajouter chaque élément du dictionnaire d'entrée
    for elem in dico:
        service_name = elem["name"]
        config['services'][service_name] = {
            'image': 'crosskicker/frr-image-c:latest',
            'container_name': service_name,
            'privileged': True,
            'networks': elem["connected"],
            'volumes': [
                '/etc/frr'
            ]
        }
    
    # TODO 
    # network part in Dockerfile 

    # Sauvegarder les modifications dans le fichier YAML
    with open("temp.yml", "w") as file:
        yaml.dump(config, file, default_flow_style=False)

    

if __name__ == "__main__":
    print("start")
    dico_routers = read_json()
    generate_yaml(dico_routers)