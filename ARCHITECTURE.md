# CareBridge — Architecture & Technical Specifications

**Tagline**: *Healthcare, connected for every family.*  
**Context**: India healthcare accessibility, coordination, and emergency response platform.

---

## 1. System Architecture Overview

```mermaid
graph TD
    UserClient[Web/Mobile Browser Client (React + TypeScript + Tailwind CSS)]
    
    subgraph Frontend Architecture
        Router[React Router v6 - 19 Dedicated Pages]
        StateStore[Local & Session Storage + Context API State Engine]
        I18nProvider[Multilingual Localization Layer (EN, HI, TE, TA, BN)]
        OfflineManager[Service Worker & Offline Cache Controller]
        ComponentKit[Accessible Design Tokens & Reusable UI Components]
    end

    subgraph Backend / Cloud Data Layer
        SupabaseClient[Supabase JS Client SDK]
        AuthEngine[Supabase Authentication & Session Tokens]
        PostgresDB[(PostgreSQL Relational Database)]
        RLSPolicies[Row Level Security (RLS) Policy Engine]
        StorageBuckets[Private Encrypted Medical Storage Vault]
        EdgeFunctions[Serverless Edge Functions (Admin Audit, Alerts)]
    end

    subgraph External & Native Services
        OSGeo[Browser Geolocation API with Explicit Opt-in]
        MapsEngine[OpenStreetMap Leaflet / Google Maps API Fallback]
        Telephony[Native Device Dialer (tel:112, tel:108, tel:102)]
    end

    UserClient --> Router
    Router --> ComponentKit
    ComponentKit --> StateStore
    StateStore --> SupabaseClient
    SupabaseClient --> AuthEngine
    AuthEngine --> PostgresDB
    SupabaseClient --> PostgresDB
    PostgresDB --- RLSPolicies
    SupabaseClient --> StorageBuckets
    ComponentKit --> OSGeo
    ComponentKit --> MapsEngine
    ComponentKit --> Telephony
```

---

## 2. 10 Healthcare Modules Matrix

| # | Healthcare Module | Problem Solved in India | Key Technical Capabilities | Security / Safety Rules |
|---|---|---|---|---|
| 1 | **Hospital & Clinic Discovery** | Difficulty identifying nearby specialized, affordable, verified care | Radius geo-filtering, specialty chips, public pricing, interactive map, facility verified timestamp | Never scrape or fabricate live vacancy; distinguish "Verified" vs "Estimated" |
| 2 | **Medication Reminders** | High rate of missed doses in chronic illness patients | Schedule engine (Today, Upcoming, History), Taken/Skipped/Missed logs, browser notifications | Never alter dosage or prescribe; clearly state reminder does not equal ingestion |
| 3 | **Healthcare Cost Transparency** | Hidden consultation/diagnostic costs causing out-of-pocket stress | Side-by-side comparison (up to 3 facilities), inclusions breakdown, budget slider | Clearly label sample/estimated charges; explicitly note final bill varies |
| 4 | **Emergency Assistance** | Slow emergency response, panic-induced confusion | Zero-login instant screen, 1-tap dialer (112, 108, 102), instant GPS sharing, nearby trauma centers | Never imply automated ambulance dispatch; zero forms/AI blockers |
| 5 | **Medical Awareness & Health Library** | Medical misinformation, WhatsApp rumors, delayed doctor visits | Medically-reviewed articles, regional language ready, red-flag symptoms checklist | Disclaimer: Educational only; does not substitute clinical diagnosis |
| 6 | **Medical Records Organizer** | Lost physical paper prescriptions and mixed diagnostic lab files | Private upload (Prescription, Lab, Discharge, Vaccine), category tags, secure viewer | Private access control; synthetic documents for testing; no public URL leaks |
| 7 | **Rural Healthcare Access** | Excessive travel for primary health centers without service clarity | Low-bandwidth "Lite Mode", Village/PIN search, Community Health Centers, offline cache | Prominently display "Older Information" warnings when unverified |
| 8 | **Blood Donor Coordination** | Urgent panics for rare blood groups in replacement donation | Consent-based donor directory, request board, zero phone number exposure, internal messaging | No blood commerce; mandatory hospital/licensed blood bank screening disclaimer |
| 9 | **Mental Well-being Support** | Stigma, lack of qualified therapists, acute distress crises | 24/7 Tele-MANAS/KIRAN crisis bar, verified therapist directory, non-clinical exercises | Never auto-diagnose depression/psychiatric illness; instant helpline access |
| 10 | **Family Healthcare Coordination** | Burden on single family member managing elders' multiple appointments | Multi-member profiles, shared task board, granular caregiver permissions & 1-tap revocation | Strict caregiver access scoping; audit trail ("Created by Ravi, 2h ago") |

