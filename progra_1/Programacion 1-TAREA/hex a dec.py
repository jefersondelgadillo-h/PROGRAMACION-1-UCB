#Convertir numero hexadecimal a binario
num_hex = input("Ingrese un numero hexadecimal: ")
num_bin = bin(int(num_hex, 16)).replace("0b", "")

print("El número hexadecimal", num_hex, "en binario es:", num_bin)