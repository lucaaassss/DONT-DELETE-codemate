// implementing the logic for the AI to do its work
// use POST as the type of route since we sent something to the AI and we want to have its response back

import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a knowledgeable assistant that will help users with programming languages and software development questions.If the user ask anything beyond the context of programming languages and software development,you should provide appropriate message saying that you can only response to programming languages and software development.Meaning that you WILL NOT answer to questions not related to programming languages and software development under ANY CIRCUMSTANCES",
          },
          {
            role: "user",
            content: `Tell me ${question}`,
          },
        ],
      }),
    });

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
