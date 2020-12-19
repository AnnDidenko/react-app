import React from 'react';
import { Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const ToDoItem = (props) => {
	const { item, onCheck, onRemove } = props;
	const remove = (e) => {
		e.preventDefault();
	
		if (onRemove) {
		  onRemove(item.id);
		}
	  }
	
	const check = () => {
		if (onCheck) {
			onCheck(item.id);
		}
	}
	return (
	<div>
			<li className="todo-item" key={item.id}>
				<Checkbox style={item.checked ? { 'color': 'grey', 'text-decoration': 'line-through' } : {}} checked={item.checked} onChange={check}>{item.title}</Checkbox>
				<p style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {}}>{item.date}</p>
				<Button danger = "true" type = "primary" onClick={remove} icon={<DeleteOutlined />}></Button>
      </li>    
      <p className="todo-item-desc" >Description: {item.desc}</p>
		</div>

)
}