'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Building2, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('plan') || 'standard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#406B5B] rounded-full flex items-center justify-center">
          <span className="text-white font-heading text-lg font-bold">V</span>
        </div>
        <span className="font-heading text-2xl text-[#406B5B] font-semibold tracking-wide">
          VITALLE
        </span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold text-[#406B5B] mb-2">
          Criar conta
        </h1>
        <p className="text-[#406B5B]/60">
          Plano selecionado: <span className="font-semibold capitalize text-[#406B5B]">{selectedPlan}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#406B5B] mb-1.5">Nome completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Dr. João Silva"
                required
                className="pl-11 pr-4 py-3 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#406B5B] mb-1.5">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(11) 99999-9999"
                required
                className="pl-11 pr-4 py-3 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#406B5B] mb-1.5">Nome da Clínica / Consultório</label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
            <input
              type="text"
              value={formData.clinicName}
              onChange={(e) => updateField('clinicName', e.target.value)}
              placeholder="Clínica Vitalle"
              required
              className="pl-11 pr-4 py-3 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#406B5B] mb-1.5">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="seu@email.com"
              required
              className="pl-11 pr-4 py-3 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#406B5B] mb-1.5">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="Min. 8 caracteres"
                required
                className="pl-11 pr-4 py-3 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#406B5B] mb-1.5">Confirmar senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                placeholder="Repetir senha"
                required
                className="pl-11 pr-4 py-3 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-[#E4D5C3] text-[#406B5B] focus:ring-[#406B5B]/20" />
          <span className="text-xs text-[#406B5B]/60">
            Concordo com os <a href="#" className="text-[#406B5B] font-medium hover:underline">Termos de Uso</a> e{' '}
            <a href="#" className="text-[#406B5B] font-medium hover:underline">Política de Privacidade</a>
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-[#406B5B] text-white rounded-xl font-semibold hover:bg-[#406B5B]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#406B5B]/20"
        >
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#406B5B]/60">
        Já tem conta?{' '}
        <Link href="/login" className="text-[#406B5B] hover:text-[#91AE9E] font-semibold transition-colors">
          Entrar
        </Link>
      </p>
    </div>
  );
}
