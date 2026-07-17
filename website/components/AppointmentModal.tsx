"use client";

import { CalendarDays, CheckCircle2, Clock, X } from "lucide-react";
import { FormEvent, useState } from "react";

type AppointmentModalProps = {
  open: boolean;
  onClose: () => void;
};

function getToday(): string {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60 * 1000);

  return localDate.toISOString().split("T")[0];
}

const availableTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function AppointmentModal({
  open,
  onClose,
}: AppointmentModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDate || !selectedTime || !name || !telephone) {
      return;
    }

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071d22]/70 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Prendre rendez-vous"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-[#f6f1e7] p-6 text-[#102f36] shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#103943]/15 transition hover:bg-[#103943] hover:text-white"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <CheckCircle2
              size={54}
              className="mx-auto text-[#a27d38]"
            />

            <h2 className="mt-6 text-3xl font-semibold">
              Demande enregistrée
            </h2>

            <p className="mx-auto mt-4 max-w-md leading-7 text-[#526b6c]">
              Votre demande pour le{" "}
              <strong>{selectedDate}</strong> à{" "}
              <strong>{selectedTime}</strong> a bien été préparée.
              LOZA Optique vous contactera pour confirmer le rendez-vous.
            </p>

            <a
              href={`mailto:lozaoptique@gmail.com?subject=Demande de rendez-vous LOZA Optique&body=Nom : ${encodeURIComponent(
                name,
              )}%0ATéléphone : ${encodeURIComponent(
                telephone,
              )}%0ADate : ${encodeURIComponent(
                selectedDate,
              )}%0AHeure : ${encodeURIComponent(selectedTime)}`}
              className="mt-8 inline-flex rounded-full bg-[#103943] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#071d22]"
            >
              Envoyer la demande par email
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="mt-4 block w-full text-sm font-medium text-[#526b6c] transition hover:text-[#103943]"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="pr-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a27d38]">
                LOZA Optique
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Choisir un rendez-vous
              </h2>

              <p className="mt-3 leading-7 text-[#526b6c]">
                Sélectionnez le jour et l’heure souhaités. Le rendez-vous
                sera confirmé par téléphone.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="appointment-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Nom complet
                </label>

                <input
                  id="appointment-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Votre nom"
                  className="w-full rounded-2xl border border-[#103943]/15 bg-white px-4 py-4 outline-none transition focus:border-[#a27d38]"
                />
              </div>

              <div>
                <label
                  htmlFor="appointment-phone"
                  className="mb-2 block text-sm font-semibold"
                >
                  Téléphone
                </label>

                <input
                  id="appointment-phone"
                  type="tel"
                  required
                  value={telephone}
                  onChange={(event) => setTelephone(event.target.value)}
                  placeholder="+212..."
                  className="w-full rounded-2xl border border-[#103943]/15 bg-white px-4 py-4 outline-none transition focus:border-[#a27d38]"
                />
              </div>

              <div>
                <label
                  htmlFor="appointment-date"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                >
                  <CalendarDays size={17} />
                  Choisir le jour
                </label>

                <input
                  id="appointment-date"
                  type="date"
                  required
                  min={getToday()}
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                    setSelectedTime("");
                  }}
                  className="w-full rounded-2xl border border-[#103943]/15 bg-white px-4 py-4 outline-none transition focus:border-[#a27d38]"
                />
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Clock size={17} />
                  Choisir l’heure
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        selectedTime === time
                          ? "border-[#103943] bg-[#103943] text-white"
                          : "border-[#103943]/15 bg-white hover:border-[#a27d38]"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  !selectedDate ||
                  !selectedTime ||
                  !name.trim() ||
                  !telephone.trim()
                }
                className="w-full rounded-full bg-[#103943] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#071d22] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Confirmer la demande
              </button>

              <p className="text-center text-xs leading-5 text-[#6c7d7b]">
                Aucun rendez-vous n’est définitif avant confirmation par
                LOZA Optique au +212 522 82 12 83.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
