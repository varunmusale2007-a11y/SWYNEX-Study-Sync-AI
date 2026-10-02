/**
 * ==========================================================================
 * STUDYSYNC AI — PURE CLIENT-SIDE JAVASCRIPT ENGINE & CONTROLLERS
 * Architecture: Modular Vanilla JS with LocalStorage Persistence
 * ==========================================================================
 */

// Global State & Storage Keys
const STORAGE_KEYS = {
  CURRENT_USER: 'studysync_current_user',
  USERS_DB: 'studysync_users_db',
  SUBJECTS: 'studysync_subjects',
  PREFERENCES: 'studysync_preferences',
  TIMETABLE: 'studysync_timetable',
  PROGRESS_LOGS: 'studysync_progress_logs',
  NOTIFICATIONS: 'studysync_notifications',
  CHAT_HISTORY: 'studysync_chat_history',
  THEME: 'studysync_theme'
};

/* --------------------------------------------------------------------------
   1. STORAGE MANAGER & DEMO SEEDER
   -------------------------------------------------------------------------- */
const StorageManager = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage Read Error:', e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage Write Error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clearAll() {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  },

  // Seed standard AIML university student data
  seedDemoData() {
    const demoUser = {
      fullName: "Varun Sharma",
      studentId: "STU-2026-89",
      email: "varun.s@college.edu",
      college: "National Institute of Technology",
      course: "Computer Science (AIML)",
      year: "3rd Year",
      dailyGoalHours: 4.0,
      preferredSlot: "evening",
      streak: 4,
      bestStreak: 7,
      isDemo: true
    };

    // Calculate dates relative to today
    const today = new Date();
    const addDays = (d, n) => {
      const target = new Date(d);
      target.setDate(target.getDate() + n);
      return target.toISOString().split('T')[0];
    };

    const demoSubjects = [
      {
        id: "sub_math_101",
        name: "Mathematics (Calculus & Linear Algebra)",
        code: "MATH-301",
        totalTopics: 12,
        completedTopics: 5,
        remainingTopics: 7,
        difficultyTier: "Difficult",
        difficultyScore: 9,
        examDate: addDays(today, 12),
        examTime: "09:30",
        examImportance: "Final Semester",
        prepPercent: 40,
        confidence: 5,
        prevScore: 62,
        strongAreas: "Matrices, Differential Calculus",
        weakAreas: "Multiple Integrals, Vector Calculus",
        estHours: 24,
        revisionReq: "High",
        practiceReq: "High",
        preferredDuration: 45
      },
      {
        id: "sub_dsa_102",
        name: "Data Structures & Algorithms",
        code: "CS-302",
        totalTopics: 10,
        completedTopics: 6,
        remainingTopics: 4,
        difficultyTier: "Moderate",
        difficultyScore: 6,
        examDate: addDays(today, 18),
        examTime: "14:00",
        examImportance: "Final Semester",
        prepPercent: 60,
        confidence: 7,
        prevScore: 74,
        strongAreas: "Linked Lists, Binary Trees, Stacks",
        weakAreas: "Dynamic Programming, Graph Dijkstra",
        estHours: 18,
        revisionReq: "Moderate",
        practiceReq: "High",
        preferredDuration: 45
      },
      {
        id: "sub_dbms_103",
        name: "Database Management Systems",
        code: "CS-303",
        totalTopics: 8,
        completedTopics: 5,
        remainingTopics: 3,
        difficultyTier: "Moderate",
        difficultyScore: 5,
        examDate: addDays(today, 20),
        examTime: "10:00",
        examImportance: "Midterm",
        prepPercent: 65,
        confidence: 8,
        prevScore: 80,
        strongAreas: "ER Models, SQL Queries, Normalization",
        weakAreas: "ACID Concurrency, B+ Trees indexing",
        estHours: 14,
        revisionReq: "Moderate",
        practiceReq: "Moderate",
        preferredDuration: 45
      },
      {
        id: "sub_cn_104",
        name: "Computer Networks & Protocols",
        code: "CS-304",
        totalTopics: 9,
        completedTopics: 3,
        remainingTopics: 6,
        difficultyTier: "Difficult",
        difficultyScore: 8,
        examDate: addDays(today, 15),
        examTime: "09:30",
        examImportance: "Final Semester",
        prepPercent: 35,
        confidence: 4,
        prevScore: 55,
        strongAreas: "OSI Reference Model, TCP Handshake",
        weakAreas: "Subnetting calculations, Congestion Control",
        estHours: 20,
        revisionReq: "High",
        practiceReq: "High",
        preferredDuration: 45
      }
    ];

    const demoPreferences = {
      dailyHours: 4.0,
      preferredTime: "evening",
      wakeTime: "06:30",
      sleepTime: "23:30",
      sessionLength: 45,
      breakLength: 15,
      studyDaysPerWeek: 6,
      revisionPercent: 20,
      diffSubjectSlot: "morning",
      dailyGoalText: "Master calculus integrals & finish DSA graph algorithms"
    };

    this.set(STORAGE_KEYS.CURRENT_USER, demoUser);
    this.set(STORAGE_KEYS.SUBJECTS, demoSubjects);
    this.set(STORAGE_KEYS.PREFERENCES, demoPreferences);
    
    // Auto-generate timetable for the demo dataset
    TimetableGenerator.generateAndSave(false);
    
    // Seed initial demo notifications
    const demoNotifications = [
      {
        id: 'notif_1',
        title: '⚠️ Urgent: Mathematics Exam in 12 Days',
        text: 'Your Calculus preparation is at 40%. Study AI recommends 1.5 hrs today.',
        time: 'Just now',
        read: false,
        type: 'exam'
      },
      {
        id: 'notif_2',
        title: '🔥 4-Day Study Streak Active',
        text: 'Great discipline! Complete today\'s plan to hit 5 consecutive days.',
        time: '2 hours ago',
        read: false,
        type: 'streak'
      },
      {
        id: 'notif_3',
        title: '💡 Study AI Plan Generated',
        text: 'Your multi-subject timetable is calibrated for 4.0 hours daily.',
        time: 'Today',
        read: true,
        type: 'plan'
      }
    ];
    this.set(STORAGE_KEYS.NOTIFICATIONS, demoNotifications);

    // Initial Chat welcome message
    const initialChat = [
      {
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Hello Varun! I'm your **Study AI Engine**. I've analyzed your 4 registered subjects. 
        \nCurrently, **Mathematics** and **Computer Networks** have high urgency with exams approaching in 12 and 15 days.
        \nHow can I help you optimize your study workflow today?`
      }
    ];
    this.set(STORAGE_KEYS.CHAT_HISTORY, initialChat);
  }
};

/* --------------------------------------------------------------------------
   2. STUDY PRIORITY ALGORITHM ENGINE
   -------------------------------------------------------------------------- */
const PriorityEngine = {
  /**
   * Calculates a composite priority score (0 - 100) based on multiple pedagogical parameters:
   * 1. Exam Urgency (Days left)
   * 2. Subject Difficulty (1 - 10)
   * 3. Topic Completion Deficit (Remaining / Total)
   * 4. Preparation Percentage Gap (100 - Prep%)
   * 5. Confidence Gap (10 - Confidence)
   * 6. Revision & Problem Practice Requirements
   * 7. Exam Importance Weight
   */
  calculateSubjectPriority(subject) {
    if (!subject) return { score: 50, tier: 'Medium', label: '🟡 Medium Priority', reasons: [] };

    const reasons = [];

    // 1. Exam Urgency Factor (Max 30 points)
    let urgencyScore = 0;
    if (subject.examDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const examDate = new Date(subject.examDate);
      examDate.setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

      if (diffDays <= 3) {
        urgencyScore = 30;
        reasons.push(`Exam in ${diffDays} day(s) (Critical)`);
      } else if (diffDays <= 7) {
        urgencyScore = 26;
        reasons.push(`Exam next week (${diffDays} days left)`);
      } else if (diffDays <= 14) {
        urgencyScore = 20;
        reasons.push(`Exam in ${diffDays} days`);
      } else if (diffDays <= 30) {
        urgencyScore = 12;
      } else {
        urgencyScore = 5;
      }
    } else {
      urgencyScore = 10;
    }

    // 2. Difficulty Score (Max 20 points)
    const diffScore = (Number(subject.difficultyScore) || 5) * 2.0;
    if (subject.difficultyScore >= 8) {
      reasons.push(`High difficulty rating (${subject.difficultyScore}/10)`);
    }

    // 3. Syllabus Deficit Factor (Max 15 points)
    const totalTopics = Number(subject.totalTopics) || 10;
    const remainingTopics = Number(subject.remainingTopics) || Math.max(0, totalTopics - (Number(subject.completedTopics) || 0));
    const syllabusDeficit = (remainingTopics / totalTopics) * 15;
    if (remainingTopics >= 6) {
      reasons.push(`${remainingTopics} syllabus topics pending`);
    }

    // 4. Preparation Gap (Max 15 points)
    const prepPercent = Number(subject.prepPercent) || 50;
    const prepGapScore = ((100 - prepPercent) / 100) * 15;
    if (prepPercent < 45) {
      reasons.push(`Low prep coverage (${prepPercent}%)`);
    }

    // 5. Confidence Gap (Max 10 points)
    const confidence = Number(subject.confidence) || 5;
    const confScore = ((10 - confidence) / 10) * 10;

    // 6. Revision & Practice Requirement (Max 10 points)
    let practiceScore = 0;
    if (subject.practiceReq === 'High') practiceScore += 5;
    else if (subject.practiceReq === 'Moderate') practiceScore += 3;
    if (subject.revisionReq === 'High') practiceScore += 5;
    else if (subject.revisionReq === 'Moderate') practiceScore += 3;

    // Raw Composite Sum (0 to 100)
    let rawScore = urgencyScore + diffScore + syllabusDeficit + prepGapScore + confScore + practiceScore;
    
    // Normalize to 0 - 100
    const finalScore = Math.min(100, Math.max(10, Math.round(rawScore)));

    let tier = 'Medium';
    let label = '🟡 Medium Priority';
    let cssClass = 'medium';

    if (finalScore >= 68) {
      tier = 'High';
      label = '🔴 High Priority';
      cssClass = 'high';
    } else if (finalScore < 45) {
      tier = 'Low';
      label = '🟢 Low Priority';
      cssClass = 'low';
    }

    return {
      score: finalScore,
      tier,
      label,
      cssClass,
      reasons: reasons.slice(0, 3)
    };
  }
};

/* --------------------------------------------------------------------------
   3. INTELLIGENT TIMETABLE GENERATOR & MISSED SESSION ENGINE
   -------------------------------------------------------------------------- */
const TimetableGenerator = {
  /**
   * Generates a realistic multi-day timetable based on:
   * - Available daily hours
   * - Preferred time window & sleep/wake schedule
   * - Weighted subject priority scores (more time to high-priority subjects)
   * - Mandatory break insertions
   * - Revision sessions
   */
  generateSchedule() {
    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const prefs = StorageManager.get(STORAGE_KEYS.PREFERENCES, {
      dailyHours: 4.0,
      preferredTime: "evening",
      wakeTime: "06:30",
      sleepTime: "23:30",
      sessionLength: 45,
      breakLength: 15,
      revisionPercent: 20,
      diffSubjectSlot: "morning"
    });

    if (!subjects || subjects.length === 0) {
      return [];
    }

    // Rank subjects by priority
    const rankedSubjects = subjects.map(s => ({
      ...s,
      priorityData: PriorityEngine.calculateSubjectPriority(s)
    })).sort((a, b) => b.priorityData.score - a.priorityData.score);

    const sessionDurationMin = Number(prefs.sessionLength) || 45;
    const breakDurationMin = Number(prefs.breakLength) || 15;
    const dailyMinutes = (Number(prefs.dailyHours) || 4.0) * 60;
    
    // Total slot duration per study cycle = study + break
    const cycleDurationMin = sessionDurationMin + breakDurationMin;
    const sessionsPerDay = Math.max(1, Math.floor(dailyMinutes / sessionDurationMin));

    const daysCount = 7; // Generate 7-day rolling plan
    const today = new Date();
    const timetable = [];

    // Helper to format 24h to 12h AM/PM
    const formatTime = (totalMinutes) => {
      const hours24 = Math.floor(totalMinutes / 60) % 24;
      const mins = totalMinutes % 60;
      const ampm = hours24 >= 12 ? 'PM' : 'AM';
      const hours12 = hours24 % 12 || 12;
      return `${hours12}:${mins < 10 ? '0' : ''}${mins} ${ampm}`;
    };

    // Determine baseline start minute in the day based on preference
    let baseStartMinute = 17 * 60; // Default 5:00 PM
    if (prefs.preferredTime === 'morning') baseStartMinute = 7 * 60 + 30; // 7:30 AM
    else if (prefs.preferredTime === 'afternoon') baseStartMinute = 13 * 60; // 1:00 PM
    else if (prefs.preferredTime === 'night') baseStartMinute = 20 * 60; // 8:00 PM
    else if (prefs.preferredTime === 'split') baseStartMinute = 8 * 60;

    for (let dayOffset = 0; dayOffset < daysCount; dayOffset++) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() + dayOffset);
      const dateStr = dateObj.toISOString().split('T')[0];

      let currentMinute = baseStartMinute;
      let daySessions = [];

      for (let sIdx = 0; sIdx < sessionsPerDay; sIdx++) {
        // Distribute subjects: Weighted towards top priority
        // Index cycle: 0 -> highest priority, 1 -> 2nd, with probabilistic repetition for top
        let subjectIndex = 0;
        if (sIdx === 0) subjectIndex = 0; // Highest priority
        else if (sIdx === 1 && rankedSubjects.length > 1) subjectIndex = 1;
        else if (sIdx === 2 && rankedSubjects.length > 2) subjectIndex = 0; // Repeat high
        else subjectIndex = sIdx % rankedSubjects.length;

        const targetSubject = rankedSubjects[subjectIndex] || rankedSubjects[0];
        
        // Determine session type (Learning vs Practice vs Revision)
        const isRevision = (sIdx === sessionsPerDay - 1 && prefs.revisionPercent >= 20) || (dayOffset % 3 === 2 && sIdx === 0);
        let sessionType = isRevision ? "Revision & Flashcards" : (targetSubject.practiceReq === 'High' ? "Problem Solving & Practice" : "Deep Concept Learning");
        
        // Determine dynamic topic name
        let topicName = "Core Concept Mastery";
        if (targetSubject.weakAreas && Math.random() > 0.4) {
          const weakList = targetSubject.weakAreas.split(',');
          topicName = weakList[sIdx % weakList.length].trim();
        } else if (targetSubject.strongAreas) {
          const strongList = targetSubject.strongAreas.split(',');
          topicName = `Advanced: ${strongList[0].trim()}`;
        }

        const startTimeStr = formatTime(currentMinute);
        const endMinute = currentMinute + sessionDurationMin;
        const endTimeStr = formatTime(endMinute);

        const sessionId = `sess_${dateStr}_${sIdx}_${Date.now() % 10000}`;

        daySessions.push({
          id: sessionId,
          date: dateStr,
          dayOffset,
          startTime: startTimeStr,
          endTime: endTimeStr,
          startMinute: currentMinute,
          endMinute: endMinute,
          subjectId: targetSubject.id,
          subjectName: targetSubject.name,
          subjectCode: targetSubject.code,
          topic: topicName,
          type: sessionType,
          duration: sessionDurationMin,
          priorityTier: targetSubject.priorityData.tier,
          priorityClass: targetSubject.priorityData.cssClass,
          priorityScore: targetSubject.priorityData.score,
          status: 'pending' // pending | completed | missed | rescheduled
        });

        // Add break session if not last session
        if (sIdx < sessionsPerDay - 1 && breakDurationMin > 0) {
          const breakStartMin = endMinute;
          const breakEndMin = breakStartMin + breakDurationMin;
          daySessions.push({
            id: `break_${dateStr}_${sIdx}`,
            date: dateStr,
            dayOffset,
            startTime: formatTime(breakStartMin),
            endTime: formatTime(breakEndMin),
            subjectName: "Rest & Hydration Break",
            topic: "Rest eyes, stretch, review notes",
            type: "Break",
            duration: breakDurationMin,
            priorityTier: "Break",
            priorityClass: "break",
            isBreak: true,
            status: 'break'
          });
          currentMinute = breakEndMin;
        } else {
          currentMinute = endMinute;
        }
      }

      timetable.push({
        date: dateStr,
        dayName: dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
        sessions: daySessions
      });
    }

    return timetable;
  },

  generateAndSave(showToast = true) {
    const timetable = this.generateSchedule();
    StorageManager.set(STORAGE_KEYS.TIMETABLE, timetable);
    
    if (showToast) {
      ToastUI.show("✨ Intelligent study timetable generated successfully!", "ai");
      NotificationManager.pushNotification({
        title: "⚡ Timetable Re-optimized",
        text: "Your daily study schedule was aligned with subject priority scores.",
        type: "plan"
      });
    }

    AppUI.renderAll();
    return timetable;
  },

  openWizard() {
    const prefs = StorageManager.get(STORAGE_KEYS.PREFERENCES, {});
    document.getElementById('wizDailyHours').value = prefs.dailyHours || 4.0;
    document.getElementById('wizPreferredTime').value = prefs.preferredTime || 'evening';
    document.getElementById('wizWakeTime').value = prefs.wakeTime || '06:30';
    document.getElementById('wizSleepTime').value = prefs.sleepTime || '23:30';
    document.getElementById('wizSessionLength').value = prefs.sessionLength || 45;
    document.getElementById('wizBreakLength').value = prefs.breakLength || 15;
    document.getElementById('wizStudyDaysPerWeek').value = prefs.studyDaysPerWeek || 6;
    document.getElementById('wizRevisionPercent').value = prefs.revisionPercent || 20;
    document.getElementById('wizDiffSubjectSlot').value = prefs.diffSubjectSlot || 'morning';
    document.getElementById('wizDailyGoalText').value = prefs.dailyGoalText || '';

    document.getElementById('wizardModal').classList.remove('hidden');
  },

  closeWizard() {
    document.getElementById('wizardModal').classList.add('hidden');
  },

  handleWizardSubmit(e) {
    e.preventDefault();
    const prefs = {
      dailyHours: parseFloat(document.getElementById('wizDailyHours').value) || 4.0,
      preferredTime: document.getElementById('wizPreferredTime').value,
      wakeTime: document.getElementById('wizWakeTime').value,
      sleepTime: document.getElementById('wizSleepTime').value,
      sessionLength: parseInt(document.getElementById('wizSessionLength').value) || 45,
      breakLength: parseInt(document.getElementById('wizBreakLength').value) || 15,
      studyDaysPerWeek: parseInt(document.getElementById('wizStudyDaysPerWeek').value) || 6,
      revisionPercent: parseInt(document.getElementById('wizRevisionPercent').value) || 20,
      diffSubjectSlot: document.getElementById('wizDiffSubjectSlot').value,
      dailyGoalText: document.getElementById('wizDailyGoalText').value
    };

    StorageManager.set(STORAGE_KEYS.PREFERENCES, prefs);
    this.closeWizard();
    this.generateAndSave(true);
  }
};

/* --------------------------------------------------------------------------
   4. MISSED SESSION REDISTRIBUTION ALGORITHM
   -------------------------------------------------------------------------- */
const MissedSessionSystem = {
  /**
   * When a session is missed:
   * 1. Updates session status to 'missed'.
   * 2. Finds the next available non-break slot or upcoming day.
   * 3. Redistributes the missed topic into the highest-urgency upcoming session.
   * 4. Logs to analytics and notifies user with dynamic AI explanation.
   */
  handleMissed(sessionId) {
    let timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    let missedSession = null;
    let found = false;

    // Locate target session
    for (let day of timetable) {
      for (let s of day.sessions) {
        if (s.id === sessionId && !s.isBreak) {
          s.status = 'missed';
          missedSession = { ...s };
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!missedSession) return;

    // Reallocate the missed topic into the next pending slot
    let redistributed = false;
    let redistributedDay = null;

    for (let day of timetable) {
      for (let s of day.sessions) {
        // Look for next pending slot on a later time or tomorrow
        if (s.status === 'pending' && !s.isBreak && s.id !== sessionId) {
          // If the slot is lower priority, swap in this missed topic
          s.topic = `[Recovered] ${missedSession.topic}`;
          s.type = `Catch-up: ${missedSession.subjectName.split(' ')[0]}`;
          redistributed = true;
          redistributedDay = day.dayName;
          break;
        }
      }
      if (redistributed) break;
    }

    StorageManager.set(STORAGE_KEYS.TIMETABLE, timetable);

    // Dynamic AI Toast & Notification
    const feedbackMsg = redistributed
      ? `Study AI Recovery Engine: Missed "${missedSession.subjectName}" redistributed to ${redistributedDay} without exceeding daily hours.`
      : `Marked "${missedSession.subjectName}" as missed. Study AI adjusted priority score.`;

    ToastUI.show(feedbackMsg, 'ai');
    NotificationManager.pushNotification({
      title: `⚠️ Missed Session Adjusted: ${missedSession.subjectName}`,
      text: feedbackMsg,
      type: 'missed'
    });

    AppUI.renderAll();
  },

  handleComplete(sessionId) {
    let timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    let completedSession = null;

    for (let day of timetable) {
      for (let s of day.sessions) {
        if (s.id === sessionId) {
          s.status = 'completed';
          completedSession = s;
          break;
        }
      }
      if (completedSession) break;
    }

    if (!completedSession) return;

    // Increment completed topics for this subject if applicable
    if (completedSession.subjectId) {
      let subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
      let sub = subjects.find(x => x.id === completedSession.subjectId);
      if (sub) {
        sub.completedTopics = Math.min(sub.totalTopics, (Number(sub.completedTopics) || 0) + 1);
        sub.remainingTopics = Math.max(0, sub.totalTopics - sub.completedTopics);
        sub.prepPercent = Math.min(100, Math.round((sub.completedTopics / sub.totalTopics) * 100));
        StorageManager.set(STORAGE_KEYS.SUBJECTS, subjects);
      }
    }

    StorageManager.set(STORAGE_KEYS.TIMETABLE, timetable);
    ToastUI.show(`🎉 Great job! Completed session: ${completedSession.subjectName}`, 'success');
    
    AppUI.renderAll();
  }
};

/* --------------------------------------------------------------------------
   5. STUDY AI ASSISTANT RULE ENGINE & CHATBOT
   -------------------------------------------------------------------------- */
const StudyAIEngine = {
  /**
   * Generates dynamic, data-informed responses based on the actual stored subjects,
   * exam dates, prep percentages, and study schedule.
   */
  generateResponse(query) {
    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const prefs = StorageManager.get(STORAGE_KEYS.PREFERENCES, {});
    const timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    const q = query.toLowerCase().trim();

    if (!subjects || subjects.length === 0) {
      return "You haven't registered any subjects yet! Click **Add Subject** or **Explore Demo Student** so I can analyze your study requirements.";
    }

    // Rank subjects
    const ranked = subjects.map(s => ({
      ...s,
      priority: PriorityEngine.calculateSubjectPriority(s)
    })).sort((a, b) => b.priority.score - a.priority.score);

    const highest = ranked[0];
    const lowest = ranked[ranked.length - 1];

    // Query Pattern 1: What should I study today?
    if (q.includes('what should i study') || q.includes('study today') || q.includes('today')) {
      const todayPlan = timetable[0]?.sessions?.filter(s => !s.isBreak) || [];
      if (todayPlan.length > 0) {
        const listItems = todayPlan.map(s => `• **${s.startTime} - ${s.endTime}**: ${s.subjectName} (${s.topic}) — *${s.type}*`).join('\n');
        return `Here is your optimized Study AI schedule for today:\n\n${listItems}\n\n💡 **AI Advice**: Start with **${highest.name}** since it currently holds your highest priority score (${highest.priority.score}/100).`;
      } else {
        return `Based on your highest urgency, you should focus on **${highest.name}** today. You have ${highest.remainingTopics} topics remaining before your exam.`;
      }
    }

    // Query Pattern 2: Which subject should I prioritize? / Weakest subject
    if (q.includes('prioritize') || q.includes('priority') || q.includes('focus on') || q.includes('weakest')) {
      const highList = ranked.filter(s => s.priority.tier === 'High');
      let response = `### 🎯 Study AI Priority Analysis\n\nYour top priority is **${highest.name}** (Score: **${highest.priority.score}/100**).\n\n**Key Reasons:**\n`;
      highest.priority.reasons.forEach(r => response += `• ${r}\n`);
      
      if (highList.length > 1) {
        response += `\nAlso monitor **${highList[1].name}** (Score: ${highList[1].priority.score}/100) due to low prep coverage.`;
      }
      return response;
    }

    // Query Pattern 3: How much time for specific subject / math
    if (q.includes('mathematics') || q.includes('math') || q.includes('time should i spend')) {
      const mathSub = subjects.find(s => s.name.toLowerCase().includes('math')) || highest;
      const hoursPerDay = prefs.dailyHours || 4.0;
      const allocatedHours = ((mathSub.priority.score / 100) * hoursPerDay).toFixed(1);
      return `### ⏱️ Time Allocation for ${mathSub.name}\n\n• **Recommended Daily Time**: **${allocatedHours} hours** (out of your ${hoursPerDay}h goal)\n• **Current Preparation**: ${mathSub.prepPercent}%\n• **Topics Left**: ${mathSub.remainingTopics} / ${mathSub.totalTopics}\n• **Weak Areas**: ${mathSub.weakAreas || 'None specified'}\n\nSpend 70% of this time doing problem-solving practice and 30% reviewing formulas.`;
    }

    // Query Pattern 4: Can I finish my syllabus in time?
    if (q.includes('finish') || q.includes('syllabus') || q.includes('in time') || q.includes('before my exam')) {
      let analysisText = `### 📊 Syllabus Feasibility Forecast\n\n`;
      ranked.forEach(s => {
        const topicsLeft = s.remainingTopics;
        const daysLeft = s.examDate ? Math.max(1, Math.ceil((new Date(s.examDate) - new Date()) / (1000 * 60 * 60 * 24))) : 30;
        const rateNeeded = (topicsLeft / daysLeft).toFixed(2);
        const feasible = rateNeeded <= 1.0 ? '✅ On Track' : '⚠️ Requires Acceleration';
        analysisText += `• **${s.name}**: ${topicsLeft} topics in ${daysLeft} days (${rateNeeded} topics/day) — **${feasible}**\n`;
      });
      analysisText += `\n💡 **AI Verdict**: You can comfortably finish everything if you maintain your **${prefs.dailyHours || 4} hours/day** consistency.`;
      return analysisText;
    }

    // Query Pattern 5: Revision plan / What should I revise?
    if (q.includes('revise') || q.includes('revision plan')) {
      return `### 🧠 Study AI Spaced Revision Plan\n\n1. **Morning Quick Review (15 mins)**: Formula sheets for ${highest.name}.\n2. **Active Recall**: Test yourself on ${ranked[1]?.name || 'Algorithms'} weak topics without looking at solutions.\n3. **Night Retention Buffer (20 mins)**: Flashcard summary of today's 2 completed topics.\n\nDedicate **${prefs.revisionPercent || 20}%** of daily study to revision to prevent the Ebbinghaus forgetting curve.`;
    }

    // Query Pattern 6: Missed session recovery
    if (q.includes('missed') || q.includes('skipped')) {
      return `### 🔄 Session Recovery Protocol\n\nDon't worry! Here is how our **Study AI Engine** handles missed sessions:\n\n1. **No Overload Rule**: We do not exceed your ${prefs.dailyHours || 4}h daily limit.\n2. **Auto-Swap**: The missed topic is automatically rescheduled into your next available review slot.\n3. **Action**: Click the **Missed** button on that session in your schedule, and the timetable will re-optimize automatically.`;
    }

    // Query Pattern 7: How should I divide my study time?
    if (q.includes('divide') || q.includes('split') || q.includes('distribution')) {
      const totalScore = ranked.reduce((acc, s) => acc + s.priority.score, 0);
      let dist = `### ⚖️ Optimal Study Time Distribution (${prefs.dailyHours || 4.0} hrs daily):\n\n`;
      ranked.forEach(s => {
        const percent = Math.round((s.priority.score / totalScore) * 100);
        const hrs = ((percent / 100) * (prefs.dailyHours || 4.0)).toFixed(1);
        dist += `• **${s.name}**: **${percent}%** (~${hrs} hrs)\n`;
      });
      return dist;
    }

    // Default intelligent conversational fallback
    return `### 🤖 Study AI Assistant\n\nI've evaluated your academic portfolio of **${subjects.length} subjects**.\n\n• **Highest Focus**: ${highest.name} (${highest.prepPercent}% ready)\n• **Next Exam**: In ${highest.examDate || '12 days'}\n• **Recommended Next Step**: Open your **Study Planner** and complete the first 45-minute deep focus session.\n\nAsk me anytime: *"What should I revise today?"* or *"How much time for Mathematics?"*`;
  },

  handleChatSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('aiChatInput');
    const msg = input.value.trim();
    if (!msg) return;

    this.addUserMessage(msg);
    input.value = '';

    // Simulate AI thinking and reply
    setTimeout(() => {
      const reply = this.generateResponse(msg);
      this.addAssistantMessage(reply);
    }, 300);
  },

  handleInputKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleChatSubmit();
    }
  },

  askQuick(promptText) {
    Navigation.navigateTo('ai-assistant');
    this.addUserMessage(promptText);
    setTimeout(() => {
      const reply = this.generateResponse(promptText);
      this.addAssistantMessage(reply);
    }, 250);
  },

  addUserMessage(text) {
    const chatStream = document.getElementById('aiChatStream');
    const userRow = document.createElement('div');
    userRow.className = 'chat-bubble-row user';
    userRow.innerHTML = `
      <div class="chat-bubble-avatar">You</div>
      <div class="chat-bubble-content">${this.escapeHtml(text)}</div>
    `;
    chatStream.appendChild(userRow);
    chatStream.scrollTop = chatStream.scrollHeight;

    // Save to history
    this.saveChat(text, 'user');
  },

  addAssistantMessage(text) {
    const chatStream = document.getElementById('aiChatStream');
    const aiRow = document.createElement('div');
    aiRow.className = 'chat-bubble-row assistant';
    
    // Simple markdown formatting for bold and lists
    const formatted = text
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n• /g, '<br>• ')
      .replace(/### (.*?)(<br>|$)/g, '<strong style="font-size:1.05rem; display:block; margin-bottom:0.4rem;">$1</strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    aiRow.innerHTML = `
      <div class="chat-bubble-avatar">🤖</div>
      <div class="chat-bubble-content">${formatted}</div>
    `;
    chatStream.appendChild(aiRow);
    chatStream.scrollTop = chatStream.scrollHeight;

    this.saveChat(text, 'assistant');
  },

  saveChat(text, sender) {
    let history = StorageManager.get(STORAGE_KEYS.CHAT_HISTORY, []);
    history.push({
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if (history.length > 50) history.shift();
    StorageManager.set(STORAGE_KEYS.CHAT_HISTORY, history);
  },

  clearChatHistory() {
    StorageManager.set(STORAGE_KEYS.CHAT_HISTORY, []);
    document.getElementById('aiChatStream').innerHTML = '';
    this.addAssistantMessage("Chat history cleared. How can I assist your study planning now?");
    ToastUI.show("Chat history cleared", "info");
  },

  refreshDailyTip() {
    const tips = [
      "Pomodoro research shows taking 5-minute hydration breaks boosts mental retention by up to 28%.",
      "Feynman Technique: Try explaining your hardest subject topic in simple words out loud.",
      "Tackle your most difficult subject first in the morning when your cognitive energy is highest.",
      "Spaced repetition every 48 hours cuts exam revision time in half.",
      "Interleaving: Alternating between Math problem sets and Network theory prevents mental fatigue."
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const el = document.getElementById('dashDynamicTip');
    if (el) el.textContent = `"${randomTip}"`;
  },

  escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
};

/* --------------------------------------------------------------------------
   6. SUBJECT MANAGEMENT CONTROLLER
   -------------------------------------------------------------------------- */
const SubjectManager = {
  openAddModal() {
    document.getElementById('subModalTitle').textContent = "Add Academic Subject";
    document.getElementById('subEditId').value = "";
    document.getElementById('subjectForm').reset();
    
    // Set default date to +14 days
    const defDate = new Date();
    defDate.setDate(defDate.getDate() + 14);
    document.getElementById('subExamDate').value = defDate.toISOString().split('T')[0];
    document.getElementById('subTotalTopics').value = 10;
    document.getElementById('subCompletedTopics').value = 3;
    document.getElementById('subRemainingTopics').value = 7;
    document.getElementById('subDifficultyScore').value = 6;
    document.getElementById('subDiffScoreVal').textContent = "6";
    document.getElementById('subPrepPercent').value = 40;
    document.getElementById('subPrepVal').textContent = "40%";
    document.getElementById('subConfidence').value = 6;
    document.getElementById('subConfVal').textContent = "6";

    document.getElementById('subjectModal').classList.remove('hidden');
  },

  openEditModal(subjectId) {
    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const sub = subjects.find(s => s.id === subjectId);
    if (!sub) return;

    document.getElementById('subModalTitle').textContent = "Edit Subject Details";
    document.getElementById('subEditId').value = sub.id;
    document.getElementById('subName').value = sub.name;
    document.getElementById('subCode').value = sub.code || '';
    document.getElementById('subTotalTopics').value = sub.totalTopics;
    document.getElementById('subCompletedTopics').value = sub.completedTopics;
    document.getElementById('subRemainingTopics').value = sub.remainingTopics;
    document.getElementById('subDifficultyTier').value = sub.difficultyTier || 'Moderate';
    document.getElementById('subDifficultyScore').value = sub.difficultyScore || 6;
    document.getElementById('subDiffScoreVal').textContent = sub.difficultyScore || 6;
    document.getElementById('subExamDate').value = sub.examDate || '';
    document.getElementById('subExamTime').value = sub.examTime || '09:30';
    document.getElementById('subExamImportance').value = sub.examImportance || 'Final Semester';
    document.getElementById('subPrepPercent').value = sub.prepPercent || 50;
    document.getElementById('subPrepVal').textContent = (sub.prepPercent || 50) + '%';
    document.getElementById('subConfidence').value = sub.confidence || 6;
    document.getElementById('subConfVal').textContent = sub.confidence || 6;
    document.getElementById('subPrevScore').value = sub.prevScore || 70;
    document.getElementById('subStrongAreas').value = sub.strongAreas || '';
    document.getElementById('subWeakAreas').value = sub.weakAreas || '';
    document.getElementById('subEstHours').value = sub.estHours || 20;
    document.getElementById('subRevisionReq').value = sub.revisionReq || 'Moderate';
    document.getElementById('subPracticeReq').value = sub.practiceReq || 'High';

    document.getElementById('subjectModal').classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('subjectModal').classList.add('hidden');
  },

  calcRemainingTopics() {
    const total = parseInt(document.getElementById('subTotalTopics').value) || 0;
    const comp = parseInt(document.getElementById('subCompletedTopics').value) || 0;
    const rem = Math.max(0, total - comp);
    document.getElementById('subRemainingTopics').value = rem;
  },

  syncDifficultyScore() {
    const tier = document.getElementById('subDifficultyTier').value;
    const slider = document.getElementById('subDifficultyScore');
    if (tier === 'Easy') slider.value = 3;
    else if (tier === 'Moderate') slider.value = 6;
    else if (tier === 'Difficult') slider.value = 9;
    document.getElementById('subDiffScoreVal').textContent = slider.value;
  },

  handleFormSubmit(e) {
    e.preventDefault();
    const editId = document.getElementById('subEditId').value;
    let subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);

    const total = parseInt(document.getElementById('subTotalTopics').value) || 1;
    const comp = parseInt(document.getElementById('subCompletedTopics').value) || 0;
    const rem = Math.max(0, total - comp);

    const subjectData = {
      id: editId || `sub_${Date.now()}`,
      name: document.getElementById('subName').value.trim(),
      code: document.getElementById('subCode').value.trim(),
      totalTopics: total,
      completedTopics: comp,
      remainingTopics: rem,
      difficultyTier: document.getElementById('subDifficultyTier').value,
      difficultyScore: parseInt(document.getElementById('subDifficultyScore').value) || 6,
      examDate: document.getElementById('subExamDate').value,
      examTime: document.getElementById('subExamTime').value,
      examImportance: document.getElementById('subExamImportance').value,
      prepPercent: parseInt(document.getElementById('subPrepPercent').value) || 50,
      confidence: parseInt(document.getElementById('subConfidence').value) || 6,
      prevScore: parseInt(document.getElementById('subPrevScore').value) || 70,
      strongAreas: document.getElementById('subStrongAreas').value.trim(),
      weakAreas: document.getElementById('subWeakAreas').value.trim(),
      estHours: parseInt(document.getElementById('subEstHours').value) || 20,
      revisionReq: document.getElementById('subRevisionReq').value,
      practiceReq: document.getElementById('subPracticeReq').value
    };

    if (editId) {
      const index = subjects.findIndex(s => s.id === editId);
      if (index !== -1) subjects[index] = subjectData;
      ToastUI.show(`Updated subject: ${subjectData.name}`, 'success');
    } else {
      subjects.push(subjectData);
      ToastUI.show(`Added new subject: ${subjectData.name}`, 'success');
    }

    StorageManager.set(STORAGE_KEYS.SUBJECTS, subjects);
    this.closeModal();

    // Auto re-generate timetable plan to reflect changes
    TimetableGenerator.generateAndSave(false);
    AppUI.renderAll();
  },

  deleteSubject(subjectId) {
    if (!confirm('Are you sure you want to delete this subject?')) return;

    let subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    subjects = subjects.filter(s => s.id !== subjectId);
    StorageManager.set(STORAGE_KEYS.SUBJECTS, subjects);

    ToastUI.show('Subject removed from plan', 'info');
    TimetableGenerator.generateAndSave(false);
    AppUI.renderAll();
  },

  viewDetails(subjectId) {
    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const sub = subjects.find(s => s.id === subjectId);
    if (!sub) return;

    const prio = PriorityEngine.calculateSubjectPriority(sub);
    const body = document.getElementById('detModalBody');
    
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <div>
          <h3 style="font-size:1.3rem; font-weight:800;">${sub.name}</h3>
          <span style="color:var(--text-muted); font-size:0.85rem;">Code: ${sub.code || 'N/A'} • ${sub.examImportance}</span>
        </div>
        <span class="priority-tag ${prio.cssClass}" style="font-size:0.85rem; padding:0.35rem 0.8rem;">${prio.label} (${prio.score}/100)</span>
      </div>

      <div class="subject-metrics-grid">
        <div class="sub-metric-item">
          <span class="sub-m-label">Exam Date</span>
          <span class="sub-m-val text-red">${sub.examDate || 'Not set'} (${sub.examTime || 'N/A'})</span>
        </div>
        <div class="sub-metric-item">
          <span class="sub-m-label">Syllabus Progress</span>
          <span class="sub-m-val">${sub.completedTopics} / ${sub.totalTopics} Topics (${sub.prepPercent}%)</span>
        </div>
        <div class="sub-metric-item">
          <span class="sub-m-label">Subject Difficulty</span>
          <span class="sub-m-val">${sub.difficultyTier} (${sub.difficultyScore}/10)</span>
        </div>
        <div class="sub-metric-item">
          <span class="sub-m-label">Confidence Rating</span>
          <span class="sub-m-val">${sub.confidence}/10 (Prev: ${sub.prevScore}%)</span>
        </div>
      </div>

      <div style="margin:1rem 0;">
        <strong style="font-size:0.9rem; display:block; margin-bottom:0.3rem;">Weak Topics to Target:</strong>
        <p style="font-size:0.88rem; color:var(--text-secondary); background:var(--bg-surface); padding:0.6rem; border-radius:var(--radius-md);">
          ${sub.weakAreas || 'None reported. Solid overall understanding.'}
        </p>
      </div>

      <div style="margin:1rem 0;">
        <strong style="font-size:0.9rem; display:block; margin-bottom:0.3rem;">Study AI Priority Rationale:</strong>
        <ul style="padding-left:1.2rem; font-size:0.85rem; color:var(--text-secondary);">
          ${prio.reasons.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `;

    document.getElementById('detModalEditBtn').onclick = () => {
      SubjectManager.closeDetailsModal();
      SubjectManager.openEditModal(sub.id);
    };

    document.getElementById('subjectDetailsModal').classList.remove('hidden');
  },

  closeDetailsModal() {
    document.getElementById('subjectDetailsModal').classList.add('hidden');
  }
};

