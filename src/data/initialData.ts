import { HealthcareFacility, MedicationReminder, Appointment, MedicalDocument, BloodDonor, BloodRequest, HealthArticle, MentalHealthResource, CaregiverRelationship, SharedFamilyTask, AuditLog, UserReport } from '../types';

export const INITIAL_FACILITIES: HealthcareFacility[] = [
  {
    id: 'fac-1',
    name: 'District Government General Hospital',
    type: 'Hospital',
    address: 'Station Road, Beside Collectorate, Guntur',
    city: 'Guntur',
    district: 'Guntur',
    pincode: '522001',
    state: 'Andhra Pradesh',
    phone: '+91 863 2224000',
    operatingHours: '24 Hours Open (Emergency & Trauma)',
    specialties: ['General Medicine', 'Emergency Trauma', 'Pediatrics', 'Obstetrics & Gynecology', 'Cardiology'],
    services: ['24/7 Casualty', 'ICU', 'Government Arogyasri Scheme', 'Free Generic Pharmacy', 'CT Scan'],
    trustStatus: 'verified',
    lastVerifiedDate: '15 Sep 2026',
    isEmergencyReady: true,
    coordinates: { lat: 16.3067, lng: 80.4365 },
    distanceKm: 2.1,
    verificationNotes: 'Verified directly via District Medical & Health Office registry.',
    priceList: [
      { id: 'pr-1', serviceName: 'OPD Doctor Consultation', priceMin: 0, inclusions: 'Initial clinical assessment, vital check, prescription', source: 'Government Free Scheme', isEstimated: false, lastVerifiedDate: '15 Sep 2026' },
      { id: 'pr-2', serviceName: 'Complete Blood Count (CBC)', priceMin: 0, inclusions: 'Full hemogram, platelets count', source: 'Hospital Diagnostic Lab', isEstimated: false, lastVerifiedDate: '15 Sep 2026' },
      { id: 'pr-3', serviceName: 'Emergency Trauma Admission', priceMin: 0, inclusions: '24h emergency ICU stabilization', source: 'Arogyasri Covered', isEstimated: false, lastVerifiedDate: '15 Sep 2026' }
    ]
  },
  {
    id: 'fac-2',
    name: 'Apollo Reach Community Hospital',
    type: 'Hospital',
    address: 'Main Highway Bypass, Karimnagar',
    city: 'Karimnagar',
    district: 'Karimnagar',
    pincode: '505001',
    state: 'Telangana',
    phone: '+91 878 2269999',
    operatingHours: '24/7 Emergency, OPD: 09:00 AM - 08:00 PM',
    specialties: ['Cardiology', 'Orthopedics', 'General Surgery', 'Neurology', 'Nephrology'],
    services: ['Dialysis Unit', 'Digital X-Ray', '24h Ambulance', 'Cashless Insurance Desk', 'Pharmacy'],
    trustStatus: 'verified',
    lastVerifiedDate: '28 Aug 2026',
    isEmergencyReady: true,
    coordinates: { lat: 18.4386, lng: 79.1288 },
    distanceKm: 4.8,
    verificationNotes: 'NABH Accredited. Verified hospital tariff schedule.',
    priceList: [
      { id: 'pr-4', serviceName: 'Specialist Doctor OPD Consultation', priceMin: 450, priceMax: 600, inclusions: 'Doctor consult, blood pressure check, digital prescription', source: 'Published Hospital Tariff', isEstimated: false, lastVerifiedDate: '28 Aug 2026' },
      { id: 'pr-5', serviceName: 'Cardiac 2D Echo Test', priceMin: 1800, priceMax: 2200, inclusions: 'Color doppler report with cardiologist signoff', source: 'Published Diagnostic Rate Card', isEstimated: false, lastVerifiedDate: '28 Aug 2026' },
      { id: 'pr-6', serviceName: 'ICU Day Stay (Standard Bed)', priceMin: 5500, priceMax: 7500, inclusions: 'Bed charge, nursing care, vital monitoring. Medicines excluded.', source: 'Estimated from published slab', isEstimated: true, lastVerifiedDate: '28 Aug 2026' }
    ]
  },
  {
    id: 'fac-3',
    name: 'Sanjeevani Rural Primary Health Centre (PHC)',
    type: 'Primary Health Centre',
    address: 'Near Panchayat Office, Morab Village, Dharwad',
    city: 'Dharwad Rural',
    district: 'Dharwad',
    pincode: '580112',
    state: 'Karnataka',
    phone: '+91 836 2441010',
    operatingHours: 'Mon-Sat: 09:00 AM - 04:30 PM (Emergency on-call)',
    specialties: ['General Medicine', 'Maternal & Child Health', 'Immunization', 'First Aid'],
    services: ['Free Childhood Vaccines', 'Normal Delivery Room', 'Essential Medicines Dispensary', 'Malaria/Dengue Testing'],
    trustStatus: 'verified',
    lastVerifiedDate: '02 Oct 2026',
    isEmergencyReady: false,
    coordinates: { lat: 15.4589, lng: 75.0078 },
    distanceKm: 8.5,
    verificationNotes: 'Rural Health Mission verified listing.',
    priceList: [
      { id: 'pr-7', serviceName: 'Doctor Consultation & Basic Medicines', priceMin: 0, inclusions: 'Doctor examination, generic medicines from government stock', source: 'National Health Mission', isEstimated: false, lastVerifiedDate: '02 Oct 2026' },
      { id: 'pr-8', serviceName: 'Rapid Malaria & Blood Sugar Test', priceMin: 0, inclusions: 'Finger-prick instant test kit', source: 'NHM Diagnostic Protocol', isEstimated: false, lastVerifiedDate: '02 Oct 2026' }
    ]
  },
  {
    id: 'fac-4',
    name: 'Dr. Radhika Family Clinic & Child Care',
    type: 'Clinic',
    address: 'Shop 4, Gandhi Nagar Road, Vellore',
    city: 'Vellore',
    district: 'Vellore',
    pincode: '632006',
    state: 'Tamil Nadu',
    phone: '+91 416 2244888',
    operatingHours: 'Mon-Sat: 10:00 AM - 01:30 PM, 05:30 PM - 09:00 PM',
    specialties: ['Pediatrics', 'Family Medicine', 'Vaccination'],
    services: ['Nebulization', 'Pediatric Growth Monitoring', 'Ear Piercing', 'Vaccines'],
    trustStatus: 'user_submitted',
    lastVerifiedDate: '10 Jun 2026',
    isEmergencyReady: false,
    coordinates: { lat: 12.9165, lng: 79.1325 },
    distanceKm: 3.2,
    verificationNotes: 'Submitted by patient community. Awaiting annual license verification re-check.',
    priceList: [
      { id: 'pr-9', serviceName: 'General Pediatric Consultation', priceMin: 300, priceMax: 400, inclusions: 'Child exam, weight & milestone check', source: 'User submitted receipt', isEstimated: true, lastVerifiedDate: '10 Jun 2026' }
    ]
  },
  {
    id: 'fac-5',
    name: 'MediScan Comprehensive Diagnostic Center',
    type: 'Diagnostic Center',
    address: 'Opposite New Bus Stand, Shivamogga',
    city: 'Shivamogga',
    district: 'Shivamogga',
    pincode: '577201',
    state: 'Karnataka',
    phone: '+91 818 2277111',
    operatingHours: 'Mon-Sun: 07:00 AM - 09:00 PM',
    specialties: ['Radiology', 'Pathology', 'Biochemistry'],
    services: ['MRI 1.5 Tesla', 'CT Scan 64 Slice', 'Ultrasound', 'Thyroid Profile', 'HbA1c Diabetes Test'],
    trustStatus: 'verified',
    lastVerifiedDate: '18 Sep 2026',
    isEmergencyReady: false,
    coordinates: { lat: 13.9299, lng: 75.5681 },
    distanceKm: 1.5,
    verificationNotes: 'NABL Certified laboratory branch.',
    priceList: [
      { id: 'pr-10', serviceName: 'HbA1c Glycated Hemoglobin Test', priceMin: 350, priceMax: 450, inclusions: 'Automated HPLC test, same day digital report', source: 'Tariff List', isEstimated: false, lastVerifiedDate: '18 Sep 2026' },
      { id: 'pr-11', serviceName: 'Brain MRI Plain (Without Contrast)', priceMin: 4200, priceMax: 5000, inclusions: 'Scan, digital film, radiologist detailed report', source: 'Tariff List', isEstimated: false, lastVerifiedDate: '18 Sep 2026' },
      { id: 'pr-12', serviceName: 'Full Abdomen Ultrasound (USG)', priceMin: 900, priceMax: 1200, inclusions: 'Doctor sonography assessment with immediate report', source: 'Tariff List', isEstimated: false, lastVerifiedDate: '18 Sep 2026' }
    ]
  },
  {
    id: 'fac-6',
    name: 'AIIMS New Delhi (All India Institute of Medical Sciences)',
    type: 'Hospital',
    address: 'Sri Aurobindo Marg, Ansari Nagar East',
    city: 'New Delhi',
    district: 'South Delhi',
    pincode: '110029',
    state: 'Delhi',
    phone: '+91 11 26588500',
    operatingHours: '24/7 Trauma Centre & Emergency Services',
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Nephrology', 'General Surgery', 'Orthopedics'],
    services: ['Apex Trauma Center', 'Centralized ICU', 'Robotic Surgery', 'Ayushman Bharat PM-JAY', 'Generic Drug Dispensary'],
    trustStatus: 'verified',
    lastVerifiedDate: '01 Oct 2026',
    isEmergencyReady: true,
    coordinates: { lat: 28.5672, lng: 77.2100 },
    distanceKm: 3.5,
    verificationNotes: 'National Apex Institute. Ministry of Health & Family Welfare registered.',
    priceList: [
      { id: 'pr-13', serviceName: 'OPD Doctor Consultation', priceMin: 10, inclusions: 'Token fee, specialist evaluation, computer record', source: 'Central Government Tariff', isEstimated: false, lastVerifiedDate: '01 Oct 2026' },
      { id: 'pr-14', serviceName: 'Whole Body CT Scan', priceMin: 1200, inclusions: 'High-resolution CT imaging, radiologist evaluation', source: 'AIIMS Rate Card', isEstimated: false, lastVerifiedDate: '01 Oct 2026' },
      { id: 'pr-15', serviceName: 'Emergency Trauma Admission', priceMin: 0, inclusions: 'Immediate life stabilization, triage and ICU bed', source: 'Ayushman Bharat PM-JAY', isEstimated: false, lastVerifiedDate: '01 Oct 2026' }
    ]
  },
  {
    id: 'fac-7',
    name: 'Tata Memorial Hospital & Cancer Research Centre',
    type: 'Hospital',
    address: 'Dr. Ernest Borges Rd, Parel',
    city: 'Mumbai',
    district: 'Mumbai City',
    pincode: '400012',
    state: 'Maharashtra',
    phone: '+91 22 24177000',
    operatingHours: '24/7 Emergency Oncology, OPD: 08:00 AM - 05:00 PM',
    specialties: ['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Hematology', 'Palliative Care'],
    services: ['PET-CT Scanner', 'Bone Marrow Transplant', 'Subsidized Chemotherapy', 'Social Welfare Helpdesk'],
    trustStatus: 'verified',
    lastVerifiedDate: '24 Sep 2026',
    isEmergencyReady: true,
    coordinates: { lat: 19.0044, lng: 72.8432 },
    distanceKm: 5.2,
    verificationNotes: 'Department of Atomic Energy & National Cancer Grid accredited.',
    priceList: [
      { id: 'pr-16', serviceName: 'Oncology Specialist OPD Consultation', priceMin: 200, priceMax: 500, inclusions: 'Multidisciplinary tumor board assessment', source: 'Institutional Tariff Schedule', isEstimated: false, lastVerifiedDate: '24 Sep 2026' },
      { id: 'pr-17', serviceName: 'Whole Body PET-CT Scan', priceMin: 9500, priceMax: 12000, inclusions: 'Tracer dose, scan acquisition, expert radiologist report', source: 'Subsidized Rate Card', isEstimated: false, lastVerifiedDate: '24 Sep 2026' }
    ]
  },
  {
    id: 'fac-8',
    name: 'NIMHANS (National Institute of Mental Health and Neurosciences)',
    type: 'Hospital',
    address: 'Hosur Road, Lakkasandra, Near Dairy Circle',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    pincode: '560029',
    state: 'Karnataka',
    phone: '+91 80 26995000',
    operatingHours: '24/7 Psychiatric Emergency & Neuro-Casualty',
    specialties: ['Psychiatry', 'Neurology', 'Neurosurgery', 'Child & Adolescent Mental Health', 'Addiction Medicine'],
    services: ['24/7 Tele-MANAS Center', 'Neuro-ICU', 'Crisis Stabilization Unit', 'Rehabilitation Workshops'],
    trustStatus: 'verified',
    lastVerifiedDate: '29 Sep 2026',
    isEmergencyReady: true,
    coordinates: { lat: 12.9388, lng: 77.5959 },
    distanceKm: 6.0,
    verificationNotes: 'Institute of National Importance. Ministry of Health verified.',
    priceList: [
      { id: 'pr-18', serviceName: 'Psychiatric OPD Consultation', priceMin: 20, inclusions: 'Clinical intake interview, mental state exam, prescription', source: 'Central Govt Published Fee', isEstimated: false, lastVerifiedDate: '29 Sep 2026' },
      { id: 'pr-19', serviceName: 'Comprehensive EEG (Brain Mapping)', priceMin: 450, priceMax: 600, inclusions: 'Digital EEG monitoring, neurophysiologist diagnosis', source: 'Diagnostic Tariff', isEstimated: false, lastVerifiedDate: '29 Sep 2026' }
    ]
  },
  {
    id: 'fac-9',
    name: 'KIMS Hospitals & Heart Institute',
    type: 'Hospital',
    address: '1-8-31/1, Minister Road, Secunderabad',
    city: 'Hyderabad',
    district: 'Hyderabad',
    pincode: '500003',
    state: 'Telangana',
    phone: '+91 40 44885000',
    operatingHours: '24/7 Emergency & Acute Cardiac Care',
    specialties: ['Cardiology', 'Cardiothoracic Surgery', 'Pulmonology', 'Gastroenterology', 'Critical Care'],
    services: ['Primary Angioplasty (Cath Lab)', 'ECMO Unit', 'Comprehensive Blood Bank', 'Cashless TPA Desk'],
    trustStatus: 'verified',
    lastVerifiedDate: '05 Oct 2026',
    isEmergencyReady: true,
    coordinates: { lat: 17.4375, lng: 78.4878 },
    distanceKm: 4.1,
    verificationNotes: 'NABH and JCI accredited multispecialty hospital.',
    priceList: [
      { id: 'pr-20', serviceName: 'Cardiologist OPD Consultation', priceMin: 700, priceMax: 900, inclusions: 'Consultation, vital screening, preliminary ECG review', source: 'Hospital Tariff Sheet', isEstimated: false, lastVerifiedDate: '05 Oct 2026' },
      { id: 'pr-21', serviceName: 'Coronary Angiography (CAG)', priceMin: 11000, priceMax: 14000, inclusions: 'Daycare procedure, catheter lab consumables, CD report', source: 'Standard Package Slab', isEstimated: true, lastVerifiedDate: '05 Oct 2026' }
    ]
  },
  {
    id: 'fac-10',
    name: 'Government Rajaji Hospital (Madurai Medical College)',
    type: 'Hospital',
    address: 'Panagal Road, Shenoy Nagar',
    city: 'Madurai',
    district: 'Madurai',
    pincode: '625020',
    state: 'Tamil Nadu',
    phone: '+91 452 2532535',
    operatingHours: '24/7 Emergency & Trauma Ward',
    specialties: ['General Medicine', 'Orthopedics', 'Pediatrics', 'Obstetrics & Gynecology', 'Dermatology'],
    services: ['24/7 Blood Bank', 'Chief Minister Comprehensive Health Insurance Scheme (CMCHIS)', 'Dialysis', 'Trauma Resuscitation'],
    trustStatus: 'verified',
    lastVerifiedDate: '12 Sep 2026',
    isEmergencyReady: true,
    coordinates: { lat: 9.9252, lng: 78.1198 },
    distanceKm: 3.8,
    verificationNotes: 'Tamil Nadu Health Department direct public listing.',
    priceList: [
      { id: 'pr-22', serviceName: 'OPD Doctor Consultation', priceMin: 0, inclusions: 'Free state public health care and basic medications', source: 'Govt CMCHIS Scheme', isEstimated: false, lastVerifiedDate: '12 Sep 2026' }
    ]
  },
  {
    id: 'fac-11',
    name: 'Dr. Mohan Diabetes Specialities Centre',
    type: 'Clinic',
    address: 'No 6B, Conran Smith Road, Gopalapuram',
    city: 'Chennai',
    district: 'Chennai',
    pincode: '600086',
    state: 'Tamil Nadu',
    phone: '+91 44 43968888',
    operatingHours: 'Mon-Sat: 07:30 AM - 07:00 PM, Sun: 08:00 AM - 01:00 PM',
    specialties: ['Diabetology', 'Endocrinology', 'Diabetic Foot Care', 'Dietetics & Nutrition', 'Preventive Cardiology'],
    services: ['Biothesiometry Foot Neuropathy Test', 'Continuous Glucose Monitoring (CGM)', 'Fundus Photography', 'Laboratory'],
    trustStatus: 'verified',
    lastVerifiedDate: '14 Sep 2026',
    isEmergencyReady: false,
    coordinates: { lat: 13.0489, lng: 80.2520 },
    distanceKm: 2.9,
    verificationNotes: 'IDF Centre of Excellence for Diabetes Care.',
    priceList: [
      { id: 'pr-23', serviceName: 'Diabetologist Consultation & Foot Screen', priceMin: 650, priceMax: 850, inclusions: 'Physician exam, vibration perception test, personalized diet plan', source: 'Published Rate Card', isEstimated: false, lastVerifiedDate: '14 Sep 2026' },
      { id: 'pr-24', serviceName: 'Quarterly Diabetes Lab Panel (HbA1c + Lipid + Microalbumin)', priceMin: 1250, priceMax: 1600, inclusions: 'Complete metabolic profile with same-day digital counseling', source: 'Clinic Tariff', isEstimated: false, lastVerifiedDate: '14 Sep 2026' }
    ]
  },
  {
    id: 'fac-12',
    name: 'SSKM Government Medical College & Hospital',
    type: 'Hospital',
    address: '244 AJC Bose Road, Bhowanipore',
    city: 'Kolkata',
    district: 'Kolkata',
    pincode: '700020',
    state: 'West Bengal',
    phone: '+91 33 22231589',
    operatingHours: '24/7 Trauma Care & Emergency',
    specialties: ['Cardiology', 'Neurosurgery', 'Endocrinology', 'Gastroenterology', 'General Surgery'],
    services: ['Swasthya Sathi Scheme', 'Emergency Casualty', 'Fair Price Medicine Counter', 'Digital Radiography'],
    trustStatus: 'verified',
    lastVerifiedDate: '20 Sep 2026',
    isEmergencyReady: true,
    coordinates: { lat: 22.5392, lng: 88.3444 },
    distanceKm: 4.7,
    verificationNotes: 'West Bengal Directorate of Health Services certified.',
    priceList: [
      { id: 'pr-25', serviceName: 'OPD Consultation & Diagnostic Tests', priceMin: 0, inclusions: 'Free state healthcare and subsidized diagnostics', source: 'Swasthya Sathi Scheme', isEstimated: false, lastVerifiedDate: '20 Sep 2026' }
    ]
  }
];

