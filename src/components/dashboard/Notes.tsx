import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { saveNote, getNotes, deleteNote } from '../../lib/supabase/notes';
import toast from 'react-hot-toast';
import type { Note } from '../../lib/supabase/types';

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
      toast.error('Falha ao carregar notas');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!newNote.trim()) return;

    try {
      await saveNote(newNote);
      setNewNote('');
      toast.success('Nota salva com sucesso');
      loadNotes();
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
      toast.error('Falha ao salvar nota');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      toast.success('Nota deletada com sucesso');
      loadNotes();
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      toast.error('Falha ao deletar nota');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-200">Suas Anotações</h2>
      
      <div className="flex gap-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Digite sua anotação..."
          className="flex-1 bg-gray-800 text-gray-200 p-3 rounded-lg resize-none h-24"
        />
        <button
          onClick={handleSave}
          disabled={!newNote.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
            <p className="text-gray-200 whitespace-pre-wrap">{note.content}</p>
            <button
              onClick={() => handleDelete(note.id)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        
        {notes.length === 0 && !loading && (
          <p className="text-center text-gray-400 py-4">Nenhuma anotação ainda</p>
        )}
      </div>
    </div>
  );
}