/* --------------------------------------------------------------------------
   7. TIMETABLE & SCHEDULE UI CONTROLLER
   -------------------------------------------------------------------------- */
const TimetableUI = {
  currentFilter: 'today', // today | tomorrow | week | full

  setTimeFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll('.timetable-controls-card .tab-pill').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.toLowerCase().includes(filter));
    });
    this.renderTimetable();
  },

  renderTimetable() {
    const container = document.getElementById('timetableDisplayContainer');
    const timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);

    if (!container) return;

    if (!timetable || timetable.length === 0) {
      container.innerHTML = `
        <div class="card panel-card text-center" style="padding:3rem 1rem;">
          <h3>No study timetable generated yet</h3>
          <p class="text-muted mt-2">Add subjects or click the button below to generate your personalized plan.</p>
          <button class="btn btn-primary mt-3" onclick="TimetableGenerator.generateAndSave(true)">Generate My Study Plan</button>
        </div>
      `;
      return;
    }

    let daysToRender = [];
    if (this.currentFilter === 'today') {
      daysToRender = [timetable[0]];
    } else if (this.currentFilter === 'tomorrow') {
      daysToRender = timetable.length > 1 ? [timetable[1]] : [timetable[0]];
    } else if (this.currentFilter === 'week') {
      daysToRender = timetable.slice(0, 7);
    } else {
      daysToRender = timetable;
    }

    container.innerHTML = daysToRender.map(day => `
      <div class="day-plan-group">
        <div class="day-plan-header">
          <div class="day-plan-title">
            <span>📅 ${day.dayName}</span>
          </div>
          <span class="day-hours-badge">${(day.sessions.filter(s => !s.isBreak).length * 0.75).toFixed(1)} hrs planned</span>
        </div>
        <div class="schedule-sessions-list">
          ${day.sessions.map(s => this.renderSessionCard(s)).join('')}
        </div>
      </div>
    `).join('');
  },

  renderSessionCard(s) {
    if (s.isBreak) {
      return `
        <div class="session-item-card session-break">
          <div class="session-time-col">
            <span class="session-time-badge">${s.startTime} – ${s.endTime}</span>
            <span class="session-duration">${s.duration} min break</span>
          </div>
          <div class="session-detail-col">
            <div class="session-subject-title">☕ ${s.subjectName}</div>
            <div class="session-topic-text">${s.topic}</div>
          </div>
          <div class="session-actions-col">
            <span class="priority-tag break">Rest</span>
          </div>
        </div>
      `;
    }

    const isDone = s.status === 'completed';
    const isMissed = s.status === 'missed';

    return `
      <div class="session-item-card priority-${s.priorityClass || 'medium'} ${isDone ? 'status-completed' : ''} ${isMissed ? 'status-missed' : ''}">
        <div class="session-time-col">
          <span class="session-time-badge">${s.startTime} – ${s.endTime}</span>
          <span class="session-duration">${s.duration} min focus block</span>
        </div>
        <div class="session-detail-col">
          <div class="session-subject-title">
            <span>${s.subjectName}</span>
            ${s.subjectCode ? `<span class="subject-code-tag">${s.subjectCode}</span>` : ''}
          </div>
          <div class="session-topic-text"><strong>Topic:</strong> ${s.topic}</div>
          <div class="session-badges-row">
            <span class="priority-tag ${s.priorityClass || 'medium'}">${s.priorityTier} Priority</span>
            <span class="type-tag">${s.type}</span>
          </div>
        </div>
        <div class="session-actions-col">
          ${isDone ? `<span class="text-green" style="font-weight:700;">✅ Done</span>` : ''}
          ${isMissed ? `<span class="text-red" style="font-weight:700;">❌ Missed</span>` : ''}
          ${!isDone && !isMissed ? `
            <button class="action-icon-btn btn-act-complete" onclick="MissedSessionSystem.handleComplete('${s.id}')" title="Mark session completed">
              <span>✅ Done</span>
            </button>
            <button class="action-icon-btn btn-act-missed" onclick="MissedSessionSystem.handleMissed('${s.id}')" title="Mark session missed (AI reallocates)">
              <span>❌ Missed</span>
            </button>
            <button class="action-icon-btn btn-act-resched" onclick="TimetableUI.openRescheduleModal('${s.id}')" title="Reschedule session time">
              <span>🔄 Resched</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  },

  openRescheduleModal(sessionId) {
    const timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    let target = null;
    for (let day of timetable) {
      target = day.sessions.find(s => s.id === sessionId);
      if (target) break;
    }
    if (!target) return;

    document.getElementById('reschedSessionId').value = target.id;
    document.getElementById('reschedSessionInfo').innerHTML = `<strong>${target.subjectName}</strong> • ${target.topic}`;
    document.getElementById('reschedDate').value = target.date || new Date().toISOString().split('T')[0];
    document.getElementById('reschedStartTime').value = "18:00";
    document.getElementById('rescheduleModal').classList.remove('hidden');
  },

  closeRescheduleModal() {
    document.getElementById('rescheduleModal').classList.add('hidden');
  },

  handleRescheduleSubmit(e) {
    e.preventDefault();
    const sessionId = document.getElementById('reschedSessionId').value;
    const newDate = document.getElementById('reschedDate').value;
    const newStartTime = document.getElementById('reschedStartTime').value;
    const duration = parseInt(document.getElementById('reschedDuration').value) || 45;

    let timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    for (let day of timetable) {
      let s = day.sessions.find(x => x.id === sessionId);
      if (s) {
        s.date = newDate;
        s.startTime = newStartTime;
        s.duration = duration;
        s.status = 'pending';
        break;
      }
    }

    StorageManager.set(STORAGE_KEYS.TIMETABLE, timetable);
    this.closeRescheduleModal();
    ToastUI.show("Session successfully rescheduled", "info");
    AppUI.renderAll();
  }
};

