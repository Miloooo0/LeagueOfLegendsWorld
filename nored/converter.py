from PIL import Image
import os

input_dir = "."  # Directorio actual

output_dir = os.path.join(input_dir, "convertidas_webp")
os.makedirs(output_dir, exist_ok=True)

for file in os.listdir(input_dir):
    if file.lower().endswith(".jpg") or file.lower().endswith(".jpeg"):
        img_path = os.path.join(input_dir, file)
        img = Image.open(img_path)
        
        webp_path = os.path.join(output_dir, f"{os.path.splitext(file)[0]}.webp")
        img.save(webp_path, "WEBP")

print("Conversión completada. Imágenes guardadas en:", output_dir)

