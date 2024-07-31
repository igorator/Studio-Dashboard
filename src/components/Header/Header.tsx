import { Row } from 'antd';
import { Logo } from '../Logo';

export function Header() {
  return (
    <Row
      justify='space-between'
      style={{
        padding: '16px 40px',
        borderBottom: '0.7px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Logo />
    </Row>
  );
}
