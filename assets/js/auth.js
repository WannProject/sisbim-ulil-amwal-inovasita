// Authentication JavaScript for SISBIM

class AuthSystem {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkSession();
    }

    bindEvents() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Basic validation
        if (!email || !password || !role) {
            this.showAlert('Mohon isi semua field!', 'danger');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showAlert('Format email tidak valid!', 'danger');
            return;
        }

        // Simulate authentication (replace with real API call)
        this.authenticate(email, password, role);
    }

    authenticate(email, password, role) {
        // Sample users for demonstration with email format
        const users = {
            admin: { email: 'admin@ulilamwal.sch.id', password: 'admin123' },
            guru: { email: 'guru@ulilamwal.sch.id', password: 'guru123' },
            'kepala-sekolah': { email: 'kepala@ulilamwal.sch.id', password: 'kepala123' }
        };

        const user = users[role];

        if (user && email === user.email && password === user.password) {
            // Store session
            sessionStorage.setItem('currentUser', JSON.stringify({
                email: email,
                role: role,
                loginTime: new Date().toISOString()
            }));

            // Redirect to appropriate dashboard
            this.redirectToDashboard(role);
        } else {
            this.showAlert('Email atau password salah!', 'danger');
        }
    }

    redirectToDashboard(role) {
        const dashboards = {
            admin: '../admin/dashboard.html',
            guru: '../guru/dashboard.html',
            'kepala-sekolah': '../kepala-sekolah/dashboard.html'
        };

        window.location.href = dashboards[role];
    }

    checkSession() {
        const currentUser = sessionStorage.getItem('currentUser');
        const currentPage = window.location.pathname;

        // Redirect to login if not authenticated (except login page)
        if (!currentUser && !currentPage.includes('login.html')) {
            window.location.href = '../auth/login.html';
            return;
        }

        // Redirect to appropriate dashboard if accessing login while authenticated
        if (currentUser && currentPage.includes('login.html')) {
            const user = JSON.parse(currentUser);
            this.redirectToDashboard(user.role);
        }
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        window.location.href = '../auth/login.html';
    }

    showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert-auth');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-auth alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Insert after form
        const form = document.getElementById('loginForm');
        form.parentNode.insertBefore(alert, form.nextSibling);

        // Auto dismiss after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    getCurrentUser() {
        const user = sessionStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    hasRole(requiredRole) {
        const user = this.getCurrentUser();
        return user && user.role === requiredRole;
    }

    isAuthenticated() {
        return !!this.getCurrentUser();
    }
}

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Utility function for logout
function logout() {
    if (window.authSystem) {
        window.authSystem.logout();
    }
}

// Protect pages - add this to protected pages
function requireAuth() {
    if (!window.authSystem || !window.authSystem.isAuthenticated()) {
        window.location.href = '../auth/login.html';
    }
}