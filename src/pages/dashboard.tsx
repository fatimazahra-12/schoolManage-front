import { useNavigate } from 'react-router'
import { auth } from '../services/authservice'
import { useEffect, useState } from 'react'
import { ThemeToggle } from '../common/ThemeToggle'

interface DashboardUser {
  email: string | null
  uid: string
  isVerified: boolean
}

export const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        navigate('/login', { replace: true })
        return
      }

      setUser({
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        isVerified: firebaseUser.emailVerified,
      })
      setLoading(false)
    })

    return () => unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#034C53]"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#034C53] dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Bienvenue à l'école</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 rounded-lg bg-[#F38C79] dark:bg-[#F38C79]/80 text-white font-medium hover:bg-[#E07A66] dark:hover:bg-[#F38C79] transition-colors duration-200"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#034C53] dark:bg-[#007074] rounded-full flex items-center justify-center">
                <span className="text-2xl text-white font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user.email}</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">Utilisateur Vérifié</p>
                <div className="mt-2 flex items-center space-x-2">
                  {user.isVerified ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">Email Vérifié</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Email Non Vérifié</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-lg p-6 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Aperçu</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-gray-600 dark:text-slate-400">ID Utilisateur</span>
                <span className="text-sm font-mono text-gray-900 dark:text-slate-200 truncate ml-2">
                  {user.uid.slice(0, 10)}...
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-gray-600 dark:text-slate-400">Statut</span>
                <span className="inline-block px-3 py-1 bg-[#034C53] dark:bg-[#007074] text-white text-xs font-semibold rounded-full">
                  Connecté
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-slate-400">Dernière Connexion</span>
                <span className="text-sm text-gray-900 dark:text-slate-200">À l'instant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MenuCard
            title="Étudiants"
            description="Gérer les informations des étudiants"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
            onClick={() => navigate('/etudiant')}
          />

          <MenuCard
            title="Enseignants"
            description="Consulter les enseignants"
            bgColor="bg-purple-50"
            borderColor="border-purple-200"
            onClick={() => navigate('/enseignant')}
          />

          <MenuCard
            title="Planning"
            description="Consulter l'emploi du temps"
            bgColor="bg-green-50"
            borderColor="border-green-200"
            onClick={() => {}}
          />

          <MenuCard
            title="Cours"
            description="Parcourir les cours disponibles"
            bgColor="bg-yellow-50"
            borderColor="border-yellow-200"
            onClick={() => {}}
          />

          <MenuCard
            title="Examens"
            description="Consulter les examens"
            bgColor="bg-red-50"
            borderColor="border-red-200"
            onClick={() => {}}
          />

          <MenuCard
            title="Paramètres"
            description="Gérer vos paramètres de compte"
            bgColor="bg-gray-50"
            borderColor="border-gray-200"
            onClick={() => {}}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 dark:text-slate-400">
          <p>© 2025 SmartCampus. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

interface MenuCardProps {
  title: string
  description: string
  bgColor: string
  borderColor: string
  onClick: () => void
}

const MenuCard = ({ title, description, bgColor, borderColor, onClick }: MenuCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} border-2 ${borderColor} rounded-lg p-6 text-left hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 dark:text-gray-100`}
    >
      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-slate-400">{description}</p>
    </button>
  )
}