import type { Salle } from '../../types/salle';

interface SalleCardProps {
  salle: Salle;
  onEdit: (salle: Salle) => void;
  onDelete: (id: number) => void;
}

const SalleCard = ({ salle, onEdit, onDelete }: SalleCardProps) => {
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la salle "${salle.nom}" ?`)) {
      onDelete(salle.id);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{salle.nom}</h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {salle.type}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Capacité:</span> {salle.capacite} personnes
            </p>
          </div>
        </div>

        <div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              salle.disponible
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {salle.disponible ? 'Disponible' : 'Indisponible'}
          </span>
        </div>
      </div>

      <div className="flex justify-end space-x-2 border-t border-gray-100 pt-4">
        <button
          onClick={() => onEdit(salle)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Modifier
        </button>
        <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default SalleCard;
