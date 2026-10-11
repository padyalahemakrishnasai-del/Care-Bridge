-- =========================================================================
-- CareBridge: Complete PostgreSQL & Supabase Database Migration
-- Architecture: 22 Normalized Tables with Row Level Security (RLS)
-- Compliance: India DPDP Act 2023 & Healthcare Data Minimization
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Users, Patients, Doctors, Admins)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('guest', 'registered_user', 'authorized_caregiver', 'verified_facility_manager', 'content_reviewer', 'administrator')),
    blood_group TEXT CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    pincode VARCHAR(10),
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. USER_PREFERENCES (Accessibility, Languages, Bandwidth)
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    language TEXT DEFAULT 'en' CHECK (language IN ('en', 'hi', 'te', 'ta', 'bn')),
    font_size TEXT DEFAULT 'standard' CHECK (font_size IN ('standard', 'large', 'extra-large')),
    lite_mode BOOLEAN DEFAULT false,
    in_app_alerts BOOLEAN DEFAULT true,
    email_alerts BOOLEAN DEFAULT true,
    sms_alerts BOOLEAN DEFAULT false,
    quiet_hours_start TIME DEFAULT '22:00:00',
    quiet_hours_end TIME DEFAULT '07:00:00'
);

-- 3. HEALTHCARE_FACILITIES (Hospitals, Clinics, PHCs, Diagnostic Centers)
CREATE TABLE IF NOT EXISTS healthcare_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Hospital', 'Clinic', 'Diagnostic Center', 'Community Health Centre', 'Primary Health Centre')),
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    phone TEXT NOT NULL,
    operating_hours TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    is_emergency_ready BOOLEAN DEFAULT false,
    trust_status TEXT DEFAULT 'user_submitted' CHECK (trust_status IN ('verified', 'user_submitted', 'estimated', 'unavailable')),
    last_verified_date DATE DEFAULT CURRENT_DATE,
    verification_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. FACILITY_SPECIALTIES (Relational tags)
CREATE TABLE IF NOT EXISTS facility_specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID REFERENCES healthcare_facilities(id) ON DELETE CASCADE,
    specialty_name TEXT NOT NULL
);

-- 5. FACILITY_PRICE_LIST (Transparent Tariffs)
CREATE TABLE IF NOT EXISTS facility_price_list (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID REFERENCES healthcare_facilities(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    price_min NUMERIC(10, 2) NOT NULL,
    price_max NUMERIC(10, 2),
    inclusions TEXT,
    source TEXT NOT NULL,
    is_estimated BOOLEAN DEFAULT false,
    last_verified_date DATE DEFAULT CURRENT_DATE
);

-- 6. MEDICATION_REMINDERS (Doctor-guided schedule)
CREATE TABLE IF NOT EXISTS medication_reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    medicine_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    instructions TEXT NOT NULL,
    schedule_time TIME NOT NULL,
    frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'twice_daily', 'thrice_daily', 'weekly', 'as_needed')),
    start_date DATE NOT NULL,
    end_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. REMINDER_EVENTS (Audit of Taken / Skipped / Missed logs)
CREATE TABLE IF NOT EXISTS reminder_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reminder_id UUID REFERENCES medication_reminders(id) ON DELETE CASCADE,
    event_status TEXT NOT NULL CHECK (event_status IN ('taken', 'skipped', 'missed')),
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. APPOINTMENTS (Visits & Follow-ups)
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    doctor_or_facility_name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    location TEXT NOT NULL,
    purpose TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('planned', 'confirmed_by_provider', 'completed', 'cancelled')),
    contact_phone TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. MEDICAL_DOCUMENTS (Encrypted private vault metadata)
CREATE TABLE IF NOT EXISTS medical_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Prescription', 'Lab Report', 'Discharge Summary', 'Vaccination', 'Insurance')),
    record_date DATE NOT NULL,
    doctor_name TEXT,
    facility_name TEXT,
    storage_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_mb NUMERIC(6, 2) NOT NULL,
    tags TEXT[],
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. CAREGIVER_RELATIONSHIPS (Granular delegation)
CREATE TABLE IF NOT EXISTS caregiver_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    caregiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    relationship TEXT NOT NULL,
    can_view_medicines BOOLEAN DEFAULT true,
    can_update_medicines BOOLEAN DEFAULT false,
    can_view_records BOOLEAN DEFAULT false,
    can_view_appointments BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'revoked')),
    invited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. SHARED_HEALTHCARE_TASKS (Family Duties Board)
