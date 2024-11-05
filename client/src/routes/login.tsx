import { Form, Input, Button, Flex, Card, Typography, Space, App } from 'antd';
import { useLoginMutation } from '../redux/services/userApi';
import { useNavigate } from 'react-router-dom';
import { routes } from '../data/routes-config';

type LoginValues = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { message } = App.useApp();

  const onFinish = async (values: LoginValues) => {
    try {
      await login(values).unwrap();
      message.success('Login successful!');

      navigate(routes.dashboard.path);
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please check your credentials.');
    }
  };

  const { Title } = Typography;

  return (
    <Flex
      style={{ width: '100%', height: '100dvh' }}
      justify='center'
      align='center'
    >
      <Card style={{ width: '100%', maxWidth: 500, margin: 'auto' }}>
        <Space direction='vertical' size={24} style={{ width: '100%' }}>
          <Title level={2}>Login</Title>
          <Form name='login' onFinish={onFinish} layout='vertical'>
            <Space direction='vertical' size={24} style={{ width: '100%' }}>
              <Form.Item
                name='email'
                label='Email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input
                  placeholder='Enter your email'
                  style={{ padding: '16px 12px' }}
                />
              </Form.Item>

              <Form.Item
                name='password'
                label='Password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password
                  style={{ padding: '16px 12px' }}
                  placeholder='Enter your password'
                />
              </Form.Item>
            </Space>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                loading={isLoading}
                style={{ marginTop: 24, padding: '18px' }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </Flex>
  );
}