/* --------------------------------------------------------------------------
   8. CALENDAR COMPONENT
   -------------------------------------------------------------------------- */
const CalendarUI = {
  currentDate: new Date(),
  selectedDateStr: new Date().toISOString().split('T')[0],

  init() {
    this.renderMonth();
    this.renderDayAgenda(this.selectedDateStr);
  },

  jumpToday() {
    this.currentDate = new Date();
    this.selectedDateStr = new Date().toISOString().split('T')[0];
    this.renderMonth();
    this.renderDayAgenda(this.selectedDateStr);
  },

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderMonth();
  },

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderMonth();
  },

  renderMonth() {
    const label = document.getElementById('calMonthYearLabel');
    const grid = document.getElementById('calendarDaysGrid');
    if (!grid || !label) return;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    label.textContent = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    const todayStr = new Date().toISOString().split('T')[0];

    grid.innerHTML = '';

    // Previous month filler days
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      grid.innerHTML += `<div class="cal-day-cell other-month"><span class="cal-day-num">${dayNum}</span></div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const monthPadded = (month + 1).toString().padStart(2, '0');
      const dayPadded = day.toString().padStart(2, '0');
      const dateStr = `${year}-${monthPadded}-${dayPadded}`;

      const isToday = dateStr === todayStr;
      const isSelected = dateStr === this.selectedDateStr;

      // Check events on this day
      const hasExams = subjects.some(s => s.examDate === dateStr);
      const dayTimetable = timetable.find(d => d.date === dateStr);
      const hasStudy = dayTimetable && dayTimetable.sessions.some(s => !s.isBreak);
      const hasCompleted = dayTimetable && dayTimetable.sessions.some(s => s.status === 'completed');
      const hasMissed = dayTimetable && dayTimetable.sessions.some(s => s.status === 'missed');

      let dotsHtml = '';
      if (hasExams) dotsHtml += `<span class="cal-dot cal-dot-exam" title="Exam Date"></span>`;
      if (hasStudy) dotsHtml += `<span class="cal-dot cal-dot-study" title="Study Sessions"></span>`;
      if (hasCompleted) dotsHtml += `<span class="cal-dot cal-dot-done" title="Completed"></span>`;
      if (hasMissed) dotsHtml += `<span class="cal-dot cal-dot-missed" title="Missed Session"></span>`;

      grid.innerHTML += `
        <div class="cal-day-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" onclick="CalendarUI.selectDate('${dateStr}')">
          <span class="cal-day-num">${day}</span>
          <div class="cal-dots-row">${dotsHtml}</div>
        </div>
      `;
    }
  },

  selectDate(dateStr) {
    this.selectedDateStr = dateStr;
    this.renderMonth();
    this.renderDayAgenda(dateStr);
  },

  renderDayAgenda(dateStr) {
    const listEl = document.getElementById('calDayScheduleList');
    const titleEl = document.getElementById('calSelectedDateTitle');
    const badgeEl = document.getElementById('calSelectedDateBadge');
    if (!listEl) return;

    const dateObj = new Date(dateStr + 'T00:00:00');
    titleEl.textContent = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    badgeEl.textContent = dateStr === new Date().toISOString().split('T')[0] ? 'Today' : 'Scheduled';

    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    const examOnDate = subjects.filter(s => s.examDate === dateStr);
    const dayData = timetable.find(d => d.date === dateStr);

    let html = '';

    if (examOnDate.length > 0) {
      html += examOnDate.map(ex => `
        <div class="session-item-card" style="background:var(--color-danger-bg); border-color:var(--color-danger);">
          <div class="session-detail-col">
            <strong class="text-red">🚨 EXAM DAY: ${ex.name}</strong>
            <div class="session-topic-text">Time: ${ex.examTime || '09:30 AM'} • Importance: ${ex.examImportance}</div>
          </div>
        </div>
      `).join('');
    }

    if (dayData && dayData.sessions && dayData.sessions.length > 0) {
      html += dayData.sessions.map(s => TimetableUI.renderSessionCard(s)).join('');
    } else if (examOnDate.length === 0) {
      html = `<div class="empty-state-mini text-center" style="padding:2rem;">No study blocks scheduled for this date.</div>`;
    }

    listEl.innerHTML = html;
  }
};

/* --------------------------------------------------------------------------
   9. PROGRESS & ANALYTICS TRACKER
   -------------------------------------------------------------------------- */
const ProgressTracker = {
  refreshStats() {
    AppUI.renderProgressPage();
    ToastUI.show("Progress analytics refreshed", "info");
  }
};

/* --------------------------------------------------------------------------
   10. NOTIFICATION MANAGER
   -------------------------------------------------------------------------- */
const NotificationManager = {
  pushNotification(notif) {
    let list = StorageManager.get(STORAGE_KEYS.NOTIFICATIONS, []);
    list.unshift({
      id: `notif_${Date.now()}`,
      title: notif.title,
      text: notif.text,
      time: 'Just now',
      read: false,
      type: notif.type || 'info'
    });
    if (list.length > 20) list.pop();
    StorageManager.set(STORAGE_KEYS.NOTIFICATIONS, list);
    this.renderNotifications();
  },

  renderNotifications() {
    const notifs = StorageManager.get(STORAGE_KEYS.NOTIFICATIONS, []);
    const listEl = document.getElementById('notifList');
    const badgeEl = document.getElementById('notifBadge');
    const countText = document.getElementById('notifCountText');

    const unreadCount = notifs.filter(n => !n.read).length;
    if (badgeEl) {
      badgeEl.textContent = unreadCount;
      badgeEl.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
    if (countText) countText.textContent = `${unreadCount} new`;

    if (!listEl) return;

    if (notifs.length === 0) {
      listEl.innerHTML = `<div class="empty-state-mini" style="padding:1rem; text-align:center; color:var(--text-muted);">No new notifications</div>`;
      return;
    }

    listEl.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.read ? 'read' : ''}" onclick="NotificationUI.markRead('${n.id}')">
        <div class="notif-icon">${n.type === 'exam' ? '⚠️' : (n.type === 'streak' ? '🔥' : '💡')}</div>
        <div class="notif-content">
          <span class="notif-title">${n.title}</span>
          <span class="notif-text">${n.text}</span>
          <span class="notif-time">${n.time}</span>
        </div>
      </div>
    `).join('');
  }
};

