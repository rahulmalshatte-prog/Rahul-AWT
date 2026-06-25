/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  weight: number; // in kg, minimum 50kg for donation eligibility
  lastDonationDate: string | null; // ISO YYYY-MM-DD
  availabilityStatus: 'Available' | 'Unavailable' | 'Deferred';
  systolicBp: number; // e.g. 120
  diastolicBp: number; // e.g. 80
  hemoglobin: number; // g/dL, e.g. 13.5
  notes?: string;
  isArchived: boolean; // Safe/logical delete flag
  deletedAt: string | null;
}

export interface DonationEvent {
  id: string;
  donorId: string;
  donorName: string;
  donationDate: string; // ISO YYYY-MM-DD
  bloodGroup: BloodGroup;
  volumeMl: number; // e.g. 450
  location: string;
  status: 'Completed' | 'Pending' | 'Deferred';
  notes?: string;
}

export interface UserRole {
  id: 'donor' | 'staff' | 'admin';
  name: string;
  description: string;
  responsibilities: string[];
  allowedActions: string[];
}
