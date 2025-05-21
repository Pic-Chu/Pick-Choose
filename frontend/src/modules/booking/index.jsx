const BookingModule = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Module de Prise de Rendez-vous</h2>
      <p>Permettez à vos clients de réserver des créneaux en ligne.</p>
      <ul className="list-disc list-inside mt-4">
        <li>Création d'agendas</li>
        <li>Réservation par créneau horaire</li>
        <li>Notifications email (à venir)</li>
      </ul>
    </div>
  );
};

export default BookingModule;
