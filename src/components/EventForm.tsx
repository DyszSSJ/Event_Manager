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
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

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
    <Dialog open onClose={handleCloseForm} fullWidth maxWidth="md">
      <DialogTitle sx={{ 
        textAlign: "center", 
        py: 2,
        bgcolor: "primary.main",
        color: "primary.contrastText"
      }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          Crear Evento
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <FormPaper>
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
              <Stack spacing={3}>
                <Field name="name">
                  {({ field, meta }: { field: any; meta: any }) => (
                    <TextField
                      data-testid="name-input"
                      label="Nombre del evento"
                      type="text"
                      id="name"
                      variant="outlined"
                      fullWidth
                      {...field}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      InputProps={{
                        sx: { borderRadius: 1 }
                      }}
                    />
                  )}
                </Field>
                
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Field name="date">
                    {({ field, meta }: { field: any; meta: any }) => (
                      <TextField
                        data-testid="date-input"
                        label="Fecha"
                        type="date"
                        id="date"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  </Field>
                  
                  <Field name="time">
                    {({ field, meta }: { field: any; meta: any }) => (
                      <TextField
                        data-testid="time-input"
                        label="Hora"
                        type="time"
                        id="time"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  </Field>
                </Box>
                
                <Field name="description">
                  {({ field, meta }: { field: any; meta: any }) => (
                    <TextField
                      data-testid="description-textarea"
                      label="Descripción"
                      id="description"
                      multiline
                      rows={6}
                      variant="outlined"
                      fullWidth
                      {...field}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                
                <DialogActions sx={{ pt: 2, px: 0 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    data-testid="Guardar"
                    sx={{ px: 4 }}
                  >
                    Guardar
                  </Button>
                  <Button
                    onClick={handleCloseForm}
                    variant="outlined"
                    color="secondary"
                    data-testid="Cancelar"
                  >
                    Cancelar
                  </Button>
                </DialogActions>
              </Stack>
            </Form>
          </Formik>
        </FormPaper>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
