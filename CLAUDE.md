# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SISBIM (Sistem Informasi Buku Induk) is a comprehensive student information management system for MA Ulil Amwal Bulukumba. This is a frontend-only application built with vanilla HTML, CSS, and JavaScript, designed to manage student data, academic records, and administrative tasks across multiple user roles.

## Architecture

### Role-Based Access Control
The system implements a multi-role access system with three distinct user types:
- **Admin**: Full system access, user management, and system configuration
- **Guru**: Teacher access for student data input, grade management, and academic reporting
- **Kepala Sekolah**: Principal access for school statistics, data export, and administrative oversight

### Directory Structure
```
/
├── index.html              # Main landing page
├── auth/                   # Authentication module
│   └── login.html         # Login page
├── admin/                  # Admin dashboard and pages
│   ├── dashboard.html     # Admin main dashboard
│   ├── data-siswa.html    # Student data management
│   ├── input-siswa.html   # Student registration
│   ├── kelola-akun.html   # User account management
│   ├── laporan.html       # Reports and analytics
│   ├── rekap-data.html    # Data compilation
│   └── settings.html      # System configuration
├── guru/                   # Teacher dashboard and pages
│   ├── dashboard.html     # Teacher main dashboard
│   ├── data-siswa.html    # Student data viewing
│   ├── input-nilai.html   # Grade input system
│   ├── jadwal-mengajar.html # Teaching schedule
│   ├── rekap-nilai.html   # Grade compilation
│   └── settings.html      # Personal settings
├── kepala-sekolah/        # Principal dashboard and pages
│   ├── dashboard.html     # Principal main dashboard
│   ├── export-data.html   # Data export functionality
│   ├── laporan.html       # School reports
│   ├── statistik-sekolah.html # School statistics
│   └── profil.html        # Profile management
├── assets/                 # Static assets
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       ├── auth.js        # Authentication system
│       └── main.js        # Main application logic
└── assets/img/            # Images and media
```

### Core Components

#### Authentication System (`assets/js/auth.js`)
- Session-based authentication using sessionStorage
- Role-based access control with automatic redirection
- Password validation and user verification
- Login state management and session handling

#### Main Application (`assets/js/main.js`)
- Dashboard initialization and management
- Sidebar toggle functionality with localStorage persistence
- Form handling with AJAX simulation
- DataTables integration for data presentation
- Chart.js integration for data visualization
- Utility functions for formatting, validation, and UI management

## Development Commands

Since this is a frontend-only application with no build process, development involves:

### Running the Application
1. **Local Development**: Simply open `index.html` in a web browser
2. **Testing Login Credentials**: Use the credentials from `kredensial.md`
3. **Accessing Role-Based Dashboards**:
   - Admin: `admin/dashboard.html`
   - Guru: `guru/dashboard.html`
   - Kepala Sekolah: `kepala-sekolah/dashboard.html`

### Development Workflow
- **HTML Templates**: All pages use Bootstrap 5 for responsive design
- **CSS Styling**: Custom CSS in `assets/css/style.css` with CSS variables for theming
- **JavaScript**: Modular classes (`AuthSystem`, `SISBIMApp`) with event-driven architecture
- **Static Assets**: Uses CDN-hosted libraries (Bootstrap, Font Awesome, AOS)

### Third-Party Libraries
- **Bootstrap 5**: UI framework and components
- **Font Awesome**: Icon library
- **AOS**: Animation on scroll
- **jQuery**: DOM manipulation (if DataTables is used)
- **DataTables**: Advanced table functionality
- **Chart.js**: Data visualization

## Key Technical Details

### Authentication Flow
1. User submits credentials via `auth/login.html`
2. `AuthSystem` class validates against hardcoded credentials
3. Session data stored in sessionStorage with user info and timestamp
4. Automatic redirection to role-based dashboard
5. Session checked on page load to maintain authentication state

### Data Management
- **Frontend-Only**: All data exists only in browser sessionStorage
- **No Backend API**: Simulated operations with setTimeout for async behavior
- **Local Storage**: Sidebar state and user preferences persisted locally
- **Form Handling**: AJAX-style form submission with loading states and success feedback

### Security Considerations
- **Plain Text Passwords**: Currently uses hardcoded credentials (see `kredensial.md`)
- **Frontend-Only Authentication**: No server-side validation
- **Session Storage**: Data persists only for browser session
- **No Input Sanitization**: Basic validation only

## Important Implementation Notes

### Theming System
- CSS variables defined in `index.html:31-37` for consistent theming
- Primary color: `#006a67` (teal)
- Secondary color: `#28a745` (green)
- Color scheme applied across all user interfaces

### Responsive Design
- Mobile-first approach with Bootstrap 5 grid system
- Sidebar collapse functionality for mobile devices
- Touch-friendly navigation and interactions

### Accessibility Features
- Semantic HTML5 structure
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Screen reader friendly alerts and notifications

## File References

### Critical Files for Development
- `assets/js/auth.js:46-50`: Hardcoded user credentials
- `assets/js/main.js`: Main application class and utilities
- `assets/css/style.css`: Custom styles and theming
- `kredensial.md`: Login credentials documentation

### Template Structure
- All dashboard pages follow similar layout pattern
- Consistent sidebar navigation across user roles
- Standardized header with user info and logout functionality
- Responsive grid layouts for data presentation

## Common Development Patterns

### Adding New Pages
1. Create HTML file in appropriate role directory
2. Include necessary JavaScript files (`auth.js`, `main.js`)
3. Implement role-based access control
4. Follow existing UI patterns and styling conventions

### Modifying Authentication
- Update user credentials in `auth.js:46-50`
- Modify validation logic in `authenticate()` method
- Adjust role-based redirection in `redirectToDashboard()`

### Styling Updates
- Use CSS variables for consistent theming
- Follow Bootstrap 5 utility classes for responsive design
- Implement AOS animations for enhanced UX
- Maintain color scheme consistency across all pages