export const INITIAL_MEDICATIONS: MedicationReminder[] = [
  {
    id: 'med-1',
    userId: 'usr-1',
    medicineName: 'Metformin 500mg',
    dosage: '1 tablet with breakfast',
    instructions: 'As prescribed by Dr. Sharma. Take immediately after food with water. Do not skip breakfast.',
    scheduleTime: '08:30 AM',
    frequency: 'daily',
    startDate: '2026-08-01',
    statusToday: 'taken',
    notes: 'For blood sugar management',
    loggedAt: '2026-10-11 08:35 AM'
  },
  {
    id: 'med-2',
    userId: 'usr-1',
    medicineName: 'Telmisartan 40mg',
    dosage: '1 tablet in the morning',
    instructions: 'As instructed by cardiologist. Check BP once a week in the morning before dose.',
    scheduleTime: '09:00 AM',
    frequency: 'daily',
    startDate: '2026-07-15',
    statusToday: 'taken',
    notes: 'Blood pressure control',
    loggedAt: '2026-10-11 09:05 AM'
  },
  {
    id: 'med-3',
    userId: 'usr-1',
    medicineName: 'Calcium & Vitamin D3',
    dosage: '1 tablet after lunch',
    instructions: 'Take 30 minutes after afternoon meal.',
    scheduleTime: '02:00 PM',
    frequency: 'daily',
    startDate: '2026-09-01',
    statusToday: 'pending',
    notes: 'Bone strength supplement'
  },
  {
    id: 'med-4',
    userId: 'usr-1',
    medicineName: 'Atorvastatin 10mg',
    dosage: '1 tablet at night',
    instructions: 'Take right before sleeping as prescribed by physician.',
    scheduleTime: '09:30 PM',
    frequency: 'daily',
    startDate: '2026-08-01',
    statusToday: 'pending',
    notes: 'Cholesterol control'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    userId: 'usr-1',
    doctorOrFacilityName: 'Dr. S. K. Sharma (MD, Diabetologist)',
    specialty: 'Endocrinology / Diabetes',
    appointmentDate: '2026-10-16',
    appointmentTime: '10:30 AM',
    location: 'District Government General Hospital, Room 14',
    purpose: 'Quarterly diabetic follow-up & reviewing HbA1c test results',
    status: 'confirmed_by_provider',
    contactPhone: '+91 863 2224000',
    notes: 'Carry morning fasting lab report along with previous prescription.'
  },
  {
    id: 'apt-2',
    userId: 'usr-1',
    doctorOrFacilityName: 'Dr. Meera Iyer (Ophthalmologist)',
    specialty: 'Eye Care',
    appointmentDate: '2026-10-24',
    appointmentTime: '04:00 PM',
    location: 'Drishti Eye Centre, Near Clock Tower',
    purpose: 'Routine diabetic retinopathy fundus screening',
    status: 'planned',
    contactPhone: '+91 863 2231500',
    notes: 'Planned visit. Need to confirm appointment token one day prior.'
  }
];