---

## 3. Database Schema Blueprint (PostgreSQL / Supabase DDL)

The complete application relies on 22 normalized tables configured with Row Level Security:

1. `profiles`: User identity, role (`guest`, `patient`, `caregiver`, `facility_manager`, `admin`), phone, emergency contact.
2. `user_preferences`: UI language, font size scaling, low-bandwidth mode, notification channels.
3. `healthcare_facilities`: Verified hospitals, clinics, PHCs, CHCs, GPS coordinates, verification status.
4. `facility_specialties`: Relational mapping of medical specialties per facility.
5. `facility_services`: Outpatient, Inpatient, Emergency ICU, Diagnostics availability.
6. `facility_price_list`: Transparent published fee schedules, inclusions, last verified date.
7. `facility_verification_history`: Audit trail of facility inspection and moderator approvals.
8. `medication_reminders`: Prescription reminder schedule, dosage notes as given by doctor.
9. `reminder_events`: Historical audit of taken, skipped, and missed dose timestamps.
10. `appointments`: Doctor and hospital visits, planned vs provider-confirmed status.
11. `medical_documents`: Metadata for encrypted stored prescriptions and lab reports.
12. `caregiver_relationships`: Granular sharing permissions (read/write records, meds, tasks) with active/revoked status.
13. `shared_healthcare_tasks`: Coordinated family duties with assignment and audit trails.
14. `donor_profiles`: Opt-in blood donors with blood group, district, active consent status.
15. `blood_requests`: Community emergency blood needs with hospital reference and unit count.
16. `health_articles`: Medically reviewed educational articles in multiple languages.
17. `article_reviews`: Editorial review board log and doctor sign-offs.
18. `mental_health_resources`: Licensed therapists, counselor listings, and verified helplines.
19. `notification_preferences`: In-app, SMS, and Email alert subscription toggles and quiet hours.
20. `notification_delivery_logs`: Delivery proof status (queued, sent, failed).
21. `administrator_audit_logs`: Immutable security log of moderator/admin interventions.
22. `user_reports`: Community reporting system for stale data, invalid facilities, or abuse.

---

## 4. Design System Tokens

- **Primary**: `#0F766E` (Deep Teal) — Main buttons, active nav, primary links.
- **Primary Soft**: `#E6F4F1` — Card highlights, active pill tabs, soft backgrounds.
- **Background**: `#FFFFFF` / `#F7FAF9` — Crisp and calming backdrop.
- **Foreground**: `#0F172A` (Deep Slate Ink) — High-contrast accessible text.
- **Muted**: `#64748B` — Secondary labels, timestamps, metadata.
- **Emergency**: `#DC2626` (Red) — Strictly reserved for emergency calls and danger warnings.
- **Warning**: `#B45309` on `#FEF3C7` — "Estimated price", "Not recently verified".
- **Success**: `#15803D` on `#DCFCE7` — "Verified", "Dose Taken", "Confirmed".
- **Typography**: Headings: *Plus Jakarta Sans*, Body: *Noto Sans* (Indian script optimized).
- **Accessibility**: WCAG 2.1 AA compliant (4.5:1 minimum text contrast, visible focus rings, screen reader labels).
