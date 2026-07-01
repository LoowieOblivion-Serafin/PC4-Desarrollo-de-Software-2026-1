# PetApp — Reporte de Mascotas Perdidas, Buscador por Imagen y Red de Cuidadores

Aplicación PetApp reescrita a **Node.js + Python**, manteniendo los mismos
patrones de diseño GoF (Builder, Observer, Proxy, State, Facade, Strategy,
Abstract Factory, Adapter, Factory Method, Decorator, Composite, Chain of
Responsibility, Singleton) del esqueleto original en Java.

- **Node.js**: lógica de dominio y todos los patrones estructurales/comportamiento.
- **Python**: motor de análisis de imagen (`python/image_analyzer.py`) invocado
  por el `MetadataAdapter` para producir el JSON estándar de RNF2.1.

## Prerrequisitos

- Node.js 18+ (probado en v25.9)
- Python 3.9+ (probado en 3.11)

Verificar:
```powershell
node --version
python --version
```

## Ejecutar en local

```powershell
# Orquestador completo (3 secciones)
node src/petapp/app.js

# Alias via npm
npm start
```

Tests por módulo:
```powershell
npm run test:builder
npm run test:observer
npm run test:proxy
npm run test:facade
```

O directo:
```powershell
node src/builder/examples/petreport/PetReportTest.js
node src/observer/examples/lostpetalerts/LostPetAlertsTest.js
node src/proxy/examples/owneranonymizer/AnonymizerTest.js
node src/facade/examples/imagesearch/ImageSearchTest.js
```

## En Antigravity IDE

1. `File → Open Folder…` → carpeta `skeleton/`
2. Terminal integrado (`` Ctrl + ` ``)
3. Ejecutar:
   ```powershell
   node src/petapp/app.js
   ```
4. Debug: `F5` con `.vscode/launch.json` (Node) apuntando a `src/petapp/app.js`.

## Mapa Requerimiento → Patrón → Archivo

### 1. Reporte de Animales Perdidos y Alertas
| Req  | Patrón             | Módulo                                              |
|------|--------------------|-----------------------------------------------------|
| RF1.1| **Builder**        | `src/builder/examples/petreport/`                   |
| RF1.2| Builder (Location) | `src/petapp/domain/Location.js`                     |
| RF1.3| Modelo dominio     | `src/petapp/domain/Sighting.js`                     |
| RF1.4 + RNF1.1 | **Observer** | `src/observer/examples/lostpetalerts/`         |
| RNF1.2 | **Proxy**        | `src/proxy/examples/owneranonymizer/`               |

### 2. Buscador Multipropósito por Imagen
| Req  | Patrón             | Módulo                                              |
|------|--------------------|-----------------------------------------------------|
| RF2.1| **Facade**         | `src/facade/examples/imagesearch/`                  |
| RF2.2| **Strategy**       | `src/strategy/examples/searchintent/`               |
| RF2.3-2.5 | **Abstract Factory** | `src/abstractfactory/examples/searchcatalog/` |
| RNF2.1 | **Adapter** (JS→Python) | `src/adapter/examples/metadata/` + `python/image_analyzer.py` |
| RNF2.2 | Latencia medida en `ImageSearchFacade` |                         |

### 3. Red de Cuidadores de Mascotas
| Req  | Patrón             | Módulo                                              |
|------|--------------------|-----------------------------------------------------|
| RF3.1| **Factory Method** | `src/factory/examples/caretakers/`                  |
| RF3.2| **Decorator**      | `src/decorator/examples/caretakerrestrictions/`     |
| RF3.3| **State**          | `src/state/examples/alerttoggle/`                   |
| RF3.4| **Composite**      | `src/composite/examples/reviews/`                   |
| RNF3.1 | **Chain of Responsibility** | `src/chain/examples/idvalidation/`         |
| RNF3.2 | **Singleton**    | `src/singleton/examples/caretakerservice/`          |

## Salida esperada (extracto)

```
--- 1. Reporte de mascota perdida + alertas ---
Reporte: PetReport{Pet{name=Firulais, ...}, at=(-12.0464, -77.0428), by=Ana Perez}
Dueno (vista publica): Dueno#4821 tel=[oculto]
[LostPetAlertService] radio=1km entregado en 0 ms (SLO <5000ms)

--- 2. Buscador multiproposito por imagen ---
[ImageSearchFacade] intent=ADOPTION meta={"mime":"image/png",...} elapsedMs=100
SearchResult{intent=ADOPTION, matches=["ONG PatitasLibres...","Refugio SanFrancisco..."]}

--- 3. Red de cuidadores ---
Luis [Profesional] ... | Especies: ["Perro","Gato"] | Rechaza medicamentos
OK DniFormatValidator ... APROBADA
Rating promedio: 4.5
```

## Estructura

```
skeleton/
├── package.json              scripts npm
├── python/
│   └── image_analyzer.py     motor vision (RNF2.1)
└── src/
    ├── petapp/               orquestador + dominio (Pet, Owner, Location, Sighting)
    │   ├── app.js
    │   └── domain/
    └── <patron>/
        ├── pattern/          contrato GoF canonico en JS
        └── examples/         caso de uso PetApp por patron
```
