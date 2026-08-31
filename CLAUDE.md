# הנחיות פרויקט

- האתר ממומש מתוך העיצוב `../eyaldoron b2c html/Eyal Doron B2C.dc.html` (עיצוב Claude Design). כל טקסט באתר נעול מילה-במילה מהעיצוב — אין לתקן שגיאות כתיב ואין להמציא טקסטים.
- כשהמשתמש אומר "שחור" הכוונה ל-`#000000`; כש"אפור" הכוונה ל-`#5b5b5a`.
- מבנה הפרויקט משקף את `../eyal-doron-course-landing-page` — סקשן לקומפוננטה תחת `src/components/sections/`, מנוע התנועה ב-`MotionProvider.tsx`, ותמונות דרך `asset()` שב-`src/lib/assets.ts`.
- לפני שינוי ויזואלי, השוו מול קובץ העיצוב המקורי; ה-breakpoints של Tailwind מכוונים בדיוק ל-media queries של האב-טיפוס (sm=641px, md=901px, lg=1181px, 2xl=1381px).
