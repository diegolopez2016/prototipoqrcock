// Manejo de persistencia con LocalStorage para el prototipo TRL5
const Storage = {
    // Inicializar datos por defecto si el storage está vacío
    init() {
        if (!localStorage.getItem('estudiantes')) {
            localStorage.setItem('estudiantes', JSON.stringify([
                { 
                    id: '1001', t_doc: 'TI', folio: '001', ape1: 'Perez', ape2: 'Gomez', nom1: 'Juan', nom2: 'Carlos', grupo: '11-1', jornada: 'Mañana',
                    acudiente_nom: 'Pedro Perez', acudiente_tel: '3001234567', acudiente_mail: 'pedro@mail.com', sexo: 'M'
                },
                { 
                    id: '1002', t_doc: 'TI', folio: '002', ape1: 'Rodriguez', ape2: 'Lopez', nom1: 'Maria', nom2: 'Fernanda', grupo: '10-1', jornada: 'Tarde',
                    acudiente_nom: 'Lucia Lopez', acudiente_tel: '3109876543', acudiente_mail: 'lucia@mail.com', sexo: 'F'
                }
            ]));
        }
        if (!localStorage.getItem('asistencias')) {
            localStorage.setItem('asistencias', JSON.stringify([]));
        }
        if (!localStorage.getItem('horarios')) {
            localStorage.setItem('horarios', JSON.stringify([
                { id: 1, nombre: 'Entrada Mañana', hora: '07:00', tolerancia: '15', activo: true },
                { id: 2, nombre: 'Salida Mañana', hora: '13:00', tolerancia: '0', activo: true }
            ]));
        }
        if (!localStorage.getItem('config')) {
            localStorage.setItem('config', JSON.stringify({
                pin_activacion: '1234'
            }));
        }

        // Corrección de tipos si quedaron como objetos por error previo
        ['estudiantes', 'asistencias', 'horarios'].forEach(key => {
            const val = JSON.parse(localStorage.getItem(key));
            if (val && !Array.isArray(val)) {
                localStorage.setItem(key, JSON.stringify([]));
                console.log(`Corregido tipo de ${key} a Array`);
            }
        });
    },

    // Métodos Genéricos
    getData(key) {
        const data = localStorage.getItem(key);
        if (!data) {
            return (key === 'config') ? {} : [];
        }
        return JSON.parse(data);
    },

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Configuración
    getConfig() { return this.getData('config'); },
    saveConfig(cfg) { this.saveData('config', cfg); },

    // Estudiantes
    getEstudiantes() { return this.getData('estudiantes'); },
    addEstudiante(est) {
        const list = this.getEstudiantes();
        list.push(est);
        this.saveData('estudiantes', list);
    },

    // Asistencias
    getAsistencias() { return this.getData('asistencias'); },
    registrarAsistencia(id_doc) {
        const list = this.getAsistencias();
        const est = this.getEstudiantes().find(e => e.id === id_doc);
        if (!est) return null;

        const hoy = new Date().toISOString().split('T')[0];
        const horaActual = new Date().toLocaleTimeString();
        
        // Buscar si ya existe un registro para este estudiante HOY que no tenga salida
        // O simplemente el último registro de hoy para actualizarlo
        const index = list.findIndex(a => a.id_doc === id_doc && a.fecha === hoy);
        
        let registro;

        if (index !== -1 && !list[index].hora_salida) {
            // Si ya entró pero no ha salido, marcar SALIDA
            list[index].hora_salida = horaActual;
            list[index].notificado_salida = true;
            list[index].notificado_metodo = 'WhatsApp/Email';
            registro = list[index];
            registro.tipo = 'SALIDA'; // Para el feedback visual del lector
        } else {
            // Si no existe registro hoy o ya tiene entrada y salida completa, crear NUEVA entrada
            registro = {
                id: Date.now(),
                id_doc: id_doc,
                nombre: `${est.nom1} ${est.ape1}`,
                grupo: est.grupo,
                fecha: hoy,
                hora_entrada: horaActual,
                hora_salida: null,
                tipo: 'ENTRADA',
                notificado_entrada: true,
                notificado_metodo: 'WhatsApp/Email'
            };
            list.unshift(registro);
        }

        this.saveData('asistencias', list);
        return registro;
    },

    // Horarios
    getHorarios() { return this.getData('horarios'); },
    saveHorarios(horarios) { this.saveData('horarios', horarios); }
};

Storage.init();
window.Storage = Storage;
