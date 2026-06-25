/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Calendar, Mail, 
  Clock, Heart, ShieldAlert, Check, X, AlertCircle, HelpCircle 
} from 'lucide-react';
import { Donor, BloodGroup, DonationEvent } from '../types';
import { 
  INITIAL_DONORS, INITIAL_DONATION_EVENTS, checkDonorEligibility 
} from '../data';

export default function PrototypePlayground() {
  // State for donors and events
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);
  const [events, setEvents] = useState<DonationEvent[]>(INITIAL_DONATION_EVENTS);

  // Filter/Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [showArchived, setShowArchived] = useState(false);

  // Form management states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'O+' as BloodGroup,
    email: '',
    phone: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    age: '30',
    weight: '70',
    lastDonationDate: '',
    systolicBp: '120',
    diastolicBp: '80',
    hemoglobin: '14.0',
    notes: ''
  });

  // Deletion confirm modal state
  const [donorToDelete, setDonorToDelete] = useState<Donor | null>(null);

  // Form validation error state
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle setting up the edit form
  const handleStartEdit = (donor: Donor) => {
    setEditingDonor(donor);
    setFormData({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      email: donor.email,
      phone: donor.phone,
      gender: donor.gender,
      age: donor.age.toString(),
      weight: donor.weight.toString(),
      lastDonationDate: donor.lastDonationDate || '',
      systolicBp: donor.systolicBp.toString(),
      diastolicBp: donor.diastolicBp.toString(),
      hemoglobin: donor.hemoglobin.toString(),
      notes: donor.notes || ''
    });
    setFormErrors([]);
    setSuccessMessage(null);
    setIsFormOpen(true);
  };

  // Handle setting up the create form
  const handleStartCreate = () => {
    setEditingDonor(null);
    setFormData({
      name: '',
      bloodGroup: 'O+' as BloodGroup,
      email: '',
      phone: '',
      gender: 'Male' as 'Male' | 'Female' | 'Other',
      age: '30',
      weight: '70',
      lastDonationDate: '',
      systolicBp: '120',
      diastolicBp: '80',
      hemoglobin: '14.0',
      notes: ''
    });
    setFormErrors([]);
    setSuccessMessage(null);
    setIsFormOpen(true);
  };

  // Handle form field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);
    setSuccessMessage(null);

    // Validate inputs
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push('Full Name is required.');
    if (!/^[A-Za-z\s]+$/.test(formData.name)) errors.push('Name should contain alphabetic characters and spaces only.');
    if (!formData.email.trim()) errors.push('Email is required.');
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push('Invalid Email format.');
    if (!formData.phone.trim()) errors.push('Phone number is required.');

    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 70) {
      errors.push('Age must be between 18 and 70 to donate.');
    }

    const weightNum = parseFloat(formData.weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      errors.push('Weight must be a valid positive number.');
    }

    const sysBp = parseInt(formData.systolicBp);
    const diaBp = parseInt(formData.diastolicBp);
    if (isNaN(sysBp) || sysBp < 70 || sysBp > 200 || isNaN(diaBp) || diaBp < 40 || diaBp > 120) {
      errors.push('Please enter valid physiological Blood Pressure parameters.');
    }

    const hb = parseFloat(formData.hemoglobin);
    if (isNaN(hb) || hb <= 0 || hb > 25) {
      errors.push('Please enter a valid Hemoglobin level.');
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // Build the donor object to test eligibility
    const tempDonorData = {
      name: formData.name.trim(),
      bloodGroup: formData.bloodGroup,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      gender: formData.gender,
      age: ageNum,
      weight: weightNum,
      lastDonationDate: formData.lastDonationDate ? formData.lastDonationDate : null,
      systolicBp: sysBp,
      diastolicBp: diaBp,
      hemoglobin: hb,
      notes: formData.notes.trim()
    };

    // Calculate dynamic eligibility
    const eligibility = checkDonorEligibility(tempDonorData);

    if (editingDonor) {
      // Update donor in list
      setDonors(prev => prev.map(d => {
        if (d.id === editingDonor.id) {
          return {
            ...d,
            ...tempDonorData,
            availabilityStatus: eligibility.status,
            notes: tempDonorData.notes + (eligibility.status !== 'Available' ? ` [Prescreen Reason: ${eligibility.reason}]` : '')
          };
        }
        return d;
      }));

      // If lastDonationDate has changed or was added, and it matches an event, update or add event simulation
      if (tempDonorData.lastDonationDate && tempDonorData.lastDonationDate !== editingDonor.lastDonationDate) {
        const hasExistingEvent = events.some(ev => ev.donorId === editingDonor.id && ev.donationDate === tempDonorData.lastDonationDate);
        if (!hasExistingEvent) {
          const newEvent: DonationEvent = {
            id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
            donorId: editingDonor.id,
            donorName: tempDonorData.name,
            donationDate: tempDonorData.lastDonationDate,
            bloodGroup: tempDonorData.bloodGroup,
            volumeMl: 450,
            location: 'Main Medical Center (Manual Log)',
            status: 'Completed'
          };
          setEvents(prev => [newEvent, ...prev]);
        }
      }

      setSuccessMessage(`Donor "${tempDonorData.name}" updated successfully. Recalculated: ${eligibility.status}.`);
      setTimeout(() => {
        setIsFormOpen(false);
        setEditingDonor(null);
      }, 1500);

    } else {
      // Create new donor
      const newId = `DON-0${donors.length + 1}`;
      const newDonor: Donor = {
        id: newId,
        ...tempDonorData,
        availabilityStatus: eligibility.status,
        isArchived: false,
        deletedAt: null,
        notes: tempDonorData.notes + (eligibility.status !== 'Available' ? ` [Prescreen Reason: ${eligibility.reason}]` : '')
      };

      setDonors(prev => [newDonor, ...prev]);

      // Record a donation event if they register with a recent date
      if (tempDonorData.lastDonationDate) {
        const newEvent: DonationEvent = {
          id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
          donorId: newId,
          donorName: tempDonorData.name,
          donationDate: tempDonorData.lastDonationDate,
          bloodGroup: tempDonorData.bloodGroup,
          volumeMl: 450,
          location: 'Community Center (Historical)',
          status: 'Completed'
        };
        setEvents(prev => [newEvent, ...prev]);
      }

      setSuccessMessage(`Donor "${tempDonorData.name}" registered successfully. Recalculated: ${eligibility.status}.`);
      setTimeout(() => {
        setIsFormOpen(false);
      }, 1500);
    }
  };

  // Perform soft (logical) deletion
  const handleDeleteConfirm = () => {
    if (!donorToDelete) return;

    setDonors(prev => prev.map(d => {
      if (d.id === donorToDelete.id) {
        return {
          ...d,
          isArchived: true,
          deletedAt: new Date().toISOString().split('T')[0]
        };
      }
      return d;
    }));

    // Retain past events but flag them
    setEvents(prev => prev.map(ev => {
      if (ev.donorId === donorToDelete.id) {
        return { ...ev, notes: (ev.notes || '') + ' [Donor Archived]' };
      }
      return ev;
    }));

    setDonorToDelete(null);
  };

  // Restore an archived donor (for administrative demonstration)
  const handleRestoreDonor = (donor: Donor) => {
    setDonors(prev => prev.map(d => {
      if (d.id === donor.id) {
        return {
          ...d,
          isArchived: false,
          deletedAt: null
        };
      }
      return d;
    }));
  };

  // Filter donor records
  const filteredDonors = donors.filter(donor => {
    // Soft delete check
    if (!showArchived && donor.isArchived) return false;
    if (showArchived && !donor.isArchived) return false;

    // Search queries (name, email, phone, ID)
    const matchesSearch = 
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.phone.includes(searchQuery) ||
      donor.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Blood group filter
    const matchesBlood = selectedBloodGroup === 'ALL' || donor.bloodGroup === selectedBloodGroup;

    // Status check
    const matchesStatus = selectedStatus === 'ALL' || donor.availabilityStatus === selectedStatus;

    return matchesSearch && matchesBlood && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Search and Control Dashboard */}
      <div className="brutalist-card p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#D32F2F] fill-[#D32F2F]" />
              DONOR INDEX REGISTRY
            </h2>
            <p className="text-xs font-mono font-bold text-[#1A1A1A]/60">
              [ASYNCHRONOUS DATA REPLICA • NO RELOAD CRUD]
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Show archived toggle */}
            <button
              id="btn-toggle-archive"
              onClick={() => setShowArchived(!showArchived)}
              className={`px-3 py-2 text-xs font-black uppercase tracking-wider border-2 border-[#1A1A1A] transition ${
                showArchived 
                  ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_0px_#D32F2F]' 
                  : 'bg-white text-[#1A1A1A] hover:bg-[#F4F1EE]'
              }`}
            >
              {showArchived ? '★ VIEWING ARCHIVED' : 'VIEW DELETED FILE LOGS'}
            </button>

            <button
              id="btn-register-donor"
              onClick={handleStartCreate}
              className="brutalist-btn inline-flex items-center gap-2 px-4 py-2 text-xs"
            >
              <Plus className="h-4 w-4 stroke-[3px]" />
              ENROLL NEW DONOR
            </button>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Text search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#1A1A1A]/50" />
            <input
              id="search-input"
              type="text"
              placeholder="Search by donor name, email, phone, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border-2 border-[#1A1A1A] text-xs font-mono bg-white focus:outline-none focus:bg-[#F4F1EE]"
            />
          </div>

          {/* Blood group select */}
          <div>
            <select
              id="filter-blood"
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="w-full px-3 py-2 border-2 border-[#1A1A1A] text-xs font-black uppercase bg-white focus:outline-none"
            >
              <option value="ALL">All Blood Groups</option>
              <option value="O-">O- (Universal Cell)</option>
              <option value="O+">O+</option>
              <option value="A-">A-</option>
              <option value="A+">A+</option>
              <option value="B-">B-</option>
              <option value="B+">B+</option>
              <option value="AB-">AB-</option>
              <option value="AB+">AB+</option>
            </select>
          </div>

          {/* Status select */}
          <div>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border-2 border-[#1A1A1A] text-xs font-black uppercase bg-white focus:outline-none"
            >
              <option value="ALL">All Availability States</option>
              <option value="Available">Available State</option>
              <option value="Unavailable">Recovery State</option>
              <option value="Deferred">Deferred State</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Donor Cards */}
      {filteredDonors.length === 0 ? (
        <div className="brutalist-card p-12 text-center flex flex-col items-center justify-center">
          <HelpCircle className="h-12 w-12 text-[#1A1A1A]/40 mb-3" />
          <h3 className="text-sm font-black uppercase text-[#1A1A1A]">No matches returned</h3>
          <p className="text-xs font-mono font-bold text-[#1A1A1A]/60 mt-1.5 max-w-sm">
            Modify search query parameters or navigate to "VIEW DELETED FILE LOGS" to review archived files.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => {
            // Check eligibility status
            const eligibility = checkDonorEligibility(donor);
            return (
              <div 
                key={donor.id}
                id={`card-donor-${donor.id}`}
                className="brutalist-card flex flex-col"
              >
                {/* Card Header with Blood type pill */}
                <div className="p-5 pb-3 border-b-2 border-[#1A1A1A] flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-black text-[#D32F2F] uppercase block">
                      ID: {donor.id}
                    </span>
                    <h4 className="text-base font-black uppercase tracking-tight text-[#1A1A1A] truncate max-w-[150px] mt-0.5">
                      {donor.name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-[#1A1A1A]/60">
                      Age: {donor.age} • {donor.gender} • {donor.weight} kg
                    </span>
                  </div>

                  <div className="h-10 w-10 border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] flex items-center justify-center text-sm font-black font-mono shadow-[2px_2px_0px_0px_#1A1A1A]">
                    {donor.bloodGroup}
                  </div>
                </div>

                {/* Card Body with Stats */}
                <div className="p-5 py-4 flex-1 space-y-4">
                  {/* Status Badges */}
                  <div>
                    {eligibility.status === 'Available' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-green-700 border-2 border-green-700 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#15803d]">
                        <Check className="h-3 w-3 stroke-[3px]" />
                        AVAILABLE FOR BLEED
                      </span>
                    )}

                    {eligibility.status === 'Unavailable' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#D32F2F] border-2 border-[#D32F2F] text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#D32F2F]">
                        <Clock className="h-3 w-3 stroke-[3px]" />
                        RECOVERY LOCK ({eligibility.daysRemaining}d left)
                      </span>
                    )}

                    {eligibility.status === 'Deferred' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-amber-700 border-2 border-amber-700 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#b45309]">
                        <ShieldAlert className="h-3 w-3 stroke-[3px]" />
                        CLINICALLY DEFERRED
                      </span>
                    )}
                  </div>

                  {/* Personal Contact Details */}
                  <div className="space-y-1.5 text-xs font-mono font-bold text-[#1A1A1A]/75">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-[#1A1A1A]/50 flex-shrink-0" />
                      <span className="truncate">{donor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-[#1A1A1A]/50 flex-shrink-0" />
                      <span>{donor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#1A1A1A]/50 flex-shrink-0" />
                      <span>
                        LAST BLEED:{' '}
                        <strong className="text-[#1A1A1A] font-black underline">
                          {donor.lastDonationDate || 'NONE REGISTERED'}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Vitals reading */}
                  <div className="bg-[#F4F1EE] p-2.5 border-2 border-[#1A1A1A] grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div>
                      <span className="block text-[#1A1A1A]/60 uppercase font-black text-[9px]">BP VALUE</span>
                      <strong className="text-[#1A1A1A] font-black">{donor.systolicBp}/{donor.diastolicBp}</strong>
                    </div>
                    <div>
                      <span className="block text-[#1A1A1A]/60 uppercase font-black text-[9px]">HEMOGLOBIN</span>
                      <strong className="text-[#1A1A1A] font-black">{donor.hemoglobin} g/dL</strong>
                    </div>
                    <div>
                      <span className="block text-[#1A1A1A]/60 uppercase font-black text-[9px]">VITAL GATE</span>
                      <strong className={eligibility.status === 'Deferred' ? 'text-[#D32F2F] font-black' : 'text-green-700 font-black'}>
                        {eligibility.status === 'Deferred' ? 'FAIL' : 'PASS'}
                      </strong>
                    </div>
                  </div>

                  {/* Notes / Explanation of Deferral */}
                  {(eligibility.status !== 'Available' || donor.isArchived) && (
                    <div className="bg-white p-3 border-2 border-[#1A1A1A] text-[11px] text-[#1A1A1A]/80 leading-normal font-medium shadow-[2px_2px_0px_0px_#1A1A1A]">
                      <strong className="text-[#D32F2F] font-black uppercase block mb-0.5">Safety Pre-screen Log:</strong>
                      {eligibility.reason}
                    </div>
                  )}
                </div>

                {/* Card Action footer */}
                <div className="px-5 py-3 bg-[#F4F1EE] border-t-2 border-[#1A1A1A] flex items-center justify-between gap-4">
                  {!donor.isArchived ? (
                    <>
                      <button
                        id={`btn-edit-${donor.id}`}
                        onClick={() => handleStartEdit(donor)}
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#1A1A1A] hover:text-[#D32F2F] transition"
                      >
                        <Edit2 className="h-3 w-3 stroke-[3px]" />
                        Edit Details
                      </button>

                      <button
                        id={`btn-delete-${donor.id}`}
                        onClick={() => setDonorToDelete(donor)}
                        className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#1A1A1A]/60 hover:text-[#D32F2F] transition"
                      >
                        <Trash2 className="h-3 w-3 stroke-[2.5px]" />
                        Delete File
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-[10px] font-mono text-[#D32F2F] font-black flex items-center gap-1">
                        <ShieldAlert className="h-4 w-4" />
                        LOGIC ARCHIVE ({donor.deletedAt})
                      </div>
                      <button
                        id={`btn-restore-${donor.id}`}
                        onClick={() => handleRestoreDonor(donor)}
                        className="text-xs font-black uppercase text-indigo-700 hover:underline transition"
                      >
                        Restore File
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Donation History Log Simulation Panel */}
      <div className="brutalist-card p-5">
        <h3 className="text-sm font-black uppercase tracking-tight text-[#1A1A1A] mb-3 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#D32F2F]" />
          RECENT CLINIC TRANSACTION LOGS
        </h3>
        <p className="text-xs font-mono font-bold text-[#1A1A1A]/60 mb-4">
          [REGULATORY COMPLIANCE: HISTORICAL DATA PRESERVED DURING SOFT DELETION]
        </p>

        <div className="overflow-x-auto border-2 border-[#1A1A1A]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#1A1A1A] text-white uppercase font-mono tracking-wider">
                <th className="p-3 border-r border-[#ffffff]/15">Event ID</th>
                <th className="p-3 border-r border-[#ffffff]/15">Donor Name</th>
                <th className="p-3 border-r border-[#ffffff]/15">Bleed Date</th>
                <th className="p-3 border-r border-[#ffffff]/15">Blood Group</th>
                <th className="p-3 border-r border-[#ffffff]/15">Volume (ml)</th>
                <th className="p-3 border-r border-[#ffffff]/15">Facility Location</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A] text-[#1A1A1A]/85 font-medium bg-white">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-[#F4F1EE]/50 font-mono text-[11px]">
                  <td className="p-3 font-black text-[#1A1A1A] border-r border-[#1A1A1A]">{ev.id}</td>
                  <td className="p-3 font-sans font-bold text-[#1A1A1A] border-r border-[#1A1A1A]">{ev.donorName}</td>
                  <td className="p-3 border-r border-[#1A1A1A]">{ev.donationDate}</td>
                  <td className="p-3 font-black border-r border-[#1A1A1A]">
                    <span className="px-1.5 py-0.5 border border-[#1A1A1A] bg-[#F4F1EE] text-[#1A1A1A]">
                      {ev.bloodGroup}
                    </span>
                  </td>
                  <td className="p-3 border-r border-[#1A1A1A]">{ev.volumeMl} ml</td>
                  <td className="p-3 border-r border-[#1A1A1A]">{ev.location}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-black uppercase">
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overlay modal for Create/Edit */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b-2 border-[#1A1A1A] flex items-center justify-between bg-[#F4F1EE]">
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-[#1A1A1A]">
                  {editingDonor ? 'EDIT DONOR FILE ARCHETYPE' : 'ENROLL NEW VOLUNTEER DONOR'}
                </h3>
                <p className="text-xs font-mono font-bold text-[#1A1A1A]/60 mt-0.5">
                  [RE-ASSESS SAFETY LIMITS ON SUBMIT]
                </p>
              </div>
              <button 
                id="btn-close-form"
                onClick={() => setIsFormOpen(false)}
                className="p-1 border-2 border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#D32F2F] hover:text-white transition shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                <X className="h-5 w-5 stroke-[2.5px]" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 bg-white">
              {formErrors.length > 0 && (
                <div className="p-4 bg-[#F4F1EE] border-2 border-[#D32F2F] text-xs text-[#D32F2F] space-y-1 font-bold shadow-[2px_2px_0px_0px_#D32F2F]">
                  <div className="font-black uppercase flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 stroke-[2.5px]" />
                    VALIDATION FAILURE FLAGS:
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {formErrors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {successMessage && (
                <div className="p-4 bg-green-50 border-2 border-green-700 text-xs text-green-700 font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_#15803d]">
                  <Check className="h-4 w-4 stroke-[3px]" />
                  {successMessage}
                </div>
              )}

              {/* Grid of basic parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Robert Vance"
                    className="w-full brutalist-input text-xs font-mono"
                  />
                </div>

                {/* Blood Group Select */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full brutalist-input text-xs font-mono font-bold"
                  >
                    <option value="O-">O-</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="B+">B+</option>
                    <option value="AB-">AB-</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. rvance@vancefrig.com"
                    className="w-full brutalist-input text-xs font-mono"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 012-7492"
                    className="w-full brutalist-input text-xs font-mono"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Age (Years: 18-70)
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="1"
                    max="100"
                    className="w-full brutalist-input text-xs font-mono"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Weight (kg: Min 50)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    min="10"
                    max="200"
                    className="w-full brutalist-input text-xs font-mono"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full brutalist-input text-xs font-mono font-bold"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Last Donation Date */}
                <div>
                  <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    name="lastDonationDate"
                    value={formData.lastDonationDate}
                    onChange={handleInputChange}
                    max="2026-06-24"
                    className="w-full brutalist-input text-xs font-mono font-bold"
                  />
                </div>
              </div>

              {/* Vitals sub-section */}
              <div className="p-4 bg-[#F4F1EE] border-2 border-[#1A1A1A] space-y-3">
                <span className="text-[10px] font-mono font-black text-[#1A1A1A]/70 uppercase tracking-widest block">
                  CLINICAL PRE-SCREEN DIAGNOSTIC METRICS
                </span>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#1A1A1A]/70 font-black mb-1 uppercase">
                      Systolic BP
                    </label>
                    <input
                      type="number"
                      name="systolicBp"
                      value={formData.systolicBp}
                      onChange={handleInputChange}
                      placeholder="120"
                      className="w-full border-2 border-[#1A1A1A] bg-white text-xs font-mono p-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#1A1A1A]/70 font-black mb-1 uppercase">
                      Diastolic BP
                    </label>
                    <input
                      type="number"
                      name="diastolicBp"
                      value={formData.diastolicBp}
                      onChange={handleInputChange}
                      placeholder="80"
                      className="w-full border-2 border-[#1A1A1A] bg-white text-xs font-mono p-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#1A1A1A]/70 font-black mb-1 uppercase">
                      Hemoglobin
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="hemoglobin"
                      value={formData.hemoglobin}
                      onChange={handleInputChange}
                      placeholder="14.0"
                      className="w-full border-2 border-[#1A1A1A] bg-white text-xs font-mono p-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Clinical notes */}
              <div>
                <label className="block text-[11px] font-black uppercase text-[#1A1A1A] tracking-wider mb-1">
                  General Diagnostic Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Record waivers, medications, or blood drive location coordinates..."
                  className="w-full brutalist-input text-xs font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t-2 border-[#1A1A1A]/10 flex justify-end gap-3 bg-white">
                <button
                  type="button"
                  id="btn-cancel-form"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] text-xs font-black uppercase tracking-wider hover:bg-[#F4F1EE]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-submit-form"
                  className="brutalist-btn px-5 py-2 text-xs"
                >
                  Save & Assess Safety
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Logical Delete Explanation Modal */}
      {donorToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] w-full max-w-md p-6 space-y-4">
            <div className="flex items-start gap-3 text-[#D32F2F]">
              <ShieldAlert className="h-6 w-6 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-[#1A1A1A]">
                  Logical Deletion Audit Triggered
                </h3>
                <p className="text-xs font-mono font-bold text-[#1A1A1A]/60 mt-1">
                  You are soft archiving record: <strong>{donorToDelete.name}</strong> ({donorToDelete.id}).
                </p>
              </div>
            </div>

            <div className="bg-[#F4F1EE] p-3.5 border-2 border-[#1A1A1A] text-xs font-medium space-y-2">
              <strong className="font-black uppercase block text-[#D32F2F]">LOGICAL ARCHIVING POLICY:</strong>
              <p className="text-[#1A1A1A]/85">
                To guarantee regulatory compliance, BDMS tags this profile with <code>isArchived = true</code>:
              </p>
              <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-[#1A1A1A]/75">
                <li>Excludes profile from active emergency searches.</li>
                <li>Restricts view from basic staff records.</li>
                <li>Preserves historical biological donation records for inventory tracking.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                id="btn-cancel-delete"
                onClick={() => setDonorToDelete(null)}
                className="px-4 py-2 bg-white text-[#1A1A1A] border-2 border-[#1A1A1A] text-xs font-black uppercase tracking-wider hover:bg-[#F4F1EE]"
              >
                Cancel
              </button>
              <button
                id="btn-confirm-delete"
                onClick={handleDeleteConfirm}
                className="brutalist-btn px-4 py-2 text-xs"
              >
                Confirm Archive
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
