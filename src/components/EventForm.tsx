import React, { useState } from "react";
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
import LocationSearch from "./LocationSearch";

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
  address: Yup.string().required("La dirección es requerida"),
  latitude: Yup.number().required("La latitud es requerida"),
  longitude: Yup.number().required("La longitud es requerida"),
});

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const EventForm: React.FC<EventFormProps> = ({ handleCloseForm }) => {
  const dispatchs = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleSubmit = (values: {
    name: string;
    date: string;
    time: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    id: number;
  }) => {
    const eventData = {
      ...values,
      location: {
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
      }
    };
    dispatchs(addEvent(eventData), toast.success("Evento creado con éxito"));
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
              address: "",
              latitude: 0,
              longitude: 0,
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
                      rows={4}
                      variant="outlined"
                      fullWidth
                      {...field}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                
                <Field name="address">
                  {({ field, meta, form }: { field: any; meta: any; form: any }) => (
                    <LocationSearch
                      value={field.value}
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                      placeholder="Ej: Zócalo, Ciudad de México"
                      onLocationSelect={(location) => {
                        form.setFieldValue('address', location.address);
                        form.setFieldValue('latitude', location.latitude);
                        form.setFieldValue('longitude', location.longitude);
                        setSelectedLocation(location);
                      }}
                    />
                  )}
                </Field>
                
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Field name="latitude">
                    {({ field, meta }: { field: any; meta: any }) => (
                      <TextField
                        data-testid="latitude-input"
                        label="Latitud"
                        type="number"
                        id="latitude"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={(meta.touched && meta.error) || "Se llena automáticamente al buscar ubicación"}
                        placeholder="19.4326"
                        inputProps={{ step: "any" }}
                        InputProps={{
                          readOnly: true,
                          sx: { 
                            backgroundColor: selectedLocation ? 'action.hover' : 'inherit',
                            borderRadius: 1 
                          }
                        }}
                      />
                    )}
                  </Field>
                  
                  <Field name="longitude">
                    {({ field, meta }: { field: any; meta: any }) => (
                      <TextField
                        data-testid="longitude-input"
                        label="Longitud"
                        type="number"
                        id="longitude"
                        variant="outlined"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={(meta.touched && meta.error) || "Se llena automáticamente al buscar ubicación"}
                        placeholder="-99.1332"
                        inputProps={{ step: "any" }}
                        InputProps={{
                          readOnly: true,
                          sx: { 
                            backgroundColor: selectedLocation ? 'action.hover' : 'inherit',
                            borderRadius: 1 
                          }
                        }}
                      />
                    )}
                  </Field>
                </Box>
                
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
