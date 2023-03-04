"""for i in range(5):
    print(i)
    if i == 3:
        break
else: 
    print('Se ha terminado correctamente')"""

respuesta = ''
while respuesta != 's':
    respuesta = input('Ingrese algo: ')
    if respuesta == 'n':
        break
else:
    print('Se ha finalizado sin romper el ciclo')