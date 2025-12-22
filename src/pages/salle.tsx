import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  fetchAllSalles,
  createSalle,
  updateSalle,
  deleteSalle,
  setSelectedSalle,
  clearError,
} from '../store/slices/salleslice';
import {
  selectAllSalles,
  selectSelectedSalle,
  selectSalleLoading,
  selectSalleError,
} from '../store/selectors/salleselector';
import type { Salle, CreateSalleDto, UpdateSalleDto } from '../types/salle';
import SalleCard from '../components/salle/salleCard';
import SalleForm from '../components/forms/salleForm';

const SallePage = () => {
  const dispatch = useAppDispatch();
  const salles = useAppSelector(selectAllSalles);
  const selectedSalle = useAppSelector(selectSelectedSalle);
  const loading = useAppSelector(selectSalleLoading);
  const error = useAppSelector(selectSalleError);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDisponible, setFilterDisponible] = useState('all');

  useEffect(() => {
    dispatch(fetchAllSalles());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleAddNew = () => {
    dispatch(setSelectedSalle(null));
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = (salle: Salle) => {
    dispatch(setSelectedSalle(salle));
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteSalle(id));
  };

  const handleSubmit = async (data: CreateSalleDto | UpdateSalleDto) => {
    try {
      if (isEditing && selectedSalle) {
        await dispatch(updateSalle({ id: selectedSalle.id, data })).unwrap();
      } else {
        await dispatch(createSalle(data as CreateSalleDto)).unwrap();
      }
      setShowForm(false);
      dispatch(setSelectedSalle(null));
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    dispatch(setSelectedSalle(null));
  };

  // Filter salles
  const filteredSalles = salles.filter((salle) => {
    const matchesSearch = salle.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         salle.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || salle.type === filterType;
    const matchesDisponible = 
      filterDisponible === 'all' ||
      (filterDisponible === 'disponible' && salle.disponible) ||
      (filterDisponible === 'indisponible' && !salle.disponible);

    return matchesSearch && matchesType && matchesDisponible;
  });

  // Get unique types for filter
  const uniqueTypes = Array.from(new Set(salles.map((s) => s.type)));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Salles</h1>
        <button
          onClick={handleAddNew}
          className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + Ajouter une salle
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Rechercher
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nom ou type..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        {/* Filter by Type */}
        <div>
          <label htmlFor="filterType" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="all">Tous les types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Disponible */}
        <div>
          <label htmlFor="filterDisponible" className="block text-sm font-medium text-gray-700">
            Disponibilité
          </label>
          <select
            id="filterDisponible"
            value={filterDisponible}
            onChange={(e) => setFilterDisponible(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="all">Toutes</option>
            <option value="disponible">Disponibles</option>
            <option value="indisponible">Indisponibles</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-600">Total des salles</p>
          <p className="mt-1 text-2xl font-bold text-blue-900">{salles.length}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm font-medium text-green-600">Disponibles</p>
          <p className="mt-1 text-2xl font-bold text-green-900">
            {salles.filter((s) => s.disponible).length}
          </p>
        </div>
        <div className="rounded-lg bg-orange-50 p-4">
          <p className="text-sm font-medium text-orange-600">Capacité totale</p>
          <p className="mt-1 text-2xl font-bold text-orange-900">
            {salles.reduce((sum, s) => sum + s.capacite, 0)}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && salles.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredSalles.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune salle</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterType !== 'all' || filterDisponible !== 'all'
              ? 'Aucune salle ne correspond à vos critères de recherche.'
              : 'Commencez par ajouter une nouvelle salle.'}
          </p>
        </div>
      )}

      {/* Salles Grid */}
      {!loading && filteredSalles.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSalles.map((salle) => (
            <SalleCard
              key={salle.id}
              salle={salle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <SalleForm
          salle={isEditing ? selectedSalle : null}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SallePage;
