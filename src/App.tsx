import React, { useState } from "react";
import { Button, Typography, Container, Grid, Paper } from "@mui/material";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import StatisticsChart from "./components/StatticsChart";
import MapComponent from "./components/MapComponent";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

const AppContent: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const events = useSelector((state: RootState) => state.events);

  const handleAddEventClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <Container style={{ marginTop: 20, maxWidth: "none" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Mi Aplicación de Eventos
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddEventClick}
            style={{ marginBottom: 20, backgroundColor: "primary.main" }}
          >
            Agregar Evento
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: "white",
            }}
          >
            <EventList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: "white",
              textAlign: "center",
              height: "100%",
            }}
          >
            <StatisticsChart />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 40,
              marginBottom: 40,
            }}
          >
            <Typography variant="h5" component="h5" gutterBottom>
              Mapa de Eventos
            </Typography>
            <MapComponent events={events} height="500px" />
          </Paper>
        </Grid>
      </Grid>
      {showForm && <EventForm handleCloseForm={handleCloseForm} />}
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
