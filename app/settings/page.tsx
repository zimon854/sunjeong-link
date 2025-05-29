'use client';

import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    company: '',
    position: '',
    phone: '',
    role: session?.user?.role || '',
    profile: null as File | null,
    profilePreview: '',
  });
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [errors, setErrors] = useState<{[k: string]: string}>({});
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      const file = files[0];
      setFormData(f => ({ ...f, profile: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => setFormData(f => ({ ...f, profilePreview: ev.target?.result as string }));
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
    setErrors(e => ({ ...e, [name]: '' }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(p => ({ ...p, [name]: value }));
    setErrors(e => ({ ...e, [name]: '' }));
  };

  const validate = () => {
    const e: {[k: string]: string} = {};
    if (!formData.name) e.name = '이름을 입력하세요.';
    if (!formData.email) e.email = '이메일을 입력하세요.';
    if (showPasswordEdit) {
      if (!passwords.current) e.current = '현재 비밀번호를 입력하세요.';
      if (!passwords.new) e.new = '새 비밀번호를 입력하세요.';
      if (passwords.new !== passwords.confirm) e.confirm = '비밀번호가 일치하지 않습니다.';
      if (passwords.new && passwords.new.length < 8) e.new = '비밀번호는 8자 이상이어야 합니다.';
    }
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    // TODO: 실제 저장 API 연동 필요
    setIsEditing(false);
    setShowPasswordEdit(false);
    setSuccess('계정 정보가 저장되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">계정 설정</h1>
              <button
                onClick={() => { setIsEditing(!isEditing); setShowPasswordEdit(false); setSuccess(''); }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {isEditing ? '취소' : '수정하기'}
              </button>
            </div>
            {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border mb-2">
                    {formData.profilePreview || session?.user?.image ? (
                      <img
                        src={formData.profilePreview || (session?.user?.image as string)}
                        alt="프로필"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">이미지 없음</div>
                    )}
                  </div>
                  {isEditing && (
                    <input
                      type="file"
                      name="profile"
                      accept="image/*"
                      onChange={handleChange}
                      className="text-sm"
                    />
                  )}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">회사</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">직책</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">휴대폰 번호</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">역할</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                    />
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => setShowPasswordEdit(v => !v)}
                    className="self-start px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    {showPasswordEdit ? '비밀번호 변경 취소' : '비밀번호 변경'}
                  </button>
                  {showPasswordEdit && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
                        <input
                          type="password"
                          name="current"
                          value={passwords.current}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.current && <div className="text-red-500 text-xs mt-1">{errors.current}</div>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
                        <input
                          type="password"
                          name="new"
                          value={passwords.new}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.new && <div className="text-red-500 text-xs mt-1">{errors.new}</div>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
                        <input
                          type="password"
                          name="confirm"
                          value={passwords.confirm}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.confirm && <div className="text-red-500 text-xs mt-1">{errors.confirm}</div>}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => { setIsEditing(false); setShowPasswordEdit(false); setErrors({}); setSuccess(''); }}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      저장하기
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 