export const INITIAL_DOCUMENTS: MedicalDocument[] = [
  {
    id: 'doc-1',
    userId: 'usr-1',
    title: 'Dr. Sharma Diabetes Review Prescription',
    category: 'Prescription',
    recordDate: '2026-08-15',
    doctorName: 'Dr. S. K. Sharma',
    facilityName: 'District Hospital OPD',
    fileType: 'pdf',
    fileSizeMb: 1.2,
    tags: ['diabetes', 'bp', 'metformin', 'telmisartan'],
    isPrivate: true,
    sharedWithCaregiverIds: ['cg-1'],
    mockDataSummary: 'Synthetic Rx: Metformin 500mg (1-0-0), Telmisartan 40mg (1-0-0), Atorvastatin 10mg (0-0-1). Next review in 2 months with fresh HbA1c.'
  },
  {
    id: 'doc-2',
    userId: 'usr-1',
    title: 'Comprehensive Lipid & HbA1c Lab Report',
    category: 'Lab Report',
    recordDate: '2026-08-14',
    doctorName: 'Pathologist Dr. Nair',
    facilityName: 'MediScan Diagnostic Center',
    fileType: 'pdf',
    fileSizeMb: 2.4,
    tags: ['hba1c', 'cholesterol', 'blood test'],
    isPrivate: true,
    sharedWithCaregiverIds: ['cg-1'],
    mockDataSummary: 'HbA1c: 6.8% (Fair control). Fasting Blood Sugar: 118 mg/dL. Total Cholesterol: 192 mg/dL. Normal kidney parameters.'
  },
  {
    id: 'doc-3',
    userId: 'usr-1',
    title: 'Annual Influenza Vaccine Certificate',
    category: 'Vaccination',
    recordDate: '2026-05-10',
    doctorName: 'Staff Nurse Sunita',
    facilityName: 'Sanjeevani Rural PHC',
    fileType: 'jpg',
    fileSizeMb: 0.8,
    tags: ['flu', 'vaccine', 'preventive'],
    isPrivate: true,
    sharedWithCaregiverIds: [],
    mockDataSummary: 'Quadrivalent Influenza Vaccine administered safely. Batch: FL-9821. No adverse reaction observed.'
  }
];

