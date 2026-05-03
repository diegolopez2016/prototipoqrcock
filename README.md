# Prototipo Funcional TRL5 - Sistema de Asistencias QR

Este es el prototipo funcional solicitado para la Fase 4 del proyecto. Cumple con los requisitos de:
- **Metodología Ágil**: Basado en iteraciones y prototipado rápido.
- **Nivel TRL5**: Funcionalidad real simulada (registro, almacenamiento, lógica de negocio).
- **Independencia**: Ubicado en su propia carpeta `prototipo/`.
- **Persistencia**: Usa `localStorage` para mantener los datos entre sesiones.

## Instrucciones de uso:
1. **Logo**: Asegúrate de que el logo institucional esté guardado como `prototipo/img/logo.jpg`.
2. Abre el archivo `prototipo/index.html` en tu navegador.
3. **Credenciales de acceso**:
   - **Administrador**: usuario `admin` / clave `1234`
   - **Lector**: usuario `lector` / clave `1234`

## Identidad Institucional:
- Los colores han sido actualizados para coincidir con el escudo de la **I.E. Juan de Dios Cock**:
  - **Rojo Principal**: `#e31e24`
  - **Azul Secundario**: `#004a99`
  - **Dorado de Acento**: `#ffcc00` (inspirado en la antorcha del escudo)
1. **🔐 Login**: Acceso por roles.
2. **📊 Dashboard**: Estadísticas en tiempo real.
3. **👨‍🎓 Gestión de Estudiantes**: CRUD completo en memoria.
4. **⏰ Módulo de Horarios**: (NUEVO) Configura horas de entrada/salida y tolerancia.
5. **🎫 Generador de QR**: Genera códigos QR reales usando una API externa.
6. **📷 Lector QR**: Simulador de escaneo que registra asistencia automáticamente.
7. **📋 Historial**: Registro completo de todos los movimientos.

## Para el Documento Maestro y el Video:
- El diseño es moderno y "premium" (Vanilla CSS).
- El flujo es totalmente navegable.
- Puedes realizar cambios en vivo (ej. registrar un estudiante y luego escanearlo) y se mantendrán los datos.
