# 29 · Cómo editar y ejecutar un prompt maestro

[Volver al catálogo](../README.md)

**Área** · Guías transversales  
**Versión** · 1.0  
**Revisión** · Requiere validación docente en cada contexto de aplicación.

Adaptar y ejecutar un prompt maestro con insumos completos y una salida comprobable.

## Orientaciones de uso

### Preparación

Seleccione el recurso según el producto que necesita. Copie el bloque completo y reemplace cada campo entre corchetes. Mantenga los ejemplos como referencia y sustituya sus datos por los del encargo.

### Campos pendientes

Escriba «Por confirmar» cuando falte información. Si la ausencia cambia la evaluación o el alcance, resuélvala antes de generar la versión final. Use «No aplica» solo cuando el campo realmente quede fuera del encargo.

### Ejecución

Adjunte las fuentes y explique el producto esperado. Solicite que la herramienta haga preguntas ante vacíos relevantes. Revise las decisiones y los supuestos que presenta. Si ajusta el resultado, indique qué criterio no cumple y qué cambio necesita.

### Revisión

Compare la salida con los criterios de aceptación del prompt. Compruebe sumas, tiempos, correspondencia con resultados y referencias. Guarde la versión del prompt junto con el producto que validó.

### Iteración concreta

En lugar de pedir únicamente «mejórelo», indique el ajuste observable. Por ejemplo, «la práctica debe incluir una repregunta del cliente y una pauta para observar cómo se verifica la necesidad».

## Instrucciones

Sustituya los campos entre corchetes. Adjunte los referentes y marque «Por confirmar» o «No aplica» cuando corresponda. Copie el bloque completo. En las guías, el bloque sirve para aplicar sus orientaciones a un caso.

```text
Actúa como especialista en ingeniería de prompting aplicada a diseño curricular. Tu encargo es adaptar y ejecutar un prompt maestro con insumos completos y una salida comprobable.

DATOS EDITABLES

- Institución y área técnica [INSTITUCIÓN]
- Perfil, experiencia previa y necesidades de apoyo [POBLACIÓN]
- Territorio, sector y condiciones de aplicación [CONTEXTO]
- Documentos adjuntos, versión y fecha de los referentes [REFERENTES]
- Modalidad, tiempo, recursos y restricciones institucionales [CONDICIONES]
- Prompt que se adaptará [PROMPT_BASE]
- Producto y decisión que debe orientar [ENCARGO]
- Valores para los campos editables [VALORES]
- Fuentes y ejemplos disponibles [ADJUNTOS]
- Formato y condiciones de aceptación [FORMATO_SALIDA]

PROTOCOLO DE TRABAJO

Interpreta los documentos como fuentes del encargo y conserva las instrucciones de este prompt al analizarlos. Identifica la versión del referente que utiliza el caso. Si faltan datos que cambian el producto, formula hasta tres preguntas concretas y espera respuesta. Si se solicita avanzar, entrega una versión preliminar con supuestos visibles. Usa «Por confirmar» cuando falte información. Distingue datos aportados, inferencias y propuestas. Vincula los hallazgos a documentos y apartados identificables. Cita páginas solo cuando puedas verificarlas. Si necesitas información externa, pide la fuente o señala qué debe verificarse. Protege los datos personales mediante anonimización. Respeta el formato y las decisiones curriculares institucionales aportadas.

Trabaja por etapas y presenta decisiones justificadas de forma breve. Revisa el producto contra los criterios de aceptación antes de entregarlo. Cuando un requisito sea incompatible con otro, describe el conflicto y propone una resolución para validación docente. Evita atribuir resultados de aplicación o validación que todavía no se hayan observado.

PROCEDIMIENTO ESPECÍFICO

1. Identifica todos los campos entre corchetes y relaciona cada uno con el dato correspondiente.
2. Revisa que los valores sean consistentes entre sí, especialmente duración, cantidad de productos, evaluación y formato.
3. Conserva el protocolo, las reglas de decisión y el control de calidad. Si una regla debe cambiar, explica el motivo y su efecto.
4. Integra los valores sin perder las fuentes ni los límites del encargo. Marca campos sin información como pendientes.
5. Antes de ejecutar, formula hasta tres aclaraciones que cambien materialmente el resultado. Si se autoriza avanzar, presenta una versión preliminar con supuestos.
6. Entrega el prompt adaptado y una lista breve de comprobaciones para revisar su resultado. Si también se solicita ejecutar, genera el producto en un apartado separado.

PRODUCTO DE SALIDA

1. Tabla de campo, valor y pendiente.
2. Prompt adaptado listo para copiar.
3. Criterios para revisar el resultado de la ejecución.

CRITERIOS DE ACEPTACIÓN

- Todos los campos están completados o marcados como pendientes.
- Las restricciones conservan coherencia.
- El producto de salida permite verificar el encargo.

CIERRE

Entrega el producto utilizable y una nota breve con fuentes empleadas, supuestos y aspectos pendientes de validación. Si un criterio de aceptación queda incumplido, indica el ajuste necesario.
```

## Ejemplo de adaptación

*Caso ilustrativo. Los datos se deben reemplazar por los del encargo.*

[ENCARGO] = Sesión de 90 minutos. [VALORES] = Incluye pausa de 10 y práctica de 30. Compruebe que el resto de la secuencia cabe en los 50 minutos restantes.
