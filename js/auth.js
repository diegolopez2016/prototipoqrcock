// Gestión de autenticación y navegación
const Auth = {
    login(user, pass) {
        if (user === 'admin' && pass === '1234') {
            localStorage.setItem('session', JSON.stringify({ user: 'admin', rol: 'Administrador' }));
            return true;
        }
        if (user === 'lector' && pass === '1234') {
            localStorage.setItem('session', JSON.stringify({ user: 'lector', rol: 'Lector' }));
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem('session');
        window.location.href = 'index.html';
    },

    checkSession() {
        const session = JSON.parse(localStorage.getItem('session'));
        const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
        const isPublicPage = window.location.pathname.endsWith('lector-qr.html');
        
        if (!session && !isLoginPage && !isPublicPage) {
            window.location.href = 'index.html';
        }
        if (session && isLoginPage) {
            window.location.href = 'dashboard.html';
        }
        return session;
    },

    getRole() {
        const session = JSON.parse(localStorage.getItem('session'));
        return session ? session.rol : null;
    }
};

window.Auth = Auth;

// Cargar Sidebar dinámico si el contenedor existe
document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        const rol = Auth.getRole();
        const currentPath = window.location.pathname.split('/').pop();
        
        // Inject Font Awesome
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(fa);
        }

        let menuHTML = `
            <a href="dashboard.html" class="sidebar-logo">
                <img src="img/logo.jpg" alt="Logo" style="height: 40px; width: auto; background: white; padding: 2px; border-radius: 4px;" onerror="this.src='https://ui-avatars.com/api/?name=JD&background=e31e24&color=fff'">
                <span style="font-size: 1.1rem; line-height: 1.1;">Juan de Dios<br><small style="font-size: 0.7rem; color: #cbd5e1;">Control de Asistencia</small></span>
            </a>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="dashboard.html" class="nav-link ${currentPath === 'dashboard.html' ? 'active' : ''}">
                        <i class="fas fa-chart-line"></i> Dashboard
                    </a>
                </li>
        `;

        if (rol === 'Administrador') {
            menuHTML += `
                <li class="nav-item">
                    <a href="estudiantes.html" class="nav-link ${currentPath === 'estudiantes.html' ? 'active' : ''}">
                        <i class="fas fa-user-graduate"></i> Estudiantes
                    </a>
                </li>
                <li class="nav-item">
                    <a href="horarios.html" class="nav-link ${currentPath === 'horarios.html' ? 'active' : ''}">
                        <i class="fas fa-calendar-alt"></i> Horarios
                    </a>
                </li>
                <li class="nav-item">
                    <a href="generar-qr.html" class="nav-link ${currentPath === 'generar-qr.html' ? 'active' : ''}">
                        <i class="fas fa-id-card"></i> Generar QR
                    </a>
                </li>
                <li class="nav-item">
                    <a href="reportes.html" class="nav-link ${currentPath === 'reportes.html' ? 'active' : ''}">
                        <i class="fas fa-file-invoice"></i> Reportes
                    </a>
                </li>
            `;
        }

        menuHTML += `
                <li class="nav-item">
                    <a href="lector-qr.html" class="nav-link ${currentPath === 'lector-qr.html' ? 'active' : ''}">
                        <i class="fas fa-qrcode"></i> Lector QR
                    </a>
                </li>
                <li class="nav-item">
                    <a href="asistencias.html" class="nav-link ${currentPath === 'asistencias.html' ? 'active' : ''}">
                        <i class="fas fa-list-ul"></i> Asistencias
                    </a>
                </li>
            </ul>
            <div style="margin-top: auto;">
                <button onclick="Auth.logout()" class="btn" style="background: #334155; color: white; width: 100%; justify-content: center;">
                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
            </div>
        `;
        sidebarContainer.innerHTML = menuHTML;
    }
});
