# הנחיות פרויקט

- האתר ממומש מתוך העיצוב `../eyaldoron b2c html/Eyal Doron B2C.dc.html` (עיצוב Claude Design). כל טקסט באתר נעול מילה-במילה מהעיצוב — אין לתקן שגיאות כתיב ואין להמציא טקסטים.
- כשהמשתמש אומר "שחור" הכוונה ל-`#000000`; כש"אפור" הכוונה ל-`#5b5b5a`.
- מבנה הפרויקט משקף את `../eyal-doron-course-landing-page` — סקשן לקומפוננטה תחת `src/components/sections/`, מנוע התנועה ב-`MotionProvider.tsx`, ותמונות דרך `asset()` שב-`src/lib/assets.ts`.
- לפני שינוי ויזואלי, השוו מול קובץ העיצוב המקורי; ה-breakpoints של Tailwind מכוונים בדיוק ל-media queries של האב-טיפוס (sm=641px, md=901px, lg=1181px, 2xl=1381px).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