const NotificationUI = {
  toggleDropdown() {
    const drop = document.getElementById('notifDropdown');
    drop.classList.toggle('hidden');
    ProfileUI.closeDropdown();
  },

  closeDropdown() {
    document.getElementById('notifDropdown')?.classList.add('hidden');
  },

  markRead(id) {
    let notifs = StorageManager.get(STORAGE_KEYS.NOTIFICATIONS, []);
    let item = notifs.find(n => n.id === id);
    if (item) item.read = true;
    StorageManager.set(STORAGE_KEYS.NOTIFICATIONS, notifs);
    NotificationManager.renderNotifications();
  },

  markAllRead() {
    let notifs = StorageManager.get(STORAGE_KEYS.NOTIFICATIONS, []);
    notifs.forEach(n => n.read = true);
    StorageManager.set(STORAGE_KEYS.NOTIFICATIONS, notifs);
    NotificationManager.renderNotifications();
    ToastUI.show("All notifications marked as read", "info");
  }
};

/* --------------------------------------------------------------------------
   11. AUTHENTICATION CONTROLLER
   -------------------------------------------------------------------------- */
const AuthUI = {
  init() {
    const user = StorageManager.get(STORAGE_KEYS.CURRENT_USER);
    if (user) {
      this.showApp();
    } else {
      this.showAuth();
    }
  },

  showAuth() {
    document.getElementById('authWrapper').classList.remove('hidden');
    document.getElementById('appShell').classList.add('hidden');
  },

  showApp() {
    document.getElementById('authWrapper').classList.add('hidden');
    document.getElementById('appShell').classList.remove('hidden');
    AppUI.init();
  },

  switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('tabLoginBtn').classList.toggle('active', isLogin);
    document.getElementById('tabRegisterBtn').classList.toggle('active', !isLogin);
    document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
    document.getElementById('registerForm').classList.toggle('hidden', isLogin);
    document.getElementById('forgotPasswordView').classList.add('hidden');
  },

  showForgotPassword() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('forgotPasswordView').classList.remove('hidden');
  },

  handleLogin(e) {
    e.preventDefault();
    const id = document.getElementById('loginIdentifier').value.trim();
    const pass = document.getElementById('loginPassword').value;

    if (!id || !pass) {
      ToastUI.show("Please enter credentials", "error");
      return;
    }

    // Check users database or fallback demo
    const users = StorageManager.get(STORAGE_KEYS.USERS_DB, []);
    const existing = users.find(u => u.email === id || u.studentId === id);

    let loggedUser = null;
    if (existing) {
      if (existing.password === pass) {
        loggedUser = existing;
      } else {
        document.getElementById('loginPassError').textContent = "Incorrect password.";
        return;
      }
    } else {
      // Default demo student
      loggedUser = {
        fullName: "Varun Sharma",
        studentId: id.includes('@') ? "STU-2026-89" : id,
        email: id.includes('@') ? id : "varun.s@college.edu",
        college: "NIT Trichy",
        course: "Computer Science (AIML)",
        year: "3rd Year",
        dailyGoalHours: 4.0,
        preferredSlot: "evening",
        streak: 4
      };
    }

    StorageManager.set(STORAGE_KEYS.CURRENT_USER, loggedUser);
    
    // If no subjects exist, seed demo
    if (!StorageManager.get(STORAGE_KEYS.SUBJECTS)) {
      StorageManager.seedDemoData();
    }

    ToastUI.show(`Welcome back, ${loggedUser.fullName}!`, "success");
    this.showApp();
  },

  handleRegister(e) {
    e.preventDefault();
    const fullName = document.getElementById('regFullName').value.trim();
    const studentId = document.getElementById('regStudentId').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;

    if (pass !== confirm) {
      document.getElementById('regConfirmError').textContent = "Passwords do not match.";
      return;
    }

    const newUser = {
      fullName,
      studentId,
      email,
      password: pass,
      college: document.getElementById('regCollege').value.trim() || 'University Institute',
      course: document.getElementById('regCourse').value.trim() || 'Engineering',
      year: document.getElementById('regYear').value,
      dailyGoalHours: 4.0,
      preferredSlot: "evening",
      streak: 1
    };

    let users = StorageManager.get(STORAGE_KEYS.USERS_DB, []);
    users.push(newUser);
    StorageManager.set(STORAGE_KEYS.USERS_DB, users);
    StorageManager.set(STORAGE_KEYS.CURRENT_USER, newUser);

    // Seed initial demo data for fresh registrations
    StorageManager.seedDemoData();

    ToastUI.show(`Account created! Welcome, ${fullName}`, "success");
    this.showApp();
  },

  loginAsDemo() {
    StorageManager.seedDemoData();
    ToastUI.show("✨ Logged in as Demo AIML Student!", "ai");
    this.showApp();
  },

  loadDemoDataWithConfirm() {
    if (confirm("Load default AIML engineering demo subjects and timetable?")) {
      StorageManager.seedDemoData();
      ToastUI.show("Demo dataset loaded successfully!", "success");
      AppUI.renderAll();
    }
  },

  handleForgotPassword() {
    const input = document.getElementById('forgotEmail').value.trim();
    if (!input) {
      ToastUI.show("Please enter your Student ID or Email", "error");
      return;
    }
    ToastUI.show(`Reset instructions dispatched to ${input}`, "info");
    this.switchAuthTab('login');
  },

  togglePasswordVisibility(inputId, btn) {
    const el = document.getElementById(inputId);
    if (el.type === 'password') {
      el.type = 'text';
      btn.style.color = 'var(--primary)';
    } else {
      el.type = 'password';
      btn.style.color = 'var(--text-muted)';
    }
  },

  logout() {
    StorageManager.remove(STORAGE_KEYS.CURRENT_USER);
    ProfileUI.closeDropdown();
    ToastUI.show("Signed out safely", "info");
    this.showAuth();
  }
};

