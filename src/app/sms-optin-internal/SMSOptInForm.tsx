'use client';

import React, { useState } from 'react';
import { COMPANY_NAME, COMPANY_EMAILS } from '@/lib/constants';

export default function SMSOptInForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        role: 'Owner',
        consent: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) return;

        setStatus('submitting');

        // Simulate form submission
        setTimeout(() => {
            setStatus('success');
        }, 1000);
    };

    if (status === 'success') {
        return (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-in fade-in duration-500">
                <h3 className="text-xl font-bold mb-2">Opt-In Successful</h3>
                <p className="font-medium">
                    {COMPANY_NAME}: You’re opted in for internal SMS alerts. Msg freq varies. Msg&data rates may apply. Reply STOP to opt out, HELP for help.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm underline hover:text-green-900"
                >
                    Submit another opt-in
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-slate-50 border rounded-lg shadow-sm">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name (Optional)
                </label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. John Doe"
                />
            </div>

            <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="(555) 555-5555"
                />
            </div>

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
                    Role <span className="text-red-500">*</span>
                </label>
                <select
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    <option value="Owner">Owner</option>
                    <option value="Internal Staff">Internal Staff</option>
                </select>
            </div>

            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="consent" className="text-sm text-slate-600 leading-tight">
                    I agree to receive SMS text messages from {COMPANY_NAME} for internal operational alerts (new quote/order request notifications). Msg frequency varies (typically 0–10/day). Msg & data rates may apply. Reply STOP to opt out, HELP for help. <span className="text-red-500">*</span>
                </label>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
                {status === 'submitting' ? 'Submitting...' : 'Submit Opt-In'}
            </button>
        </form>
    );
}
