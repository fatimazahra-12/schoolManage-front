/**
 * Reset Password Page
 * Handles password reset via oobCode
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ResetPasswordForm } from '../../components/forms/ResetPasswordForm';
import { useResetPassword } from '../../hooks/useResetPassword';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode') || '';
  const { verifyCode, isLoading, error, successMessage, emailForReset } = useResetPassword();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkCode = async () => {
      if (!oobCode) return;
      const email = await verifyCode(oobCode);
      setIsValid(!!email);
    };
    checkCode();
  }, [oobCode, verifyCode]);

  const heading = isValid ? 'Nouveau mot de passe' : 'Lien invalide ou expiré';

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-gradient-to-br from-[#E5EEE5] via-white to-[#E5E0D0] dark:from-[#0f2f33] dark:via-[#1b3f45] dark:to-[#0f2f33] px-4 py-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F38C79] rounded-full opacity-5 dark:opacity-10 -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#034C53] rounded-full opacity-5 dark:opacity-10 -ml-24 -mb-24" />

      <div className="relative z-10 w-full" style={{ maxWidth: '700px' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#034C53] dark:text-white mb-2 font-merriweather">{heading}</h1>
          {emailForReset && (
            <p className="text-sm text-gray-600 dark:text-gray-300 font-inter">Email : {emailForReset}</p>
          )}
        </div>

        <div className="bg-white dark:bg-[#1b3f45] rounded-xl shadow-xl p-8 backdrop-blur-sm border border-white/20 dark:border-slate-700">
          {!oobCode && (
            <p className="text-sm text-red-700 dark:text-red-400">Lien invalide.</p>
          )}

          {oobCode && isLoading && (
            <p className="text-sm text-gray-700 dark:text-gray-300">Vérification du lien...</p>
          )}

          {oobCode && isValid && <ResetPasswordForm oobCode={oobCode} />}

          {error && !isValid && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs animate-fade-in" role="alert">
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-xs animate-fade-in" role="status">
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-6 font-inter">
          Retour à la{' '}
          <a href="/login" className="font-semibold text-[#007074] dark:text-[#007074] hover:text-[#005F63] dark:hover:text-[#00A8B5] hover:underline">connexion</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
