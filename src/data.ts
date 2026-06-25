/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Donor, DonationEvent, UserRole, BloodGroup } from './types';

// Helper to get relative dates based on June 24, 2026
export const getRelativeDateString = (daysAgo: number): string => {
  const currentDate = new Date('2026-06-24');
  currentDate.setDate(currentDate.getDate() - daysAgo);
  return currentDate.toISOString().split('T')[0];
};

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'DON-001',
    name: 'Sarah Connor',
    bloodGroup: 'O-',
    email: 'sarah.c@skymail.net',
    phone: '+1 (555) 019-2834',
    gender: 'Female',
    age: 38,
    weight: 62,
    lastDonationDate: getRelativeDateString(70), // ~70 days ago, available (>56 days)
    availabilityStatus: 'Available',
    systolicBp: 118,
    diastolicBp: 76,
    hemoglobin: 13.8,
    notes: 'Universal donor, highly active participant in mobile blood drives.',
    isArchived: false,
    deletedAt: null
  },
  {
    id: 'DON-002',
    name: 'Marcus Wright',
    bloodGroup: 'A+',
    email: 'mwright@cyberdyne.org',
    phone: '+1 (555) 014-9821',
    gender: 'Male',
    age: 42,
    weight: 85,
    lastDonationDate: getRelativeDateString(25), // ~25 days ago, unavailable (<56 days)
    availabilityStatus: 'Unavailable',
    systolicBp: 125,
    diastolicBp: 82,
    hemoglobin: 14.5,
    notes: 'Regular donor. Currently in the 56-day red blood cell replenishment deferral period.',
    isArchived: false,
    deletedAt: null
  },
  {
    id: 'DON-003',
    name: 'John Connor',
    bloodGroup: 'AB+',
    email: 'jconnor@resistance.net',
    phone: '+1 (555) 017-4321',
    gender: 'Male',
    age: 21,
    weight: 70,
    lastDonationDate: null, // Never donated, available
    availabilityStatus: 'Available',
    systolicBp: 120,
    diastolicBp: 80,
    hemoglobin: 15.1,
    notes: 'First-time donor. Eager to contribute to universal platelet drives.',
    isArchived: false,
    deletedAt: null
  },
  {
    id: 'DON-004',
    name: 'Elena Gilbert',
    bloodGroup: 'B-',
    email: 'elena.g@mysticfalls.org',
    phone: '+1 (555) 012-3456',
    gender: 'Female',
    age: 24,
    weight: 48, // Below 50kg, deferred!
    lastDonationDate: null,
    availabilityStatus: 'Deferred',
    systolicBp: 110,
    diastolicBp: 70,
    hemoglobin: 11.2, // Below 12.5 g/dL, deferred!
    notes: 'Deferred temporarily due to low body weight (< 50kg) and low hemoglobin level (< 12.5 g/dL).',
    isArchived: false,
    deletedAt: null
  },
  {
    id: 'DON-005',
    name: 'Peter Parker',
    bloodGroup: 'O+',
    email: 'web-slinger@dailybugle.com',
    phone: '+1 (555) 015-8899',
    gender: 'Male',
    age: 19,
    weight: 68,
    lastDonationDate: getRelativeDateString(120), // > 56 days, available
    availabilityStatus: 'Available',
    systolicBp: 115,
    diastolicBp: 75,
    hemoglobin: 14.2,
    notes: 'Excellent health parameters, fast recovery time.',
    isArchived: false,
    deletedAt: null
  },
  {
    id: 'DON-006',
    name: 'Diana Prince',
    bloodGroup: 'AB-',
    email: 'diana.prince@themscyra.org',
    phone: '+1 (555) 011-1941',
    gender: 'Female',
    age: 32,
    weight: 75,
    lastDonationDate: getRelativeDateString(5), // ~5 days ago, unavailable
    availabilityStatus: 'Unavailable',
    systolicBp: 112,
    diastolicBp: 70,
    hemoglobin: 14.0,
    notes: 'Rare blood type donor, responds promptly to emergency requests.',
    isArchived: false,
    deletedAt: null
  }
];

export const INITIAL_DONATION_EVENTS: DonationEvent[] = [
  {
    id: 'EVT-101',
    donorId: 'DON-001',
    donorName: 'Sarah Connor',
    donationDate: getRelativeDateString(70),
    bloodGroup: 'O-',
    volumeMl: 450,
    location: 'Metropolitan General Hospital',
    status: 'Completed',
    notes: 'Standard whole blood donation. Well tolerated.'
  },
  {
    id: 'EVT-102',
    donorId: 'DON-002',
    donorName: 'Marcus Wright',
    donationDate: getRelativeDateString(25),
    bloodGroup: 'A+',
    volumeMl: 450,
    location: 'Red Cross Mobile Unit A',
    status: 'Completed',
    notes: 'Whole blood donation. No adverse reactions recorded.'
  },
  {
    id: 'EVT-103',
    donorId: 'DON-006',
    donorName: 'Diana Prince',
    donationDate: getRelativeDateString(5),
    bloodGroup: 'AB-',
    volumeMl: 450,
    location: 'Downtown Community Center',
    status: 'Completed',
    notes: 'Emergency donation for high-priority ICU surgical request.'
  }
];

