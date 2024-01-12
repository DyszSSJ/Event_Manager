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
} from "@mui/material";
import { format } from "date-fns";

const EventList: React.FC = () => {
  const events = useSelector((state: RootState) => state.events);

  const formatTime = (timeString: string): string => {
    const formattedTime = new Date(`2022-01-01 ${timeString}`);
    return format(formattedTime, "hh:mm a");
  };

  return (
    <>
      <Typography
        variant="h5"
        marginBottom={3}
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        {events.length === 0 ? "No hay eventos" : "Lista de Eventos"}
      </Typography>

      {events.length > 0 && (
        <Table
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#5c6cff", color: "white" }}>
                Evento
              </TableCell>
              <TableCell style={{ backgroundColor: "#5c6cff", color: "white" }}>
                Fecha
              </TableCell>
              <TableCell style={{ backgroundColor: "#5c6cff", color: "white" }}>
                Hora
              </TableCell>
              <TableCell style={{ backgroundColor: "#5c6cff", color: "white" }}>
                Descripción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{formatTime(event.time)}</TableCell>
                <TableCell>{event.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default EventList;
