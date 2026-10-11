# CareBridge — All-in-One Healthcare Access & Assistance Platform

> **"Healthcare, connected for every family."**  
> A complete, responsive, full-stack healthcare web application built to solve 10 real-world healthcare challenges faced by Indian families, patients, caregivers, and medical institutions.

## Contents

- [Healthcare modules](#-the-10-healthcare-modules-implemented)
- [Pages and navigation](#-navigation--20-complete-pages)
- [Design and accessibility](#-design-tokens--accessibility)
- [Project structure](#-project-structure)
- [Setup and commands](#-beginner-friendly-setup--execution-guide)
- [Database](#-database-architecture--supabase-ddl)
- [Feature walkthrough](#-how-to-test-every-feature-in-the-app)

---

## 🌟 The 10 Healthcare Modules Implemented

1. **Hospital & Clinic Discovery**
   - Search verified hospitals, clinics, and diagnostic centers by city, PIN code, or current GPS coordinates.
   - Interactive map simulation layer with proximity distance in kilometers.
   - Distinct badges for `Verified on [Date]`, `Estimated Price`, `User Submitted`, and `Data Unavailable`.
   
2. **Medication Reminders**
   - Track prescription doses strictly based on clinician instructions.
   - Schedule views: Today, Pending, and All Prescriptions.
   - Large, accessible action buttons: **Taken ✓**, **Skipped**, and **Missed**.
   - Built-in browser notification permission handler with medical safety disclaimers.

3. **Healthcare Cost Transparency**
   - Side-by-side comparison of up to 3 healthcare facilities.
   - Price breakdown with inclusions, verification sources, and budget slider.
   - Clear disclosure that listed tariffs represent standard published cards and final bills depend on patient condition.

4. **Emergency Assistance (Zero-Login Fast Lane)**
   - Standalone instant screen requiring no login, zero forms, and no AI chat delays.
   - 1-Tap emergency phone dialers: **112** (National Unified), **108** (Ambulance & Trauma), **102** (Maternal/Infant), **14416** (Tele-MANAS).
   - Explicit 1-tap GPS location sharing with Web Share API and clipboard fallbacks.
   - Live directory of nearby 24/7 trauma emergency hospitals.

5. **Medically-Reviewed Health Awareness Library**
   - Doctor-certified health articles on diabetes, cardiology, nutrition, and heat safety.
   - Name and credentials of reviewing physician, review dates, and emergency red-flag symptom warnings.
   - Optimal 680px reading typography formatted for Indian regional languages.

6. **Medical Records Vault**
   - Categorized private storage: Prescriptions, Lab Reports, Discharge Summaries, and Vaccination Certificates.
   - Private zero-leak architecture with synthetic demo documents for development safety.
   - Secure preview, download, and revocable caregiver sharing.

7. **Rural Healthcare & PHC Access**
   - Ultra-lite, low-bandwidth mode designed for 2G/3G connections and budget phones.
   - Primary Health Centre (PHC) and Community Health Centre (CHC) discovery by village, taluk, or PIN code.
   - Recency warnings for remote rural health posts.

8. **Blood Donor Coordination**
   - Opt-in voluntary donor registry with explicit consent.
   - 100% privacy: Zero public exposure of telephone numbers or home addresses.
   - Emergency blood request board with compliance disclaimers under National Blood Transfusion Council (NBTC) regulations.

9. **Mental Well-being Support**
   - Free, zero-login crisis banner linking directly to **Tele-MANAS (14416)** and **KIRAN (1800-599-0019)**.
   - Directory of RCI-registered psychologists, peer counseling, and non-clinical daily self-care exercises.

10. **Family & Caregiver Coordination**
    - Multi-member family care organizer with shared task board.
    - Granular invitation permissions: Choose whether a caregiver can access Medicines, Appointments, or Medical Records.
    - 1-Click instant access revocation with audit confirmation.

---

## 🧭 Navigation & 20 Complete Pages

1. **Landing Page** (`/`): Hero with search, 10 feature cards, 3-step guide, and emergency strip.
2. **Authentication Page** (`/auth`, `/login`): Split-screen sign-in with patient/caregiver roles and DPDP agreement.
3. **Main Dashboard** (`/dashboard`): Greeting, quick tiles, today's medicines timeline, next doctor visit, and family tasks.
4. **Hospital & Clinic Finder** (`/facilities`): Geo-search, specialty filters, 24/7 emergency filter, and list/map views.
5. **Facility Details Page** (`/facility/:id`): Overview, specialties chips, published rate card, and sticky mobile calling buttons.
6. **Cost Comparison** (`/cost-comparison`): Side-by-side facility tariff table and budget cap slider.
7. **Medication Dashboard** (`/medications`): Today's dose tracking, Taken/Skipped/Missed logs, and reminder creator.
8. **Appointments Organizer** (`/appointments`): Follow-up calendar with "Planned by Patient" vs "Confirmed by Clinic" status.
9. **Medical Records Vault** (`/records`): Document category tabs, encrypted preview, download, and deletion.
10. **Rural Care Finder** (`/rural-care`): Low-bandwidth PHC directory with ultra-lite mode.
11. **Blood Donors Directory** (`/blood-donors`): Consented donor registry and urgent blood request broadcasting board.
12. **Mental Well-being Support** (`/mental-health`): Tele-MANAS crisis banner and therapist directory.
13. **Health Awareness Library** (`/health-library`): Medically reviewed articles with red-flag symptoms checklist.
14. **Family & Caregiver Coordination** (`/family`): Caregiver invitation with permission toggles and shared duties.
15. **Notifications & Preferences** (`/notifications`): In-app, SMS, and email alert toggles with quiet hours.
16. **User Profile & Privacy** (`/profile`): Identity details, A/A+/A++ elderly text scaler, DPDP JSON export, and account deletion zone.
17. **Admin Dashboard** (`/admin`): System stat cards, administrative audit log table, and community report queue.
18. **Facility Verification Queue** (`/verification`): Clinical moderation queue with tariff validation and approval buttons.
19. **Help & Legal Notice Pages** (`/help`, `/privacy`, `/consent`, `/accessibility`): FAQs, DPDP privacy note, consent charter, and WCAG AA accessibility specs.
20. **Emergency Fast-Lane** (`/emergency`): Instant zero-login calling screen for 112, 108, 102, and live GPS sharing.

---

## 🎨 Design Tokens & Accessibility

| Token | Hex Value | Usage |
|---|---|---|
| `primary` | `#0F766E` (Deep Teal) | Main buttons, active nav, primary links |
| `primary-soft` | `#E6F4F1` | Highlighted cards, active tabs, pill chips |
| `background` | `#FFFFFF` / `#F8FAFC` | Crisp, calming page backgrounds |
| `foreground` | `#0F172A` (Deep Slate) | Accessible high-contrast typography |
| `muted` | `#64748B` | Secondary metadata and timestamps |
| `emergency` | `#DC2626` (Red) | Strictly reserved for emergency buttons and alerts |
| `warning` | `#B45309` on `#FEF3C7` | Estimated prices, unverified data warnings |
| `success` | `#15803D` on `#DCFCE7` | Verified status, Dose Taken, Confirmed appointment |

- **Typography**: Headings use *Plus Jakarta Sans*; Body text uses *Noto Sans* for clear Indian script rendering.
- **Accessibility**: Meets **WCAG 2.1 AA** standards with visible focus outlines and screen-reader semantic landmarks.

---

## 📁 Project Structure

```text
Care-Bridge/
├── public/                   # Static public assets
├── src/
│   ├── assets/               # Images and bundled assets
│   ├── components/           # Shared layout, auth, and UI components
│   ├── context/              # App and authentication state
│   ├── data/                 # Demo and initial application data
│   ├── lib/                  # External service clients
│   ├── pages/                # Route-level screens
│   └── types/                # Shared TypeScript types
├── supabase/migrations/      # Database schema migrations
├── .env.example              # Safe template for local configuration
├── package.json              # Scripts and dependencies
└── README.md                 # Project overview and getting started
```

`node_modules/`, `dist/`, and local `.env` files are intentionally excluded from version control. Install dependencies and build output locally using the commands below.

---

## 🚀 Beginner-Friendly Setup & Execution Guide

### Prerequisites
Make sure you have Node.js 20.19+ or 22.12+ installed on your system (required by Vite 8).

### Step 1: Install Dependencies
Open your PowerShell or Command Prompt terminal in the `Care Bridge` folder and run:
```powershell
npm install
```

### Step 2: Start the Local Development Server
```powershell
npm run dev
```
You will see output showing your local URL:
```text
  VITE v8.3.4  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.99.255.138:5173/
```
Keep the terminal running while using the app. On the same Wi-Fi or local network, open **http://10.99.255.138:5173/** on another device. The network IP can change; if this address stops working, use the **Network** URL printed in the terminal. If Windows Firewall prompts you, allow Node.js on private networks. If port 5173 is already in use, Vite will report an error instead of silently starting on a different port; stop the other server or choose another port with `npm run dev -- --port 5174` and open the URL shown in the terminal.

This makes the development server available to devices on your local network only; it does not publish the application to the internet. To use the app from anywhere, deploy it to a web hosting service.

### Step 3: Run the Production Build Test
To confirm that all code compiles without errors:
```powershell
npm run build
```

---

## 🗄️ Database Architecture & Supabase DDL

The database script is located at `supabase/migrations/20261011_carebridge_schema.sql`. It defines:
- **22 Normalized Tables** covering profiles, facilities, price lists, medication reminders, caregiver relationships, and audit logs.
- **Row Level Security (RLS)** policies ensuring users access only their own medical data, while caregivers can only access records specifically delegated to them.

---

## 🧪 How to Test Every Feature in the App

1. **Test Emergency Screen**:
   - Click the red **"EMERGENCY 112"** button in the top navigation bar or floating mobile dialer.
   - Verify that it opens instantly without asking for a password or login.
   - Click **"Share My Location Now"** to test GPS coordinate retrieval.

2. **Test Medication Reminders**:
   - Go to **Medicines** (`/medications`).
   - Click **Taken ✓**, **Skipped**, or **Missed** on any reminder tile to observe immediate state updating.
   - Click **"+ Add Medicine"** to add a new doctor-prescribed medication.

3. **Test Caregiver Permission Delegation & Revocation**:
   - Go to **Family & Caregivers** (`/family`).
   - Click **"Invite Caregiver"**, choose permissions, and submit.
   - Click **"Revoke Access Immediately"** to test 1-click permission revocation.

4. **Test Role Persona Switcher**:
   - Click the **Role** button in the top-right header.
   - Switch between **Patient**, **Caregiver**, **Facility Manager**, and **System Administrator** to observe adaptive views.

5. **Test Cost Comparison**:
   - Go to **Cost Comparison** (`/cost-comparison`).
   - Toggle different facilities and adjust the budget slider.
