// Provera da li tim sa istim imenom već postoji
export const getTimByName = async (imeTima) => {
  const { data, error } = await supabase
    .from('timovi')
    .select('*')
    .eq('ime_tima', imeTima)
    .single();
  if (error && error.code !== 'PGRST116') throw error; // PGRST116: No rows found
  return data;
};
import { supabase } from './supabase';

// Funkcije za članove
export const createClan = async (clanData) => {
  const { data, error } = await supabase
    .from('clanovi')
    .insert([clanData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getClanById = async (id) => {
  const { data, error } = await supabase
    .from('clanovi')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateClan = async (id, updates) => {
  const { data, error } = await supabase
    .from('clanovi')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getAllClanovi = async () => {
  const { data, error } = await supabase
    .from('clanovi')
    .select('*')
    .order('broj_clana', { ascending: true });
  
  if (error) throw error;
  return data;
};

// Funkcija za dobijanje članova koji još nemaju tim
export const getClanoveBeztima = async () => {
  const { data, error } = await supabase
    .from('clanovi')
    .select('*')
    .is('tim_id', null)
    .order('broj_clana', { ascending: true });
  
  if (error) throw error;
  return data;
};

// Funkcija za proveru da li email ili telefon već postoji
export const checkEmailOrPhoneExists = async (email, telefon, excludeId = null) => {
  let query = supabase
    .from('clanovi')
    .select('id, email, telefon');
  
  // Ako ažuriramo postojećeg člana, isključi njegov ID iz pretrage
  if (excludeId) {
    query = query.neq('id', excludeId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  const emailExists = data.some(clan => clan.email.toLowerCase() === email.toLowerCase());
  const phoneExists = data.some(clan => clan.telefon === telefon);
  
  return { emailExists, phoneExists };
};

// Funkicja za povezivanje članova sa timom
export const poveziClanoveUzTim = async (clanoviIds, timId) => {
  const { data, error } = await supabase
    .from('clanovi')
    .update({ tim_id: timId })
    .in('id', clanoviIds)
    .select();
  
  if (error) throw error;
  return data;
};

// Funkcija za brisanje članova
export const deleteClanovi = async (clanoviIds) => {
  const { error } = await supabase
    .from('clanovi')
    .delete()
    .in('id', clanoviIds);
  
  if (error) throw error;
  return true;
};

// Funkcije za timove
export const createTim = async (timData) => {
  const { data, error } = await supabase
    .from('timovi')
    .insert([timData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getTimById = async (id) => {
  const { data, error } = await supabase
    .from('timovi')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const getTimSaClanovima = async (timId) => {
  const { data, error } = await supabase
    .from('timovi')
    .select(`
      *,
      clanovi (*)
    `)
    .eq('id', timId)
    .single();
  
  if (error) throw error;
  return data;
};

// Funkcija za kreiranje kompletne prijave (tim sa članovima)
export const createPrijavaSaTimovimaIClanovima = async (timData, clanoviData) => {
  // Prvo kreiramo tim
  const { data: tim, error: timError } = await supabase
    .from('timovi')
    .insert([timData])
    .select()
    .single();
  
  if (timError) throw timError;
  
  // Onda dodajemo članove sa tim_id
  const clanoviSaTimId = clanoviData.map(clan => ({
    ...clan,
    tim_id: tim.id
  }));
  
  const { data: clanovi, error: clanoviError } = await supabase
    .from('clanovi')
    .insert(clanoviSaTimId)
    .select();
  
  if (clanoviError) throw clanoviError;
  
  return { tim, clanovi };
};

// Funkcija za dobijanje svih prijava
export const getAllPrijave = async () => {
  const { data, error } = await supabase
    .from('timovi')
    .select(`
      *,
      clanovi (*)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};
