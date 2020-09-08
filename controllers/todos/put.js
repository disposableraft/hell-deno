import { FILE_PATH } from "../../config.js";

export default async ({ request, response, params }) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  try {
    const { title, completed } = await request.body().value;

    const data = await Deno.readFile(FILE_PATH);
    const todos = JSON.parse(decoder.decode(data));

    const updatedTodos = todos.map((todo) => {
      if (todo.id === Number(params.id)) {
        return { ...todo, title, completed };
      }
      return todo;
    });

    await Deno.writeFile(
      FILE_PATH,
      encoder.encode(JSON.stringify(updatedTodos))
    );
    response.status = 200;
    response.body = { status: "Success", data: updatedTodos };
  } catch (error) {
    response.status = 502;
    response.body = { status: "Failed", error };
  }
};
