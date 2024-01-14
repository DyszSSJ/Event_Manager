import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventForm from "../components/EventForm";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("EventForm component", () => {
  test("renders EventForm component correctly", () => {
    render(
      <Provider store={store}>
        <EventForm handleCloseForm={() => {}} />
      </Provider>
    );
  });

  test("submits the form with valid input", async () => {
    render(
      <Provider store={store}>
        <EventForm handleCloseForm={() => {}} />
      </Provider>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async() => {
      const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
      const dateInput = screen.getByTestId('date-input') as HTMLInputElement;
      const timeInput = screen.getByTestId('time-input') as HTMLInputElement;
      const descriptionTextarea = screen.getByTestId('description-textarea') as HTMLTextAreaElement;
      
      nameInput.value = 'Nombre de prueba';
      dateInput.value = '2022-01-13';
      timeInput.value = '14:30';
      descriptionTextarea.value = 'Descripción de prueba';
      
      fireEvent.click(screen.getByTestId('Guardar'));

    });
    
  });
});
