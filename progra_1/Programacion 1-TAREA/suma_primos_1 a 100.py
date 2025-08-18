#Suma de numeros primos del 1 a 100

def es_primo(num):
    if num < 2:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

suma = 0
for i in range(1, 101):
    if es_primo(i):
        suma += i
print("La suma de los números primos del 1 al 100 es:", suma)