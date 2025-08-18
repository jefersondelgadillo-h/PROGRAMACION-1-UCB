#Suma de numeros binarios
try:
    num1 = int(input("Ingrese un numero decimal: "))
    num2 = int(input("Ingrese otro numero decimal: "))
    if (num1 and num2)>0: 
        suma_binario = bin(num1 + num2).replace("0b", "")
        print("La suma de los dos numeros en binario es:", suma_binario)
        res_dec = int(suma_binario, 2)
        print("La suma de los dos numeros en decimal es:", res_dec)
    else:
        print("Los numeros deben ser enteros positivos.")
except ValueError:
    print("Entrada no válida. Por favor, ingrese números enteros.")