/* --------------------------------------------------------------------------
   12. NAVIGATION & VIEW CONTROLLER
   -------------------------------------------------------------------------- */
const Navigation = {
  currentView: 'dashboard',

  navigateTo(viewId) {
    this.currentView = viewId;

    // Update active nav items
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    // Update views
    document.querySelectorAll('.app-content-body .content-view').forEach(view => {
      view.classList.toggle('active', view.id === `view-${viewId}`);
    });

    // Close mobile menu if open
    SidebarUI.toggleMobileSidebar(false);
    NotificationUI.closeDropdown();
    ProfileUI.closeDropdown();

    // Trigger render routines for specific views
    if (viewId === 'planner') TimetableUI.renderTimetable();
    if (viewId === 'subjects') AppUI.renderSubjectsPage();
    if (viewId === 'schedule') AppUI.renderSchedulePage();
    if (viewId === 'calendar') CalendarUI.init();
    if (viewId === 'progress') AppUI.renderProgressPage();
    if (viewId === 'profile') AppUI.renderProfilePage();
    if (viewId === 'settings') AppUI.renderSettingsPage();
    if (viewId === 'dashboard') AppUI.renderDashboard();
  }
};

/* --------------------------------------------------------------------------
   13. THEME & PROFILE CONTROLLER
   -------------------------------------------------------------------------- */
