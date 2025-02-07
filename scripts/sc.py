from PIL import Image
import os

def resize_images(directory, height=133): 
    # Asegurarse de que el directorio existe
    if not os.path.exists(directory):
        print("El directorio no existe.")
        return
    
    # Crear una carpeta de salida
    output_dir = os.path.join(directory, "redimensionadas")
    os.makedirs(output_dir, exist_ok=True)
    
    # Recorrer todos los archivos en el directorio
    for filename in os.listdir(directory):
        if filename.lower().endswith(".png"):
            filepath = os.path.join(directory, filename)
            try:
                with Image.open(filepath) as img:
                    # Obtener las dimensiones originales
                    original_width, original_height = img.size
                    
                    # Calcular el nuevo ancho manteniendo la proporción
                    aspect_ratio = original_width / original_height
                    new_width = int(height * aspect_ratio)
                    
                    # Redimensionar la imagen
                    img_resized = img.resize((new_width, height), Image.LANCZOS)
                    
                    # Guardar la imagen redimensionada
                    output_path = os.path.join(output_dir, filename)
                    img_resized.save(output_path, "PNG")
                    print(f"Imagen guardada: {output_path}")
            except Exception as e:
                print(f"Error al procesar {filename}: {e}")

if __name__ == "__main__":
    directorio = input("Ingrese la ruta del directorio con las imágenes: ")
    resize_images(directorio)
