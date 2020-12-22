import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Divider, Button, Form, Input, } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';

const token = '26ea7665b9e7e95d706563d8cbf87a09b35ae72c';
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

export const ToDo = () => {
	const [todos, setTodos] = useState([]);
  useEffect(async () => {
    const result = await axios.get(
      'https://api.todoist.com/rest/v1/tasks',
      config
    );

    setTodos(result.data);
  }, []);
	const [ids, setIds] = useState(10);

	const onCheck = (id) => {
		const index = todos.findIndex(todo => todo.id === id);
	
		if (index !== -1) {
		  const todo = todos[index];
	
		  todo.checked = !todo.checked;
	
		  axios.post(
			`https://api.todoist.com/rest/v1/tasks/${id}/close`,
			todo,
			config
		  );
	
		  todos.splice(index, 1, todo);
		  setTodos([...todos]);
		}
	  }

	const onRemove = (id) => {
		const index = todos.findIndex(todo => todo.id === id);
	
		if (index !== -1) {
		  axios.delete(
			`https://api.todoist.com/rest/v1/tasks/${id}`,
			config
		  );
		  todos.splice(index, 1);
		  setTodos([...todos]);
		}
	  }

	const onSubmit = async (content) => {
		const todo = { content };
	
		const { data } = await axios.post(
		  `https://api.todoist.com/rest/v1/tasks`,
		  todo,
		  config
		);
	
		setTodos([...todos, { ...todo, id: data.id }]);
	  } 

	const removeAllChecked = () => {
		let l = todos.length;
    	while (l--) {
      	if (todos[l].checked === true) {
          todos.splice(l, 1);
      }
    }
    
    setTodos([...todos]);
	}

	const numberOfUnchecked = () => { 

		let count = 0;
		let l= todos.length;
		while (l--) {
		  if (todos[l].checked !== true) {
			  count++;
		  }
		}
		return count;
	  }

	
	  const onChange = async (id) => {
		const index = todos.findIndex(todo => todo.id === id);
		  
		if (index !== -1) {
		  const todo = todos[index];
			
		  await axios.post(
			`https://api.todoist.com/rest/v1/tasks/${id}`,
			todo,
			config
		  );
		  
		  todos.splice(index, 1, todo);
		  setTodos([...todos]);
		}
	  }

	const renderTodoItems = (todos) => {
		return (
			<ul className={'todo-list'}>
				{ todos.map(todo => {
					return <ToDoItem key={todo.id} item={todo} onCheck={onCheck} onRemove={onRemove} onChange={ onChange}/>
				})}
			</ul>
		)
		}
	
	return (
		<Card title={'My todo list'}>
			<ToDoForm onSubmit={onSubmit} />
			<Divider/>
			{
				renderTodoItems(todos)
			}
			<Divider />
			<p>Number of unchecked todos: <p
			className="todo-countUnchecked">
			{numberOfUnchecked()}</p></p>
			<Divider />
			<Button danger="true" htmlType="submit"
				type="primary" onClick={removeAllChecked}>
				Remove all checked todos</Button>
		</Card>
	);
}