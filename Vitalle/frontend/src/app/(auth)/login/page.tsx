'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // Simulating login for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setUser({
        id: '1',
        name: 'Dr. Roberto',
        email: email,
        role: 'DOCTOR',
        tenantId: 'tenant-1',
      });
      
      router.push('/dashboard');
    } catch (err) {
      setError('E-mail ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-[#406B5B] rounded-full flex items-center justify-center">
          <span className="text-white font-heading text-lg font-bold">V</span>
        </div>
        <span className="font-heading text-2xl text-[#406B5B] font-semibold tracking-wide">
          VITALLE
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-[#406B5B] mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-[#406B5B]/60">
          Acesse sua conta para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#406B5B] mb-2">
            E-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="pl-11 pr-4 py-3.5 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20 focus:border-[#406B5B]/30 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#406B5B] mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#406B5B]/40" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="pl-11 pr-12 py-3.5 w-full bg-white border border-[#E4D5C3] rounded-xl text-sm text-[#406B5B] placeholder:text-[#406B5B]/40 focus:outline-none focus:ring-2 focus:ring-[#406B5B]/20 focus:border-[#406B5B]/30 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#406B5B]/40 hover:text-[#406B5B]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#E4D5C3] text-[#406B5B] focus:ring-[#406B5B]/20" />
            <span className="text-sm text-[#406B5B]/60">Lembrar-me</span>
          </label>
          <a href="#" className="text-sm text-[#406B5B] hover:text-[#91AE9E] font-medium transition-colors">
            Esqueceu a senha?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-[#406B5B] text-white rounded-xl font-semibold hover:bg-[#406B5B]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#406B5B]/20"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-[#406B5B]/60">
        Não tem conta?{' '}
        <Link href="/register" className="text-[#406B5B] hover:text-[#91AE9E] font-semibold transition-colors">
          Criar conta
        </Link>
      </p>
    </div>
  );
}
