import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmljYXJkbzQ1NDUiLCJhIjoiY2xneDkxOHBmMDM4MzNxbzA3bnRoaXJ6NiJ9.uV6zwcd4tJlyDfjJYFtkNg';

interface LocationResult {
  id: string;
  place_name: string;
  center: [number, number];
  place_type: string[];
}

interface LocationSearchProps {
  onLocationSelect: (location: {
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const SuggestionsPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 1000,
  maxHeight: 200,
  overflow: 'auto',
  marginTop: theme.spacing(0.5),
}));

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  value = '',
  error = false,
  helperText = '',
  placeholder = 'Buscar ubicación...'
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const searchPlaces = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${MAPBOX_TOKEN}&country=MX&limit=5&language=es`
      );

      if (!response.ok) {
        throw new Error('Error en la búsqueda');
      }

      const data = await response.json();
      setSuggestions(data.features || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error buscando lugares:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchPlaces(query);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    
    if (newValue.length >= 3) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: LocationResult) => {
    const [longitude, latitude] = suggestion.center;
    
    setQuery(suggestion.place_name);
    setShowSuggestions(false);
    
    onLocationSelect({
      address: suggestion.place_name,
      latitude,
      longitude
    });
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Buscar ubicación"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        error={error}
        helperText={helperText}
        InputProps={{
          endAdornment: loading && <CircularProgress size={20} />,
          sx: { borderRadius: 1 }
        }}
      />
      
      {showSuggestions && (suggestions.length > 0 || loading) && (
        <SuggestionsPaper elevation={3}>
          {loading && suggestions.length === 0 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Buscando...
              </Typography>
            </Box>
          ) : (
            <List dense>
              {suggestions.map((suggestion) => (
                <ListItem
                  key={suggestion.id}
                  button
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText
                    primary={suggestion.place_name}
                    secondary={suggestion.place_type.join(', ')}
                    primaryTypographyProps={{
                      variant: 'body2',
                      noWrap: true,
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: 'text.secondary',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </SuggestionsPaper>
      )}
    </Box>
  );
};

export default LocationSearch;
