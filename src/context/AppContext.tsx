import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserPreferences, 
  HealthcareFacility, 
  MedicationReminder, 
  Appointment, 
  MedicalDocument, 
  BloodDonor, 
  BloodRequest, 
  HealthArticle, 
  MentalHealthResource, 
  CaregiverRelationship, 
  SharedFamilyTask,
  AuditLog,
  UserReport
} from '../types';
import { 
  INITIAL_FACILITIES, 
  INITIAL_MEDICATIONS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_DOCUMENTS, 
  INITIAL_DONORS, 
  INITIAL_BLOOD_REQUESTS, 
  INITIAL_ARTICLES, 
  INITIAL_MENTAL_HEALTH_RESOURCES, 
  INITIAL_CAREGIVERS, 
  INITIAL_TASKS,
  INITIAL_AUDIT_LOGS,
  INITIAL_REPORTS
} from '../data/initialData';

interface AppContextType {
  // Current user & authentication
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  isLoggedIn: boolean;
  loginAs: (role: UserProfile['role']) => void;
  logout: () => void;

  // Module 1 & 3 & 7: Facilities & Pricing
  facilities: HealthcareFacility[];
  addFacility: (facility: Omit<HealthcareFacility, 'id'>) => void;
  updateFacility: (id: string, updates: Partial<HealthcareFacility>) => void;
  
  // Module 2: Medication Reminders
  medications: MedicationReminder[];
  addMedication: (med: Omit<MedicationReminder, 'id'>) => void;
  updateMedicationStatus: (id: string, status: MedicationReminder['statusToday']) => void;
  deleteMedication: (id: string) => void;

  // Module 4: Emergency Assistance
  emergencyNoticeActive: boolean;

  // Module 5: Health Articles
  articles: HealthArticle[];
  addArticle: (art: Omit<HealthArticle, 'id'>) => void;

  // Module 6: Medical Documents
  documents: MedicalDocument[];
  addDocument: (doc: Omit<MedicalDocument, 'id'>) => void;
  deleteDocument: (id: string) => void;

  // Module 8: Blood Donors & Requests
  donors: BloodDonor[];
  registerDonor: (donor: Omit<BloodDonor, 'id'>) => void;
  toggleDonorConsent: (id: string, consent: boolean) => void;
  bloodRequests: BloodRequest[];
  addBloodRequest: (req: Omit<BloodRequest, 'id'>) => void;

  // Module 9: Mental Health Resources
  mentalHealthResources: MentalHealthResource[];

  // Module 10: Caregivers & Appointments & Tasks
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, 'id'>) => void;
  caregivers: CaregiverRelationship[];
  addCaregiver: (cg: Omit<CaregiverRelationship, 'id'>) => void;
  revokeCaregiver: (id: string) => void;
  tasks: SharedFamilyTask[];
  addTask: (task: Omit<SharedFamilyTask, 'id'>) => void;
  toggleTaskStatus: (id: string) => void;

  // Moderation & Admin
  auditLogs: AuditLog[];
  reports: UserReport[];
  resolveReport: (id: string) => void;

  // Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-1',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98480 12345',
  role: 'registered_user',
  emergencyContactName: 'Ravi Kumar (Son)',
  emergencyContactPhone: '+91 98480 98765',
  bloodGroup: 'O+',
  pincode: '522001',
  createdAt: '2026-01-10'
};

