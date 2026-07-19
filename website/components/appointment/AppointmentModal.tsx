"use client";

import { CalendarDays, Clock, Mail, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

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

  const selectedDayIsFriday = useMemo(() => {
    if (!selectedDate) return false;
    const date = new Date(`${selectedDate}T12:00:00`);
    return date.getDay() === 5;
  }, [selectedDate]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !selectedDate ||
      !selectedTime ||
      !name.trim() ||
      !telephone.trim() ||
      selectedDayIsFriday
    ) {
      return;
    }

    const subject = encodeURIComponent(
      "Demande de rendez-vous — Loza Optique",
    );

    const body = encodeURIComponent(
      [
        `Nom : ${name.trim()}`,
        `Téléphone : ${telephone.trim()}`,
        `Date souhaitée : ${selectedDate}`,
        `Heure souhaitée : ${selectedTime}`,
        "",
        "Cette demande doit être confirmée par téléphone par Loza Optique.",
      ].join("\n"),
    );

    window.location.href = `mailto:lozaoptique@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleClose = () => {
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setTelephone("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071d22]/70 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-title"
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

        <div className="pr-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a27d38]">
            Loza Optique
          </p>

          <h2
            id="appointment-title"
            className="mt-4 text-3xl font-semibold sm:text-4xl"
          >
            Préparer une demande
          </h2>

          <p className="mt-3 leading-7 text-[#526b6c]">
            Choisissez un jour et une heure. Votre application email s’ouvrira
            avec la demande préparée. Le rendez-vous reste soumis à confirmation
            par téléphone.
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
              autoComplete="name"
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
              autoComplete="tel"
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

            {selectedDayIsFriday && (
              <p className="mt-2 text-sm font-medium text-red-700">
                La boutique est fermée le vendredi. Choisissez un autre jour.
              </p>
            )}
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
                  disabled={!selectedDate || selectedDayIsFriday}
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
              !telephone.trim() ||
              selectedDayIsFriday
            }
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#103943] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#071d22] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Mail size={17} />
            Préparer l’email
          </button>

          <p className="text-center text-xs leading-5 text-[#6c7d7b]">
            Aucun rendez-vous n’est confirmé avant l’appel de Loza Optique au
            +212 522 82 12 83.
          </p>
        </form>
      </div>
    </div>
  );
}