export const INITIAL_DONORS: BloodDonor[] = [
  {
    id: 'don-1',
    fullName: 'Rohan K. (Consented Volunteer)',
    bloodGroup: 'O+',
    district: 'Guntur',
    city: 'Guntur',
    pincode: '522001',
    isAvailable: true,
    consentGiven: true,
    lastDonationDate: '2026-06-20',
    totalDonationsCount: 6,
    contactPreference: 'carebridge_inbox'
  },
  {
    id: 'don-2',
    fullName: 'Ananya V. (Consented Volunteer)',
    bloodGroup: 'B-',
    district: 'Guntur',
    city: 'Guntur',
    pincode: '522004',
    isAvailable: true,
    consentGiven: true,
    lastDonationDate: '2026-04-12',
    totalDonationsCount: 3,
    contactPreference: 'carebridge_inbox'
  },
  {
    id: 'don-3',
    fullName: 'Vikram S. (Consented Volunteer)',
    bloodGroup: 'AB+',
    district: 'Karimnagar',
    city: 'Karimnagar',
    pincode: '505001',
    isAvailable: false,
    consentGiven: true,
    lastDonationDate: '2026-09-01',
    totalDonationsCount: 8,
    contactPreference: 'email'
  },
  {
    id: 'don-4',
    fullName: 'Lakshmi P. (Consented Volunteer)',
    bloodGroup: 'O-',
    district: 'Dharwad',
    city: 'Hubli-Dharwad',
    pincode: '580020',
    isAvailable: true,
    consentGiven: true,
    lastDonationDate: '2026-05-18',
    totalDonationsCount: 4,
    contactPreference: 'carebridge_inbox'
  }
];

