import { useState, useEffect } from "react";
import {
  fetchQuestions,
  fetchQuestionsFiltered,
  fetchQuestionById,
} from "../services/questionsService";

/**
 * Hook to fetch questions from Supabase
 * @param {Object} options - Options for fetching
 * @param {string} options.type - Filter by question type
 * @param {number} options.limit - Number of questions to return
 * @param {boolean} options.autoFetch - Auto-fetch on mount (default: true)
 * @returns {Object} { questions, loading, error, refetch }
 */
export const useQuestions = (options = {}) => {
  const { type = null, limit = 25, autoFetch = true } = options;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (type || limit !== 25) {
        data = await fetchQuestionsFiltered({ type, limit });
      } else {
        data = await fetchQuestions();
      }
      setQuestions(data);
    } catch (err) {
      setError(err.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [type, limit, autoFetch]);

  return {
    questions,
    loading,
    error,
    refetch: fetchData,
  };
};

/**
 * Hook to fetch a single question by ID
 * @param {number} id - Question ID
 * @returns {Object} { question, loading, error, refetch }
 */
export const useQuestion = (id) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuestionById(id);
      setQuestion(data);
    } catch (err) {
      setError(err.message);
      setQuestion(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    question,
    loading,
    error,
    refetch: fetchData,
  };
};
