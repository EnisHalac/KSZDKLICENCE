import os
import requests
import pandas as pd
from concurrent.futures import ThreadPoolExecutor

# Putanja do Excel datoteke
excel_file_path = 'licence.xlsx'

# Učitaj Excel datoteku
df = pd.read_excel(excel_file_path)

# Definiši folder za slike
output_folder = 'server/public/images/players'
os.makedirs(output_folder, exist_ok=True)

def download_image(row):
    player_name = row["Ime i prezime"].rstrip()  # Ukloni samo razmak na kraju stringa
    img_url = row["Slika"].replace("open?id=", "uc?id=")
    img_data = requests.get(img_url).content
    img_name = f"{player_name}.jpg"  # Sačuvaj kao Ime Prezime bez suvišnih razmaka na kraju
    
    # Snimi sliku u folder
    with open(os.path.join(output_folder, img_name), 'wb') as handler:
        handler.write(img_data)

    print(f"Slika za {player_name} snimljena u folder: {output_folder}")

# Preuzmi slike koristeći višestruko threadovanje
with ThreadPoolExecutor() as executor:
    executor.map(download_image, [row for _, row in df.iterrows()])
