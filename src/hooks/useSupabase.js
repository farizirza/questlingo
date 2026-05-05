import { supabase } from "../services/supabaseClient";

// Example hook for Supabase authentication
export const useSupabaseAuth = () => {
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  };

  return { signUp, signIn, signOut, getUser };
};

// Example hook for Supabase database queries
export const useSupabaseQuery = () => {
  const query = async (table, filters = {}) => {
    let query = supabase.from(table).select("*");

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { data, error } = await query;
    return { data, error };
  };

  const insert = async (table, records) => {
    const { data, error } = await supabase.from(table).insert(records);
    return { data, error };
  };

  const update = async (table, id, updates) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq("id", id);
    return { data, error };
  };

  const delete_ = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().eq("id", id);
    return { data, error };
  };

  return { query, insert, update, delete: delete_ };
};
