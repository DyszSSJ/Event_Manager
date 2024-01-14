import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addEvent } from "../redux/actions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextareaAutosize,
  Input,
} from "@mui/material";
import { toast } from "react-toastify";

interface EventFormProps {
  handleCloseForm: () => any;
}

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  date: Yup.date()
    .required("La fecha es requerida")
    .min(new Date(), "La fecha no puede ser pasada"),
  time: Yup.string().required("La hora es requerida"),
  description: Yup.string().required("La descripción es requerida"),
});

const EventForm: React.FC<EventFormProps> = ({ handleCloseForm }) => {
  const dispatchs = useDispatch();

  const handleSubmit = (values: {
    name: string;
    date: string;
    time: string;
    description: string;
    id: number;
  }) => {
    dispatchs(addEvent(values), toast.success("Evento creado con éxito"));
    handleCloseForm();
  };

  return (
    <Dialog open onClose={handleCloseForm}>
      <DialogTitle
        style={{ textAlign: "center", padding: "16px", fontWeight: "bold" }}
        id="form-dialog-title"
      >
        Crear Evento
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            date: "",
            time: "",
            description: "",
            id: Math.floor(Math.random() * 1000) + 1,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form data-testid="event-form">
            <Field name="name">
              {({ field, meta }: { field: any; meta: any }) => (
                <Input
                  data-testid="name-input"
                  label="Nombre"
                  type="text"
                  id="name"
                  {...field}
                  fullWidth
                  margin="dense"
                  error={meta.touched ? Boolean(meta.error) : undefined}
                  placeholder="Nombre"
                  inputProps={{ style: { padding: "12px" } }}
                />
              )}
            </Field>
            <Field name="date">
              {({ field, meta }: { field: any; meta: any }) => (
                <Input
                  data-testid="date-input"
                  type="date"
                  id="date"
                  {...field}
                  fullWidth
                  margin="dense"
                  error={meta.touched ? Boolean(meta.error) : undefined}
                  placeholder=""
                  inputProps={{ style: { padding: "12px" } }}
                />
              )}
            </Field>
            <Field name="time">
              {({ field, meta }: { field: any; meta: any }) => (
                <Input
                  data-testid="time-input"
                  type="time"
                  id="time"
                  {...field}
                  fullWidth
                  margin="dense"
                  error={meta.touched ? Boolean(meta.error) : undefined}
                  placeholder=""
                  inputProps={{ style: { padding: "12px" } }}
                />
              )}
            </Field>
            <Field name="description">
              {({ field, meta }: { field: any; meta: any }) => (
                <TextareaAutosize
                  data-testid="description-textarea"
                  minRows={6}
                  maxRows={6}
                  placeholder="Descripción"
                  id="description"
                  {...field}
                  style={{ marginBottom: 16, marginTop: 16, width: "100%" }}
                  error={(meta.touched && !!meta.error).toString()}
                />
              )}
            </Field>
            <DialogActions>
              <Button type="submit" color="primary" data-testid="Guardar">
                Guardar
              </Button>
              <Button
                onClick={handleCloseForm}
                color="secondary"
                data-testid="Cancelar"
              >
                Cancelar
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
