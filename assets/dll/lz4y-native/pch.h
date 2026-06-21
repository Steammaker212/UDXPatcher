// pch.h: este es un archivo de encabezado precompilado.
// Los archivos que se muestran a continuación se compilan solo una vez, lo que mejora el rendimiento de la compilación en futuras compilaciones.
// Esto también afecta al rendimiento de IntelliSense, incluida la integridad del código y muchas funciones de exploración del código.
// Sin embargo, los archivos que se muestran aquí se vuelven TODOS a compilar si alguno de ellos se actualiza entre compilaciones.
// No agregue aquí los archivos que se vayan a actualizar con frecuencia, ya que esto invalida la ventaja de rendimiento.

#ifndef PCH_H
#define PCH_H

// agregue aquí los encabezados que desea precompilar
#include "framework.h"
#include <cstdint>

#define EXPORT extern "C" __declspec(dllexport)

EXPORT int LZ4_Compress(
    const uint8_t* src,
    int srcSize,
    uint8_t* dst,
    int dstCapacity
);

EXPORT int LZ4_MaxCompressedSize(int srcSize);

#endif //PCH_H