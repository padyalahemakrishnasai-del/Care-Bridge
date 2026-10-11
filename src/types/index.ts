// ==========================================
// CareBridge Master Types & Domain Models
// ==========================================

export type UserRole = 
  | 'guest' 
  | 'registered_user' 
  | 'authorized_caregiver' 
  | 'verified_facility_manager' 
  | 'content_reviewer' 
  | 'administrator';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'bn';

export type TrustStatus = 'verified' | 'user_submitted' | 'estimated' | 'unavailable';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  pincode?: string;
  createdAt: string;
}

export interface UserPreferences {
  language: Language;
  fontSize: 'standard' | 'large' | 'extra-large';
  liteMode: boolean; // low-bandwidth mode
  offlineMode: boolean;
  inAppAlerts: boolean;
  emailAlerts: boolean;
  smsAlerts: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
}

export interface FacilityPriceItem {
  id: string;
  serviceName: string;
  priceMin: number;
  priceMax?: number;
  inclusions: string;
  source: string;
  isEstimated: boolean;
  lastVerifiedDate: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'Hospital' | 'Clinic' | 'Diagnostic Center' | 'Community Health Centre' | 'Primary Health Centre';
  address: string;
  city: string;
  district: string;
  pincode: string;
  state: string;
  phone: string;
  operatingHours: string;
  specialties: string[];
  services: string[];
  trustStatus: TrustStatus;
  lastVerifiedDate: string;
  isEmergencyReady: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
  priceList: FacilityPriceItem[];
  verificationNotes?: string;
}

export interface MedicationReminder {
  id: string;
  userId: string;
  medicineName: string;
  dosage: string;
  instructions: string; // "Taken as prescribed by Dr. Sharma"
  scheduleTime: string; // "08:00 AM"
  frequency: 'daily' | 'twice_daily' | 'thrice_daily' | 'weekly' | 'as_needed';
  startDate: string;
  endDate?: string;
  statusToday: 'pending' | 'taken' | 'skipped' | 'missed';
  notes?: string;
  loggedAt?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  doctorOrFacilityName: string;
  specialty: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  location: string;
  purpose: string;
  status: 'planned' | 'confirmed_by_provider' | 'completed' | 'cancelled';
  contactPhone: string;
  notes?: string;
}

export type DocumentCategory = 'Prescription' | 'Lab Report' | 'Discharge Summary' | 'Vaccination' | 'Insurance';

export interface MedicalDocument {
  id: string;
  userId: string;
  title: string;
  category: DocumentCategory;
  recordDate: string;
  doctorName?: string;
  facilityName?: string;
  fileType: 'pdf' | 'jpg' | 'png';
  fileSizeMb: number;
  tags: string[];
  isPrivate: boolean;
  sharedWithCaregiverIds: string[];
  mockDataSummary?: string;
}

export interface BloodDonor {
  id: string;
  fullName: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  district: string;
  city: string;
  pincode: string;
  isAvailable: boolean;
  consentGiven: boolean;
  lastDonationDate?: string;
  totalDonationsCount: number;
  contactPreference: 'carebridge_inbox' | 'email';
}

export interface BloodRequest {
  id: string;
  patientNameInitials: string;
  bloodGroup: string;
  unitsNeeded: number;
  hospitalName: string;
  city: string;
  urgency: 'critical' | 'within_24h' | 'routine';
  requestDate: string;
  status: 'active' | 'fulfilled' | 'cancelled';
  contactPerson: string;
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Cardiology' | 'Preventive Care' | 'Diabetes & Nutrition' | 'Elderly Health' | 'Maternal Care' | 'Mental Health';
  language: Language;
  authorOrSource: string;
  medicallyReviewedBy: string;
  reviewDate: string;
  readTimeMinutes: number;
  contentMarkdown: string;
  emergencySymptomsWarning?: string[];
}

export interface MentalHealthResource {
  id: string;
  name: string;
  type: 'Licensed Professional' | 'Peer Support' | 'Crisis Helpline' | 'Wellness Center';
  languagesSupported: string[];
  cityOrMode: string;
  phoneOrContact: string;
  credentials?: string;
  publishedFee?: string;
  trustStatus: TrustStatus;
  hours: string;
}

export interface CaregiverRelationship {
  id: string;
  patientId: string;
  caregiverId: string;
  caregiverName: string;
  caregiverEmail: string;
  relationship: 'Child' | 'Spouse' | 'Parent' | 'Relative' | 'Professional Nurse';
  permissions: {
    canViewMedicines: boolean;
    canUpdateMedicines: boolean;
    canViewRecords: boolean;
    canViewAppointments: boolean;
  };
  status: 'active' | 'pending' | 'revoked';
  invitedAt: string;
}

export interface SharedFamilyTask {
  id: string;
  title: string;
  category: 'Medicine Refill' | 'Doctor Follow-up' | 'Lab Test' | 'Diet Routine' | 'Care Coordination';
  assignedToName: string;
  dueDate: string;
  isCompleted: boolean;
  createdBy: string;
  updatedAtNote: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  targetEntity: string;
  details: string;
}

export interface UserReport {
  id: string;
  submittedAt: string;
  reporterName: string;
  targetType: 'facility' | 'donor' | 'article' | 'price';
  targetTitle: string;
  reason: string;
  status: 'pending' | 'investigating' | 'resolved';
}
