'use client';

import { useState } from 'react';
import { 
  Button, Input, Checkbox, Card, Text, Title2, Divider 
} from '@fluentui/react-components';
import { 
  Delete24Regular, Add24Regular, Broom24Regular, 
  Edit24Regular, Checkmark24Regular, Dismiss24Regular,
  WeatherMoon24Regular, WeatherSunny24Regular 
} from '@fluentui/react-icons';
import { useTheme } from './providers';
import { addTodo, toggleTodo, deleteTodo, clearCompleted, updateTodo } from './actions';

export default function TodoList({ todos }: { todos: any[] }) {
  const { isDark, toggleTheme } = useTheme();
  
  // States for Inline Editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const hasCompleted = todos.some(todo => todo.completed === 1);

  const startEditing = (id: number, currentTask: string) => {
    setEditingId(id);
    setEditValue(currentTask);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleUpdate = async (id: number) => {
    await updateTodo(id, editValue);
    setEditingId(null);
  };

  return (
    <main style={{ maxWidth: '500px', margin: '0 auto', padding: '60px 20px' }}>
      {/* HEADER WITH THEME TOGGLE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title2>Fluent Tasks</Title2>
        <Button 
          appearance="subtle" 
          icon={isDark ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />} 
          onClick={toggleTheme}
        >
          Switch to {isDark ? 'Light Theme' : 'Dark Theme'}
        </Button>
      </div>
      
      {/* ADD TASK FORM */}
      <form action={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        <Input name="task" placeholder="Add a new task..." appearance="outline" style={{ flexGrow: 1 }} required />
        <Button appearance="primary" icon={<Add24Regular />} type="submit">Add</Button>
      </form>

      {/* TASK LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {todos.length === 0 && <Text italic color="neutralTertiary">No tasks yet.</Text>}
        
        {todos.map((todo) => (
          <Card key={todo.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '8px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              {/* Checkbox triggers Server Action */}
              <form action={toggleTodo.bind(null, todo.id, todo.completed)}>
                <Checkbox 
                  checked={todo.completed === 1} 
                  onChange={(e) => (e.target as any).form.requestSubmit()} 
                />
              </form>

              {editingId === todo.id ? (
                <Input 
                  value={editValue} 
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ marginLeft: '8px', flexGrow: 1 }}
                  autoFocus
                />
              ) : (
                <Text style={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? (isDark ? '#888' : '#a1a1a1') : 'inherit',
                  marginLeft: '8px'
                }}>
                  {todo.task}
                </Text>
              )}
            </div>

            {/* ACTION BUTTONS (Edit/Save/Delete) */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {editingId === todo.id ? (
                <>
                  <Button appearance="primary" icon={<Checkmark24Regular />} onClick={() => handleUpdate(todo.id)} />
                  <Button appearance="subtle" icon={<Dismiss24Regular />} onClick={cancelEditing} />
                </>
              ) : (
                <>
                  <Button appearance="subtle" icon={<Edit24Regular />} onClick={() => startEditing(todo.id, todo.task)} />
                  <form action={deleteTodo.bind(null, todo.id)}>
                    <Button appearance="subtle" icon={<Delete24Regular />} type="submit" />
                  </form>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* FOOTER ACTIONS */}
      {hasCompleted && (
        <div style={{ marginTop: '20px' }}>
          <Divider />
          <form action={clearCompleted} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button appearance="subtle" icon={<Broom24Regular />} type="submit" color="danger">
              Clear Completed
            </Button>
          </form>
        </div>
      )}
    </main>
  );
}