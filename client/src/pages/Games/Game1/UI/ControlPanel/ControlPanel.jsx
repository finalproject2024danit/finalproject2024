import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Імпорт PropTypes

class ControlPanel extends PureComponent {
  render() {
    const { children } = this.props;
    return <Container>{children}</Container>;
  }
}

// Додайте валідацію PropTypes для children
ControlPanel.propTypes = {
  children: PropTypes.node, // Вказує, що children можуть бути будь-яким валідним елементом React
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  align-items: center;
`;

export default ControlPanel;
