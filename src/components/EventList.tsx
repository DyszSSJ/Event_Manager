import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TableContainer,
  Box,
  Container,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  fontSize: 16,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const EventList: React.FC = () => {
  const events = useSelector((state: RootState) => state.events);

  const formatTime = (timeString: string): string => {
    const formattedTime = new Date(`2022-01-01 ${timeString}`);
    return format(formattedTime, "hh:mm a");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Fade in timeout={800}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 4,
              color: "primary.main",
              borderBottom: (theme) => `2px solid ${theme.palette.primary.light}`,
              paddingBottom: 1,
            }}
          >
            {events.length === 0 ? "No hay eventos" : "Lista de Eventos"}
          </Typography>

          {events.length === 0 ? (
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                textAlign: "center", 
                borderRadius: 2,
                bgcolor: "background.paper" 
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No hay eventos disponibles. ¡Agrega uno nuevo!
              </Typography>
            </Paper>
          ) : (
            <TableContainer 
              component={Paper} 
              elevation={3} 
              sx={{ 
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Evento</StyledTableCell>
                    <StyledTableCell>Fecha</StyledTableCell>
                    <StyledTableCell>Hora</StyledTableCell>
                    <StyledTableCell>Descripción</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <StyledTableRow key={event.id}>
                      <TableCell sx={{ fontWeight: "medium" }}>{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{formatTime(event.time)}</TableCell>
                      <TableCell 
                        sx={{ 
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.description}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default EventList;
