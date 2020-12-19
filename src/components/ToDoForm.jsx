import React from 'react';
import { Form, Input, Button } from 'antd';

const { Item } = Form;
export const ToDoForm = (props) => {
	const { onSubmit } = props;
	const [form] = Form.useForm();
	const finish = (values) => {
	  if (onSubmit) {
		onSubmit(values.title, values.desc);
	  }
	  form.resetFields();
	}
	
return (
<Form className="todo-form" layout={'inline'} onFinish = {finish}>
<Item name="title" className="todo-form-input">
        <Input placeholder={'Title'} minLength="3" pattern="[A-Z][a-z]*"/>
      </Item>

      <Item name="desc" className="todo-form-input">
        <Input placeholder={'Description'} minLength="3"/>
      </Item>

      <Item className="todo-form-actions">
        <Button htmlType="submit" type="primary">Add</Button>
      </Item>
</Form>
)
}