export const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'req-1',
    patientNameInitials: 'P. R. (Elderly Patient)',
    bloodGroup: 'O-',
    unitsNeeded: 2,
    hospitalName: 'District Government General Hospital, Blood Bank',
    city: 'Guntur',
    urgency: 'critical',
    requestDate: '2026-10-11',
    status: 'active',
    contactPerson: 'Authorized Medical Social Worker (Desk 3)'
  },
  {
    id: 'req-2',
    patientNameInitials: 'M. S. (Surgical Requirement)',
    bloodGroup: 'B+',
    unitsNeeded: 1,
    hospitalName: 'Apollo Reach Hospital',
    city: 'Karimnagar',
    urgency: 'within_24h',
    requestDate: '2026-10-10',
    status: 'active',
    contactPerson: 'Hospital Blood Bank Coordinator'
  }
];

export const INITIAL_ARTICLES: HealthArticle[] = [
  {
    id: 'art-1',
    slug: 'managing-type-2-diabetes-in-indian-diets',
    title: 'Managing Blood Sugar with Everyday Indian Meals',
    summary: 'Practical dietary shifts from polished white rice to millets, portion balance, and understanding glycaemic load without sacrificing traditional flavors.',
    category: 'Diabetes & Nutrition',
    language: 'en',
    authorOrSource: 'National Institute of Nutrition & Clinical Advisory Group',
    medicallyReviewedBy: 'Dr. V. Mohan (Endocrinology Reviewer)',
    reviewDate: '12 Sep 2026',
    readTimeMinutes: 5,
    emergencySymptomsWarning: [
      'Sudden extreme dizziness or confusion (possible acute hypoglycaemia)',
      'Fruity-smelling breath with rapid, labored breathing',
      'Blood glucose reading above 350 mg/dL accompanied by vomiting'
    ],
    contentMarkdown: `
### Understanding Carbs in the Indian Thali
Traditional Indian thalis are often rich in carbohydrates—polished white rice, maida rotis, and sugary snacks. For people managing Type 2 Diabetes, adopting healthy switches is easier than drastic fasting:

1. **The Quarter-Plate Rule:** Fill half of your plate with green vegetables, cucumber, or cooked dalia/salad; one quarter with protein (dal, paneer, eggs, sprouts); and only one quarter with grain carbs.
2. **Embrace Indigenous Millets:** Ragi (finger millet), Jowar (sorghum), and Foxtail millet possess lower glycaemic indices and higher dietary fibre.
3. **Never Skip Prescribed Morning Medications:** Diet complements medication; it does not replace the doctor's dosage instructions.
    `
  },
  {
    id: 'art-2',
    slug: 'recognizing-heart-attack-warning-signs',
    title: 'Heart Attack Warning Signs: When Every Minute Matters',
    summary: 'Chest tightness, unexplained sweating, jaw pain, and gastric confusion. Understand when to dial 112 or reach the nearest emergency hospital immediately.',
    category: 'Cardiology',
    language: 'en',
    authorOrSource: 'Indian Heart Association & Cardiological Society of India',
    medicallyReviewedBy: 'Dr. Devi Shetty (Cardiology Review Team)',
    reviewDate: '20 Sep 2026',
    readTimeMinutes: 6,
    emergencySymptomsWarning: [
      'Heavy pressure, squeezing, or crushing pain in the centre of the chest',
      'Pain spreading to the left shoulder, neck, jaw, or upper back',
      'Cold sweat accompanied by nausea and severe breathlessness'
    ],
    contentMarkdown: `
### Do Not Confuse Heart Attacks with "Simple Gas"
In India, heart attacks are frequently delayed because patients and relatives misinterpret early symptoms as gastric acidity or indigestion.

- **The Golden Hour:** The first 60 minutes following acute symptoms are critical. Reaching a catheterization lab or emergency trauma center can prevent permanent heart muscle damage.
- **Immediate Steps:** Dial 112 or local emergency ambulance 108 immediately. Keep the patient seated upright and resting; do not let them walk or drive themselves.
    `
  },
  {
    id: 'art-3',
    slug: 'heat-stroke-and-dehydration-care',
    title: 'Preventing Dehydration and Heat Exhaustion During Summer',
    summary: 'ORSL, coconut water, and shade routines for farmers, construction workers, and elders prone to heat collapse.',
    category: 'Preventive Care',
    language: 'en',
    authorOrSource: 'Ministry of Health and Family Welfare (Public Advisory)',
    medicallyReviewedBy: 'Dr. Anita Roy (Community Health Specialist)',
    reviewDate: '05 Aug 2026',
    readTimeMinutes: 4,
    contentMarkdown: `
### Hydration Guidelines for Tropical Climates
Drink clean boiled or filtered water regularly throughout the day. ORS packets mixed in exactly 1 litre of clean water offer balanced electrolytes.
    `
  }
];

