'use server';
import { pool } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getTodos() {
  const [rows] = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  return rows as any[];
}

export async function addTodo(formData: FormData) {
  const task = formData.get('task');
  if (!task || typeof task !== 'string') return;
  
  await pool.query('INSERT INTO todos (task) VALUES (?)', [task]);
  revalidatePath('/');
}

export async function toggleTodo(id: number, currentStatus: number) {
  const newStatus = currentStatus === 1 ? 0 : 1;
  await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [newStatus, id]);
  revalidatePath('/');
}

export async function deleteTodo(id: number) {
  await pool.query('DELETE FROM todos WHERE id = ?', [id]);
  revalidatePath('/');
}

export async function clearCompleted() {
  await pool.query('DELETE FROM todos WHERE completed = 1');
  revalidatePath('/');
}

// app/actions.ts

export async function updateTodo(id: number, newTask: string) {
  if (!newTask || newTask.trim() === "") return;
  await pool.query('UPDATE todos SET task = ? WHERE id = ?', [newTask, id]);
  revalidatePath('/');
}