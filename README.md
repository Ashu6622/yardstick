# Notes App - Multi-Tenant SaaS Platform

A modern, full-stack notes application with multi-tenant architecture, subscription management, and role-based access control.

## 🚀 Features

- **Multi-Tenant Architecture**: Isolated data per organization
- **Role-Based Access Control**: Admin and Member roles
- **Subscription Management**: Free (3 notes) and Pro (unlimited) plans
- **Real-time Notifications**: Toast notifications for all actions
- **Modern UI**: Dark theme with glassmorphism design
- **Responsive Design**: Works on all devices
- **Custom Modals**: No browser popups, all custom UI

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React** with Hooks
- **React Toastify** for notifications
- **Modern CSS** with glassmorphism effects
- **Responsive Design**

## 📁 Project Structure

```
yardstick/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Note.js
│   │   ├── Tenant.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── notes.js
│   │   └── tenants.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   └── NoteModal.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation)
- Git
- Code editor (VS Code recommended)

### 1. Download Project from GitHub
```bash
# Clone the repository
git clone https://github.com/Ashu6622/yardstick.git
cd yardstick
```

**Alternative: Download ZIP**
1. Go to GitHub repository
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open terminal in extracted folder

### 2. Install MongoDB
**Windows:**
1. Download MongoDB Community Server from mongodb.com
2. Install with default settings
3. MongoDB will start automatically

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
```

### 3. Backend Setup
```bash
cd backend
npm install
```

Seed database with test data:
```bash
node scripts/seedData.js
```

Start backend server:
```bash
npm start
```

### 4. Frontend Setup
Open new terminal window:
```bash
cd frontend
npm install
npm run dev
```

### 5. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

### 6. Quick Start
1. Open http://localhost:5173 in browser
2. Use test accounts from table below
3. Click any test account button for quick login

## 🔐 Test Accounts

| Email | Password | Role | Tenant |
|-------|----------|------|---------|
| admin@acme.test | password | Admin | Acme Corp |
| user@acme.test | password | Member | Acme Corp |
| admin@globex.test | password | Admin | Globex Inc |
| user@globex.test | password | Member | Globex Inc |

## 📡 API Routes

### Authentication
- `POST /api/auth/login` - User login

### Notes
- `GET /api/notes` - Get all notes (tenant-scoped)
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Tenants
- `POST /api/tenants/:slug/upgrade` - Upgrade to Pro plan (Admin only)
- `POST /api/tenants/:slug/cancel` - Cancel Pro subscription (Admin only)

## 🎯 Key Features

### Multi-Tenant Data Isolation
- Each tenant's data is completely isolated
- Users can only access their tenant's notes
- Tenant-scoped API endpoints

### Subscription Management
- **Free Plan**: 3 notes maximum
- **Pro Plan**: Unlimited notes
- Admin-only upgrade/downgrade functionality
- Real-time plan enforcement

### Role-Based Access
- **Admin**: Can manage subscription, full CRUD on notes
- **Member**: Full CRUD on notes, cannot manage subscription

### Modern UI/UX
- Dark theme with glassmorphism effects
- Toast notifications for all actions
- Custom confirmation modals
- Responsive design for all devices
- Loading states and error handling

## 🔧 Development

### Backend Development
```bash
cd backend
npm start  # Start server
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Database Management
```bash
# Seed fresh data
node scripts/seedData.js
```

## 🚀 Production Build

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend Production
```bash
cd backend
npm start
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based authorization middleware
- Tenant data isolation
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 768px, 480px
- Touch-friendly interface
- Optimized for all screen sizes

## 🎨 UI Components

- **ConfirmModal**: Custom confirmation dialogs
- **NoteModal**: Create/edit note form
- **NoteCard**: Individual note display
- **Header**: Navigation and user info
- **Dashboard**: Main application interface
- **Login**: Authentication form

## 🔄 State Management

- React Hooks (useState, useEffect)
- Local storage for authentication
- Toast notifications for user feedback
- Modal state management

## 📊 Data Models

### User
- email, password, role, tenantId

### Tenant
- name, slug, plan, noteLimit

### Note
- title, content, userId, tenantId, timestamps

## 🎯 Future Enhancements

- Real-time collaboration
- File attachments
- Advanced search and filtering
- Team management
- Analytics dashboard
- Email notifications
- API rate limiting
- Audit logging

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is installed and running
   - Check if MongoDB service is started
   - Verify connection string in .env

2. **Port Already in Use**
   - Kill processes: `npx kill-port 5001` or `npx kill-port 5173`
   - Change PORT in .env file

3. **Dependencies Issues**
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`

4. **Authentication Errors**
   - Clear browser localStorage
   - Check JWT_SECRET in .env file

### Installation Help

**Node.js Installation:**
- Download from nodejs.org
- Choose LTS version
- Verify: `node --version`

**Git Installation:**
- Download from git-scm.com
- Verify: `git --version`

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**Built with ❤️ using React, Node.js, and MongoDB**