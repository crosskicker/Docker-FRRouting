# export.py
# to export the project and run it on an other machine
import tarfile
import argparse
import json

def read_json():
    try:
        with open("config.json", "r") as file:
            config = json.load(file)
            return config
    except FileNotFoundError:
        print("Erreur : File doesn't exist.")
    except IOError:
        print("Erreur : Can't read the file.")
        return {}



def tar_project(name):
    # List of files to include in the archive
    files_to_include = ["docker-compose.yml", "run_exported_project.py","erase.py","volumes/"]
    # Create a tar.gz archive and add each file
    with tarfile.open(f"{name}.tar.gz", "w:gz") as tarf:
        for file in files_to_include:
            tarf.add(file)

def create_script(config):
    try:
        # Read
        with open("run_exported_project.py", "r") as file:
            lines = file.readlines()
        # Clean line
        if lines[3].strip() != "":
            lines[3] = "\n"  
        # Insert
        lines.insert(3, f"dico = {config}" + "\n")  # line_number - 1 bc index begin to 0
        # Write
        with open("run_exported_project.py", "w") as file:
            file.writelines(lines)
    except:
        print("can't generate a clean run_exported_project.py script")



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=" To export the network project in tar format")
    parser.add_argument("-o", "--output", help="name of tar project", type=str, default="exported_project")
    args = parser.parse_args() 
    config = read_json()
    create_script(config)
    tar_project(args.output)
