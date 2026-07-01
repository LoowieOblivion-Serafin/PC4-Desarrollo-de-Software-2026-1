# PetApp — Reporte de Mascotas Perdidas, Buscador por Imagen y Red de Cuidadores

Aplicación Java de consola que implementa los requerimientos del enunciado usando
patrones de diseño GoF. El esqueleto original de patrones (paquetes
`*/pattern/`) se mantiene como referencia UML canónica; los paquetes
`*/examples/` fueron reescritos para instanciar la aplicación de mascotas.

## Ejecutar

Requisitos: JDK 8+.

```bash
# 1) compilar
find src -name "*.java" > sources.txt
javac -d out @sources.txt

# 2) ejecutar el orquestador
java -cp out petapp.App
```

En PowerShell:

```powershell
Get-ChildItem -Recurse src -Filter *.java | ForEach-Object FullName | Set-Content sources.txt
javac -d out '@sources.txt'
java -cp out petapp.App
```

## Mapa Requerimiento → Patrón

### 1. Reporte de Animales Perdidos y Alertas
| Req  | Patrón             | Paquete                                          |
|------|--------------------|--------------------------------------------------|
| RF1.1| **Builder**        | `builder/examples/petreport/`                    |
| RF1.2| Builder (Location) | `petapp/domain/Location.java`                    |
| RF1.3| Modelo dominio     | `petapp/domain/Sighting.java`                    |
| RF1.4 + RNF1.1 | **Observer** | `observer/examples/lostpetalerts/`             |
| RNF1.2 | **Proxy**        | `proxy/examples/owneranonymizer/`                |

### 2. Buscador Multipropósito por Imagen
| Req  | Patrón             | Paquete                                          |
|------|--------------------|--------------------------------------------------|
| RF2.1| **Facade**         | `facade/examples/imagesearch/`                   |
| RF2.2| **Strategy**       | `strategy/examples/searchintent/`                |
| RF2.3-2.5 | **Abstract Factory** | `abstractfactory/examples/searchcatalog/` |
| RNF2.1 | **Adapter**      | `adapter/examples/metadata/`                     |
| RNF2.2 | Medición latencia en `ImageSearchFacade` |                        |

### 3. Red de Cuidadores de Mascotas
| Req  | Patrón             | Paquete                                          |
|------|--------------------|--------------------------------------------------|
| RF3.1| **Factory Method** | `factory/examples/caretakers/`                   |
| RF3.2| **Decorator**      | `decorator/examples/caretakerrestrictions/`      |
| RF3.3| **State**          | `state/examples/alerttoggle/`                    |
| RF3.4| **Composite**      | `composite/examples/reviews/`                    |
| RNF3.1 | **Chain of Responsibility** | `chain/examples/idvalidation/`         |
| RNF3.2 | **Singleton**    | `singleton/examples/caretakerservice/`           |

## Salida esperada (extracto)

```
--- 1. Reporte de mascota perdida + alertas ---
Reporte: PetReport{Pet{name=Firulais, ...}, at=(-12.0464, -77.0428), by=Ana Perez}
Dueno (vista publica): Dueno#4821 tel=[oculto]
[LostPetAlertService] radius=1.0km delivered in 3 ms (SLO <5000ms)

--- 2. Buscador multiproposito por imagen ---
[ImageSearchFacade] intent=ADOPTION meta={...} elapsedMs=4
SearchResult{intent=ADOPTION, matches=[ONG PatitasLibres..., Refugio SanFrancisco...]}

--- 3. Red de cuidadores ---
Luis [Profesional] ... | Especies: [Perro, Gato] | Rechaza medicamentos
OK DniFormatValidator ... APROBADA
Rating promedio: 4.5
```

## Estructura

```
src/
  petapp/              orquestador + dominio (Pet, Owner, Location, Sighting)
  <patron>/pattern/    UML canonico (sin cambios)
  <patron>/examples/   caso de uso PetApp por patron
```
