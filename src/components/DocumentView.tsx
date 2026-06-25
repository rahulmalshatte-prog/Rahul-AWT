/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, Database, Shield, Users, ArrowRight, HeartHandshake, CheckCircle } from 'lucide-react';
import { USER_ROLES } from '../data';

interface DocumentViewProps {
  onGoToPrototype: () => void;
}

export default function DocumentView({ onGoToPrototype }: DocumentViewProps) {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [selectedRole, setSelectedRole] = useState<'donor' | 'staff' | 'admin'>('donor');

  const sections = [
    { id: 'intro', label: '1. Introduction', icon: BookOpen },
    { id: 'features', label: '2. Core Features', icon: HeartHandshake },
    { id: 'datamodel', label: '3. Data Model', icon: Database },
    { id: 'roles', label: '4. User Roles', icon: Users },
    { id: 'considerations', label: '5. System Considerations', icon: Shield },
  ];

  const currentRoleObj = USER_ROLES.find(r => r.id === selectedRole);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Document Outline sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <div className="brutalist-card p-5">
          <h3 className="text-xs font-mono font-black tracking-wider text-[#1A1A1A]/60 uppercase mb-4">
            Document Outline
          </h3>
          <nav className="space-y-1.5">
            {sections.map((sec) => {
              const IconComp = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`btn-nav-${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 text-xs font-black uppercase tracking-wider transition-all border-2 ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-[2px_2px_0px_0px_#D32F2F]'
                      : 'bg-white text-[#1A1A1A] border-transparent hover:border-[#1A1A1A] hover:bg-[#F4F1EE]'
                  }`}
                >
                  <IconComp className={`h-4 w-4 ${isActive ? 'text-[#D32F2F]' : 'text-[#1A1A1A]/60'}`} />
                  {sec.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t-2 border-[#1A1A1A]/10">
            <div className="bg-[#D32F2F] text-white p-4 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A]">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest block mb-1 text-white/90">
                Live Companion
              </span>
              <h4 className="text-xs font-black uppercase tracking-tight mb-2">
                TEST PARAMETERS LIVE
              </h4>
              <p className="text-[11px] leading-relaxed mb-4 text-white/85">
                We've compiled an in-memory prototype simulation to instantly test the 56-day safety gate and user authorization roles.
              </p>
              <button
                id="btn-sidebar-proto"
                onClick={onGoToPrototype}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#1A1A1A] text-white text-xs font-black uppercase tracking-wider hover:bg-white hover:text-[#1A1A1A] border-2 border-[#1A1A1A] transition"
              >
                Launch Prototype
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="lg:col-span-3 space-y-6">
        <div className="brutalist-card p-6 sm:p-8 text-sm leading-relaxed text-[#1A1A1A]/90">
          
          {/* Section 1: Introduction */}
          {activeSection === 'intro' && (
            <div className="space-y-6" id="doc-section-intro">
              <div className="border-b-2 border-[#1A1A1A] pb-4 mb-4">
                <span className="text-xs font-mono font-black text-[#D32F2F] uppercase tracking-wider">
                  SECTION 01
                </span>
                <h2 className="title-sub-massive text-[#1A1A1A] mt-1">
                  1. INTRODUCTION
                </h2>
              </div>

              <div className="space-y-4 font-medium text-[#1A1A1A]/85">
                <p>
                  The <strong className="text-[#D32F2F]">Blood Donor Management System (BDMS)</strong> is a critical healthcare software solution designed to coordinate, optimize, and secure the vital process of blood donation. By seamlessly organizing details of generous donors, monitoring blood inventory levels, tracking medical eligibility intervals, and offering comprehensive search utilities, the BDMS acts as a digital bridge between volunteer donors and healthcare institutions during clinical procedures or emergency operations.
                </p>
                <p>
                  At its core, this document outlines an asynchronous, secure, and user-centric web architecture designed to automate regulatory safety compliance (such as red blood cell regeneration tracking) while maintaining strict adherence to data security standards.
                </p>
              </div>

              <div className="bg-white p-5 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] mt-8 flex items-start gap-4">
                <div className="p-2 bg-[#D32F2F] text-white border border-[#1A1A1A] mt-1">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-black text-xs uppercase text-[#1A1A1A] tracking-wider">Key Educational Architecture Goals</h4>
                  <p className="text-xs text-[#1A1A1A]/75 mt-1.5 leading-relaxed font-medium">
                    This design reflects an asynchronous model that stores initial information locally, handles CRUD transactions in a non-blocking format without page reloads, enforces rigorous clinical validations, and implements secure session-based role authorization.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Core Features */}
          {activeSection === 'features' && (
            <div className="space-y-6" id="doc-section-features">
              <div className="border-b-2 border-[#1A1A1A] pb-4 mb-4">
                <span className="text-xs font-mono font-black text-[#D32F2F] uppercase tracking-wider">
                  SECTION 02
                </span>
                <h2 className="title-sub-massive text-[#1A1A1A] mt-1">
                  2. CORE FEATURES DETAIL
                </h2>
              </div>

              <p className="text-sm font-medium text-[#1A1A1A]/80">
                The BDMS incorporates five core functional features that enable a complete digital lifecycle of blood donor records.
              </p>

              <div className="space-y-6">
                {/* 2.1 Donor Registration */}
                <div className="p-6 bg-[#F4F1EE] border-2 border-[#1A1A1A]">
                  <span className="text-xs font-mono font-bold text-[#D32F2F] uppercase tracking-widest block mb-1">
                    Feature 2.1
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#1A1A1A] mb-3">Donor Registration</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mb-4 font-medium">
                    Allows new donors to self-register or staff members to enroll a donor into the master system register.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">Collected Data Inputs (Fields)</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75 font-mono text-[11px]">
                        <li><strong>Full Name</strong> (Required, String, alphabetic spaces only)</li>
                        <li><strong>Blood Group</strong> (Required, dropdown list O+, O-, A+, A-, B+, B-, AB+, AB-)</li>
                        <li><strong>Email Address</strong> (Required, valid email format)</li>
                        <li><strong>Phone Number</strong> (Required, matching contact format)</li>
                        <li><strong>Age</strong> (Required, Integer, must be 18 to 70 for medical safety)</li>
                        <li><strong>Weight (kg)</strong> (Required, Decimal, must be &ge; 50kg)</li>
                        <li><strong>Blood Pressure</strong> (Systolic & Diastolic mmHg, used for pre-screening)</li>
                        <li><strong>Hemoglobin (g/dL)</strong> (Required, minimum threshold checking)</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">UI and Validation Rules</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75">
                        <li><strong>Validation Rules:</strong> Form fails submission if age is &lt; 18 or weight &lt; 50kg, displaying warnings regarding deferral.</li>
                        <li><strong>Asynchronous Process:</strong> Registration executes via a non-blocking post request. If successful, the UI appends the record without a refresh.</li>
                        <li><strong>Feedback:</strong> Immediate toast messages indicating either clinical deferral or successful enrollment.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2.2 Search by Blood Group */}
                <div className="p-6 bg-[#F4F1EE] border-2 border-[#1A1A1A]">
                  <span className="text-xs font-mono font-bold text-[#D32F2F] uppercase tracking-widest block mb-1">
                    Feature 2.2
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#1A1A1A] mb-3">Search by Blood Group</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mb-4 font-medium">
                    Critical emergency utility allowing hospital staff to search, identify, and filter available donors of compatible blood groups in real time.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">Search Parameters & Logic</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75">
                        <li><strong>Primary Search Filter:</strong> Blood Group dropdown.</li>
                        <li><strong>Status Filter:</strong> Option to display "Available Only" to filter out individuals in recovery phases.</li>
                        <li><strong>Compatibility Mapping:</strong> Smart routing shows both exact matching types and clinical alternatives (e.g., O- can be listed for emergency situations).</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">Results Rendering</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75">
                        <li><strong>Displayed Fields:</strong> ID, Name, Contact, Compatibility match type, and Recovery countdown indicator.</li>
                        <li><strong>UI Visual Cues:</strong> High-contrast colored status pill labels (Green for Available, Amber for Inactive, Red for Clinical Deferral).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2.3 Update Details */}
                <div className="p-6 bg-[#F4F1EE] border-2 border-[#1A1A1A]">
                  <span className="text-xs font-mono font-bold text-[#D32F2F] uppercase tracking-widest block mb-1">
                    Feature 2.3
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#1A1A1A] mb-3">Update Details</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mb-4 font-medium">
                    Ensures donor files remain accurate, allowing modification of contact, clinical metrics, or registration history.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">Permissions & Fields</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75">
                        <li><strong>Donor role access:</strong> Restricted to editing personal contact info (Phone, Email).</li>
                        <li><strong>Staff/Admin role access:</strong> Authorized to override clinical metrics (Hemoglobin, BP, weight) and last donation date.</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">Validation & Calculations</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75">
                        <li><strong>Re-evaluation Trigger:</strong> If a medical parameter is updated (e.g. weight reduced or last donation date added), the system instantly re-calculates availability.</li>
                        <li><strong>Confirmation:</strong> Dialog confirmation ensures changes to core clinical variables are deliberate.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2.4 Delete Donor */}
                <div className="p-6 bg-[#F4F1EE] border-2 border-[#1A1A1A]">
                  <span className="text-xs font-mono font-bold text-[#D32F2F] uppercase tracking-widest block mb-1">
                    Feature 2.4
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#1A1A1A] mb-3">Delete Donor</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mb-4 font-medium">
                    Maintains donor data compliance with medical regulations and privacy frameworks (e.g., right to be forgotten).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">Deletion Logic (Logical vs. Hard)</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75">
                        <li><strong>Logical Deletion (Soft Delete):</strong> Default behavior. The donor is flagged as <code>isArchived = true</code>, excluding them from active donor lists and emergency searches.</li>
                        <li><strong>Medical Record Preservation:</strong> Historical donation events are legally preserved but anonymized to maintain clean blood inventory charts.</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-1.5 mb-2">Safety Measures</h4>
                      <ul className="list-disc pl-4 space-y-1 text-[#1A1A1A]/75">
                        <li><strong>Role Lock:</strong> Restricted exclusively to high-level Admin roles.</li>
                        <li><strong>Step Confirmation:</strong> Verification overlay where the administrator must confirm the reason (e.g. medical exit, user request).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 2.5 Availability Status */}
                <div className="p-6 bg-[#F4F1EE] border-2 border-[#1A1A1A]">
                  <span className="text-xs font-mono font-bold text-[#D32F2F] uppercase tracking-widest block mb-1">
                    Feature 2.5
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#1A1A1A] mb-3">Availability Status</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mb-4 font-medium">
                    The core intelligence engine of BDMS. This feature calculates whether a donor is clinically ready to donate.
                  </p>
                  
                  <div className="bg-white p-4 border-2 border-[#1A1A1A] text-xs space-y-3 font-medium">
                    <h4 className="font-black uppercase tracking-wider text-[#1A1A1A]">How Availability is Determined</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-white border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#D32F2F]">
                        <span className="font-black text-[#1A1A1A] uppercase text-[11px] block mb-1">1. Active Recovery Lock</span>
                        <p className="text-[#1A1A1A]/80 text-[11px] leading-relaxed">
                          A strict medical delay of <strong>56 days (8 weeks)</strong> is enforced from the donor's <code>lastDonationDate</code>. If elapsed, they clear the interval gate.
                        </p>
                      </div>
                      <div className="p-3 bg-white border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                        <span className="font-black text-[#1A1A1A] uppercase text-[11px] block mb-1">2. Clinical Pre-Screen</span>
                        <p className="text-[#1A1A1A]/80 text-[11px] leading-relaxed">
                          Health vitals are checked: weight must be &ge; 50kg, Systolic BP 90-180, Diastolic BP 50-100, and hemoglobin &ge; 12.5 g/dL.
                        </p>
                      </div>
                      <div className="p-3 bg-white border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_#1A1A1A]">
                        <span className="font-black text-[#D32F2F] uppercase text-[11px] block mb-1">3. Status States</span>
                        <p className="text-[#1A1A1A]/80 text-[11px] leading-relaxed">
                          <strong>Available:</strong> Clear of locks & passes pre-screen. <br/>
                          <strong>Unavailable:</strong> In 56-day recovery.<br/>
                          <strong>Deferred:</strong> Blocked due to clinical pre-screening failure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Section 3: Data Model */}
          {activeSection === 'datamodel' && (
            <div className="space-y-6" id="doc-section-datamodel">
              <div className="border-b-2 border-[#1A1A1A] pb-4 mb-4">
                <span className="text-xs font-mono font-black text-[#D32F2F] uppercase tracking-wider">
                  SECTION 03
                </span>
                <h2 className="title-sub-massive text-[#1A1A1A] mt-1">
                  3. DATA MODEL (ENTITY STRUCTURE)
                </h2>
              </div>

              <p className="text-sm font-medium text-[#1A1A1A]/80">
                To represent clinical and donor operations, the system relies on structured key entities. The diagram below represents a clean, relational structure.
              </p>

              {/* Graphical Schema Relation View */}
              <div className="bg-[#F4F1EE] p-6 border-2 border-[#1A1A1A]">
                <h4 className="text-xs font-mono font-black text-[#1A1A1A] uppercase tracking-wider mb-4">
                  Database Relational Mapping (1 : Many)
                </h4>
                <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                  {/* Donor Entity Box */}
                  <div className="bg-white p-4 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] w-full md:w-64">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1A1A1A]/10">
                      <div className="h-3 w-3 bg-[#D32F2F] border border-[#1A1A1A]" />
                      <span className="font-mono text-xs font-bold text-gray-900">Entity: Donor</span>
                    </div>
                    <ul className="font-mono text-[10px] space-y-1 text-gray-500">
                      <li>🔑 <span className="text-[#D32F2F] font-bold">id</span> (PK) : String</li>
                      <li>👤 name : String</li>
                      <li>🩸 bloodGroup : Enum</li>
                      <li>📧 email : String</li>
                      <li>📞 phone : String</li>
                      <li>⚖️ weight : Decimal</li>
                      <li>📅 lastDonationDate : Date</li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-white font-bold bg-[#1A1A1A] px-2.5 py-1 border border-[#1A1A1A]">
                      1 TO MANY
                    </span>
                    <div className="h-8 w-0.5 bg-[#1A1A1A]" />
                  </div>

                  {/* Donation Event Box */}
                  <div className="bg-white p-4 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] w-full md:w-64">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#1A1A1A]/10">
                      <div className="h-3 w-3 bg-[#1A1A1A]" />
                      <span className="font-mono text-xs font-bold text-gray-900">Entity: DonationEvent</span>
                    </div>
                    <ul className="font-mono text-[10px] space-y-1 text-gray-500">
                      <li>🔑 <span className="text-[#1A1A1A] font-bold">id</span> (PK) : String</li>
                      <li>⛓️ <span className="text-[#D32F2F] font-bold">donorId</span> (FK) : String</li>
                      <li>📅 donationDate : Date</li>
                      <li>💧 volumeMl : Integer</li>
                      <li>🏥 location : String</li>
                      <li>📊 status : Enum</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Expanded Field Details */}
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-md font-black uppercase text-[#1A1A1A] mb-3">3.1. Donor Entity Attributes</h3>
                  <div className="overflow-x-auto border-2 border-[#1A1A1A]">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#1A1A1A] text-white uppercase font-mono tracking-wider">
                          <th className="p-3 border-r border-[#ffffff]/20">Attribute</th>
                          <th className="p-3 border-r border-[#ffffff]/20">Type</th>
                          <th className="p-3 border-r border-[#ffffff]/20">Key</th>
                          <th className="p-3">Constraints & Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-[#1A1A1A] text-gray-800 font-medium bg-white">
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">id</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">VARCHAR(50)</td>
                          <td className="p-3 font-mono text-[#D32F2F] font-bold border-r border-[#1A1A1A]">PK</td>
                          <td className="p-3 text-[#1A1A1A]">Unique identifying string (e.g. "DON-001")</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">name</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">VARCHAR(100)</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">First & Last name. Required. Alphabetic characters only.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">bloodGroup</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">ENUM</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">One of: O+, O-, A+, A-, B+, B-, AB+, AB-.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">email</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">VARCHAR(100)</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Unique electronic mail address. Checked with regex format.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">phone</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">VARCHAR(20)</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Mobile contact number used for emergency donation drives.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">weight</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">DECIMAL(5,2)</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Must be &ge; 50.00 kg. Check clinical parameter.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">lastDonationDate</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">DATE</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Nullable. Date of previous bleeding. Triggers 56-day gap validation.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">systolicBp</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">INT</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Systolic Blood Pressure (mmHg). Safe range [90-180].</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">diastolicBp</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">INT</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Diastolic Blood Pressure (mmHg). Safe range [50-100].</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">hemoglobin</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">DECIMAL(4,2)</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Hemoglobin count (g/dL). Safety threshold &ge; 12.5.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">isArchived</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">BOOLEAN</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Logical soft delete toggle. Default: false.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-black uppercase text-[#1A1A1A] mb-3">3.2. DonationEvent Entity Attributes</h3>
                  <div className="overflow-x-auto border-2 border-[#1A1A1A]">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#1A1A1A] text-white uppercase font-mono tracking-wider">
                          <th className="p-3 border-r border-[#ffffff]/20">Attribute</th>
                          <th className="p-3 border-r border-[#ffffff]/20">Type</th>
                          <th className="p-3 border-r border-[#ffffff]/20">Key</th>
                          <th className="p-3">Constraints & Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-[#1A1A1A] text-gray-800 font-medium bg-white">
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">id</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">VARCHAR(50)</td>
                          <td className="p-3 font-mono text-[#D32F2F] font-bold border-r border-[#1A1A1A]">PK</td>
                          <td className="p-3 text-[#1A1A1A]">Unique code identifying the single donation episode.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">donorId</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">VARCHAR(50)</td>
                          <td className="p-3 font-mono text-[#D32F2F] font-bold border-r border-[#1A1A1A]">FK</td>
                          <td className="p-3 text-[#1A1A1A]">References <code>Donor.id</code>. Enforces referential integrity.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">donationDate</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">DATE</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Date when donation occurred. Cannot be in the future.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">volumeMl</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">INT</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Volume collected in milliliters. Default is standard unit (450ml).</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">location</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">VARCHAR(150)</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Physical clinic location or mobile camp center identifier.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-black text-gray-950 border-r border-[#1A1A1A]">status</td>
                          <td className="p-3 font-mono text-gray-600 border-r border-[#1A1A1A]">ENUM</td>
                          <td className="p-3 font-mono text-gray-400 border-r border-[#1A1A1A]">-</td>
                          <td className="p-3 text-[#1A1A1A]">Either "Completed", "Pending", or "Deferred".</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: User Roles */}
          {activeSection === 'roles' && (
            <div className="space-y-6" id="doc-section-roles">
              <div className="border-b-2 border-[#1A1A1A] pb-4 mb-4">
                <span className="text-xs font-mono font-black text-[#D32F2F] uppercase tracking-wider">
                  SECTION 04
                </span>
                <h2 className="title-sub-massive text-[#1A1A1A] mt-1">
                  4. USER ROLES & SYSTEM PERMISSIONS
                </h2>
              </div>

              <p className="text-sm font-medium text-[#1A1A1A]/80">
                To guarantee medical integrity, confidentiality, and segregation of duties, the system enforces Role-Based Access Control (RBAC). Select a role below to explore its specific capabilities.
              </p>

              {/* Interactive Role Tabs */}
              <div className="flex gap-2 border-b-2 border-[#1A1A1A] pb-px">
                {(['donor', 'staff', 'admin'] as const).map((rId) => (
                  <button
                    key={rId}
                    id={`btn-role-${rId}`}
                    onClick={() => setSelectedRole(rId)}
                    className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all border-t-2 border-x-2 ${
                      selectedRole === rId
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] translate-y-[2px]'
                        : 'bg-white text-[#1A1A1A] border-transparent hover:bg-[#F4F1EE]'
                    }`}
                  >
                    {rId.toUpperCase()} Role
                  </button>
                ))}
              </div>

              {currentRoleObj && (
                <div className="p-6 bg-[#F4F1EE] border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_#1A1A1A] space-y-4">
                  <div>
                    <h3 className="text-md font-black uppercase text-[#1A1A1A] flex items-center gap-2">
                      <Users className="h-5 w-5 text-[#D32F2F]" />
                      {currentRoleObj.name} Role Profile
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/75 mt-1 font-medium">{currentRoleObj.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#D32F2F] mb-2">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2 font-medium">
                        {currentRoleObj.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-[#1A1A1A]/80">
                            <span className="text-[#D32F2F] font-bold">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-4 border-2 border-[#1A1A1A]">
                      <h4 className="font-black uppercase tracking-wider text-[#1A1A1A] mb-2">
                        Authorized System Actions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentRoleObj.allowedActions.map((action, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1A1A] text-white text-[10px] font-mono font-bold uppercase"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#D32F2F]" />
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 5: High-Level System Considerations */}
          {activeSection === 'considerations' && (
            <div className="space-y-6" id="doc-section-considerations">
              <div className="border-b-2 border-[#1A1A1A] pb-4 mb-4">
                <span className="text-xs font-mono font-black text-[#D32F2F] uppercase tracking-wider">
                  SECTION 05
                </span>
                <h2 className="title-sub-massive text-[#1A1A1A] mt-1">
                  5. HIGH-LEVEL SYSTEM CONSIDERATIONS
                </h2>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-[#D32F2F] pl-4">
                  <h3 className="font-black uppercase tracking-tight text-[#1A1A1A]">Security & Access Control</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mt-1 leading-relaxed font-medium">
                    Authentication should rely on industry-standard mechanisms (e.g. JWT or secure cookies) linked to encrypted database passwords (using bcrypt hashing). Active user sessions must expire after 15 minutes of inactivity to prevent physical terminal hijacking in active hospital donor units. 
                  </p>
                </div>

                <div className="border-l-4 border-[#D32F2F] pl-4">
                  <h3 className="font-black uppercase tracking-tight text-[#1A1A1A]">Data Privacy & Compliance (HIPAA / GDPR)</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mt-1 leading-relaxed font-medium">
                    Under standard clinical guidelines, personal health information (PHI) such as blood pressure and hemoglobin counts is covered by health privacy acts (HIPAA / GDPR). All storage of PHI must be encrypted at rest (AES-256) and in transit (TLS 1.3). For compliance with GDPR's "Right to be Forgotten", physical donor identification details are scrubbed during deletion, while aggregate biological metrics (blood group volume statistics) are locked in historical tables to prevent inventory disruption.
                  </p>
                </div>

                <div className="border-l-4 border-[#D32F2F] pl-4">
                  <h3 className="font-black uppercase tracking-tight text-[#1A1A1A]">Reporting Needs</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mt-1 leading-relaxed font-medium">
                    Blood supply monitoring relies on real-time aggregate charts mapping current inventory reserves (measured in 450ml blood bags) against historical usage rates. Weekly alert reporting flags immediate shortages in critical negative blood types (e.g. O-, AB-), triggering automated notification webhooks to matching "Available" donors in close geographic proximity.
                  </p>
                </div>

                {/* Simulated Blood Inventory Mini Chart */}
                <div className="bg-white p-4 border-2 border-[#1A1A1A] mt-4 shadow-[3px_3px_0px_0px_#1A1A1A]">
                  <h4 className="text-xs font-mono font-black text-[#1A1A1A] uppercase tracking-wider mb-3">
                    Simulated Reporting: Active Blood Bank Supply Levels (Bags)
                  </h4>
                  <div className="space-y-3.5 text-xs font-mono font-medium">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1 font-bold">
                        <span>O- (Critical Alert Threshold &lt; 5 bags)</span>
                        <span className="font-black text-[#D32F2F]">3 bags (60% capacity)</span>
                      </div>
                      <div className="h-4 w-full bg-[#F4F1EE] border-2 border-[#1A1A1A] overflow-hidden">
                        <div className="h-full bg-[#D32F2F]" style={{ width: '30%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1 font-bold">
                        <span>A+ (Optimal Storage Level)</span>
                        <span className="font-black text-[#1A1A1A]">18 bags (90% capacity)</span>
                      </div>
                      <div className="h-4 w-full bg-[#F4F1EE] border-2 border-[#1A1A1A] overflow-hidden">
                        <div className="h-full bg-[#1A1A1A]" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1 font-bold">
                        <span>AB- (Low Supply)</span>
                        <span className="font-black text-amber-600">6 bags (40% capacity)</span>
                      </div>
                      <div className="h-4 w-full bg-[#F4F1EE] border-2 border-[#1A1A1A] overflow-hidden">
                        <div className="h-full bg-[#1A1A1A]/40" style={{ width: '40%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-[#D32F2F] pl-4 pt-2">
                  <h3 className="font-black uppercase tracking-tight text-[#1A1A1A]">Suggested Technology Stack</h3>
                  <p className="text-xs text-[#1A1A1A]/85 mt-1 leading-relaxed font-medium">
                    To satisfy the asynchronous, stateful, and secure requirements, we recommend a modern full-stack implementation using:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-xs text-[#1A1A1A]/80 space-y-1 font-medium">
                    <li><strong>Frontend Framework:</strong> React with Tailwind CSS (for custom, fast layout generation) or Bootstrap for classic web layouts.</li>
                    <li><strong>State Management:</strong> Context API combined with React Hooks to drive asynchronous updates dynamically.</li>
                    <li><strong>Backend Runtime:</strong> Express (Node.js) or PHP 8+ offering RESTful endpoints.</li>
                    <li><strong>Database Engine:</strong> PostgreSQL or MySQL, featuring ACID-compliant transactions to guarantee that blood inventory records do not experience dirty reads during multiple simultaneous updates.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