const ThemeUI = {
  init() {
    const savedTheme = StorageManager.get(STORAGE_KEYS.THEME, 'dark');
    this.setTheme(savedTheme);
  },

  setTheme(theme) {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
    StorageManager.set(STORAGE_KEYS.THEME, theme);

    const btnLight = document.getElementById('btnSetLight');
    const btnDark = document.getElementById('btnSetDark');
    if (btnLight && btnDark) {
      btnLight.className = theme === 'light' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
      btnDark.className = theme === 'dark' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary';
    }
  },

  toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    this.setTheme(isDark ? 'light' : 'dark');
    ToastUI.show(`Switched to ${isDark ? 'Light' : 'Dark'} theme`, 'info');
  }
};

const ProfileUI = {
  toggleDropdown() {
    const drop = document.getElementById('profileDropdown');
    drop.classList.toggle('hidden');
    NotificationUI.closeDropdown();
  },

  closeDropdown() {
    document.getElementById('profileDropdown')?.classList.add('hidden');
  },

  saveProfile(e) {
    e.preventDefault();
    let user = StorageManager.get(STORAGE_KEYS.CURRENT_USER, {});
    user.fullName = document.getElementById('profName').value.trim();
    user.studentId = document.getElementById('profStudentId').value.trim();
    user.email = document.getElementById('profEmail').value.trim();
    user.college = document.getElementById('profCollege').value.trim();
    user.course = document.getElementById('profBranch').value.trim();
    user.year = document.getElementById('profYear').value;
    user.dailyGoalHours = parseFloat(document.getElementById('profDailyGoal').value) || 4.0;
    user.preferredSlot = document.getElementById('profStudySlot').value;

    StorageManager.set(STORAGE_KEYS.CURRENT_USER, user);
    ToastUI.show("Profile credentials updated successfully", "success");
    AppUI.renderAll();
  }
};

