# 🏋️ Shred It - Gym Workout Tracker

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://shredit.vercel.app)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

A modern, responsive workout tracking application with progress tracking, achievements, and session timing. Built with React and Tailwind CSS.

![App Screenshot](https://user-images.githubusercontent.com/.../screenshot.png) <!-- Add your screenshot later -->

## ✨ Features

- **Multiple Workout Splits** - Choose from 3, 4, 5, or 6-day workout plans
- **Progress Tracking** - Visual progress bar with achievement badges
- **Session Timer** - Built-in workout timer with start/stop functionality
- **Weight Logging** - Track weights for each exercise
- **Achievement System** - Earn badges for workout completion milestones
- **Local Storage** - Data persists between sessions
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Dark Mode UI** - Easy on the eyes during workouts

## 🚀 Live Demo

**Try it now:** [https://shredit.vercel.app](https://shredit.vercel.app)

## 📸 Screenshots

| Desktop View | Mobile View |
|--------------|-------------|
| ![Desktop](https://via.placeholder.com/400x250/1e293b/ffffff?text=Desktop+View) | ![Mobile](https://via.placeholder.com/200x400/1e293b/ffffff?text=Mobile+View) |

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Storage:** LocalStorage API
- **Deployment:** Vercel
- **Package Manager:** npm

## 📁 Project Structure

```
gym-workout-tracker/
├── src/
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point
│   └── index.css           # Tailwind CSS styles
├── public/
│   └── index.html          # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # This file
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/trulypriyanshu/shredit.git
cd shredit
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm start
# or
yarn start
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🎯 How to Use

1. **Select a Workout Split:** Choose from 3, 4, 5, or 6-day splits
2. **Navigate Days:** Use arrows or select specific days
3. **Log Exercises:** 
   - Enter weights for each set
   - Mark exercises as complete
   - Track cardio sessions
4. **Track Progress:**
   - View completion percentage
   - Earn achievement badges
   - Monitor personal records
5. **Use Timer:** Start/stop workout session timer

## 🏆 Achievement System

| Badge | Requirement | Description |
|-------|------------|-------------|
| 🥉 Bronze | Complete 25% of exercises | Getting started |
| 🥈 Silver | Complete 50% of exercises | Halfway there |
| 🥇 Gold | Complete 75% of exercises | Almost perfect |
| 👑 Platinum | Complete 100% of exercises | Perfect week |
| 🔥 Cardio Star | Complete all cardio sessions | Cardio champion |

## 📱 Mobile Experience

- Fully responsive design
- Touch-friendly buttons and inputs
- Optimized layout for small screens
- Mobile-first approach

## 🔧 Customization

### Changing Workout Plans
Edit the `WORKOUT_PLANS` object in `App.js` to customize:
- Exercise routines
- Sets and reps
- Cardio sessions
- Rest days

### Styling
Modify `tailwind.config.js` for:
- Color schemes
- Typography
- Spacing
- Breakpoints

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Ensure Node.js v14+ and run `npm install` |
| Styles not loading | Check Tailwind CSS configuration |
| Icons missing | Verify lucide-react installation |
| Local storage not working | Check browser permissions |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Vercel](https://vercel.com) for seamless deployment
- Inspired by various fitness tracking applications

## 📞 Contact

Priyanshu Bhardwaj - [@priyanshubhardwaj](https://linkedin.com/in/priyanshubhardwaj) - iampriyanshubhardwaj@gmail.com

Project Link: [https://github.com/trulypriyanshu/shredit](https://github.com/trulypriyanshu/shredit)
