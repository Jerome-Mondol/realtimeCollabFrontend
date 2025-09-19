import { supabase } from './SupabaseClient';

export const signUp = async (email, password, full_name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  });

  if (error) {
    alert(error.message);
    return null;
  } else {
    alert("Check your email for verification");
    return data;
  }
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return null;
  } else {
    alert("User is successfully logged in");
    return data; // return session + user
  }
};