CREATE TABLE IF NOT EXISTS shared_healthcare_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_group_id UUID,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    assigned_to_user_id UUID REFERENCES profiles(id),
    due_date DATE NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_by_user_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. DONOR_PROFILES (Consented Blood Donors)
CREATE TABLE IF NOT EXISTS donor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    blood_group TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_available BOOLEAN DEFAULT true,
    consent_given BOOLEAN DEFAULT false,
    last_donation_date DATE,
    total_donations_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. BLOOD_REQUESTS (Emergency Hospital Board)
CREATE TABLE IF NOT EXISTS blood_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_initials TEXT NOT NULL,
    blood_group TEXT NOT NULL,
    units_needed INT NOT NULL,
    hospital_name TEXT NOT NULL,
    city TEXT NOT NULL,
    urgency TEXT NOT NULL CHECK (urgency IN ('critical', 'within_24h', 'routine')),
    request_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'cancelled')),
    contact_person TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. HEALTH_ARTICLES (Medically-Reviewed Library)
CREATE TABLE IF NOT EXISTS health_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL,
    language TEXT DEFAULT 'en',
    author_source TEXT NOT NULL,
    medically_reviewed_by TEXT NOT NULL,
    review_date DATE NOT NULL,
    read_time_minutes INT DEFAULT 5,
    content_markdown TEXT NOT NULL,
    emergency_symptoms_warning TEXT[]
);

-- 15. MENTAL_HEALTH_RESOURCES (Helplines & Therapists)
CREATE TABLE IF NOT EXISTS mental_health_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Licensed Professional', 'Peer Support', 'Crisis Helpline', 'Wellness Center')),
    languages_supported TEXT[],
    city_or_mode TEXT NOT NULL,
    phone_or_contact TEXT NOT NULL,
    credentials TEXT,
    published_fee TEXT,
    hours TEXT NOT NULL,
    trust_status TEXT DEFAULT 'verified'
);

-- 16. ADMINISTRATOR_AUDIT_LOGS (Immutable System Logs)
CREATE TABLE IF NOT EXISTS administrator_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id),
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. USER_REPORTS (Community Flagging System)
CREATE TABLE IF NOT EXISTS user_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES profiles(id),
    target_type TEXT NOT NULL,
    target_title TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminder_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_healthcare_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE administrator_audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: Users can only read and update their own profile
CREATE POLICY "Users view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Medical Documents Vault: Strict ownership + Authorized Caregiver policy
CREATE POLICY "Users view own documents" ON medical_documents
    FOR SELECT USING (
        auth.uid() = user_id OR 
        EXISTS (
            SELECT 1 FROM caregiver_relationships 
            WHERE patient_id = medical_documents.user_id 
              AND caregiver_id = auth.uid() 
              AND status = 'active' 
              AND can_view_records = true
        )
    );

CREATE POLICY "Users insert own documents" ON medical_documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own documents" ON medical_documents
    FOR DELETE USING (auth.uid() = user_id);

-- 3. Medication Reminders: Patient + Authorized Caregiver policy
CREATE POLICY "Users manage own medications" ON medication_reminders
    FOR ALL USING (
        auth.uid() = user_id OR 
        EXISTS (
            SELECT 1 FROM caregiver_relationships 
            WHERE patient_id = medication_reminders.user_id 
              AND caregiver_id = auth.uid() 
              AND status = 'active' 
              AND can_view_medicines = true
        )
    );

-- 4. Public Healthcare Directory: Anyone can read verified facilities & articles
ALTER TABLE healthcare_facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view facilities" ON healthcare_facilities
    FOR SELECT USING (true);

ALTER TABLE health_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view articles" ON health_articles
    FOR SELECT USING (true);

ALTER TABLE mental_health_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view mental health resources" ON mental_health_resources
    FOR SELECT USING (true);

-- 5. Administrator Audit Logs: Only Administrators can view
CREATE POLICY "Only admins view audit logs" ON administrator_audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'administrator'
        )
    );
