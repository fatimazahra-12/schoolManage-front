import { useState, useEffect } from 'react';
import type { Salle, CreateSalleDto, UpdateSalleDto } from '../../types/salle';

interface SalleFormProps {
  salle?: Salle | null;
  onSubmit: (data: CreateSalleDto | UpdateSalleDto) => void;
  onCancel: () => void;
  loading?: boolean;
}

const SalleForm = ({ salle, onSubmit, onCancel, loading = false }: SalleFormProps) => {
  const [formData, setFormData] = useState<CreateSalleDto>({
    nom: '',
    capacite: 0,
    type: 'Cours',
    disponible: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (salle) {
      setFormData({
        nom: salle.nom,
        capacite: salle.capacite,
        type: salle.type,
        disponible: salle.disponible,
      });
    } else {
      setFormData({
        nom: '',
        capacite: 0,
        type: 'Cours',
        disponible: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salle?.id]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.capacite || formData.capacite <= 0) {
      newErrors.capacite = 'La capacité doit être supérieure à 0';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Le type est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          {salle ? 'Modifier la salle' : 'Ajouter une salle'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.nom ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
              placeholder="Ex: Salle A101"
            />
            {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
          </div>

          {/* Capacite */}
          <div>
            <label htmlFor="capacite" className="block text-sm font-medium text-gray-700">
              Capacité <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="capacite"
              name="capacite"
              value={formData.capacite}
              onChange={handleChange}
              min="1"
              className={`mt-1 block w-full rounded-md border ${
                errors.capacite ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
              placeholder="Ex: 30"
            />
            {errors.capacite && <p className="mt-1 text-sm text-red-500">{errors.capacite}</p>}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
            >
              <option value="">Sélectionner un type</option>
              <option value="Cours">Cours</option>
              <option value="TD">TD</option>
              <option value="TP">TP</option>
              <option value="Laboratoire">Laboratoire</option>
              <option value="Amphithéâtre">Amphithéâtre</option>
              <option value="Conférence">Conférence</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
          </div>

          {/* Disponible */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="disponible"
              name="disponible"
              checked={formData.disponible}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="disponible" className="ml-2 block text-sm text-gray-700">
              Disponible
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'En cours...' : salle ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalleForm;