export const USER_ROLES: UserRole[] = [
  {
    id: 'donor',
    name: 'Donor',
    description: 'A registered individual who wants to donate blood or track their donation history and eligibility status.',
    responsibilities: [
      'Create and maintain their personal profile and health details.',
      'Check current donation eligibility and remaining recovery countdowns.',
      'View historical donation events and medical parameter logs (BP, hemoglobin).',
      'Schedule upcoming appointments at blood banks or mobile drives.'
    ],
    allowedActions: [
      'Register new donor account',
      'Update own contact/personal details',
      'Query own blood group and last donation dates',
      'Self-check availability status'
    ]
  },
  {
    id: 'staff',
    name: 'Blood Bank Staff / Phlebotomist',
    description: 'Medical professionals responsible for conducting clinical evaluations, performing donations, and updating live donor registers.',
    responsibilities: [
      'Search and locate donors by name, ID, or blood group during emergencies.',
      'Perform medical pre-screening (blood pressure, weight, hemoglobin testing).',
      'Record donation events (volume collected, donation date, location).',
      'Flag deferred donors with clinical rationale and update availability status.'
    ],
    allowedActions: [
      'Search all donors by Blood Group',
      'Update clinical parameters of any donor',
      'Create and record donation events',
      'Update donor availability status manually'
    ]
  },
  {
    id: 'admin',
    name: 'System Administrator / Clinical Director',
    description: 'A high-level coordinator responsible for auditing system data, ensuring regulatory compliance, and managing clinical policy configurations.',
    responsibilities: [
      'Manage system access and assign granular roles/permissions.',
      'Perform logical deletion of donor records under HIPAA/GDPR "Right to be Forgotten" parameters.',
      'Audit records for clinical safety, data integrity, and policy compliance.',
      'Generate aggregate reports on blood group supply levels and emergency demand metrics.'
    ],
    allowedActions: [
      'All staff actions',
      'Perform logical deletion of donors (archive/purge)',
      'Assign roles and configure system access controls',
      'Export audit logs and compliance reports'
    ]
  }
];

// Helper to calculate donor eligibility status
export interface EligibilityResult {
  status: 'Available' | 'Unavailable' | 'Deferred';
  reason: string;
  daysRemaining: number;
}

export const checkDonorEligibility = (
  donor: Pick<Donor, 'age' | 'weight' | 'systolicBp' | 'diastolicBp' | 'hemoglobin' | 'lastDonationDate'>
): EligibilityResult => {
  // 1. Age constraint (generally 18 - 65)
  if (donor.age < 18) {
    return { status: 'Deferred', reason: 'Donor is under minimum age (18)', daysRemaining: 0 };
  }
  if (donor.age > 70) {
    return { status: 'Deferred', reason: 'Donor is over maximum age limit (70)', daysRemaining: 0 };
  }

  // 2. Weight constraint (minimum 50 kg / 110 lbs)
  if (donor.weight < 50) {
    return { status: 'Deferred', reason: 'Donor weight is below minimum clinical requirement (50kg)', daysRemaining: 0 };
  }

  // 3. Blood pressure check
  // Systolic must be 90-180 mmHg, Diastolic 50-100 mmHg
  if (donor.systolicBp < 90 || donor.systolicBp > 180 || donor.diastolicBp < 50 || donor.diastolicBp > 100) {
    return { status: 'Deferred', reason: 'Blood pressure is outside safe donation parameters (Systolic: 90-180, Diastolic: 50-100)', daysRemaining: 0 };
  }

  // 4. Hemoglobin level
  // Must be >= 12.5 g/dL (for female) or >= 13.0 g/dL (for male)
  // Let's use a standard general minimum of 12.5 g/dL for mock validation
  if (donor.hemoglobin < 12.5) {
    return { status: 'Deferred', reason: `Hemoglobin levels are too low (${donor.hemoglobin} g/dL, minimum 12.5 g/dL)`, daysRemaining: 0 };
  }

  // 5. Last donation interval check (56 days for whole blood)
  if (donor.lastDonationDate) {
    const lastDate = new Date(donor.lastDonationDate);
    const currentDate = new Date('2026-06-24'); // Fixed simulation date
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 56) {
      return { 
        status: 'Unavailable', 
        reason: `Donated recently (${diffDays} days ago). Requires a 56-day red blood cell replenishment interval.`, 
        daysRemaining: 56 - diffDays 
      };
    }
  }

  return { status: 'Available', reason: 'Passes all clinical pre-screening checks.', daysRemaining: 0 };
};