export const INITIAL_MENTAL_HEALTH_RESOURCES: MentalHealthResource[] = [
  {
    id: 'mh-1',
    name: 'Tele-MANAS National Tele-Mental Health Helpline',
    type: 'Crisis Helpline',
    languagesSupported: ['Hindi', 'English', 'Telugu', 'Tamil', 'Kannada', 'Bengali', 'Marathi', 'Malayalam'],
    cityOrMode: 'Pan-India Toll-Free Service',
    phoneOrContact: '14416 / 1800-891-4416',
    credentials: 'Govt. of India Initiative (NIMHANS Apex Center)',
    publishedFee: 'Free 24x7 Government Service',
    trustStatus: 'verified',
    hours: '24 Hours, 7 Days a week'
  },
  {
    id: 'mh-2',
    name: 'KIRAN National Mental Health Rehabilitation Helpline',
    type: 'Crisis Helpline',
    languagesSupported: ['Hindi', 'English', 'Tamil', 'Telugu', 'Urdu', 'Gujarati'],
    cityOrMode: 'Pan-India Toll-Free',
    phoneOrContact: '1800-599-0019',
    credentials: 'Ministry of Social Justice & Empowerment',
    publishedFee: 'Free Toll-Free',
    trustStatus: 'verified',
    hours: '24 Hours, 7 Days a week'
  },
  {
    id: 'mh-3',
    name: 'Vandrevala Foundation Counseling',
    type: 'Peer Support',
    languagesSupported: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    cityOrMode: 'Telephonic & Chat Support',
    phoneOrContact: '+91 9999 666 555',
    credentials: 'Trained psychological counselors & mental wellness advocates',
    publishedFee: 'Free Voluntary Service',
    trustStatus: 'verified',
    hours: '24 Hours, 7 Days a week'
  },
  {
    id: 'mh-4',
    name: 'Dr. Ananya Sen (M.Phil Clinical Psychology)',
    type: 'Licensed Professional',
    languagesSupported: ['English', 'Bengali', 'Hindi'],
    cityOrMode: 'In-person (Kolkata) & Verified Secure Tele-Consultation',
    phoneOrContact: 'Verified via CareBridge Consult Desk',
    credentials: 'RCI Registered Clinical Psychologist (Reg # CRR-98421)',
    publishedFee: '₹1,000 / 50-minute clinical session (Sliding scale available)',
    trustStatus: 'verified',
    hours: 'Mon-Fri: 11:00 AM - 06:00 PM'
  }
];

