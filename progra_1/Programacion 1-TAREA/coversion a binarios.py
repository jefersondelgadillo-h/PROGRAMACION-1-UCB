# conversion de decimales a binarios

try:
    num = int(input("Ingrese un numero decimal: "))

    if num >= 0:
        print("El numero en binario es:", bin(num).replace("0b", ""))
        print("El numero en octal es: ", oct(num).replace("0o", ""))
        print("El numero hexadecimal es: ", hex(num).replace("0x", "").upper())
    else:
        print("Por favor ingrese un numero entero no negativo.")
except ValueError:
    print("Entrada no valida. Por favor ingrese un numero entero.")