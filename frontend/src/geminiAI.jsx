import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
const API_KEY = "AIzaSyCHqceSU0vMZXofguGFQTu_rK7fOxRIhI8";

const genAI = new GoogleGenerativeAI(`${API_KEY}`); // Replace with your API key

export async function getTaskInsights(task) {
  if (!task) return;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Analyze the following task and provide one **brief, actionable insight** and a final goodluck greetings in a single sentence.

      Task: "${task.title}"
      Info: "${task.info}"
      Priority: "${task.priority}"
      Due Date: "${task.dueDate}"
      Completeness: ${task.completeness}%

      **Response format**: "Insight: [Short analysis]"
    `;

    const result = await model.generateContent([prompt]);
    const text = await result.response.text();
    console.log(text);

    return text;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Unable to generate insights. Please try again later.";
  }
}