const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'en',
  fontSize: 'standard',
  liteMode: false,
  offlineMode: false,
  inAppAlerts: true,
  emailAlerts: true,
  smsAlerts: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage state initialization with fallbacks
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('carebridge_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('carebridge_prefs');
    return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  });

  const [facilities, setFacilities] = useState<HealthcareFacility[]>(() => {
    const saved = localStorage.getItem('carebridge_facilities');
    return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
  });

  const [medications, setMedications] = useState<MedicationReminder[]>(() => {
    const saved = localStorage.getItem('carebridge_medications');
    return saved ? JSON.parse(saved) : INITIAL_MEDICATIONS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('carebridge_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [documents, setDocuments] = useState<MedicalDocument[]>(() => {
    const saved = localStorage.getItem('carebridge_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [donors, setDonors] = useState<BloodDonor[]>(() => {
    const saved = localStorage.getItem('carebridge_donors');
    return saved ? JSON.parse(saved) : INITIAL_DONORS;
  });

  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(() => {
    const saved = localStorage.getItem('carebridge_blood_reqs');
    return saved ? JSON.parse(saved) : INITIAL_BLOOD_REQUESTS;
  });

  const [articles, setArticles] = useState<HealthArticle[]>(() => {
    const saved = localStorage.getItem('carebridge_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [mentalHealthResources] = useState<MentalHealthResource[]>(INITIAL_MENTAL_HEALTH_RESOURCES);

  const [caregivers, setCaregivers] = useState<CaregiverRelationship[]>(() => {
    const saved = localStorage.getItem('carebridge_caregivers');
    return saved ? JSON.parse(saved) : INITIAL_CAREGIVERS;
  });

  const [tasks, setTasks] = useState<SharedFamilyTask[]>(() => {
    const saved = localStorage.getItem('carebridge_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('carebridge_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [reports, setReports] = useState<UserReport[]>(() => {
    const saved = localStorage.getItem('carebridge_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('carebridge_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('carebridge_prefs', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('carebridge_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('carebridge_facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem('carebridge_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('carebridge_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('carebridge_donors', JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem('carebridge_blood_reqs', JSON.stringify(bloodRequests));
  }, [bloodRequests]);

  useEffect(() => {
    localStorage.setItem('carebridge_caregivers', JSON.stringify(caregivers));
  }, [caregivers]);

  useEffect(() => {
    localStorage.setItem('carebridge_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
    showToast('Preferences updated');
  };

  const loginAs = (role: UserProfile['role']) => {
    let name = 'Priya Sharma';
    let email = 'priya.sharma@example.com';
    if (role === 'administrator') {
      name = 'Dr. Rajesh Rao (Admin)';
      email = 'admin@carebridge.in';
    } else if (role === 'authorized_caregiver') {
      name = 'Ravi Kumar (Caregiver)';
      email = 'ravi.kumar@example.com';
    } else if (role === 'verified_facility_manager') {
      name = 'Dr. Joseph (Hospital Superintendent)';
      email = 'superintendent@district-hospital.in';
    } else if (role === 'content_reviewer') {
      name = 'Dr. Anita Roy (Reviewer)';
      email = 'reviewer@carebridge.in';
    }
    const updated = { ...currentUser, role, name, email };
    setCurrentUser(updated);
    showToast(`Switched active profile to ${name} (${role.replace('_', ' ')})`);
  };

  const logout = () => {
    setCurrentUser({
      ...currentUser,
      role: 'guest',
      name: 'Guest Visitor',
      email: ''
    });
    showToast('Logged out. Browsing as Guest.');
  };

  // Facility Actions
  const addFacility = (newFac: Omit<HealthcareFacility, 'id'>) => {
    const created: HealthcareFacility = {
      ...newFac,
      id: `fac-${Date.now()}`
    };
    setFacilities(prev => [created, ...prev]);
    showToast(`Healthcare facility "${newFac.name}" submitted for verification.`);
  };

  const updateFacility = (id: string, updates: Partial<HealthcareFacility>) => {
    setFacilities(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    showToast('Facility details updated successfully.');
  };

  // Medication Actions
  const addMedication = (med: Omit<MedicationReminder, 'id'>) => {
    const created: MedicationReminder = {
      ...med,
      id: `med-${Date.now()}`
    };
    setMedications(prev => [created, ...prev]);
    showToast(`Medication reminder "${med.medicineName}" added.`);
  };

  const updateMedicationStatus = (id: string, status: MedicationReminder['statusToday']) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMedications(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          statusToday: status,
          loggedAt: `${new Date().toISOString().split('T')[0]} ${timestamp}`
        };
      }
      return m;
    }));
    showToast(`Dose marked as ${status.toUpperCase()}. Reminder state updated.`);
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
    showToast('Medication reminder removed.');
  };

  // Document Actions
  const addDocument = (doc: Omit<MedicalDocument, 'id'>) => {
    const created: MedicalDocument = {
      ...doc,
      id: `doc-${Date.now()}`
    };
    setDocuments(prev => [created, ...prev]);
    showToast(`Medical document "${doc.title}" saved securely to private vault.`);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('Medical record permanently deleted.');
  };

  // Appointment Actions
  const addAppointment = (apt: Omit<Appointment, 'id'>) => {
    const created: Appointment = {
      ...apt,
      id: `apt-${Date.now()}`
    };
    setAppointments(prev => [created, ...prev]);
    showToast('Healthcare visit scheduled.');
  };

  // Donor Actions
  const registerDonor = (donor: Omit<BloodDonor, 'id'>) => {
    const created: BloodDonor = {
      ...donor,
      id: `don-${Date.now()}`
    };
    setDonors(prev => [created, ...prev]);
    showToast('Registered as consented blood donor. Thank you for saving lives!');
  };

  const toggleDonorConsent = (id: string, consent: boolean) => {
    setDonors(prev => prev.map(d => d.id === id ? { ...d, consentGiven: consent, isAvailable: consent } : d));
    showToast(consent ? 'Donor availability active.' : 'Donor contact paused. Data concealed.');
  };

  const addBloodRequest = (req: Omit<BloodRequest, 'id'>) => {
    const created: BloodRequest = {
      ...req,
      id: `req-${Date.now()}`
    };
    setBloodRequests(prev => [created, ...prev]);
    showToast('Emergency blood request broadcasted to matching consented donors.');
  };

  // Article Actions
  const addArticle = (art: Omit<HealthArticle, 'id'>) => {
    const created: HealthArticle = {
      ...art,
      id: `art-${Date.now()}`
    };
    setArticles(prev => [created, ...prev]);
    showToast('Health awareness article published.');
  };

  // Caregiver Actions
  const addCaregiver = (cg: Omit<CaregiverRelationship, 'id'>) => {
    const created: CaregiverRelationship = {
      ...cg,
      id: `cg-${Date.now()}`
    };
    setCaregivers(prev => [created, ...prev]);
    showToast(`Access invitation sent to ${cg.caregiverName}.`);
  };

  const revokeCaregiver = (id: string) => {
    setCaregivers(prev => prev.map(cg => cg.id === id ? { ...cg, status: 'revoked' as const } : cg));
    showToast('Caregiver permissions revoked immediately. Access blocked.');
  };

  // Task Actions
  const addTask = (tsk: Omit<SharedFamilyTask, 'id'>) => {
    const created: SharedFamilyTask = {
      ...tsk,
      id: `tsk-${Date.now()}`
    };
    setTasks(prev => [created, ...prev]);
    showToast(`Shared family task "${tsk.title}" created.`);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    showToast('Task status updated.');
  };

  // Report Resolution
  const resolveReport = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' as const } : r));
    showToast('Community report marked as resolved.');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      preferences,
      updatePreferences,
      isLoggedIn: currentUser.role !== 'guest',
      loginAs,
      logout,
      facilities,
      addFacility,
      updateFacility,
      medications,
      addMedication,
      updateMedicationStatus,
      deleteMedication,
      emergencyNoticeActive: true,
      articles,
      addArticle,
      documents,
      addDocument,
      deleteDocument,
      donors,
      registerDonor,
      toggleDonorConsent,
      bloodRequests,
      addBloodRequest,
      mentalHealthResources,
      appointments,
      addAppointment,
      caregivers,
      addCaregiver,
      revokeCaregiver,
      tasks,
      addTask,
      toggleTaskStatus,
      auditLogs,
      reports,
      resolveReport,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
