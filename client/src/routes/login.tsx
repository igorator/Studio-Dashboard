import { Form, Input, Button, Flex, Card, Typography, Space } from 'antd';

export function Login() {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Здесь вы можете добавить логику для обработки логина
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
                  style={{ padding: '16px 12px 16px 12px' }}
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
                  style={{ padding: '16px 12px 16px 12px' }}
                  placeholder='Enter your password'
                />
              </Form.Item>
            </Space>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
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