export const INITIAL_CAREGIVERS: CaregiverRelationship[] = [
  {
    id: 'cg-1',
    patientId: 'usr-1',
    caregiverId: 'usr-2',
    caregiverName: 'Ravi Kumar (Son)',
    caregiverEmail: 'ravi.kumar@example.com',
    relationship: 'Child',
    permissions: {
      canViewMedicines: true,
      canUpdateMedicines: true,
      canViewRecords: true,
      canViewAppointments: true
    },
    status: 'active',
    invitedAt: '2026-06-01'
  }
];

export const INITIAL_TASKS: SharedFamilyTask[] = [
  {
    id: 'tsk-1',
    title: 'Collect monthly Metformin & BP refill from Jan Aushadhi Kendra',
    category: 'Medicine Refill',
    assignedToName: 'Ravi Kumar',
    dueDate: '2026-10-14',
    isCompleted: false,
    createdBy: 'Priya (Patient)',
    updatedAtNote: 'Created by Priya · Updated 2h ago'
  },
  {
    id: 'tsk-2',
    title: 'Book Fasting Blood Sugar and HbA1c home sample pickup',
    category: 'Lab Test',
    assignedToName: 'Ravi Kumar',
    dueDate: '2026-10-15',
    isCompleted: false,
    createdBy: 'Ravi Kumar',
    updatedAtNote: 'Created by Ravi · Updated yesterday'
  },
  {
    id: 'tsk-3',
    title: 'Verify Dr. Sharma OPD appointment token confirmation',
    category: 'Doctor Follow-up',
    assignedToName: 'Priya (Patient)',
    dueDate: '2026-10-15',
    isCompleted: true,
    createdBy: 'Priya (Patient)',
    updatedAtNote: 'Completed by Priya · Updated 3h ago'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-11 11:45 AM',
    actorEmail: 'admin@carebridge.in',
    action: 'VERIFIED_FACILITY',
    targetEntity: 'District Government General Hospital (fac-1)',
    details: 'Verified government hospital registration against DMHO Andhra Pradesh portal.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-11 09:20 AM',
    actorEmail: 'moderator@carebridge.in',
    action: 'APPROVED_ARTICLE',
    targetEntity: 'Article: Managing Type 2 Diabetes (art-1)',
    details: 'Reviewed and certified by Dr. V. Mohan review board.'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-10 04:15 PM',
    actorEmail: 'system@carebridge.in',
    action: 'REVOKE_CAREGIVER_ACCESS',
    targetEntity: 'Caregiver Permission ID: cg-revoked-9',
    details: 'User initiated explicit revocation of former caregiver medical records access.'
  }
];

export const INITIAL_REPORTS: UserReport[] = [
  {
    id: 'rep-1',
    submittedAt: '2026-10-10 02:15 PM',
    reporterName: 'Sunita Rao',
    targetType: 'facility',
    targetTitle: 'Dr. Radhika Family Clinic',
    reason: 'Evening clinic hours updated locally to 6:00 PM due to seasonal festival.',
    status: 'investigating'
  }
];
