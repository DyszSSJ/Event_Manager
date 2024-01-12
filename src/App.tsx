import React, { useState } from "react";
import { Button, Typography, Container, Grid, Paper } from "@mui/material";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import StatisticsChart from "./components/StatticsChart";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddEventClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div data-testid="app-component">
      <Container style={{ marginTop: 20, maxWidth: "none" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Mi Aplicación de Eventos
            </Typography>
            <Button
              variant="contained"
              onClick={handleAddEventClick}
              style={{ marginBottom: 20, backgroundColor: "#5c6cff" }}
            >
              Agregar Evento
            </Button>
          </Grid>
          <Grid item xs={12} md={12} xl={6}>
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
          <Grid item xs={12} md={12} xl={6}>
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
        </Grid>
        {showForm && <EventForm handleClose={handleCloseForm} />}
      </Container>
    </div>
  );
};

export default App;
