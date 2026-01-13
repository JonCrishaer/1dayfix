import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, LogOut, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const currentUser = await base44.auth.me();
      setFormData({
        full_name: currentUser.full_name || '',
        email: currentUser.email || ''
      });
      return currentUser;
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      setIsEditing(false);
    }
  });

  const handleSave = () => {
    updateMutation.mutate({
      full_name: formData.full_name
    });
  };

  const handleLogout = () => {
    base44.auth.logout('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-black border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(createPageUrl('Dashboard'))}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-black">Account Settings</h1>
          <p className="text-gray-600 mt-1">Manage your profile and account</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-8 mb-6"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-lg bg-black flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">{user?.full_name || 'User'}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-xs text-gray-500 mt-2">
                {user?.role === 'admin' ? '✓ Admin' : 'Member'}
              </p>
            </div>
          </div>

          {/* Edit Section */}
          <div className="space-y-6 border-t border-gray-200 pt-8">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
              <Input
                disabled={!isEditing}
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'} border-gray-300 text-black`}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <Input
                disabled
                value={formData.email}
                className="bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
            </div>

            {isEditing ? (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-black hover:bg-gray-900 text-white flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-gray-300 text-black hover:bg-gray-50 flex-1"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-black hover:bg-gray-900 text-white w-full"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg border border-gray-200 p-8"
        >
          <h3 className="text-lg font-semibold text-black mb-4">Danger Zone</h3>
          <p className="text-gray-600 text-sm mb-6">
            Sign out of your account. You'll need to log in again to access your dashboard.
          </p>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}