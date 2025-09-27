// Main JavaScript for SISBIM System

class SISBIMApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initSidebar();
        this.initDataTables();
        this.initCharts();
        this.loadCurrentUser();
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleSidebar());
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Form submissions
        const forms = document.querySelectorAll('form[data-ajax]');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });

        // Delete confirmations
        const deleteBtns = document.querySelectorAll('[data-confirm-delete]');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.confirmDelete(e));
        });

        // Print buttons
        const printBtns = document.querySelectorAll('[data-print]');
        printBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePrint(e));
        });
    }

    initSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        if (sidebar && mainContent) {
            // Check for saved sidebar state
            const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');

        if (sidebar && mainContent) {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');

            // Save state
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        }

        // Mobile handling
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('show');
        }
    }

    initDataTables() {
        // Initialize DataTables if library is available
        if (typeof $.fn.DataTable !== 'undefined') {
            $('.datatable').DataTable({
                responsive: true,
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/id.json'
                }
            });
        }
    }

    initCharts() {
        // Initialize Chart.js if available
        if (typeof Chart !== 'undefined') {
            this.initDashboardCharts();
        }
    }

    initDashboardCharts() {
        // Sample chart implementations
        const chartElements = document.querySelectorAll('[data-chart]');
        chartElements.forEach(element => {
            const chartType = element.dataset.chart;
            const chartData = JSON.parse(element.dataset.chartData || '{}');

            new Chart(element, {
                type: chartType,
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        });
    }

    loadCurrentUser() {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        const userElements = document.querySelectorAll('[data-user-info]');

        userElements.forEach(element => {
            const info = element.dataset.userInfo;
            if (info === 'username') {
                element.textContent = currentUser.username || 'User';
            } else if (info === 'role') {
                element.textContent = this.formatRole(currentUser.role) || 'Role';
            } else if (info === 'login-time') {
                element.textContent = this.formatDate(currentUser.loginTime) || '';
            }
        });
    }

    formatRole(role) {
        const roleMap = {
            'admin': 'Administrator',
            'guru': 'Guru',
            'kepala-sekolah': 'Kepala Sekolah'
        };
        return roleMap[role] || role;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const url = form.action;
        const method = form.method || 'POST';

        // Show loading
        this.showLoading();

        // Simulate API call (replace with real fetch)
        setTimeout(() => {
            this.hideLoading();
            this.showAlert('Data berhasil disimpan!', 'success');
            form.reset();

            // Redirect if specified
            const redirect = form.dataset.redirect;
            if (redirect) {
                window.location.href = redirect;
            }
        }, 1000);
    }

    confirmDelete(e) {
        e.preventDefault();
        const btn = e.target;
        const message = btn.dataset.confirmDelete || 'Apakah Anda yakin ingin menghapus data ini?';

        if (confirm(message)) {
            const url = btn.href || btn.dataset.url;
            if (url) {
                window.location.href = url;
            }
        }
    }

    handlePrint(e) {
        e.preventDefault();
        const target = e.target.dataset.print;

        if (target) {
            const element = document.querySelector(target);
            if (element) {
                window.print();
            }
        }
    }

    showLoading() {
        const loadingHtml = `
            <div class="loading-overlay">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHtml);
    }

    hideLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    showAlert(message, type = 'info') {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3" style="z-index: 9999;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', alertHtml);

        // Auto dismiss
        setTimeout(() => {
            const alert = document.querySelector('.alert:last-child');
            if (alert) {
                alert.remove();
            }
        }, 5000);
    }

    logout() {
        if (confirm('Apakah Anda yakin ingin logout?')) {
            sessionStorage.removeItem('currentUser');
            window.location.href = '../auth/login.html';
        }
    }

    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    formatNumber(number) {
        return new Intl.NumberFormat('id-ID').format(number);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sisbimApp = new SISBIMApp();
});

// Global utility functions
function showAlert(message, type = 'info') {
    if (window.sisbimApp) {
        window.sisbimApp.showAlert(message, type);
    }
}

function showLoading() {
    if (window.sisbimApp) {
        window.sisbimApp.showLoading();
    }
}

function hideLoading() {
    if (window.sisbimApp) {
        window.sisbimApp.hideLoading();
    }
}