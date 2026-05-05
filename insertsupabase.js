import { createClient } from "@supabase/supabase-js";

// 🔥 GANTI INI
const supabaseUrl = "https://mjyhdavhhmtctbprpgev.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qeWhkYXZoaG10Y3RicHJwZ2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NjMyNzAsImV4cCI6MjA5MzUzOTI3MH0.N9CSYci3UQqDwhg_b_VDvvcvDGQJnFSEwL6S1Cj7Sbo";

const supabase = createClient(supabaseUrl, supabaseKey);

// ==== DATA ====
const questions = [
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "bell" },
      { key: "B", text: "ring" },
      { key: "C", text: "belling" },
      { key: "D", text: "ringing" },
    ],
    answer: "A",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/bell.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "hat" },
      { key: "B", text: "hair" },
      { key: "C", text: "helmet" },
      { key: "D", text: "scarf" },
    ],
    answer: "A",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/hat.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "mountains" },
      { key: "B", text: "hills" },
      { key: "C", text: "countryside" },
      { key: "D", text: "skiing" },
    ],
    answer: "A",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/mountains.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "ear" },
      { key: "B", text: "mouth" },
      { key: "C", text: "nose" },
      { key: "D", text: "head" },
    ],
    answer: "A",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/ear.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "boots" },
      { key: "B", text: "gloves" },
      { key: "C", text: "shoes" },
      { key: "D", text: "socks" },
    ],
    answer: "D",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/socks.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "wine" },
      { key: "B", text: "tomatoes" },
      { key: "C", text: "grapes" },
      { key: "D", text: "peaches" },
    ],
    answer: "C",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/grapes.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "umbrella" },
      { key: "B", text: "mushroom" },
      { key: "C", text: "potato" },
      { key: "D", text: "lettuce" },
    ],
    answer: "B",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/mushroom.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "paper" },
      { key: "B", text: "pens" },
      { key: "C", text: "pencils" },
      { key: "D", text: "paints" },
    ],
    answer: "c",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/pencils.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "wine" },
      { key: "B", text: "drink" },
      { key: "C", text: "beer" },
      { key: "D", text: "water" },
    ],
    answer: "C",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/beer.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "pears" },
      { key: "B", text: "apples" },
      { key: "C", text: "peaches" },
      { key: "D", text: "grapes" },
    ],
    answer: "",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/apples.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "motorbike" },
      { key: "B", text: "cars" },
      { key: "C", text: "transport" },
      { key: "D", text: "bicycles" },
    ],
    answer: "D",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/bicycles.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "boat" },
      { key: "B", text: "ship" },
      { key: "C", text: "navy" },
      { key: "D", text: "submarine" },
    ],
    answer: "B",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/ship.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "cake" },
      { key: "B", text: "bread" },
      { key: "C", text: "dinner" },
      { key: "D", text: "baguette" },
    ],
    answer: "B",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/bread.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "cactus" },
      { key: "B", text: "plant" },
      { key: "C", text: "flower" },
      { key: "D", text: "tree" },
    ],
    answer: "A",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/cactus.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "bug" },
      { key: "B", text: "spider" },
      { key: "C", text: "bat" },
      { key: "D", text: "butterfly" },
    ],
    answer: "D",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/butterfly.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "press" },
      { key: "B", text: "tap" },
      { key: "C", text: "button" },
      { key: "D", text: "zip" },
    ],
    answer: "C",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/button.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "sky" },
      { key: "B", text: "world" },
      { key: "C", text: "weather" },
      { key: "D", text: "rain" },
    ],
    answer: "A",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/sky.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "computer" },
      { key: "B", text: "calculator" },
      { key: "C", text: "ATM" },
      { key: "D", text: "machine" },
    ],
    answer: "B",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/calculator.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "pencils" },
      { key: "B", text: "paints" },
      { key: "C", text: "paper" },
      { key: "D", text: "pens" },
    ],
    answer: "D",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/pens.jpg",
  },
  {
    type: "image",
    question: "What is this?",
    options: [
      { key: "A", text: "sun" },
      { key: "B", text: "world" },
      { key: "C", text: "planet" },
      { key: "D", text: "moon" },
    ],
    answer: "D",
    media_url:
      "https://mjyhdavhhmtctbprpgev.supabase.co/storage/v1/object/public/media/images/moon.jpg",
  },
];

// ==== INSERT ====
async function insertData() {
  const { data, error } = await supabase.from("questions").insert(questions);

  if (error) {
    console.error("ERROR:", error);
  } else {
    console.log("SUCCESS:", data);
  }
}

insertData();
