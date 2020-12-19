import React, {useState} from 'react';
import { Card, Divider, Button } from 'antd';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';

export const ToDo = () => {
	const [todos, setTodos] = useState ([
		{ id: 1, title: 'todo 1', desc: 'description of todo 1', date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'), checked: false },
		{ id: 2, title: 'todo 2', desc: 'description of todo 2', date: new Date().toLocaleString().slice(0,17).replace(/\//g,'.').replace(/,/g, ' -'), checked: false }
	]);
	const [ids, setIds] = useState(10);

	const onCheck = (id) => {
		const index = todos.findIndex(todo => todo.id === id);
		const todo = todos[index];

		todo.checked = !todo.checked;
		setTodos([...todos]);
	}

	const onRemove = (id) => {
		const index = todos.findIndex(todo => todo.id === id);
		todos.splice(index, 1);

		setTodos([...todos]);
	}

	const onSubmit = (title, desc) => {
		const todo = {
			id: ids,
			title,
			desc,
			checked: false
		};
		setTodos([...todos, todo]);
		setIds(ids + 1);
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
		  if (todos[l].checked === false) {
			  count++;
		  }
		}
		return count;
	  }

	const renderTodoItems = (todos) => {
		return (
			<ul className={'todo-list'}>
				{ todos.map(todo => {
					return <ToDoItem key={ todo.id} item={todo} onCheck={onCheck} onRemove={ onRemove}/>
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