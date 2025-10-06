#tabla de multiplicar con while
try:
    numero = int(input("Ingrese un número para ver su tabla de multiplicar: "))
    i = 1
    while i <= 10:
        print(f"{numero} x {i} = {numero * i}")
        i += 1
except ValueError:
    print("Por favor, ingrese un número válido.")