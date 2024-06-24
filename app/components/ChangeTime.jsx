// components/SpotConfigPopover.js
import * as React from 'react';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const PopoverContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  width: '20rem',
}));

const Grid = styled('div')({
  display: 'grid',
  gap: '16px',
});

const GridRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  alignItems: 'center',
  gap: '16px',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
});

export default function SpotConfigPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton aria-label="Configure spot" onClick={handleClick} size="small">
        <SettingsIcon fontSize="small" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <PopoverContent>
          <Grid>
            <div>
              <Typography variant="h6">Configuración</Typography>
              <Typography variant="body2" color="textSecondary">
                Ingrese cuanto tiempo más se quedará el vehículo en el estacionamiento
              </Typography>
            </div>
            <div>
              <GridRow>
              <TextField id="days" variant="outlined" size="small" />

                <Typography>Días</Typography>
                <TextField id="hours" variant="outlined" size="small" />

                <Typography>Días</Typography>
                 <TextField id="minutes" variant="outlined" size="small" />
                <Typography>Minutos</Typography>

              </GridRow>

            </div>
            <ButtonContainer>
              <Button variant="outlined" size="small" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="contained" size="small" color="primary">
                Actualizar
              </Button>
            </ButtonContainer>
          </Grid>
        </PopoverContent>
      </Popover>
    </div>
  );
}
