import LightTheme from './LightTheme';
import DarkTheme from './DarkTheme';
import { createTheme } from '@mui/material/styles';

export default {
  Light: LightTheme,
  Dark: DarkTheme,
  Default: createTheme()
};
