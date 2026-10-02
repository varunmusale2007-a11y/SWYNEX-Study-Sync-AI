# StudySync AI — Intelligent Student Productivity Platform

> **Plan smarter. Study better. Achieve more.**

StudySync AI is a modern, responsive, client-side student productivity platform designed for engineering and university students. It combines a **JavaScript-based Study AI Engine**, a multi-factor priority algorithm, adaptive timetable generator, missed session redistribution system, progress analytics, and an interactive study calendar.

---

## 🌟 Key Features

1. **AI Study Engine (Rule-Based Intelligence)**:
   - Evaluates real subject data, exam deadlines, and syllabus deficits.
   - Responds dynamically to prompts such as *"What should I study today?"*, *"Which subject should I prioritize?"*, *"Can I finish my syllabus before my exam?"*, and *"Give me a revision plan"*.
   - Generates contextual study advice and time allocations.

2. **Study Priority Scoring Algorithm**:
   - Computes a composite priority score (0–100) using:
     $$\text{Priority} = f(\text{Exam Urgency}, \text{Difficulty}, \text{Remaining Topics}, \text{Prep Gap}, \text{Confidence Gap}, \text{Revision/Practice})$$
   - Classifies subjects into **🔴 High Priority**, **🟡 Medium Priority**, and **🟢 Low Priority** with transparent diagnostic rationales.

3. **Intelligent Timetable Generator & Wizard**:
   - 10-parameter personalization wizard (daily study hours, preferred time slots, wake/sleep hours, focus durations, breaks, revision ratio, energy cycles).
   - Dynamically weights session frequency towards higher-priority subjects.
   - Filters by **Today**, **Tomorrow**, **This Week**, and **Full Plan**.

4. **Dynamic Missed Session Recovery System**:
   - Marking a session as **Missed (❌)** triggers the Study AI engine to reallocate the unfinished topic into upcoming available slots without exceeding the student's daily study limit.
   - Displays real-time explanatory AI feedback toasts.

5. **Subject Diagnostic & Syllabus Tracker**:
   - Unlimited subject management with difficulty scoring (1–10), exam date/time/importance, confidence ratings, and strong/weak area tracking.

6. **Academic Calendar & Progress Analytics**:
   - Interactive month calendar highlighting exams, study blocks, and completion dots.
   - Pure CSS/SVG progress bars and weekly hours distribution chart without any third-party charting libraries.

7. **Theme System & Accessibility**:
   - High-contrast **Dark Mode** and crisp **Light Mode** saved in `localStorage`.
   - Fully responsive for Desktop, Tablet, and Mobile screens.

---

## 🚀 Technology Stack

- **HTML5**: Semantic tags, accessible form labels, modals, and navigation drawers.
- **CSS3**: Custom properties (CSS variables), Flexbox, CSS Grid, glassmorphism blurs, and smooth micro-animations.
- **Vanilla JavaScript**: Pure ES6+ modular architecture, zero frameworks, zero external dependencies.
- **Storage**: Browser `localStorage` for complete persistence across sessions and page refreshes.

---

## 📁 File Structure

```text
StudySync-AI/
│
├── index.html       # Single-page application shell & semantic views
├── style.css        # Design system, dark/light themes & responsive layout
├── script.js        # Rule engine, scheduler, chat assistant & controllers
└── README.md        # Documentation & deployment guide
```

---

3. Go to **Repository Settings** → **Pages** → Source: **Deploy from branch** (`main` / root).
4. Your website will be live immediately at `https://<username>.github.io/StudySync-AI/`
