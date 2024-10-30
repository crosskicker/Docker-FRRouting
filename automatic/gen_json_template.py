import json
import argparse

def gen_rn(n):
    list_r = []
    for i in range(1,n+1):
        print(i)
        list_r.append({"name" : "r"+str(i),"connected":[]})
    generate_json(list_r)



def generate_json(lObj):
    try:
        # Open template
        with open("save_template.json", "r") as file:
            config = json.load(file)
    except FileNotFoundError:
        print("Erreur : File doesn't exists.")
    except IOError:
        print("Erreur : Error : Can't read the file.")
    
    for obj in lObj:
    # Add configuration
        config["routers"].append(obj)

    try:
    #generate new json
        with open("config.json", "w") as file:
            json.dump(config, file, indent=4)
    except IOError:
        print(f"Error : Can't write the file.")


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser(description="Network CLI instanciation")
    parser.add_argument("-n", "--nombre", help="Nombre d'itérations", type=int, default=4)
    args = parser.parse_args() 
    gen_rn(args.nombre)
    