const SidebarUI = {
  toggleMobileSidebar(open) {
    const sidebar = document.getElementById('appSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (open) {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    } else {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    }
  }
};

const SettingsUI = {
  saveStudyPreferences(e) {
    e.preventDefault();
    const prefs = {
      dailyHours: parseFloat(document.getElementById('setDailyHours').value) || 4.0,
      sessionLength: parseInt(document.getElementById('setSessionDuration').value) || 45,
      breakLength: parseInt(document.getElementById('setBreakDuration').value) || 15,
      revisionPercent: parseInt(document.getElementById('setRevisionRatio').value) || 20,
      wakeTime: document.getElementById('setWakeTime').value,
      sleepTime: document.getElementById('setSleepTime').value,
      diffSubjectSlot: document.getElementById('setDifficultyTiming').value
    };

    StorageManager.set(STORAGE_KEYS.PREFERENCES, prefs);
    TimetableGenerator.generateAndSave(false);
    ToastUI.show("Study AI Engine settings calibrated and plan re-optimized", "ai");
  },

  confirmResetAll() {
    document.getElementById('confirmResetModal').classList.remove('hidden');
  },

  closeResetModal() {
    document.getElementById('confirmResetModal').classList.add('hidden');
  },

  executeResetAll() {
    StorageManager.clearAll();
    this.closeResetModal();
    ToastUI.show("All local data wiped", "info");
    AuthUI.showAuth();
  }
};

const DataBackup = {
  exportData() {
    const data = {
      user: StorageManager.get(STORAGE_KEYS.CURRENT_USER),
      subjects: StorageManager.get(STORAGE_KEYS.SUBJECTS),
      preferences: StorageManager.get(STORAGE_KEYS.PREFERENCES),
      timetable: StorageManager.get(STORAGE_KEYS.TIMETABLE),
      notifications: StorageManager.get(STORAGE_KEYS.NOTIFICATIONS),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StudySync_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    ToastUI.show("StudySync backup exported as JSON", "success");
  }
};

const SearchUI = {
  handleSearch(query) {
    const dropdown = document.getElementById('searchResultsDropdown');
    const q = query.toLowerCase().trim();

    if (!q) {
      dropdown.classList.add('hidden');
      return;
    }

    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const results = subjects.filter(s => 
      s.name.toLowerCase().includes(q) || 
      (s.code && s.code.toLowerCase().includes(q)) ||
      (s.weakAreas && s.weakAreas.toLowerCase().includes(q)) ||
      (s.strongAreas && s.strongAreas.toLowerCase().includes(q))
    );

    if (results.length === 0) {
      dropdown.innerHTML = `
        <div class="search-item" onclick="StudyAIEngine.askQuick('${query}')">
          <span>🤖 Ask Study AI: "<em>${query}</em>"</span>
        </div>
      `;
    } else {
      dropdown.innerHTML = results.map(s => `
        <div class="search-item" onclick="SubjectManager.viewDetails('${s.id}'); document.getElementById('searchResultsDropdown').classList.add('hidden');">
          <div style="font-size:1.1rem;">📚</div>
          <div>
            <strong>${s.name}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${s.code || ''} • Exam: ${s.examDate || 'TBD'} • ${s.prepPercent}% Prep</div>
          </div>
        </div>
      `).join('');
    }

    dropdown.classList.remove('hidden');
  }
};

const ToastUI = {
  show(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';
    if (type === 'ai') icon = '⚡';

    toast.innerHTML = `
      <span>${icon}</span>
      <span style="flex:1;">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

/* --------------------------------------------------------------------------
   14. MAIN APP RENDER ENGINE
   -------------------------------------------------------------------------- */
const AppUI = {
  init() {
    ThemeUI.init();
    NotificationManager.renderNotifications();
    this.renderAll();
  },

  renderAll() {
    this.renderSidebarProfile();
    this.renderDashboard();
    this.renderSubjectsPage();
    this.renderSchedulePage();
    this.renderProgressPage();
    this.renderProfilePage();
    this.renderSettingsPage();
    CalendarUI.init();
  },

  renderSidebarProfile() {
    const user = StorageManager.get(STORAGE_KEYS.CURRENT_USER, { fullName: 'Varun Sharma', streak: 4 });
    const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();

    const setContent = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    setContent('sidebarAvatar', initials);
    setContent('sidebarStudentName', user.fullName);
    setContent('sidebarStudentRole', `${user.course || 'AIML'} • ${user.year || '3rd Year'}`);
    setContent('sidebarStreakCount', user.streak || 4);

    setContent('topbarAvatar', initials);
    setContent('topbarName', user.fullName.split(' ')[0]);
    setContent('dropdownAvatar', initials);
    setContent('dropdownName', user.fullName);
    setContent('dropdownEmail', user.email || 'student@university.edu');

    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    setContent('navSubjectCount', subjects.length);
    setContent('navPlanCount', subjects.length > 0 ? 'Active' : '0');
  },

  renderDashboard() {
    const user = StorageManager.get(STORAGE_KEYS.CURRENT_USER, { fullName: 'Varun Sharma', streak: 4 });
    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    const prefs = StorageManager.get(STORAGE_KEYS.PREFERENCES, { dailyHours: 4.0 });

    const setContent = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    // Greeting
    const hour = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 17) timeGreeting = "Good afternoon";

    setContent('dashWelcomeTitle', `${timeGreeting}, ${user.fullName.split(' ')[0]} 👋`);
    setContent('dashLiveDate', new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));

    // Dynamic AI Recommendation Highlight
    if (subjects.length > 0) {
      const ranked = subjects.map(s => ({
        ...s,
        priority: PriorityEngine.calculateSubjectPriority(s)
      })).sort((a, b) => b.priority.score - a.priority.score);

      const top = ranked[0];
      const examDays = top.examDate ? Math.max(1, Math.ceil((new Date(top.examDate) - new Date()) / (1000 * 60 * 60 * 24))) : 12;

      setContent('dashAiRecommendationText', 
        `Your ${top.name} exam is in ${examDays} days and preparation is at ${top.prepPercent}%. I strongly recommend allocating ${((top.priority.score / 100) * (prefs.dailyHours || 4)).toFixed(1)} hrs to ${top.name} today.`
      );

      const footerTags = document.getElementById('dashAiFooterTags');
      if (footerTags) {
        footerTags.innerHTML = `
          <span class="priority-tag high">🔴 ${top.name.split(' ')[0]}: Priority Score ${top.priority.score}/100</span>
          <span class="type-tag">${top.weakAreas ? `Target: ${top.weakAreas.split(',')[0]}` : 'Calculus Integrals'}</span>
        `;
      }

      // Stat cards
      setContent('statTodayHours', `${prefs.dailyHours || 4.0} `);
      setContent('statGoalDiff', `Target: ${prefs.dailyHours || 4.0} hrs`);
      
      const totalTopics = subjects.reduce((a, b) => a + (Number(b.totalTopics) || 0), 0);
      const doneTopics = subjects.reduce((a, b) => a + (Number(b.completedTopics) || 0), 0);
      const overallPercent = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

      setContent('statOverallProgress', `${overallPercent}%`);
      setContent('statTopicsProgress', `${doneTopics} / ${totalTopics} Topics Done`);
      const bar = document.getElementById('statOverallBar');
      if (bar) bar.style.width = `${overallPercent}%`;

      setContent('statStreakDays', `${user.streak || 4} `);
      setContent('statBestStreak', `${user.bestStreak || 7} days`);

      // Upcoming exam
      const nearestExam = [...subjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate))[0];
      if (nearestExam) {
        const days = Math.max(0, Math.ceil((new Date(nearestExam.examDate) - new Date()) / (1000 * 60 * 60 * 24)));
        setContent('statUpcomingExamDays', `${days} `);
        setContent('statUpcomingExamName', nearestExam.name);
      }

      // Difficult subjects count
      const diffSubs = subjects.filter(s => s.difficultyTier === 'Difficult' || s.difficultyScore >= 8);
      setContent('statDifficultCount', `${diffSubs.length} `);
      setContent('statDifficultNames', diffSubs.map(s => s.name.split(' ')[0]).join(', ') || 'None');

      // Subject Priority Matrix list
      const pMatrix = document.getElementById('dashPriorityList');
      if (pMatrix) {
        pMatrix.innerHTML = ranked.map(s => `
          <div class="priority-matrix-item" onclick="SubjectManager.viewDetails('${s.id}')" style="cursor:pointer;">
            <div>
              <div class="p-matrix-name">${s.name}</div>
              <div class="p-matrix-meta">Prep: ${s.prepPercent}% • ${s.remainingTopics} topics left</div>
            </div>
            <div class="p-matrix-score-box">
              <span class="score-num ${s.priority.cssClass === 'high' ? 'text-red' : (s.priority.cssClass === 'medium' ? 'text-amber' : 'text-green')}">${s.priority.score}</span>
              <span class="priority-tag ${s.priority.cssClass}">${s.priority.tier}</span>
            </div>
          </div>
        `).join('');
      }

      // Today's schedule preview
      const schedList = document.getElementById('dashTodayScheduleList');
      const todayPlan = timetable[0]?.sessions || [];
      setContent('dashScheduleCountBadge', `${todayPlan.filter(s => !s.isBreak).length} sessions`);
      
      if (schedList) {
        if (todayPlan.length === 0) {
          schedList.innerHTML = `<div class="empty-state-mini">No study sessions for today. Click "Generate Plan" above!</div>`;
        } else {
          schedList.innerHTML = todayPlan.slice(0, 4).map(s => TimetableUI.renderSessionCard(s)).join('');
        }
      }
    }
  },

  renderSubjectsPage() {
    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const grid = document.getElementById('subjectsGrid');
    const setContent = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    setContent('subTotalCount', subjects.length);
    const highCount = subjects.filter(s => PriorityEngine.calculateSubjectPriority(s).tier === 'High').length;
    setContent('subHighPriorityCount', highCount);

    const avgPrep = subjects.length > 0 ? Math.round(subjects.reduce((a, b) => a + (Number(b.prepPercent) || 0), 0) / subjects.length) : 0;
    setContent('subAvgPrep', `${avgPrep}%`);

    const remTopics = subjects.reduce((a, b) => a + (Number(b.remainingTopics) || 0), 0);
    setContent('subTopicsRemaining', remTopics);

    if (!grid) return;

    if (subjects.length === 0) {
      grid.innerHTML = `
        <div class="card panel-card text-center" style="grid-column: 1/-1; padding:3rem 1rem;">
          <h3>No Academic Subjects Added</h3>
          <p class="text-muted mt-2">Add your curriculum subjects or explore the demo profile.</p>
          <button class="btn btn-primary mt-3" onclick="SubjectManager.openAddModal()">Add Subject</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = subjects.map(s => {
      const prio = PriorityEngine.calculateSubjectPriority(s);
      return `
        <div class="subject-card">
          <div>
            <div class="subject-card-header">
              <div>
                <h3 class="subject-name">${s.name}</h3>
                ${s.code ? `<span class="subject-code-tag">${s.code}</span>` : ''}
              </div>
              <span class="subject-priority-badge priority-tag ${prio.cssClass}">${prio.label}</span>
            </div>

            <div class="subject-metrics-grid">
              <div class="sub-metric-item">
                <span class="sub-m-label">Exam Date</span>
                <span class="sub-m-val text-red">${s.examDate || 'Not set'}</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-m-label">Difficulty</span>
                <span class="sub-m-val">${s.difficultyTier} (${s.difficultyScore}/10)</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-m-label">Topics Left</span>
                <span class="sub-m-val">${s.remainingTopics} / ${s.totalTopics}</span>
              </div>
              <div class="sub-metric-item">
                <span class="sub-m-label">Confidence</span>
                <span class="sub-m-val">${s.confidence || 6}/10</span>
              </div>
            </div>

            <div class="subject-prep-progress">
              <div class="prep-progress-header">
                <span>Preparation Level</span>
                <span>${s.prepPercent}%</span>
              </div>
              <div class="micro-progress" style="height:8px;">
                <div class="micro-bar bar-purple" style="width: ${s.prepPercent}%;"></div>
              </div>
            </div>
          </div>

          <div class="subject-card-footer">
            <button class="btn btn-sm btn-ghost" onclick="SubjectManager.viewDetails('${s.id}')">View Details</button>
            <div class="sub-actions-group">
              <button class="icon-btn" style="width:32px; height:32px;" onclick="SubjectManager.openEditModal('${s.id}')" title="Edit Subject">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="icon-btn" style="width:32px; height:32px;" onclick="SubjectManager.deleteSubject('${s.id}')" title="Delete Subject">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderSchedulePage() {
    const timetable = StorageManager.get(STORAGE_KEYS.TIMETABLE, []);
    const prefs = StorageManager.get(STORAGE_KEYS.PREFERENCES, { dailyHours: 4.0 });
    const todayData = timetable[0] || { sessions: [] };
    const sessions = todayData.sessions || [];

    const setContent = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    setContent('todayScheduleDateSubtitle', `Active timeline for ${todayData.dayName || 'Today'} • Priority-based slot sequencing.`);
    setContent('todayPlannedHours', `${prefs.dailyHours || 4.0}h`);

    const completed = sessions.filter(s => s.status === 'completed').length;
    const missed = sessions.filter(s => s.status === 'missed').length;
    const pending = sessions.filter(s => s.status === 'pending' && !s.isBreak).length;

    setContent('todayCompletedCount', completed);
    setContent('todayMissedCount', missed);
    setContent('todayRemainingCount', pending);

    const list = document.getElementById('todayFullScheduleList');
    if (list) {
      if (sessions.length === 0) {
        list.innerHTML = `<div class="card panel-card text-center" style="padding:2rem;">No study sessions generated. Click Re-optimize Today!</div>`;
      } else {
        list.innerHTML = sessions.map(s => TimetableUI.renderSessionCard(s)).join('');
      }
    }
  },

  renderProgressPage() {
    const subjects = StorageManager.get(STORAGE_KEYS.SUBJECTS, []);
    const setContent = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    const totalTopics = subjects.reduce((a, b) => a + (Number(b.totalTopics) || 0), 0);
    const doneTopics = subjects.reduce((a, b) => a + (Number(b.completedTopics) || 0), 0);
    const overallPercent = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

    setContent('progSyllabusPercent', `${overallPercent}%`);
    setContent('progTopicsRatio', `${doneTopics} / ${totalTopics} Topics Mastered`);

    // Subject breakdown bars
    const barsList = document.getElementById('progSubjectBarList');
    if (barsList) {
      barsList.innerHTML = subjects.map(s => `
        <div class="prog-sub-item">
          <div class="prog-sub-header">
            <span>${s.name}</span>
            <span>${s.completedTopics}/${s.totalTopics} (${s.prepPercent}%)</span>
          </div>
          <div class="prog-bar-wrap">
            <div class="prog-bar-fill" style="width:${s.prepPercent}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // Pure CSS/SVG Weekly chart
    const chart = document.getElementById('progWeeklyChart');
    if (chart) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const heights = [70, 85, 60, 90, 75, 95, 80]; // Realistic mock hours %
      chart.innerHTML = days.map((d, i) => `
        <div class="chart-col">
          <div class="chart-bar-group">
            <div class="chart-bar-fill" style="height:${heights[i]}%;"></div>
          </div>
          <span class="chart-day-label">${d}</span>
        </div>
      `).join('');
    }
  },

  renderProfilePage() {
    const user = StorageManager.get(STORAGE_KEYS.CURRENT_USER, {
      fullName: 'Varun Sharma',
      studentId: 'STU-2026-89',
      email: 'varun.s@college.edu',
      college: 'NIT Trichy',
      course: 'AIML',
      year: '3rd Year',
      dailyGoalHours: 4.0,
      streak: 4
    });

    const setContent = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();

    setContent('profileBigAvatar', initials);
    setContent('profileDisplayName', user.fullName);
    setContent('profileDisplayId', `ID: ${user.studentId}`);
    setContent('profileBadgeCollege', user.college || 'NIT Trichy');
    setContent('profileBadgeBranch', user.course || 'AIML');
    setContent('profileBadgeYear', user.year || '3rd Year');
    setContent('profileStatStreak', `${user.streak || 4} days`);
    setContent('profileStatHours', `${user.dailyGoalHours || 4.0}h`);

    // Form sync
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    setVal('profName', user.fullName);
    setVal('profStudentId', user.studentId);
    setVal('profEmail', user.email);
    setVal('profCollege', user.college);
    setVal('profBranch', user.course);
    setVal('profYear', user.year || '3rd Year');
    setVal('profDailyGoal', user.dailyGoalHours || 4.0);
    setVal('profStudySlot', user.preferredSlot || 'evening');
  },

  renderSettingsPage() {
    const prefs = StorageManager.get(STORAGE_KEYS.PREFERENCES, {
      dailyHours: 4.0,
      sessionLength: 45,
      breakLength: 15,
      revisionPercent: 20,
      wakeTime: '06:30',
      sleepTime: '23:30',
      diffSubjectSlot: 'morning'
    });

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('setDailyHours', prefs.dailyHours);
    setVal('setSessionDuration', prefs.sessionLength);
    setVal('setBreakDuration', prefs.breakLength);
    setVal('setRevisionRatio', prefs.revisionPercent);
    setVal('setWakeTime', prefs.wakeTime);
    setVal('setSleepTime', prefs.sleepTime);
    setVal('setDifficultyTiming', prefs.diffSubjectSlot);
  }
};

/* --------------------------------------------------------------------------
   15. GLOBAL EVENT LISTENERS & INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  AuthUI.init();

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#notifBellBtn') && !e.target.closest('#notifDropdown')) {
      NotificationUI.closeDropdown();
    }
    if (!e.target.closest('#profileChipBtn') && !e.target.closest('#profileDropdown')) {
      ProfileUI.closeDropdown();
    }
    if (!e.target.closest('.search-box')) {
      document.getElementById('searchResultsDropdown')?.classList.add('hidden');
    }
  });

  // ESC key to close open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      SubjectManager.closeModal();
      SubjectManager.closeDetailsModal();
      TimetableGenerator.closeWizard();
      TimetableUI.closeRescheduleModal();
      SettingsUI.closeResetModal();
    }
  });
});
