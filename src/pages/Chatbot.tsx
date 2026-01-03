import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white rounded-full w-14 h-14 shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-3 bg-purple-600 text-white font-bold">
            Asistente IA
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {/* mensajes */}
          </div>

          <div className="p-2 border-t">
            <input
              className="w-full border rounded p-2"
              placeholder="Escribe tu pregunta..."
            />
          </div>
        </div>
      )}
    </>
  );
}
