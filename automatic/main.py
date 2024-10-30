import os
from colorama import Fore, init
import argparse



if __name__ == "__main__":

    # mauvaise idee la CLI trop de chose a donné, 
    # mieux vaut un fichier de conf .json avec un template que l'utilisateur doit remplir
    
    """ parser = argparse.ArgumentParser(description="Network CLI instanciation")
    parser.add_argument("-o", "--output", help="Chemin du fichier de sortie", type=str)
    parser.add_argument("-n", "--nombre", help="Nombre d'itérations", type=int, default=10)
    args = parser.parse_args() """
