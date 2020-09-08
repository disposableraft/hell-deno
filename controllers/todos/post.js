import { FILE_PATH } from "../../config.js";

export default async ({ response, request }) => {
  try {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const { title } = await request.body().value;

    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));

    const newTodo = { id: todos.length + 1, title: title, complete: false };
    todos.push(newTodo);

    await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(todos)));

    response.status = 201;
    response.body = { status: "Success", newTodo };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed", error };
  }
};
