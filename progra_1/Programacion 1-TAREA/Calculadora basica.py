#Calculadora basica con resultado binario

int1 = int(input("Ingrese el primer número: "))
int2 = int(input("Ingrese el segundo número: "))
operacion = input("Ingrese la operación (+, -, *, /): ")

if operacion == "+":
    resultado = int1 + int2
    print("El resultado en binario es:", bin(int(resultado)).replace("0b", ""))

elif operacion == "-":
    resultado = int1 - int2
    print("El resultado en binario es:", bin(int(resultado)).replace("0b", ""))

elif operacion == "*":
    resultado = int1 * int2
    print("El resultado en binario es:", bin(int(resultado)).replace("0b", ""))

elif operacion == "/":
    resultado = int1 / int2
    print("El resultado en binario es:", bin(int(resultado)).replace("0b", ""))
else:
    print("Operación no válida.")
    resultado = None