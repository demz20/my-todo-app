// export const dynamic = 'force-dynamic'; // This prevents the build error by skipping prerendering

import { getTodos } from './actions';
import { Providers } from './providers';
import TodoList from './todo-list';

export default async function Home() {
  // 1. Fetch data from MySQL on the server
  const todos = await getTodos();

  // 2. Wrap the client component in the Providers
  return (
    <Providers>
      <TodoList todos={todos} />
    </Providers>
  );
}