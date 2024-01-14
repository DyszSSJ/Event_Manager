// App.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App component', () => {
  test('renders App component correctly', () => {
    render(<App />);
    expect(screen.getByText('Mi Aplicación de Eventos')).toBeInTheDocument();
  });

  test('opens and closes EventForm', async () => {
    render(<App />);
    
    expect(screen.queryByTestId('event-form')).toBeNull();
    
    fireEvent.click(screen.getByText('Agregar Evento'));
    await waitFor(() => {
      expect(screen.getByTestId('event-form')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('Cancelar'));
    
    await waitFor(() => {
      expect(screen.queryByTestId('event-form')).toBeNull();
    });
  });
});
