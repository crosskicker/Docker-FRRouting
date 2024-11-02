import json
import subprocess



    
def terminal_run(dico):    
    for container in dico["routers"]:
        # Run terminals
        full_command = f"xterm -hold  -fa 'Monospace' -fs 12 -e 'docker exec -it {container['name']} /bin/bash'"
        subprocess.Popen(full_command, shell=True)

if __name__ == "__main__":
    try:
        result = subprocess.run(["docker-compose", "up", "-d"], check=True, capture_output=True, text=True)
        print("Docker Compose launched successfully.")
        terminal_run(dico)
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error during docker-compose processing:")
        print(e.stderr)