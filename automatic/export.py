# export.py
# to export the project and run it on an other machine
import tarfile
import argparse


# List of files to include in the archive
files_to_include = ["docker-compose.yml", "volumes/"]

def tar_project(name):
    # Create a tar.gz archive and add each file
    with tarfile.open(f"{name}.tar.gz", "w:gz") as tarf:
        for file in files_to_include:
            tarf.add(file)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=" To export the network project in tar format")
    parser.add_argument("-o", "--output", help="name of tar project", type=str, default=4)
    args = parser.parse_args() 
    tar_project(args.output)
