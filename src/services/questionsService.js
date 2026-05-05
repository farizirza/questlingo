import { supabase } from "./supabaseClient";

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Fetch all questions from Supabase and return 25 random ones
 * @returns {Promise<Array>} Array of 25 random questions
 * @throws {Error} If fetch fails or less than 25 questions available
 */
export const fetchQuestions = async () => {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("id, type, question, options, answer, media_url")
      .order("id", { ascending: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No questions found in database");
    }

    if (data.length < 25) {
      console.warn(
        `Only ${data.length} questions available. Returning all available questions.`,
      );
      return shuffleArray(data);
    }

    const shuffled = shuffleArray(data);
    return shuffled.slice(0, 25);
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

/**
 * Fetch questions with optional filtering
 * @param {Object} options - Filter options
 * @param {string} options.type - Filter by question type
 * @param {number} options.limit - Number of questions to return (default: 25)
 * @returns {Promise<Array>} Array of questions
 */
export const fetchQuestionsFiltered = async (options = {}) => {
  const { type = null, limit = 25 } = options;

  try {
    let query = supabase
      .from("questions")
      .select("id, type, question, options, answer, media_url");

    if (type) {
      query = query.eq("type", type);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No questions found matching filters");
    }

    const requestedLimit = Math.min(limit, data.length);
    const shuffled = shuffleArray(data);
    return shuffled.slice(0, requestedLimit);
  } catch (error) {
    console.error("Error fetching filtered questions:", error);
    throw error;
  }
};

/**
 * Fetch a single question by ID
 * @param {number} id - Question ID
 * @returns {Promise<Object>} Question object
 */
export const fetchQuestionById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("id, type, question, options, answer, media_url")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};
